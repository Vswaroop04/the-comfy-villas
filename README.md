
## Overview

Comfy Villas is a user-friendly application for property sales in a growing residential area. This app addresses various marketing challenges and provides a seamless experience for users.

### Technologies Used

- **Frontend:**
  - NextJS
  - RadixUi
  - TypeScript

- **Backend:**
  - Express.js
  - TypeScript
  - PostgreSQL
  - Prisma

## Roles

1. **Managment:**
   - Admins have the authority to manage appointments and property listings.
   - They can view and modify appointments, as well as update property listings.

2. **Guests:**
   - Guests have the ability to book appointments for property viewings.
   - They can explore property listings and schedule appointments.

3. **Residents:**
   - Residents, once registered, can rate and review properties.
   - They contribute to the community by providing feedback on the properties they have experience with.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- PostgreSQL
- pnpm (for frontend, can be installed using `npm install -g pnpm`)

## Frontend Installation

Navigate to the `frontend` directory and run the following commands:
Create a .env file in the frontend directory with the help of .env.example

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Start the application
pnpm run start
```

### Using Docker 

-  Build and run Docker container for production
  
```bash
docker build -t property-app:production -f Dockerfile --target production .
docker run -p 5000:5000 property-app:production
````


-  Build and run Docker container for development
  
```bash
docker build -t property-app:development -f Dockerfile .
docker run -p 5000:5000 -v $(pwd):/app property-app:development
````

## Backend Installation

Navigate to the `backend` directory and run the following commands:
Create a .env file in the backend directory with the help of .env.example

```bash
# Install dependencies
pnpm install

# Run Prisma migrations
pnpm prisma migrate dev

# Seed initial data (if needed)
pnpm prisma db seed

# Build the project
pnpm run build

# Start the application
pnpm run start
```


### Using Docker 

-  Build and run Docker container for production
  
```bash
docker build -t property-app:production -f Dockerfile --target production .
docker run -p 5000:5000 property-app:production
````


-  Build and run Docker container for development
  
```bash
docker build -t property-app:development -f Dockerfile .
docker run -p 5000:5000 -v $(pwd):/app property-app:development
````

<br><br>

<p align="center">
  Made with ❤️ by vishnu
</p>

