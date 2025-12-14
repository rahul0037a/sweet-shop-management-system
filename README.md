The Sweet Shop Management System is a full-stack web application that allows customers to browse sweets, search, filter, and manage cart items. Admin users can manage the inventory, add/update/delete sweets, and control stock.

This project was built according to the TDD Kata requirements, with backend tests, clean commit history, and transparent AI usage.

🎯 Features
🧁 User Features

Register and log in using JWT Authentication

Browse sweets in a clean, modern UI

Search by sweet name

Filter by category

Sort by name or price

Add items to cart (with quantity controls)

Prevent adding more than available stock

View and update cart

Dark/Light themes

🛠 Admin Features

Add new sweets

Edit sweet details

Restock inventory

Delete sweets

Admin-only route protection

Separate admin dashboard

🔐 Authentication

Secure user registration

Password hashing via bcrypt

JWT-based login

Role-based authorization (user / admin)

📦 Backend API (Node.js + Express + TypeScript)

Protected REST API endpoints:

Auth
POST /api/auth/register
POST /api/auth/login

Sweets (Protected)
POST   /api/sweets            (Admin)
GET    /api/sweets
GET    /api/sweets/search     (name/category/price)
PUT    /api/sweets/:id        (Admin)
DELETE /api/sweets/:id        (Admin)

Inventory (Protected)
POST /api/sweets/:id/purchase     (User)
POST /api/sweets/:id/restock      (Admin)

🧪 Test-Driven Development (TDD)

Backend tests were written using Jest + Supertest, following the Red → Green → Refactor flow.

Test coverage includes:

✔ User registration
✔ User login
✔ Token validation
✔ Sweets CRUD
✔ Purchase logic
✔ Admin access restrictions

📸 Test Report

<img width="738" height="461" alt="image" src="https://github.com/user-attachments/assets/b1f771a6-f4fe-463b-800b-4aaddf918cf3" />





🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/rahul0037a/sweet-shop-management-system.git
cd sweet-shop-management-system

🛡️ Backend Setup
Navigate to backend folder
cd backend

Install dependencies
npm install

Create .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend
npm run dev


Backend runs at:
👉 http://localhost:5000

🎨 Frontend Setup
Navigate to frontend folder
cd ../frontend

Install dependencies
npm install

Start frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔑 Test Credentials (For Evaluation)
Admin Account
Email: admin@test.com
Password: 123456

User Account
Email: user@test.com
Password: 123456


You can also promote any user to admin manually in MongoDB:

db.users.updateOne({ email: "xyz@test.com" }, { $set: { role: "admin" } })

📸 Screenshots

<img width="1909" height="856" alt="image" src="https://github.com/user-attachments/assets/28222d17-bdf8-4f0c-8a13-7ec265dffedd" />
<img width="1892" height="852" alt="image" src="https://github.com/user-attachments/assets/5ab090a9-7f6b-42e7-89a1-6f3f41310d3b" />
<img width="1864" height="521" alt="image" src="https://github.com/user-attachments/assets/f378cba8-9368-4cfc-8b71-da36b9a44a5d" />
<img width="1914" height="865" alt="image" src="https://github.com/user-attachments/assets/9770d9d1-3b45-44de-9775-c51a2240796e" />
<img width="1142" height="727" alt="image" src="https://github.com/user-attachments/assets/6b0b0394-8f79-4d70-8e4e-48a5480d6004" />
<img width="934" height="532" alt="image" src="https://github.com/user-attachments/assets/7f758e5d-44a4-4ddd-a56c-faee1e6ddd3e" />


🤖 My AI Usage

This project was built with assistance from ChatGPT and GitHub Copilot to improve efficiency while maintaining complete developer control.

AI Tools Used

ChatGPT – helped generate boilerplate code (controllers, routes, services), write tests, debug issues, and refine UI

GitHub Copilot – assisted with autocomplete and code suggestions during development

How AI Was Used

Generating initial Express controller/service structure

Helping design the React dashboard layout & Tailwind styles

Debugging backend authentication and middleware

Tailwind & UI design improvements

Writing test cases for auth, sweets, and inventory

Generating the final README.md

Reflection

AI significantly improved development speed and reduced boilerplate work.
All AI-generated code was personally reviewed, validated, and modified to fit the project structure and TDD requirements.
Every commit using AI assistance includes:

Co-authored-by: ChatGPT <chatgpt@noreply.github.com>
