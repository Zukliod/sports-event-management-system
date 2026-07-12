# Architecture Blueprint: Sports Event Management System (SEMS)

## 1. System Overview
SEMS is a specialized, web-centric platform designed to manage the full lifecycle of college-level sports tournaments[cite: 1]. The architecture is designed to handle high concurrency, multi-tenant style event isolation via dynamic role provisioning, and near-instantaneous live score distribution.

## 2. Technology Stack
*   **Frontend:** React (Vite), Tailwind CSS, TanStack Query, Axios, Socket.io-client.
*   **Backend:** Node.js, Express.js (TypeScript), Prisma ORM.
*   **Databases:** PostgreSQL (Relational transactional data), Redis (Live score caching).
*   **Real-time Layer:** Socket.IO (WebSockets).

## 3. High-Level System Architecture

┌────────────────────────────────────────────────────────┐
│                   Client Layer (React)                 │
│   ┌───────────────────┐        ┌───────────────────┐   │
│   │  Public Portal    │        │  Admin Dashboard  │   │
│   └─────────┬─────────┘        └─────────┬─────────┘   │
└─────────────┼────────────────────────────┼─────────────┘
              │ HTTPS (REST)               │ WebSockets (Socket.IO)
              ▼                            ▼
┌────────────────────────────────────────────────────────┐
│               Application Layer (Express)              │
│   ┌────────────────────────────────────────────────┐   │
│   │           verifyEventRole Middleware           │   │
│   └───────────────────────┬────────────────────────┘   │
│                           │ Controllers                │
└───────────────────────────┼────────────────────────────┘
                            │
    ┌───────────────────────┴───────────────────────┐
    ▼ (Prisma ORM)                                  ▼ (Redis Client)
    ┌───────────┐                                   ┌───────────┐
    │Persistent │                                   │ Ephemeral │
    │Store      │                                   │ Live Cache│
    │(Postgres) │                                   │  (Redis)  │
    └───────────┘                                   └───────────┘
    ## 4. Core Design Patterns & Guardrails

### 4.1. Dynamic "Role-Per-Event" RBAC (FR-2.1 / FR-2.2)
*   **Concept:** A single user can be an `Event Admin` for one event while acting as a regular `Participant` in another. 
*   **Implementation:** All event-specific endpoints must intercept the HTTP Request Header `x-event-id`. The `verifyEventRole` middleware intercepts the transaction, cross-references the `role_assignments` table, and passes or blocks the request.

### 4.2. Sport-Agnostic Scoring Schema (FR-4.1)
*   To support multiple disparate sports, the `Sport` model contains a `scoring_model` field stored as a `Json` schema.
*   The system uses this JSON schema to dynamically render frontend forms and validate operational balance structures incoming from the field coordinators.

## 5. Directory Structure
AI Agents must preserve the following workspace layout:

~~~text
├── .devcontainer/         # Dev container / GitHub Codespaces config
├── backend/
│   ├── prisma/            # Schema definition and database migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/        # Redis, Prisma, and database initializers
│   │   ├── middleware/    # Authentication and role guards
│   │   ├── controllers/   # Request orchestration handlers
│   │   ├── routes/        # Main express routing configurations
│   │   └── server.ts      # App setup & Socket.IO bindings
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/    # Reusable structural dynamic UI blocks
    │   ├── hooks/         # TanStack Query logic hooks
    │   ├── pages/         # Dashboard, Public layouts
    │   └── App.jsx
    └── package.json
~~~
