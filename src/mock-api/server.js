/**
 * Mock API Server for Finarkein AA Data Fetch Operations
 * 
 * Simulates the Account Aggregator data fetch flow and generates
 * metering events for FlexPrice billing
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.MOCK_API_PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Mock data for clients
const CLIENTS = {
    cashfloat: {
        id: 'cashfloat',
        name: 'Cashfloat',
        pricingModel: 'per_fetch_ct_template',
        setupFee: 0,
        certificationFee: 30000
    },
    cusp_money: {
        id: 'cusp_money',
        name: 'Cusp Money',
        pricingModel: 'per_user_tiered_aa',
        setupFee: 0,
        certificationFee: 30000
    },
    dvara: {
        id: 'dvara',
        name: 'Dvara',
        pricingModel: 'per_fetch_purpose_code',
        setupFee: 0,
        certificationFee: 30000
    },
    spark_capital: {
        id: 'spark_capital',
        name: 'Spark Capital',
        pricingModel: 'per_user_flat',
        setupFee: 0,
        certificationFee: 35000
    },
    fibe: {
        id: 'fibe',
        name: 'Fibe',
        pricingModel: 'hybrid_fetch_minimum',
        setupFee: 600000,
        certificationFee: 30000
    },
    pnb_metlife: {
        id: 'pnb_metlife',
        name: 'PNB MetLife',
        pricingModel: 'per_user_with_console',
        setupFee: 0,
        certificationFee: 30000
    }
};

// Mock AA Providers
const AA_PROVIDERS = ['setu', 'anumati', 'finvu', 'nadl', 'onemoney', 'protean'];

// Mock FI Types
const FI_TYPES = ['deposit', 'securities', 'insurance', 'mutual_funds', 'recurring_deposit', 'sip'];

// Mock Consent Types
const CONSENT_TYPES = ['view', 'store', 'query', 'stream'];

// Mock Purpose Codes
const PURPOSE_CODES = ['101', '102', '103', '104', '105'];

// Mock CT Templates (for Cashfloat)
const CT_TEMPLATES = ['template_basic', 'template_standard', 'template_premium'];

// Helper function to generate random element from array
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate random success/failure
const randomSuccess = () => Math.random() > 0.05; // 95% success rate

/**
 * POST /api/v1/aa/fetch
 * Simulate AA data fetch request
 */
app.post('/api/v1/aa/fetch', (req, res) => {
    const {
        customerId,
        aaProvider,
        fiType,
        consentType,
        purposeCode,
        ctTemplate,
        aaId,
        sessionId
    } = req.body;

    // Validate customer
    if (!CLIENTS[customerId]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid customer ID',
            validCustomers: Object.keys(CLIENTS)
        });
    }

    // Generate request ID
    const requestId = `req_${uuidv4()}`;
    const fetchStatus = randomSuccess() ? 'success' : 'failure';

    // Simulate processing delay
    const processingTime = Math.floor(Math.random() * 500) + 100; // 100-600ms

    setTimeout(() => {
        const response = {
            success: fetchStatus === 'success',
            requestId,
            customerId,
            aaProvider: aaProvider || randomElement(AA_PROVIDERS),
            fiType: fiType || randomElement(FI_TYPES),
            consentType: consentType || randomElement(CONSENT_TYPES),
            purposeCode: purposeCode || randomElement(PURPOSE_CODES),
            ctTemplate: ctTemplate || randomElement(CT_TEMPLATES),
            aaId: aaId || `AA_USER_${Math.floor(Math.random() * 10000)}`,
            sessionId: sessionId || `session_${uuidv4()}`,
            fetchStatus,
            timestamp: new Date().toISOString(),
            processingTime,
            data: fetchStatus === 'success' ? {
                accounts: [
                    {
                        accountId: `ACC_${Math.floor(Math.random() * 100000)}`,
                        accountType: fiType || randomElement(FI_TYPES),
                        balance: Math.floor(Math.random() * 1000000),
                        currency: 'INR'
                    }
                ]
            } : null,
            error: fetchStatus === 'failure' ? 'FIP timeout' : null
        };

        res.json(response);
    }, processingTime);
});

/**
 * POST /api/v1/aa/fetch/bulk
 * Simulate bulk AA data fetch requests
 */
