# InventoryTracker

InventoryTracker is a simple web application designed to manage product inventory. It provides a user-friendly interface for adding, updating, deleting, and viewing products. The project is built using Node.js, Express.js, MongoDB, and Mongoose for the backend, and it incorporates basic authentication for secure operations. Additionally, a frontend application is integrated to visualize products and enable easy interaction with the inventory.

## Features

- **Products API**: Utilizes Node.js, MongoDB, Express.js, and Mongoose to create a robust backend API for managing products.
- **Product Fields**: Includes essential product attributes such as Product ID, Name, Price, Featured status, Rating, Created At timestamp, and Company.
- **Schema Validations**: Implements proper schema validations to ensure data integrity and consistency.
- **CRUD Operations**: Supports all CRUD operations (Create, Read, Update, Delete) for efficient product management.
- **Authentication**: Incorporates authentication mechanisms to restrict CRUD operations only to authenticated users.
- **Frontend Integration**: Provides a frontend application to display products, add new products via a basic form, and perform user authentication.
- **Input Validations**: Enforces input validations on the frontend, such as required fields and input type constraints, ensuring data accuracy.
- **Additional Functionality**: Includes endpoints to fetch featured products, products below a certain price threshold, and products with ratings exceeding a specified value.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/AryanDeswal/InventoryTracker.git`
2. Navigate to the project directory: `cd InventoryTracker`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## API Endpoints

- **POST** `/api/products` - Add a new product
- **GET** `/api/products` - Get all products
- **PUT** `/api/products/:productId` - Update a product
- **DELETE** `/api/products/:productId` - Delete a product
- **GET** `/api/products/featured` - Fetch featured products
- **GET** `/api/products/price/:maxPrice` - Fetch products with price less than a certain value
- **GET** `/api/products/rating/:minRating` - Fetch products with ratings higher than a certain value

## Frontend Pages

- **Home Page**: Displays all products and includes a form to add new products.
- **Login Page**: Basic login page for user authentication.
- **Signup Page**: Basic signup page for user registration.
