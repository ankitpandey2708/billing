/**
 * Integration Example
 * 
 * Demonstrates how to integrate the mock API with the metering service
 * to automatically send billing events to FlexPrice
 */

const axios = require('axios');

const MOCK_API_URL = 'http://localhost:3000';
const METERING_SERVICE_URL = 'http://localhost:3001';

/**
 * Simulate AA data fetch with automatic metering
 */
async function fetchDataWithMetering(customerId, aaId) {
    try {
        console.log(`\n📊 Fetching data for customer: ${customerId}, AA ID: ${aaId}`);

        // Step 1: Call mock API to fetch data
        const fetchResponse = await axios.post(`${MOCK_API_URL}/api/v1/aa/fetch`, {
            customerId,
            aaId
        });

        console.log('✅ Data fetch successful:', {
            requestId: fetchResponse.data.requestId,
            fetchStatus: fetchResponse.data.fetchStatus,
            aaProvider: fetchResponse.data.aaProvider,
            fiType: fetchResponse.data.fiType
        });

        // Step 2: Send metering event to FlexPrice (only if successful)
        if (fetchResponse.data.fetchStatus === 'success') {
            const meteringResponse = await axios.post(`${METERING_SERVICE_URL}/metering/data-fetch`, {
                customerId: fetchResponse.data.customerId,
                aaProvider: fetchResponse.data.aaProvider,
                fiType: fetchResponse.data.fiType,
                consentType: fetchResponse.data.consentType,
                purposeCode: fetchResponse.data.purposeCode,
                ctTemplate: fetchResponse.data.ctTemplate,
                aaId: fetchResponse.data.aaId,
                fetchStatus: fetchResponse.data.fetchStatus,
                requestId: fetchResponse.data.requestId,
                sessionId: fetchResponse.data.sessionId
            });

            console.log('📈 Metering event sent:', meteringResponse.data);
        } else {
            console.log('⚠️  Fetch failed, skipping metering');
        }

        return fetchResponse.data;
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}

/**
 * Simulate bulk data fetches
 */
async function bulkFetchWithMetering(customerId, count = 10) {
    try {
        console.log(`\n📊 Bulk fetching ${count} requests for customer: ${customerId}`);

        // Step 1: Call mock API for bulk fetch
        const bulkResponse = await axios.post(`${MOCK_API_URL}/api/v1/aa/fetch/bulk`, {
            customerId,
            count
        });

        console.log('✅ Bulk fetch completed:', {
            totalRequests: bulkResponse.data.totalRequests,
            successfulFetches: bulkResponse.data.successfulFetches,
            failedFetches: bulkResponse.data.failedFetches
        });

        // Step 2: Send metering events for all successful fetches
        const meteringPromises = bulkResponse.data.requests
            .filter(req => req.fetchStatus === 'success')
            .map(req =>
                axios.post(`${METERING_SERVICE_URL}/metering/data-fetch`, {
                    customerId: req.customerId,
                    aaProvider: req.aaProvider,
                    fiType: req.fiType,
                    consentType: req.consentType,
                    purposeCode: req.purposeCode,
                    ctTemplate: req.ctTemplate,
                    aaId: req.aaId,
                    fetchStatus: req.fetchStatus,
                    requestId: req.requestId,
                    sessionId: req.sessionId
                })
            );

        await Promise.all(meteringPromises);
        console.log(`📈 Sent ${meteringPromises.length} metering events to FlexPrice`);

        return bulkResponse.data;
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

/**
 * Track console user login
 */
async function trackConsoleLogin(customerId, userId, userEmail) {
    try {
        console.log(`\n👤 Tracking console login for: ${userId}`);

        // Step 1: Simulate login
        const loginResponse = await axios.post(`${MOCK_API_URL}/api/v1/console/login`, {
            customerId,
            userId,
            userEmail
        });

        console.log('✅ Login successful:', loginResponse.data);

        // Step 2: Send metering event
        const meteringResponse = await axios.post(`${METERING_SERVICE_URL}/metering/console-user`, {
            customerId: loginResponse.data.customerId,
            userId: loginResponse.data.userId,
            userEmail: loginResponse.data.userEmail,
            activityType: loginResponse.data.activityType
        });

        console.log('📈 Console user activity tracked:', meteringResponse.data);

        return loginResponse.data;
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

/**
 * Log customization work
 */
async function logCustomizationWork(customerId, hours, taskDescription) {
    try {
        console.log(`\n⚙️  Logging customization work: ${hours} hours`);

        // Step 1: Log work in mock API
        const workResponse = await axios.post(`${MOCK_API_URL}/api/v1/customization/log`, {
            customerId,
            hours,
            taskDescription
        });

        console.log('✅ Work logged:', workResponse.data);

        // Step 2: Send metering event
        const meteringResponse = await axios.post(`${METERING_SERVICE_URL}/metering/customization`, {
            customerId: workResponse.data.customerId,
            developerId: workResponse.data.developerId,
            taskDescription: workResponse.data.taskDescription,
            hours: workResponse.data.hours,
            hourlyRate: workResponse.data.hourlyRate,
            approvedBy: workResponse.data.approvedBy
        });

        console.log('📈 Customization hours tracked:', meteringResponse.data);

        return workResponse.data;
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

/**
 * Create one-time charge (certification fee)
 */
async function createCertificationFee(customerId, amount = 30000) {
    try {
        console.log(`\n💰 Creating certification fee for: ${customerId}`);

        const chargeResponse = await axios.post(`${METERING_SERVICE_URL}/metering/charge`, {
            customerId,
            amount,
            description: 'Certification Fee',
            invoiceImmediately: true
        });

        console.log('✅ Certification fee created:', chargeResponse.data);

        return chargeResponse.data;
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

/**
 * Run demo scenarios
 */
async function runDemo() {
    console.log('🚀 Starting Finarkein Billing Integration Demo\n');
    console.log('='.repeat(60));

    try {
        // Scenario 1: Cashfloat - Per-fetch with CT template
        console.log('\n📋 Scenario 1: Cashfloat (Per-fetch, CT Template based)');
        console.log('-'.repeat(60));
        await fetchDataWithMetering('cashfloat', 'AA_USER_1001');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Scenario 2: Cusp Money - Bulk fetches
        console.log('\n📋 Scenario 2: Cusp Money (Per-user, Tiered by AA)');
        console.log('-'.repeat(60));
        await bulkFetchWithMetering('cusp_money', 5);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Scenario 3: Dvara - Purpose code based
        console.log('\n📋 Scenario 3: Dvara (Per-fetch, Purpose Code based)');
        console.log('-'.repeat(60));
        await fetchDataWithMetering('dvara', 'AA_USER_2001');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Scenario 4: PNB MetLife - Console user
        console.log('\n📋 Scenario 4: PNB MetLife (Console User Activity)');
        console.log('-'.repeat(60));
        await trackConsoleLogin('pnb_metlife', 'user_john', 'john@pnbmetlife.com');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Scenario 5: Fibe - Customization work
        console.log('\n📋 Scenario 5: Fibe (Customization Hours)');
        console.log('-'.repeat(60));
        await logCustomizationWork('fibe', 8.5, 'Custom PFM dashboard integration');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Scenario 6: Create certification fee
        console.log('\n📋 Scenario 6: One-time Certification Fee');
        console.log('-'.repeat(60));
        await createCertificationFee('cashfloat', 30000);

        console.log('\n' + '='.repeat(60));
        console.log('✅ Demo completed successfully!');
        console.log('\n💡 Check FlexPrice dashboard at: https://admin.flexprice.io/');
        console.log('   to see the metered events and usage data.');
        console.log('');

    } catch (error) {
        console.error('\n❌ Demo failed:', error.message);
    }
}

// Run demo if executed directly
if (require.main === module) {
    runDemo();
}

module.exports = {
    fetchDataWithMetering,
    bulkFetchWithMetering,
    trackConsoleLogin,
    logCustomizationWork,
    createCertificationFee,
    runDemo
};
