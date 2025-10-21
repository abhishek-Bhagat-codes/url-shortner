# URL Shortener Application

## Setup Instructions

To set up the project, run the following command:

```
npm i
```

This will install all required dependencies listed in the `package.json` file.

---

## Project Overview

This application allows users to:

* Create an account on the website.
* Store their important links.
* Generate short URLs using the built-in URL Shortener.

---

## Folder Structure

```
controllers/
│   ├── url.controller.js        # Handles all URL-related business logic
│   └── user.controller.js       # Handles user-related business logic

middleware/
│   └── auth.js                  # Middleware for user authentication

models/
│   ├── URL.model.js             # Mongoose model for URLs
│   └── user.model.js            # Mongoose model for Users

public/
│   └── globle.css               # CSS styling for views

routers/
│   ├── url.js                   # Routes for URL operations
│   └── user.routes.js           # Routes for user operations (sign up, login, logout)

services/
│   └── auth.js                  # Authentication service

views/
│   ├── index.ejs                # Displays all generated short URLs
│   ├── signUp.ejs               # User registration page
│   └── login.ejs                # User login page

db.js                            # Database connection setup
index.js                         # Application entry point
.env                             # Environment configuration (update by your system)
log.txt                          # General logs
package.json                     # Project configuration
package-lock.json                # Dependency lock file
readme                           # Documentation file
```

---

## Pages Description

1. **index.ejs** – Displays all generated short URLs along with their original URLs.
2. **signUp.ejs** – Provides a simple and user-friendly sign-up form.
3. **login.ejs** – Provides a clean and easy-to-use login form.

---

## Routers

1. **url.js** – Defines routes for URL operations.
2. **user.routes.js** – Handles user-related API routes such as sign-up, login, and logout.

---

## Models

1. **URL.model.js** – Contains the schema for URL storage.
2. **user.model.js** – Contains the schema for user accounts.

---

## Middleware

* **auth.js** – Used to authenticate users before granting access to protected routes.

---

## Controllers

1. **url.controller.js** – Handles all URL business logic.
2. **user.controller.js** – Handles all user business logic.

---

## Summary

This is a simple yet functional URL shortener web application built using **Node.js**, **Express**, and **MongoDB**. It supports user authentication, personalized URL storage, and short link generation.
