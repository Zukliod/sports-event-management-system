# SEMS Backend API Integration Guide for Frontend Developers 

Welcome Frontend Team! This document outlines how to connect the client-side application (Vite / React / Vue) to our backend server and interact with the live endpoints.

***

##  Base Server URL

When running locally, the backend server exposes its endpoints at:
`http://localhost:3000`

Ensure your frontend environment file (`frontend/.env`) has the API variable pointed here:
`VITE_API_URL=http://localhost:3000`

***

##  Authentication & Global Headers

All protected routes require authorization headers. When a user logs in, store their token and append it to every subsequent Axios or Fetch request:

Headers:
{
"Content-Type": "application/json",
"Authorization": "Bearer \<YOUR\_JWT\_ACCESS\_TOKEN>"
}

***

## Active API Endpoints

### 1. Authentication & Roles

- **POST** `/api/auth/register` - Create a new user account.
- **POST** `/api/auth/login` - Authenticate user and receive a JWT token.

### 2. Live Match Scoreboards (Real-Time Caching System)

This route updates the live scores instantly across the platform. It is secured behind role-based access control.

- **URL:** `/api/scores/live/:eventId/:matchId`
- **Method:** `PUT`
- **Headers Required:** `Authorization: Bearer <token>`
- **Permissions:** Only users with `SUPER_ADMIN`, `EVENT_ADMIN`, or `SPORT_COORDINATOR` status linked to the specific event ID can make requests here.

#### Request Body Structure (JSON):

Depending on the sport type of the match, the backend accepts the following payload patterns:

**For Football Matches:**
{
"sport": "FOOTBALL",
"scoreData": {
"isFinished": false,
"goals": 2,
"yellowCards: 3,
"redCards": 0,
"updatedAt": "2026-07-13T00:00:00.000Z"
}
}

**For Cricket Matches:**
{
"sport": "CRICKET",
"scoreData": {
"isFinished": false,
"runs": 142,
"wickets": 3,
"overs": 14.5,
"target": 180,
"updatedAt": "2026-07-13T00:00:00.000Z"
}
}

#### Expected Server Responses:

- **Success (200 OK):**
  {
  "success": true,
  "message": "Live score updated in cache successfully",
  "data": { ... }
  }
- **Unauthorized (401 / 403 Error):**
  {
  "success": false,
  "message": "Access denied. Insufficient permissions for this event."
  }

***

## Upcoming Endpoints (In Development)

The following endpoint routers are currently being built and will be exposed shortly:

- `/api/uploads/media` -> Multipart form data upload for banners and avatars (Cloudinary).
- `/api/events/:eventId/register` -> Event signups and roster capacity checks.

