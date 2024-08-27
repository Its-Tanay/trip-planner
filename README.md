# TRVL Trip Planner (Version 1.0)

## Table of Contents

1. [High Level Architecture](#high-level-architecture)
2. [Why These Choices?](#why-these-choices)
3. [Database Schema](#database-schema)
4. [Understanding the Algorithm](#understanding-the-algorithm)
5. [Challenges Faced](#challenges-faced)
6. [Nuances in Implementation](#nuances-in-implementation)
7. [Future Scope](#future-scope)

## High Level Architecture

The application follows a client-server architecture:

### 1. Frontend

**Tech Stack Used:**
- ReactJS
- Tailwind CSS
- TypeScript
- Shadcn UI (UI Components)

**Key Features:**
- The frontend is a SPA (Single Page Application) that provides a responsive interface for devices ranging from mobile phones to desktops.
- React Router is used for client-side routing, allowing navigation across views without reloading the page.
- State management is handled using React’s context API for client-side actions and Tanstack query for server state management.
- The frontend interacts with the backend via HTTP requests using a custom API client that manages interception for authorized endpoints and other errors.
- JWT tokens from the backend are securely stored in `localStorage`.

### 2. Backend

**Tech Stack Used:**
- Flask
- SQLAlchemy ORM for database operations
- Flask-JWT-Extended for Authentication
- Python

**Key Features:**
- The backend is a RESTful API built using Flask, handling the itinerary generation logic.
- The backend is organized into modules like API, database, and utils to maintain separation of concerns.
- JWT token-based authentication is set up, where the client receives a JWT token and sends it subsequently as a header on protected routes for authorization.
- Custom error handlers are implemented to manage exceptions and return error messages.

### 3. Database

**Tech Stack Used:**
- PostgreSQL

**Key Features:**
- The application uses a relational database like PostgreSQL to persist data, including user data, itineraries, activities, and other entities.
- The schema for the database is defined using SQLAlchemy models, which map Python classes to database tables.

## Why These Choices?

### 1. Why SQL over NoSQL?

- The project’s data is relational, with entities having many-to-many or one-to-many relations.
- Consistency in the data is crucial for the application’s core algorithm.
- The development experience offered by SQL frameworks like Flask ORM outweighs the benefits of using NoSQL.

### 2. Why PostgreSQL over other SQL options?

- PostgreSQL allows schema changes inside transactions, simplifying workflow.
- PostgreSQL is open-source, making it easier to find a hosting service, and its error messages are more descriptive.

### 3. Why Flask as the framework?

- Flask is an unopinionated and flexible framework, making it ideal for smaller applications where extensive features like Django’s admin and migrations are unnecessary.

### 4. Why not go the AI/ML route?

- Large-scale models like OpenAI’s ChatGPT already have vast data; a structured algorithm on strongly modeled data is more efficient for this project.
- Training a model natively is neither processing- nor cost-efficient, so a structured algorithm on available data was preferred.

### 5. Why ReactJS over other frontend libraries/frameworks?

- ReactJS offers a defined flow of data (Top to Bottom), making it easier to visualize data flow.
- It has a large community for support.

## Database Schema

![Database Schema](https://github.com/user-attachments/assets/7f83be88-897a-4464-ac8d-48c3d2275c8c)

## Understanding the Algorithm

![Algorithm](https://github.com/user-attachments/assets/334a89b5-a9da-44bd-9a86-343965e84b96)

## Challenges Faced

1. **Sorting Activities and Food Choices:**
   - A rating system was implemented to balance popular city choices with user preferences.

2. **Database Schema Decisions:**
   - The open-ended problem statement made it challenging to finalize the database schema, focusing on crucial personalization choices like budget.

3. **Deployment Issues:**
   - The deployment failed multiple times due to missing documentation on using `gunicorn` for WSGI applications.

4. **Data Collection:**
   - Data collection involved extensive research and was manually gathered from various internet sources.

## Nuances in Implementation

1. **Catering to Accessibility Needs:**
   - The application includes data on whether activities or food options are accessible, with the algorithm filtering accordingly.

2. **Extensible Categories:**
   - Separate tables for categories and cuisines were created, enhancing scalability over using ENUMs.

3. **Factory Pattern Utility (`factory.py`):**
   - The app factory pattern in the backend returns an instance of the application, allowing tweaks based on different situations.

4. **Saving Itinerary Collections:**
   - Past itineraries are saved in the database and made available for revisiting.

## Future Scope

1. **Server-Driven UI:**
   - Geographical locations could have their interpretations of categories, making a server-driven UI crucial.

2. **Admin Portal:**
   - A structured admin portal would simplify data entry for this application.

3. **Geocoding:**
   - Geographical parameters could be included to enable shortest path sorting between events and assist in navigation.

4. **Reliable Data Pipelines:**
   - Reliable pipelines are needed to model data like food options and geographical parameters into the database.

## Links

- [GitHub Repository](https://github.com/Its-Tanay/rainy-day)
- [Deployed Application](https://trvl-itinerary.vercel.app/)