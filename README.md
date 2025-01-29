# WheelDeal - Driving Innovation, Building Trust

- Live Link: [Live Website](https://wheel-deal-frontend.vercel.app/)

**Objective:** WheelDeal is a comprehensive e-commerce website for cars using React, Redux, Mongoose, Node and Express. This platform will offer features like product listings, detailed product pages, and a role wise dashboard.

## Tech Stack
- Frontend: React, Redux for state management, Typescript
- Backend: Node.js, Express, Mongoose, CORS, and Zod for schema validation and data integrity.
- Database: MongoDB for storing product and user data.
- Image: Cloudinary

## Core Features
#### 1. Homepage
- Header with logo and site name
- Navigation links
- Hero section
- Categories section with clickable images/icons
- Featured products
- Testimonial
- Footer with contact and social media links

#### 2. Products Page

- Product listings with images, names, prices, and details button
- Search bar
- Filters for multiple categories
- Sorting options
- Clear filter button

#### 3. Product Details Page

- Product information (name, price, stock, description, images, category)
- Buy Now button

#### 5. Checkout Page

- User details collection (name, email, phone number, address, city)
- Payment methods: Shurjopay


#### 8. About Us Page
- Company overview, 
- team introduction,
- customer testimonials
- Contact information with basic animations and gradients

### Admin dashboard
- User management
- Order Management
- Product Mananegment

### User Dashboard
- Profile Update
- Track My Order
- Overview


## Table of Contents for using

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:

```bash
   <!-- Frontend clone  -->
   git clone (https://github.com/RittikaDev/WheelDeal-Frontend)
```

 ```bash
   <!-- Backend clone  -->
   git clone (https://github.com/RittikaDev/WheelDeal-Backend)
```
### Configuration
Create a .env.local file in the root directory of the project and add the following enviroment variables:

In Backend
```bash
NODE_ENV=
PORT=
DATABASE_URL=
BCRYPT_SALT_ROUNDS=
DEFAULT_PASS=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=
SP_ENDPOINT=
SP_USERNAME=
SP_PASSWORD=
SP_PREFIX=
SP_RETURN_URL=
```

2. Install dependencies:

### usi npm:

```tsc
npm i
```

### Runnig the Application both

1. To compile and run the TypeScript application in development mode with hot-reloading, use:

```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```

Visit : http://localhost:5173/

