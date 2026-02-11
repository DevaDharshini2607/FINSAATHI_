const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 5000;
const SECRET_KEY = "hackathon_secret_key";

app.use(cors());
app.use(express.json());

// Initialize DB - ensure directory exists or handle path
const dbPath = path.resolve(__dirname, 'finance.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database at ' + dbPath);
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            mobile TEXT,
            monthly_income REAL
        )`);
    }
});

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
    const { email, password, mobile, monthly_income } = req.body;

    if (!email || !password || !mobile || !monthly_income) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: "Email must be a @gmail.com address" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (email, password, mobile, monthly_income) VALUES (?, ?, ?, ?)`;

        db.run(sql, [email, hashedPassword, mobile, monthly_income], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            res.status(201).json({ message: "User registered successfully", userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({
            message: "Login successful",
            token,
            user: {
                email: user.email,
                mobile: user.mobile,
                monthly_income: user.monthly_income
            }
        });
    });
});

// Chat Endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    // Simple rule-based logic for now (mocking AI)
    let reply = "I'm still learning, but I can help you with basic financial questions.";

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        reply = "Hello! How can I assist you with your financial journey today?";
    } else if (lowerMsg.includes('good morning')) {
        reply = "Good morning! Hope you have a financially productive day. How can I help?";
    } else if (lowerMsg.includes('good afternoon')) {
        reply = "Good afternoon! How can I assist you with your finances?";
    } else if (lowerMsg.includes('good evening')) {
        reply = "Good evening! Let me know if you have any questions about your savings or loans.";
    } else if (lowerMsg.includes('thank') || lowerMsg.includes('ok thanks')) {
        reply = "You're very welcome! Let me know if you have any other questions. Happy to help! 🌟";
    } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
        reply = "Goodbye! Stay financially safe and smart. 👋";
    } else if (lowerMsg.includes('scam')) {
        reply = "If you suspect a scam, do not share your OTP or PIN. You can use our 'Scam Check' feature to verify suspicious links or numbers.";
    } else if (lowerMsg.includes('education') || lowerMsg.includes('study') || lowerMsg.includes('student')) {
        reply = "For education, you can explore: 1. Education Loans (low interest, moratorium period). 2. Scholarships (National Scholarship Portal). 3. Sukanya Samriddhi Yojana (for girl child).";
    } else if (lowerMsg.includes('insurance') || lowerMsg.includes('policy')) {
        reply = "Insurance is vital for risk management. Types include: 1. Life Insurance (Term/Endowment). 2. Health Insurance (Ayushman Bharat/Private). 3. General Insurance (Motor/Home). Always check the claim settlement ratio before buying.";
    } else if (lowerMsg.includes('financial help') || lowerMsg.includes('scheme') || lowerMsg.includes('aid')) {
        reply = "Government schemes available: 1. PM Jan Dhan Yojana (Zero balance account). 2. PM Awas Yojana (Housing aid). 3. Mudra Yojana (Small business loans). Visit 'Gov Schemes' section for details.";
    } else if (lowerMsg.includes('loan') || lowerMsg.includes('borrow')) {
        if (lowerMsg.includes('home')) {
            reply = "Home Loans often offer tax benefits under Sec 80C and 24(b). Compare interest rates and look for PMAY subsidy eligibility.";
        } else if (lowerMsg.includes('personal')) {
            reply = "Personal loans are unsecured but have higher interest rates. Use them only for emergencies or debt consolidation.";
        } else {
            reply = "We offer a Loan Calculator to help you plan your repayments. Common loans include Home, Car, Education, and Personal loans. always check your CIBIL score first.";
        }
    } else if (lowerMsg.includes('cibil') || lowerMsg.includes('score')) {
        reply = "Your CIBIL score (300-900) tracks your credit history. A score above 750 is considered good for loan exp approvals. You can check it in our 'Features' section.";
    } else if (lowerMsg.includes('invest') || lowerMsg.includes('money') || lowerMsg.includes('save') || lowerMsg.includes('banking') || lowerMsg.includes('account')) {
        if (lowerMsg.includes('neft') || lowerMsg.includes('rtgs') || lowerMsg.includes('imps')) {
            reply = "NEFT, RTGS, and IMPS are modes of transferring money. NEFT is 24/7 (batches), RTGS is for large amounts (>2L, instant), and IMPS is instant (smaller amounts).";
        } else {
            reply = "Banking essentials: 1. Savings Account (earns small interest). 2. Current Account (for business, no interest). 3. Fixed Deposit (higher interest, lock-in). Always maintain minimum balance to avoid penalties.";
        }
    } else if (lowerMsg.includes('emi') || lowerMsg.includes('calculate') || lowerMsg.includes('interest')) {
        reply = "EMI (Equated Monthly Installment) = Principal + Interest. A lower tenure means higher EMI but lower total interest paid. Use our EMI Calculator feature to check your affordable limit.";
    } else {
        reply = "I'm not sure about that yet. You can ask me about Banking, EMI, Loans, Insurance, Scams, Education schemes, or Budgeting!";
    }

    // ... (rest of chat endpoint) ...
    res.json({ reply });
});

