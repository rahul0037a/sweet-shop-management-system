🍬 Sweet Shop Management System

A full-stack TDD-based inventory & purchase system built with Node.js, Express, MongoDB, React, and TypeScript.

📌 Overview

The Sweet Shop Management System is a full-stack web application that allows normal users to browse sweets, filter & search them, manage cart items, and purchase sweets from inventory.
Admins can additionally add, edit, delete, and restock sweets.

This project is built following Test-Driven Development (TDD) practices, with a clean commit history and test coverage for backend logic.

🚀 Features
🧁 User Features

Register & Login (JWT Authentication)

Browse sweets with search, category filters, and sorting

Add sweets to cart (with quantity management)

Prevents adding more items than available stock

View cart & proceed to purchase

Light/Dark UI Theme (Improved UX)

🛠️ Admin Features

Add new sweets

Update sweet details

Delete sweets

Restock inventory

Access to admin-only APIs

🔐 Authentication

Password hashing via bcrypt

Auth token generation via JWT

Admin vs User role-based authorization

📦 Backend API

REST API built with Node.js + Express + MongoDB.

Includes secure endpoints for:

Auth

Sweets CRUD

Inventory updates

Search functionality

🎨 Frontend

Built with:

React + TypeScript

TailwindCSS

Context API (Auth + Cart)

Clean UI with modern components

🧪 Test-Driven Development (TDD)

This project follows the Red → Green → Refactor TDD workflow.

✔ Backend tests include:

Authentication

Sweets CRUD

Purchase logic

Admin-only permissions

Error handling

Test runner: Jest + Supertest

🛠️ Tech Stack
Frontend

React + TypeScript

Vite

TailwindCSS

Context API (State Management)

Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

Jest (Testing)

JWT Authentication

Bcrypt

📦 Installation & Setup
🖥️ 1. Clone the Repository
git clone https://github.com/YOUR_USER/YOUR_REPO.git
cd YOUR_REPO

🛡️ Backend Setup
Install dependencies
cd backend
npm install

Create .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run backend
npm run dev

Run tests
npm test


Backend runs on:
👉 http://localhost:5000

🎨 Frontend Setup
Install dependencies
cd frontend
npm install

Run frontend
npm run dev


Frontend runs on:
👉 http://localhost:5173



Default Admin for Testing ):
Email: admin@test.com
Password: 123456



🤖 My AI Usage 

This project was built with responsible and transparent use of AI tools.

AI Tools Used

ChatGPT

GitHub Copilot

How AI Helped

Generating boilerplate Express controllers and services

Assisting with React component structure and Tailwind styling

Writing test cases for TDD

Debugging authentication issues

Improving UI and UX

Helping document the project professionally

My Reflection

Using AI allowed me to:

Work faster without sacrificing quality

Learn better approaches to structuring APIs & state management

Focus more on logic while offloading boilerplate

Still keep full control over architecture and decision-making

I ensured that:

All AI-generated code was fully reviewed

Security-sensitive logic (auth, roles, tokens) was manually validated

All commits involving AI include a Co-authored-by: AI Tool AI@noreply.github.com
 line
