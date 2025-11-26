/**
 * FlexPrice Integration Service for Finarkein
 * 
 * Handles metering event ingestion to FlexPrice with volume-based discounts
 * Based on official FlexPrice documentation
 */

const axios = require('axios');
const crypto = require('crypto');
const winston = require('winston');
require('dotenv').config();

// Configure logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'logs/metering.log' })
    ]
});

class FlexPriceService {
    constructor(config = {}) {
        this.apiKey = config.apiKey || process.env.FLEXPRICE_API_KEY;
        // Official FlexPrice API endpoint
        this.baseUrl = config.baseUrl || process.env.FLEXPRICE_BASE_URL || 'https://api.cloud.flexprice.io/v1';
        this.environment = config.environment || process.env.FLEXPRICE_ENVIRONMENT || 'production';
        this.batchSize = config.batchSize || parseInt(process.env.METERING_BATCH_SIZE) || 100;
        this.flushInterval = config.flushInterval || parseInt(process.env.METERING_FLUSH_INTERVAL) || 5000;

        this.eventQueue = [];
        this.batchProcessor = null;

        if (!this.apiKey) {
            throw new Error('FlexPrice API key is required');
        }

        logger.info('FlexPrice Service initialized', {
            baseUrl: this.baseUrl,
            environment: this.environment,
            batchSize: this.batchSize,
            flushInterval: this.flushInterval
        });

        // Start batch processing
        this.startBatchProcessor();
    }

    /**
     * Track a data fetch event
     * @param {Object} fetchData - Data fetch information
     */
    async trackDataFetch(fetchData) {
        const {
            customerId,
            aaProvider,
            fiType,
            consentType,
            purposeCode,
            ctTemplate,
            aaId,
            fetchStatus,
            requestId,
            sessionId
        } = fetchData;

        // Only track successful fetches for billing
        if (fetchStatus !== 'success') {
            logger.debug('Skipping failed fetch for billing', { requestId, fetchStatus });
            return { queued: false, reason: 'failed_fetch' };
        }

        // Validate required fields
        if (!customerId || !aaId || !requestId) {
            throw new Error('Missing required fields: customerId, aaId, requestId');
        }

        // Official FlexPrice event format
        const event = {
            event_name: 'data.fetch',
            external_customer_id: customerId,
            event_id: this.generateEventId(customerId, requestId),
            timestamp: new Date().toISOString(),
            properties: {
                aa_provider: aaProvider,
                fi_type: fiType,
                consent_type: consentType,
                purpose_code: purposeCode,
                ct_template: ctTemplate,
                aa_id: aaId,
                fetch_status: fetchStatus,
                quantity: 1,
                request_id: requestId,
                session_id: sessionId
            }
        };

        logger.info('Tracking data fetch event', {
            customerId,
            requestId,
            aaProvider,
            fiType
        });

        return this.sendEvent(event);
    }

    /**
     * Track console user activity
     * @param {Object} userData - User activity information
     */
    async trackConsoleUser(userData) {
        const {
            customerId,
            userId,
            userEmail,
            activityType
        } = userData;

        if (!customerId || !userId) {
            throw new Error('Missing required fields: customerId, userId');
        }

        // Official FlexPrice event format
        const event = {
            event_name: 'console.user.active',
            external_customer_id: customerId,
            event_id: this.generateEventId(customerId, `console_${userId}_${Date.now()}`),
            timestamp: new Date().toISOString(),
            properties: {
                user_id: userId,
                user_email: userEmail,
                activity_type: activityType,
                quantity: 1
            }
        };

        logger.info('Tracking console user activity', {
            customerId,
            userId,
            activityType
        });

        return this.sendEvent(event);
    }