// IVR System Endpoint
app.post('/api/ivr', (req, res) => {
    const { phoneNumber, language, currentStep, pressedKey } = req.body;

    // 1. Handle Language Selection (Root Level)
    if (!currentStep || currentStep === 'welcome') {
        // Assume '1'='english', '2'='tamil', '3'='telugu', '4'='malayalam', '5'='hindi'
        // If pressedKey is present, map it to language
        let selectedLang = language;
        if (pressedKey) {
            const langMap = { '1': 'english', '2': 'tamil', '3': 'telugu', '4': 'malayalam', '5': 'hindi' };
            selectedLang = langMap[pressedKey] || 'english'; // Default to english if invalid
        }

        if (!selectedLang && !pressedKey) {
            // Initial call - Play Welcome Message (Multilingual or Default)
            return res.json({
                message: "Welcome to FinSaathi. For English press 1. Tamil press 2. Telugu press 3. Malayalam press 4. Hindi press 5.",
                step: "welcome",
                language: null
            });
        }

        // Language selected, load main menu
        const filePath = path.join(__dirname, 'ivr-handler', `${selectedLang}.json`);
        try {
            const ivrData = require(filePath);
            const nextStepData = ivrData['main_menu'];
            return res.json({
                message: nextStepData.message,
                step: 'main_menu',
                language: selectedLang
            });
        } catch (err) {
            return res.status(500).json({ message: "Language file not found or error loading." });
        }
    }

    // 2. Handle Flow Navigation
    if (language && currentStep) {
        const filePath = path.join(__dirname, 'ivr-handler', `${language}.json`);
        try {
            const ivrData = require(filePath);
            const currentStepData = ivrData[currentStep];

            if (!currentStepData) {
                return res.status(400).json({ message: "Invalid step." });
            }

            const nextStepKey = currentStepData.options ? currentStepData.options[pressedKey] : null;

            if (nextStepKey) {
                const nextStepData = ivrData[nextStepKey];

                // Check if Final Step
                if (nextStepData.is_final) {
                    // 3. Send SMS (Simulation)
                    console.log(`[SMS SIMULATION] To: ${phoneNumber} | Lang: ${language} | Msg: ${nextStepData.sms_body}`);

                    return res.json({
                        message: nextStepData.message,
                        step: nextStepKey,
                        is_final: true
                    });
                } else {
                    return res.json({
                        message: nextStepData.message,
                        step: nextStepKey,
                        language: language
                    });
                }
            } else {
                return res.json({ message: "Invalid input. Please try again.", step: currentStep, language: language }); // Retry
            }

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error processing IVR request." });
        }
    }

    res.status(400).json({ message: "Invalid request." });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
