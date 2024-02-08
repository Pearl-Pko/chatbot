const crypto = require('crypto');
const express = require('express');
const app = express();
const router = express.Router();

// Middleware to validate signature
function validateSignature(payload, signature) {
    // Use the App Secret to hash the payload
    const hmac = crypto.createHmac('sha256', process.env.APP_SECRET); // Assuming APP_SECRET is defined in environment variables
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    // Check if the signature matches
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'));
}

// Middleware to ensure that the incoming requests to our webhook are valid and signed with the correct signature
function signatureRequired(req, res, next) {
    const signature = req.headers['x-hub-signature-256'] ? req.headers['x-hub-signature-256'].slice(7) : ''; // Removing 'sha256='
    if (!validateSignature(req.body, signature)) {
        console.log("Signature verification failed!");
        return res.status(403).json({ status: 'error', message: 'Invalid signature' });
    }
    next();
}
