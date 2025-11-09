# Water Quality Monitoring – User Portal (Frontend)

This repository contains the frontend of the **Citizen Science Water Quality Monitoring Platform**, a web-based portal that allows citizens to submit water quality observations, view dashboards, track rankings, and earn rewards for participation.

The system empowers local communities to contribute to environmental data collection, complementing official water monitoring programs. The frontend interacts with microservices that handle crowdsourced data, rewards, and dashboard visualizations.

---

## Project Overview

This frontend application serves as the **user portal** for the Citizen Science Water Quality Monitoring Platform.

The user portal enables:
- Citizens to log in via **Keycloak** authentication.
- Submission of water quality readings and observations.
- Visualization of their past submissions and earned badges.
- Viewing of community rankings and user profiles.

The frontend communicates with three backend microservices through a unified API gateway:

1. **Crowdsourced Data Service** – handles submission and validation of water quality data.
2. **Rewards Service** – manages points and badges for users.
3. **Dashboard Service** – aggregates and visualizes user and water quality data.

---

## Features

- Secure authentication and session management with **Keycloak**
- User dashboard showing:
  - Previous submissions
  - Points and badge achievements
- Form-based submission of new water quality reviews
- Real-time leaderboard of community members
- Dynamic profile page with logout functionality
- Responsive layout using **Tailwind CSS**
- Data fetching and caching with **React Query**
- Error and success feedback via **React Hot Toast**

---

## Tech Stack

**Core Libraries:**
- React (Vite)
- React Router DOM
- React Query (TanStack)
- Tailwind CSS
- Axios

**Authentication:**
- Keycloak JS Adapter

**UI & Utilities:**
- React Icons / Lucide Icons
- React Hot Toast

**State Management:**
- React Context API (Auth and User Contexts)
- React Query for server state management

---

## Data Flow

1. **Authentication:**
   - User logs in via Keycloak.
   - `AuthProvider` stores the token and user info.
   - The app retrieves the authenticated user’s ID.

2. **User Data:**
   - `UserProvider` fetches extended user details from the backend using the Keycloak `userId`.

3. **Data Fetching:**
   - All data (dashboard stats, rankings, submissions) is fetched via React Query using the user’s token.

4. **UI Rendering:**
   - Components consume data using `useAuth()`, `useUser()`, and `useQuery()` hooks.
   - Conditional rendering is used for loading and error states.