    /**
     * Track customization hours
     * @param {Object} customizationData - Customization work information
     */
    async trackCustomizationHours(customizationData) {
        const {
            customerId,
            developerId,
            taskDescription,
            hours,
            hourlyRate,
            approvedBy
        } = customizationData;

        if (!customerId || !hours) {
            throw new Error('Missing required fields: customerId, hours');
        }

        // Official FlexPrice event format
        const event = {
            event_name: 'customization.hours',
            external_customer_id: customerId,
            event_id: this.generateEventId(customerId, `custom_${developerId}_${Date.now()}`),
            timestamp: new Date().toISOString(),
            properties: {
                developer_id: developerId,
                task_description: taskDescription,
                hours: hours,
                hourly_rate: hourlyRate || 1200,
                approved_by: approvedBy
            }
        };

        logger.info('Tracking customization hours', {
            customerId,
            developerId,
            hours
        });

        return this.sendEvent(event);
    }

    /**
     * Send event to FlexPrice (with batching)
     * @param {Object} event - Event object
     */
    async sendEvent(event) {
        // Validate event
        this.validateEvent(event);

        // Add to queue for batch processing
        this.eventQueue.push(event);

        logger.debug('Event queued', {
            eventName: event.event_name,
            customerId: event.external_customer_id,
            queueSize: this.eventQueue.length
        });

        // If queue is full, flush immediately
        if (this.eventQueue.length >= this.batchSize) {
            logger.info('Queue full, flushing immediately', {
                queueSize: this.eventQueue.length
            });
            return this.flushEvents();
        }

        return Promise.resolve({ queued: true, queueSize: this.eventQueue.length });
    }