app.post('/api/v1/aa/fetch/bulk', (req, res) => {
    const { customerId, count = 10 } = req.body;

    if (!CLIENTS[customerId]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid customer ID'
        });
    }

    const requests = [];
    for (let i = 0; i < count; i++) {
        const fetchStatus = randomSuccess() ? 'success' : 'failure';
        requests.push({
            requestId: `req_${uuidv4()}`,
            customerId,
            aaProvider: randomElement(AA_PROVIDERS),
            fiType: randomElement(FI_TYPES),
            consentType: randomElement(CONSENT_TYPES),
            purposeCode: randomElement(PURPOSE_CODES),
            ctTemplate: randomElement(CT_TEMPLATES),
            aaId: `AA_USER_${Math.floor(Math.random() * 10000)}`,
            sessionId: `session_${uuidv4()}`,
            fetchStatus,
            timestamp: new Date().toISOString()
        });
    }

    res.json({
        success: true,
        totalRequests: count,
        successfulFetches: requests.filter(r => r.fetchStatus === 'success').length,
        failedFetches: requests.filter(r => r.fetchStatus === 'failure').length,
        requests
    });
});

/**
 * POST /api/v1/console/login
 * Simulate console user login
 */
app.post('/api/v1/console/login', (req, res) => {
    const { customerId, userId, userEmail } = req.body;

    if (!CLIENTS[customerId]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid customer ID'
        });
    }

    res.json({
        success: true,
        customerId,
        userId: userId || `user_${Math.floor(Math.random() * 1000)}`,
        userEmail: userEmail || `user${Math.floor(Math.random() * 1000)}@${customerId}.com`,
        activityType: 'login',
        timestamp: new Date().toISOString(),
        sessionToken: `token_${uuidv4()}`
    });
});

/**
 * POST /api/v1/customization/log
 * Log customization hours
 */
app.post('/api/v1/customization/log', (req, res) => {
    const {
        customerId,
        developerId,
        taskDescription,
        hours,
        approvedBy
    } = req.body;

    if (!CLIENTS[customerId]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid customer ID'
        });
    }

    res.json({
        success: true,
        customerId,
        developerId: developerId || 'dev_ankit',
        taskDescription: taskDescription || 'Custom development work',
        hours: hours || 8,
        hourlyRate: 1200,
        totalCost: (hours || 8) * 1200,
        approvedBy: approvedBy || 'client_pm',
        timestamp: new Date().toISOString(),
        logId: `custom_${uuidv4()}`
    });
});

/**
 * GET /api/v1/clients
 * Get list of all clients
 */
app.get('/api/v1/clients', (req, res) => {
    res.json({
        success: true,
        clients: Object.values(CLIENTS)
    });
});

/**
 * GET /api/v1/clients/:clientId
 * Get specific client details
 */
app.get('/api/v1/clients/:clientId', (req, res) => {
    const client = CLIENTS[req.params.clientId];

    if (!client) {
        return res.status(404).json({
            success: false,
            error: 'Client not found'
        });
    }

    res.json({
        success: true,
        client
    });
});

/**
 * GET /api/v1/health
 * Health check endpoint
 */
app.get('/api/v1/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
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
        name: 'Finarkein Mock API',
        version: '1.0.0',
        description: 'Mock API for simulating AA data fetch operations',
        endpoints: {
            'POST /api/v1/aa/fetch': 'Simulate single AA data fetch',
            'POST /api/v1/aa/fetch/bulk': 'Simulate bulk AA data fetches',
            'POST /api/v1/console/login': 'Simulate console user login',
            'POST /api/v1/customization/log': 'Log customization hours',
            'GET /api/v1/clients': 'Get all clients',
            'GET /api/v1/clients/:clientId': 'Get specific client',
            'GET /api/v1/health': 'Health check'
        },
        clients: Object.keys(CLIENTS),
        aaProviders: AA_PROVIDERS,
        fiTypes: FI_TYPES,
        consentTypes: CONSENT_TYPES,
        purposeCodes: PURPOSE_CODES,
        ctTemplates: CT_TEMPLATES
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Finarkein Mock API Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`📚 Documentation: http://localhost:${PORT}/`);
    console.log(`\n✅ Available clients: ${Object.keys(CLIENTS).join(', ')}`);
    console.log(`\n💡 Example request:`);
    console.log(`   curl -X POST http://localhost:${PORT}/api/v1/aa/fetch \\`);
    console.log(`     -H "Content-Type: application/json" \\`);
    console.log(`     -d '{"customerId":"cashfloat","aaId":"AA_USER_123"}'`);
    console.log('');
});

module.exports = app;
