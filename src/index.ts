import express, { Express, Request, Response } from 'express';
import { ITransaction } from './interfaces/interfaces'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

const transactions: ITransaction[] = []; // For storing transactions data

app.get('/', (req: Request, res: Response): void => {
    res.send("This is a simple REST API project using Express.js and TypeScript. Explore using method GET, POST, PUT, PATCH or DELETE.");
});

app.get('/transactions', (req: Request, res: Response): void => {
    res.json(transactions);
});

app.get('/transactions/:id', (req: Request, res: Response): void => {
    const transactionId: number = parseInt(req.params.id, 10);
    let foundTransaction: ITransaction | undefined = undefined;
    // Loop through the transactions array to find a matching transaction
    for (const transaction of transactions) {
        if (transaction.id === transactionId) {
            foundTransaction = transaction;
            break; // Exit the loop once a match is found
        }
    }
    if (foundTransaction) {
        res.json(foundTransaction);
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

app.post('/transactions', (req: Request, res: Response): void => {
    const newTransaction: ITransaction = req.body;
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

app.put('/transactions/:id', (req: Request, res: Response): void => {
    const transactionId: number = parseInt(req.params.id, 10);
    const updatedTransaction: ITransaction = req.body;
    let transactionUpdated: boolean = false;
    // Loop through the transactions array to find and update the matching transaction
    for (let i: number = 0; i < transactions.length; i++) {
        if (transactions[i].id === transactionId) {
            transactions[i] = { ...transactions[i], ...updatedTransaction };
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

app.patch('/transactions/:id', (req: Request, res: Response): void => {
    const transactionId: number = parseInt(req.params.id, 10);
    const updatedFields: Partial<ITransaction> = req.body;
    let transactionUpdated: boolean = false;
    // Loop through the transactions array to find and partial update the matching transaction
    for (let i: number = 0; i < transactions.length; i++) {
        if (transactions[i].id === transactionId) {
            transactions[i] = {...transactions[i],...updatedFields };
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

app.delete('/transactions/:id', (req: Request, res: Response): void => {
    const transactionId: number = parseInt(req.params.id, 10);
    let transactionDeleted: boolean = false;

    // Loop through the transactions array to find the matching transaction and delete it
    for (let i: number = 0; i < transactions.length; i++) {
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

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
});
