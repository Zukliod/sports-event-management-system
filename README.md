# Project Title: Sport Event Management System (SEMS)

## Description
The Sport Event Management System (SEMS) is a comprehensive, sport-agnostic platform engineered to manage, track, and stream athletic tournaments. It addresses the challenge of handling varied, sport-specific scoring matrices and dynamic real-time game telemetry by providing a unified containerized architecture. The system provides immediate, low-latency live score casting backed by an in-memory caching layer, alongside robust access controls to ensure authoritative data integrity during collegiate or corporate sporting events.

## Table of Contents
1. Prerequisites
2. Installation
3. Usage
4. Contributing
5. License
6. Project Work Breakdown Structure and Milestones

## Prerequisites
Operational execution requires the installation of the following runtime environments and third-party infrastructure configurations:
- Node.js Runtime Environment (Version 20.0.0 or higher)
- PostgreSQL Relational Database Management System (Version 18.0)
- Docker Engine / Docker Desktop (Optional; required for multi-container deployment models)
- Cloudinary Developer Account Credentials (For cloud-based multipart media storage)

## Installation

### Subsystem Deployment: Frontend Application
Navigate from the project root directory to the frontend directory structure:
cd frontend

Execute the package manager to install required client-side dependencies:
npm install

Generate the local environment configuration file from the distributed template:
cp .env.example .env

Open the .env file and ensure the VITE_API_URL directs traffic to the correct backend network port:
VITE_API_URL=http://localhost:3000

### Subsystem Deployment: Backend Application
Navigate to the backend directory structure and provision the local environment variables:
cd ../backend
cp .env.example .env

Populate the generated .env file with active relational database credentials, cache locations, and Cloudinary storage access keys.

Provision the server-side runtime binaries and module libraries:
npm install

Synchronize the PostgreSQL relational database with the current Object-Relational Mapping (ORM) schema layout and execute the automated transactional database seed scripts:
npx prisma db push
npx prisma db seed

### Containerized Orchestration Model (Alternative Deployment)
For execution inside an isolated virtualized container architecture:
1. Initialize the root workspace within Visual Studio Code.
2. Verify the installation of the Microsoft Dev Containers extension.
3. Access the Command Palette (Control + Shift + P / Command + Shift + P) and execute: "Dev Containers: Reopen in Container".
4. The orchestration layer will automatically provision PostgreSQL 18 and Redis services within isolated network namespaces.

## Usage

### Launching the Frontend Client
From the frontend directory, initiate the development compiler server instance:
npm run dev
The application runs natively at: http://localhost:5173

### Launching the Backend Server
From the backend directory, initialize the TypeScript compilation watcher and start the API server:
npm run dev
The backend server instance will listen for traffic on: http://localhost:3000

### Interface Integration Reference
For detailed request specifications, data schemas, transport protocols, and endpoint definitions, reference the subsystem interface document:
[Subsystem Interface Specification Sheet](./backend/API_DOCUMENTATION.md)

## Contributing
All development team members must adhere to the following integration pipeline workflows:
1. Feature isolation: Branch out from the development head using descriptive naming conventions (e.g., feature/route-name).
2. Code compilation verification: Ensure that the TypeScript compiler passes with zero active diagnostic errors prior to staging changes.
3. Strict ECMAScript Module (ESM) constraints: All code statements must append explicit .js file extension specifiers on absolute or relative module imports.
4. Review process: Submit a structured Pull Request outlining all modified modules and wait for repository owner validation before merging code packages.

## License
This software system is published under the MIT License. Reference the local project license files for extensive permission and limitation clauses.

## Project Work Breakdown Structure and Milestones

### Phase 1 Architectural Engineering (Completed: Harshit / Zukliod)
- Established structural workspace scaffolding and container orchestration topologies.
- Engineered relational database data schemas, integrity constraints, and idempotent upsert data seeds.
- Implemented modular Redis client configuration featuring robust network fault-tolerance and exponential backoff strategies.
- Integrated Cloudinary cloud storage programmatic wrapper clients.
- Authored and validated live scoreboard controller logic and associated Express router endpoints.

### Phase 2 Feature Engineering (Assigned: Development Partner)
- Construction of multipart form-data file controllers for media processing (avatars and banners).
- Engineering of transactional event registration routes with validation guards for maximum participant constraints.
- Realization of user profile resource routers and cryptographic JSON Web Token signing pipelines.
