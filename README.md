# SwiftBus-Online-Bus-Booking-System

🚍 SwiftBus – Online Bus Booking System

SwiftBus is a full-stack bus booking system built with Spring Boot, Spring JPA, Hibernate, MySQL (backend) and React.js, Bootstrap, Axios (frontend). The system provides a seamless way for users to search, book, and manage bus tickets online while enabling administrators to manage buses, companies, and bookings efficiently.

✨ Features
👤 User Features

User registration & login

Browse available buses (AC, Non-AC, Sleeper, etc.)

Search buses by route, date, and company

Book bus tickets with seat selection

Online payment via Razorpay integration

View booking history & download invoice in PDF

🛠️ Admin Features

Admin login & dashboard

Manage bus details (Add, Update, Delete) with images

Manage bus companies & routes

View all users and their bookings

Download and manage invoices

🏗️ Tech Stack
🔹 Backend

Spring Boot (REST APIs)

Spring JPA + Hibernate

MySQL (Database)

🔹 Frontend

React.js

Bootstrap (UI Styling)

Axios (API calls)

🔹 Other Integrations

Razorpay (Online Payments)

PDF Invoice Generation

📂 Project Structure
swiftbus/
│── backend/     # Spring Boot application (APIs, Entities, Services, Repositories)
│── frontend/    # React.js application (Pages, Components, Services)

🚀 Getting Started
🔹 Backend Setup

Clone the repository

Import backend into your IDE (Eclipse/IntelliJ)

Configure MySQL database (username: root, password: root)

Run the Spring Boot application

🔹 Frontend Setup

Navigate to frontend folder

Install dependencies:

npm install


Start development server:

npm start
