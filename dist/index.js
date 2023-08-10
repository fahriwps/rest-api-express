"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
const transactions = []; // For storing transactions data
app.get('/', (req, res) => {
    res.send("This is a simple REST API project using Express.js and TypeScript. Explore using method GET, POST, PUT, PATCH or DELETE.");
});
app.get('/transactions', (req, res) => {
    res.json(transactions);
});
app.get('/transactions/:id', (req, res) => {
    const transactionId = parseInt(req.params.id, 10);
    let foundTransaction = undefined;
    // Loop through the transactions array to find a matching transaction
    for (const transaction of transactions) {
        if (transaction.id === transactionId) {
            foundTransaction = transaction;
            break; // Exit the loop once a match is found
        }
    }
    if (foundTransaction) {
        res.json(foundTransaction);
    }
    else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});
app.post('/transactions', (req, res) => {
    const newTransaction = req.body;
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});
app.put('/transactions/:id', (req, res) => {
    const transactionId = parseInt(req.params.id, 10);
    const updatedTransaction = req.body;
    let transactionUpdated = false;
    // Loop through the transactions array to find and update the matching transaction
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === transactionId) {
            transactions[i] = Object.assign(Object.assign({}, transactions[i]), updatedTransaction);
            transactionUpdated = true;
            // Get the updated transaction directly from the array and send it as a response
            res.json(transactions[i]);
            break; // Exit the loop once the update is done
        }
    }
    if (!transactionUpdated) {
        res.status(404).json({ error: 'Transaction not updated or found' });
    }
});
app.patch('/transactions/:id', (req, res) => {
    const transactionId = parseInt(req.params.id, 10);
    const updatedFields = req.body;
    let transactionUpdated = false;
    // Loop through the transactions array to find and partial update the matching transaction
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === transactionId) {
            transactions[i] = Object.assign(Object.assign({}, transactions[i]), updatedFields);
            transactionUpdated = true;
            // Get the updated transaction directly from the array and send it as a response
            res.json(transactions[i]);
            break; // Exit the loop once the update is done
        }
    }
    if (!transactionUpdated) {
        res.status(404).json({ error: 'Transaction not updated or found' });
    }
});
app.delete('/transactions/:id', (req, res) => {
    const transactionId = parseInt(req.params.id, 10);
    let transactionDeleted = false;
    // Loop through the transactions array to find the matching transaction and delete it
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === transactionId) {
            transactions.splice(i, 1);
            transactionDeleted = true;
            break; // Exit the loop once the deletion is done
        }
    }
    if (!transactionDeleted) {
        res.status(404).json({ error: 'Transaction not deleted or found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
