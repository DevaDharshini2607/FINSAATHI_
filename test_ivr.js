const http = require('http');

function post(data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/ivr',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

async function testIVR() {
    let state = { phoneNumber: '9876543210' };

    console.log("--- Starting Call ---");

    // 1. Initial Call
    let data = await post(state);
    console.log("Bot:", data.message);
    state.currentStep = data.step;

    // 2. User Presses '2' for Tamil
    console.log("\n> User Presses 2 (Tamil)");
    state.pressedKey = '2';
    data = await post(state);
    console.log("Bot:", data.message);
    state.currentStep = data.step;
    state.language = data.language;

    // 3. User Presses '1' for Loan Guidance
    console.log("\n> User Presses 1");
    state.pressedKey = '1';
    data = await post(state);
    console.log("Bot:", data.message);
    state.currentStep = data.step;

    // 4. User Presses '2' for Income 10k-20k
    console.log("\n> User Presses 2");
    state.pressedKey = '2';
    data = await post(state);
    console.log("Bot:", data.message);

    if (data.is_final) {
        console.log("\n[Call Ended]");
    }
}

testIVR().catch(console.error);
