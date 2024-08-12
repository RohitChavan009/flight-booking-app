# Fly Your Way ✈️

Welcome to the Flight Ticket Booking project! This repository contains both the client and server components of the application. Follow the instructions below to set up and run the project locally.

## Prerequisites

- **Node.js** (version 18.x or higher)
- **PostgreSQL** (installed and running)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flight-ticket-booking.git

cd flight-ticket-booking
```

### 2. Configure Environment Variables

#### Client

##### 1. Navigate to the client directory :

```bash
cd client
```

##### 2. Create a .env file and add the following line :

```bash
NEXT_PUBLIC_BASE_URL="http://<your_ip_address>:5000"
```

##### Replace `<your_ip_address>` with the IP address of your local server, which you can find by running the ipconfig command in your terminal.

### Server

##### 1. Navigate to the server directory :

```bash
cd server
```

##### 2. Create a .env file and add the following line :

```bash
PORT=5000

# PostgreSQL Server
DB_NAME=<your_db_name>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# JWT
JWT_SECRET=backend-secret
JWT_ACCESS_TOKEN_TTL=9999d
JWT_REFRESH_TOKEN_TTL=7d
```

##### Replace `<your_db_name>`, `<your_db_user>`, and `<your_db_password>` with your PostgreSQL database credentials.

### 3. Install Dependencies

##### 1. In the client directory:

```bash
cd client

npm install
```

##### 2. In the server directory:

```bash
cd server

npm install
```

### 4. Start the Application

##### 1. Start the client :

```bash
cd client

npm run dev
```

##### 2. Start the server :

```bash
cd server

npm run dev
```

## Authors

- [@rohit-chavan](https://github.com/roHIT-MAN-45)
