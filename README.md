# Assignment Submission Portal

## Description

This project is an **Assignment Submission Portal** where users can register, log in, and submit assignments to admins. Admins can view, accept, or reject assignments.

The project includes:
- **User and Admin registration/login** with **JWT authentication**.
- Role-based access control for **Users** and **Admins**.
- Users can submit assignments, and admins can review, accept, or reject them.

## Technologies Used

- **Node.js** and **Express.js** for server-side logic.
- **MongoDB** for database storage.
- **Mongoose** as an Object Data Modeling (ODM) library for MongoDB.
- **bcrypt** for password hashing.
- **jsonwebtoken (JWT)** for user authentication.
- **express-validator** for input validation.

---

## Setup Instructions

### 1. Clone the Repository

git clone <repository_url>
cd <repository_name>

### 2. Install Dependencies

npm install

### 3. Set Up Environment Variables

Create a .env file in the root of the project with the following values:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### 4. Start the Server

npm start


### **How to Run and Test the API:**

1. Use **Postman** to test the API endpoints.
2. Send requests to register users, log in, and perform operations like submitting assignments or accepting/rejecting assignments (for admins).
3. For protected routes (like uploading assignments and admin operations), include the `Authorization` header with the JWT token received after logging in.

This setup will give you a working **Assignment Submission Portal** with hashed passwords, basic role-based access control, and JWT-based authentication.
