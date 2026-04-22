# Agentic SDLC Demo

A demo project for testing the Agentic Software Development Life Cycle (SDLC) workflow. This is a simple task management application built with Next.js, TypeScript, and Jest to demonstrate AI-assisted development practices.

## Overview

This project, **TaskPulse**, is a minimal task management system that showcases:

- RESTful API endpoints
- Service layer architecture
- Unit testing with Jest
- TypeScript type safety
- Next.js App Router

## Project Structure

```
agentic-sdlc-demo/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── api/               # API routes
│       ├── health/        # Health check endpoint
│       │   └── route.ts
│       └── tasks/         # Task management endpoints
│           └── route.ts
├── lib/                   # Business logic layer
│   ├── healthService.ts   # Health monitoring service
│   └── taskService.ts     # Task management service
├── tests/                 # Test suite
│   ├── health.test.ts     # Health service tests
│   └── task.test.ts       # Task service tests
├── jest.config.js         # Jest configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Features

### API Endpoints

- **GET /api/health** - Health check endpoint that returns system status and task statistics
- **GET /api/tasks** - Retrieve all tasks
- **POST /api/tasks** - Create a new task (requires `title` in request body)
- **PATCH /api/tasks** - Complete a task (requires `id` in request body)

### Services

- **taskService** - Manages in-memory task storage with CRUD operations
- **healthService** - Monitors application health and provides metrics

## Available Commands

### Development

```bash
npm run dev
```

Starts the development server on `http://localhost:3000`. The application will reload automatically when you make changes.

### Build

```bash
npm run build
```

Creates an optimized production build of the application.

### Start Production Server

```bash
npm start
```

Runs the built application in production mode. Make sure to run `npm run build` first.

### Run Tests

```bash
npm test
```

Executes the Jest test suite for all services and components.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Test the API:**

   ```bash
   # Health check
   curl http://localhost:3000/api/health

   # Get all tasks
   curl http://localhost:3000/api/tasks

   # Create a task
   curl -X POST http://localhost:3000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"My first task"}'

   # Complete a task
   curl -X PATCH http://localhost:3000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"id":"task-id-here"}'
   ```

## Technology Stack

- **Framework:** Next.js 15.5
- **Language:** TypeScript 5.4
- **Testing:** Jest 29.7
- **Runtime:** Node.js 20+
- **UI Library:** React 18.3

## Purpose

This project serves as a demonstration environment for testing and validating Agentic SDLC workflows, including:

- AI-assisted code generation
- Automated testing practices
- API development patterns
- Service layer architecture
- TypeScript best practices