    /**
     * Validate event structure
     * @param {Object} event - Event to validate
     */
    validateEvent(event) {
        // Official FlexPrice required fields
        const required = ['event_name', 'external_customer_id'];

        for (const field of required) {
            if (!event[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Event-specific validation
        if (event.event_name === 'data.fetch') {
            if (!event.properties.aa_id) {
                throw new Error('data.fetch event requires aa_id in properties');
            }
            if (!event.properties.fetch_status) {
                throw new Error('data.fetch event requires fetch_status in properties');
            }
        }

        return true;
    }

    /**
     * Generate event ID for idempotency
     * @param {string} customerId - Customer identifier
     * @param {string} uniqueId - Unique identifier for this event
     */
    generateEventId(customerId, uniqueId) {
        const data = `${customerId}_${uniqueId}`;
        return crypto.createHash('sha256').update(data).digest('hex').substring(0, 32);
    }

    /**
     * Flush queued events to FlexPrice
     */
    async flushEvents() {
        if (this.eventQueue.length === 0) {
            return { sent: 0 };
        }

        const eventsToSend = [...this.eventQueue];
        this.eventQueue = [];

        logger.info('Flushing events to FlexPrice', {
            eventCount: eventsToSend.length
        });

        try {
            const response = await this.sendBatchToFlexPrice(eventsToSend);
            logger.info('Successfully sent events to FlexPrice', {
                eventCount: eventsToSend.length,
                response: response
            });
            return response;
        } catch (error) {
            logger.error('Failed to send events to FlexPrice', {
                error: error.message,
                eventCount: eventsToSend.length
            });

            // Re-queue events for retry (with limit to prevent infinite growth)
            if (this.eventQueue.length < this.batchSize * 10) {
                this.eventQueue.unshift(...eventsToSend);
                logger.warn('Events re-queued for retry', {
                    queueSize: this.eventQueue.length
                });
            } else {
                logger.error('Queue overflow, dropping events', {
                    droppedEvents: eventsToSend.length
                });
            }

            throw error;
        }
    }

    /**
     * Send batch of events to FlexPrice API
     * @param {Array} events - Array of events to send
     */
    async sendBatchToFlexPrice(events) {
        try {
            // Use bulk endpoint if more than 1 event (official FlexPrice API supports up to 1000 events)
            if (events.length > 1) {
                const response = await axios.post(
                    `${this.baseUrl}/events/bulk`,
                    { events: events },
                    {
                        headers: {
                            'x-api-key': this.apiKey,
                            'Content-Type': 'application/json'
                        },
                        timeout: 30000 // 30 second timeout for bulk
                    }
                );
                return {
                    sent: events.length,
                    results: response.data
                };
            } else {
                // Single event endpoint
                const response = await axios.post(
                    `${this.baseUrl}/events`,
                    events[0],
                    {
                        headers: {
                            'x-api-key': this.apiKey,
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000 // 10 second timeout
                    }
                );
                return {
                    sent: 1,
                    results: [response.data]
                };
            }
        } catch (error) {
            if (error.response) {
                // FlexPrice API returned an error
                logger.error('FlexPrice API Error', {
                    status: error.response.status,
                    data: error.response.data
                });
                throw new Error(`FlexPrice API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // Request was made but no response received
                logger.error('No response from FlexPrice API');
                throw new Error('No response from FlexPrice API');
            } else {
                // Something else happened
                logger.error('Error setting up FlexPrice request', {
                    error: error.message
                });
                throw error;
            }
        }
    }

    /**
     * Start batch processor (flushes events periodically)
     */
    startBatchProcessor() {
        this.batchProcessor = setInterval(() => {
            if (this.eventQueue.length > 0) {
                logger.debug('Periodic flush triggered', {
                    queueSize: this.eventQueue.length
                });
                this.flushEvents().catch(err => {
                    logger.error('Batch processor error', {
                        error: err.message
                    });
                });
            }
        }, this.flushInterval);

        logger.info('Batch processor started', {
            flushInterval: this.flushInterval
        });
    }

    /**
     * Stop batch processor and flush remaining events
     */
    async stop() {
        logger.info('Stopping FlexPrice service');

        if (this.batchProcessor) {
            clearInterval(this.batchProcessor);
            logger.info('Batch processor stopped');
        }

        // Flush any remaining events
        if (this.eventQueue.length > 0) {
            logger.info('Flushing remaining events before shutdown', {
                eventCount: this.eventQueue.length
            });
            await this.flushEvents();
        }

        logger.info('FlexPrice service stopped');
    }

    /**
     * Get customer usage summary from FlexPrice
     * @param {string} customerId - Customer identifier
     * @param {string} startDate - Start date (ISO format)
     * @param {string} endDate - End date (ISO format)
     */
    async getCustomerUsage(customerId, startDate, endDate) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/customers/${customerId}/usage`,
                {
                    params: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            logger.info('Retrieved customer usage', {
                customerId,
                startDate,
                endDate
            });

            return response.data;
        } catch (error) {
            logger.error('Error fetching customer usage', {
                customerId,
                error: error.message
            });
            throw error;
        }
    }

    /**
     * Get customer invoices from FlexPrice
     * @param {string} customerId - Customer identifier
     */
    async getCustomerInvoices(customerId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/customers/${customerId}/invoices`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            logger.info('Retrieved customer invoices', {
                customerId,
                invoiceCount: response.data.length || 0
            });

            return response.data;
        } catch (error) {
            logger.error('Error fetching customer invoices', {
                customerId,
                error: error.message
            });
            throw error;
        }
    }

    /**
     * Create a one-time charge (for setup/certification fees)
     * @param {Object} chargeData - Charge information
     */
    async createOneTimeCharge(chargeData) {
        const {
            customerId,
            amount,
            description,
            invoiceImmediately
        } = chargeData;

        try {
            const response = await axios.post(
                `${this.baseUrl}/charges`,
                {
                    customer_id: customerId,
                    amount: amount,
                    currency: 'INR',
                    description: description,
                    invoice_immediately: invoiceImmediately || false
                },
                {
                    headers: {
                        'x-api-key': this.apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );

            logger.info('Created one-time charge', {
                customerId,
                amount,
                description
            });

            return response.data;
        } catch (error) {
            logger.error('Error creating one-time charge', {
                customerId,
                amount,
                error: error.message
            });
            throw error;
        }
    }
}

module.exports = FlexPriceService;
