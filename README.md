# Simple Checklist App
This project is a Simple Checklist App, developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application consists of backend APIs for managing loan applications and a frontend to interact with the system.

---

## Table of Contents

- [Features](#features)
- [Backend Overview](#backend-overview)
  - [APIs](#apis)
  - [Environment Variables](#environment-variables)
- [Frontend Overview](#frontend-overview)
  - [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

---

## Features

1. **Create Loan Application**: Submit details for a new loan application.
2. **Get All Applications**: Retrieve a list of all loan applications.
3. **Get Application by ID**: Retrieve details of a specific loan application by its ID.

---

## Backend Overview

### APIs

1. **Create New Application**  
   **Endpoint**: `POST /application`  
   **Request Body**:
   ```json
   {
     "solicitorName": "John Doe",
     "solicitorEmail": "johndoe@example.com",
     "loanAmount": 50000,
     "purchasePrice": 100000,
     "isValuationFeePaid": true,
     "isUkResident": true
   }

    **Response**:  
    `201 Created`
    ```json
    {
    "message": "Application Created Successfully"
    }

    **Validation:**

    Loan-to-Value (LTV) should be less than 60%.
    Valuation fee must be paid.
    User must be a UK resident.

2. Get All Applications
    Endpoint: GET /applications

    **Response:**
    `201 Created`

3. Get Application Details
    Endpoint: GET /application/:applicationId

    **Response:**
    `201 OK`

    {
        "applicationId": "abc123",
        "solicitorName": "John Doe",
        ...
    }

Environment Variables
    Create a .env file in the root directory and configure the following:

    DB_USER=<Your MongoDB Username>
    DB_PASSWORD=<Your MongoDB Password>
    DB_CLUSTER=<Your MongoDB Cluster>
    DB_NAME=<Your Database Name>
    PORT=<Your Server Port>

Frontend Overview:
    Technologies Used:
        React.js
        React Hooks (useState, useEffect)
        Icons (react-icons)
        Key Features
        Dynamic Forms: Input fields to create a loan application.
        Application List: View all submitted applications in a table format.
        Application Details: View individual application details by selecting from the list.

Setup and Installation:
    Backend:
        Clone the repository:

        bash
        git clone <repository-url>
        cd backend
        Install dependencies:

        bash
        npm install
        Configure the environment variables in the .env file as shown above.

        Start the server:

        bash
        npx nodemon app.js

    Frontend:
        Navigate to the frontend directory:
            bash
            cd frontend
        Install dependencies:
            bash
            npm install
        Start the React application:
            bash
            npm start


Usage:
    1. Open the application in your browser at http://localhost:<PORT> (default is 3000 for React frontend).
    
    2. Use the interface to:
            Submit new loan applications.
            View the list of all loan applications.
            Check details of specific applications.