# Evalio Assignment Portal

A role-based assignment management platform built with **Next.js**. Designed for instructors and students, this app enables assignment creation, submission tracking, feedback management, and real-time visualization of submission statuses.

---

## 🗂️ Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [User Roles & Capabilities](#user-roles--capabilities)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)

---

## 🚀 Introduction

**Evalio Assignment Portal** is a web application for managing assignments and submissions between instructors and students. Instructors can create assignments and review student submissions, while students can submit work and track their submission statuses. The system includes a visual dashboard with a pie chart summarizing submission statuses.

---

## ✨ Features

* 🔐 User authentication via **NextAuth**
* 👥 Role-based access control (Instructor & Student)
* 📝 Assignment creation and listing
* 📬 Student submissions with URL and notes
* 💬 Instructor feedback and status updates
* 📊 Dynamic pie chart showing submission stats (Pending, Accepted, Rejected)
* 🎨 Styled with Tailwind CSS and Radix UI components

---

## 👤 User Roles & Capabilities

### Instructor

* Create assignments (title, description, deadline)
* View all student submissions
* Provide feedback
* Update assignment status (Accepted, Rejected, Pending)
* View submission statistics via pie chart

### Student

* View available assignments
* Submit assignment (URL and optional note)
* Track submitted assignments with feedback and status

---

## 🧰 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) `v15.4.5`
* **Database ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Frontend:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
* **Charts:** [Recharts](https://recharts.org/)
* **UI Components:** [Radix UI](https://www.radix-ui.com/)

---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sharifuzzaman16/Evalio
   cd assignment-portal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the root directory and include:

   ```env
   DATABASE_URL="your_postgres_or_mysql_connection_url"
   NEXTAUTH_SECRET="your_random_string"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   ```

---

## 🧪 Usage

* Visit `https://evalio-silk.vercel.app/`
* Register as either a student or instructor
* Navigate based on role:

  * Instructor: Create assignments, review submissions
  * Student: View assignments, submit work

---

## ⚙️ Configuration

Key configurations include:

* **Prisma schema:** Defined in `prisma/schema.prisma`
* **Authentication:** Configured in `pages/api/auth/[...nextauth].ts`
* **Role management:** Implemented via user roles stored in the database
* **Route protection:** Guarded using role-based middleware

---

## 🧾 Examples

* **Instructor Dashboard** – Create assignments and view a pie chart of submission statuses.
* **Student Portal** – Submit a link and message for an assignment and view feedback.

---

## 🛠️ Troubleshooting

* If `prisma generate` fails, check the `DATABASE_URL` in `.env`.
* Ensure `NEXTAUTH_SECRET` is a secure random string.
* Restart the server after updating any `.env` variables.
* Use `npm run lint` to catch linting issues.

---

## 👥 Contributors

* [Sharifuzzaman](https://github.com/sharifuzzaman16) – Creator & Maintainer
