# CreditSea Project

## Overview
This project is an applicant management system built using React for the frontend and Node.js for the backend. It allows users to apply for positions, and administrators to manage applicants efficiently.

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Installation
1. Download the project folder.
2. Navigate to the project directory in your terminal.
3. Run the following command to build and start the containers:

   ```bash
   docker-compose up --build
This command will:

- Download all dependencies.
- Build the Docker images.
- Run the project.

## Accessing the Application
Once the containers are up and running, you can access the application via your web browser at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:5000](http://localhost:5000)

## Features
- Applicant registration and resume submission.
- Admin dashboard for managing applicants.
- Status updates for applicants (Pending, Accepted, Rejected).
- Resume download functionality.

## Technologies Used
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Containerization:** Docker

## Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request.
