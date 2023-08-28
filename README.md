## Description

This project implements a simple REST API for managing transactions using Express JS and Typescript.

## Usage

1. Clone the repository.
2. Navigate to the project directory and install required packages by running `npm install`.
3. Start the server with `nodemon -q dist/index.js`.

## API Endpoints

- **GET** `/transactions` - Get all transactions.
- **GET** `/transactions/:id` - Get a specific transaction by ID.
- **POST** `/transactions` - Create a new transaction.
- **PUT** `/transactions/:id` - Update an existing transaction by ID.
- **PATCH** `/transactions/:id` - Partially update an existing transaction by ID.
- **DELETE** `/transactions/:id` - Delete a transaction by ID.

To use each request command, please use JSON format. Example:

```bash
{
  "id": 1,
  "from": "x",
  "recipients": "y",
  "amount": 5000,
  "description": "test description"
}
```

## Testing the API

You can use a REST client tool (Postman, SoapUI or Katalon) or a browser to test the API endpoints.