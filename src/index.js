/**
 * Metering Service
 * 
 * Middleware service that captures AA data fetch events from mock API
 * and sends them to FlexPrice for billing
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const Joi = require('joi');
const winston = require('winston');
const FlexPriceService = require('./services/flexprice.service');
require('dotenv').config();

const app = express();
const PORT = process.env.METERING_PORT || 3001;

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
        })
    ]
});

// Initialize FlexPrice service
const flexPrice = new FlexPriceService();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    next();
});

// Validation schemas
const dataFetchSchema = Joi.object({
    customerId: Joi.string().required(),
    aaProvider: Joi.string().optional(),
    fiType: Joi.string().optional(),
    consentType: Joi.string().optional(),
    purposeCode: Joi.string().optional(),
    ctTemplate: Joi.string().optional(),
    aaId: Joi.string().required(),
    fetchStatus: Joi.string().valid('success', 'failure').required(),
    requestId: Joi.string().required(),
    sessionId: Joi.string().optional()
});

const consoleUserSchema = Joi.object({
    customerId: Joi.string().required(),
    userId: Joi.string().required(),
    userEmail: Joi.string().email().optional(),
    activityType: Joi.string().optional()
});

const customizationSchema = Joi.object({
    customerId: Joi.string().required(),
    developerId: Joi.string().optional(),
    taskDescription: Joi.string().optional(),
    hours: Joi.number().positive().required(),
    hourlyRate: Joi.number().positive().optional(),
    approvedBy: Joi.string().optional()
});

/**
 * POST /metering/data-fetch
 * Track a data fetch event
 */
app.post('/metering/data-fetch', async (req, res) => {
    try {
        // Validate request
        const { error, value } = dataFetchSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: 'Validation error',
                details: error.details
            });
        }

        // Send to FlexPrice
        const result = await flexPrice.trackDataFetch(value);

        res.json({
            success: true,
            message: 'Data fetch event tracked',
            result
        });
    } catch (err) {
        logger.error('Error tracking data fetch', {
            error: err.message,
            body: req.body
        });
        res.status(500).json({
            success: false,
            error: 'Failed to track data fetch event',
            message: err.message
        });
    }
});

/**
 * POST /metering/console-user
 * Track console user activity
 */
app.post('/metering/console-user', async (req, res) => {
    try {
        // Validate request
        const { error, value } = consoleUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: 'Validation error',
                details: error.details
            });
        }

        // Send to FlexPrice
        const result = await flexPrice.trackConsoleUser(value);

        res.json({
            success: true,
            message: 'Console user activity tracked',
            result
        });
    } catch (err) {
        logger.error('Error tracking console user', {
            error: err.message,
            body: req.body
        });
        res.status(500).json({
            success: false,
            error: 'Failed to track console user activity',
            message: err.message
        });
    }
});

/**
 * POST /metering/customization
 * Track customization hours
 */
app.post('/metering/customization', async (req, res) => {
    try {
        // Validate request
        const { error, value } = customizationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: 'Validation error',
                details: error.details
            });
        }

        // Send to FlexPrice
        const result = await flexPrice.trackCustomizationHours(value);

        res.json({
            success: true,
            message: 'Customization hours tracked',
            result
        });
    } catch (err) {
        logger.error('Error tracking customization', {
            error: err.message,
            body: req.body
        });
        res.status(500).json({
            success: false,
            error: 'Failed to track customization hours',
            message: err.message
        });
    }
});

/**
 * POST /metering/flush
 * Manually flush queued events
 */
app.post('/metering/flush', async (req, res) => {
    try {
        const result = await flexPrice.flushEvents();
        res.json({
            success: true,
            message: 'Events flushed',
            result
        });
    } catch (err) {
        logger.error('Error flushing events', {
            error: err.message
        });
        res.status(500).json({
            success: false,
            error: 'Failed to flush events',
            message: err.message
        });
    }
});

/**
 * GET /metering/usage/:customerId
 * Get customer usage from FlexPrice
 */
app.get('/metering/usage/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const { startDate, endDate } = req.query;

        const usage = await flexPrice.getCustomerUsage(customerId, startDate, endDate);

        res.json({
            success: true,
            customerId,
            usage
        });
    } catch (err) {
        logger.error('Error fetching usage', {
            error: err.message,
            customerId: req.params.customerId
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch usage',
            message: err.message
        });
    }
});

/**
 * GET /metering/invoices/:customerId
 * Get customer invoices from FlexPrice
 */
app.get('/metering/invoices/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        const invoices = await flexPrice.getCustomerInvoices(customerId);

        res.json({
            success: true,
            customerId,
            invoices
        });
    } catch (err) {
        logger.error('Error fetching invoices', {
            error: err.message,
            customerId: req.params.customerId
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch invoices',
            message: err.message
        });
    }
});

/**
 * POST /metering/charge
 * Create one-time charge
 */
app.post('/metering/charge', async (req, res) => {
    try {
        const { customerId, amount, description, invoiceImmediately } = req.body;

        if (!customerId || !amount || !description) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: customerId, amount, description'
            });
        }

        const charge = await flexPrice.createOneTimeCharge({
            customerId,
            amount,
            description,
            invoiceImmediately
        });

        res.json({
            success: true,
            message: 'One-time charge created',
            charge
        });
    } catch (err) {
        logger.error('Error creating charge', {
            error: err.message,
            body: req.body
        });
        res.status(500).json({
            success: false,
            error: 'Failed to create charge',
            message: err.message
        });
    }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        service: 'metering',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * GET /
 * Root endpoint with API documentation
 */
app.get('/', (req, res) => {
    res.json({
        name: 'Finarkein Metering Service',
        version: '1.0.0',
        description: 'Metering service for FlexPrice billing integration',
        endpoints: {
            'POST /metering/data-fetch': 'Track data fetch event',
            'POST /metering/console-user': 'Track console user activity',
            'POST /metering/customization': 'Track customization hours',
            'POST /metering/flush': 'Manually flush queued events',
            'GET /metering/usage/:customerId': 'Get customer usage',
            'GET /metering/invoices/:customerId': 'Get customer invoices',
            'POST /metering/charge': 'Create one-time charge',
            'GET /health': 'Health check'
        },
        flexprice: {
            environment: flexPrice.environment,
            batchSize: flexPrice.batchSize,
            flushInterval: flexPrice.flushInterval
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack
    });
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully');
    await flexPrice.stop();
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully');
    await flexPrice.stop();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    logger.info(`\n🚀 Finarkein Metering Service running on port ${PORT}`);
    logger.info(`📍 Service URL: http://localhost:${PORT}`);
    logger.info(`📚 Documentation: http://localhost:${PORT}/`);
    logger.info(`\n🔗 FlexPrice Integration:`);
    logger.info(`   Environment: ${flexPrice.environment}`);
    logger.info(`   Batch Size: ${flexPrice.batchSize}`);
    logger.info(`   Flush Interval: ${flexPrice.flushInterval}ms`);
    logger.info(`\n💡 Example request:`);
    logger.info(`   curl -X POST http://localhost:${PORT}/metering/data-fetch \\`);
    logger.info(`     -H "Content-Type: application/json" \\`);
    logger.info(`     -d '{"customerId":"cashfloat","aaId":"AA_USER_123","fetchStatus":"success","requestId":"req_123"}'`);
    logger.info('');
});

module.exports = app;
