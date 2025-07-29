# Arkline Backend

A microservices-based backend system for NOAH Business Applications, providing accomplishment tracking and AI-powered chatbot services for intern management.

## Architecture

The system consists of two main microservices:

- **Accomplishment Tracker Service** (Node.js/Express) - Handles time logging and accomplishment tracking
- **Chatbot Service** (Python/FastAPI) - Provides AI-powered urgency classification and document Q&A

## Services Overview

### Accomplishment Tracker Service
- **Technology**: Node.js, Express, MongoDB, Redis
- **Features**:
    - Time in/out tracking with lunch break support
    - Accomplishment form submission and management
    - JWT-based authentication and authorization
    - Role-based access control (admin/employee)

### Chatbot Service
- **Technology**: Python, FastAPI, LangChain, Groq AI
- **Features**:
    - Email urgency classification (High/Medium/Low)
    - Document-based Q&A using RAG (Retrieval-Augmented Generation)
    - PDF processing with vector embeddings

## Infrastructure

### Database
- **MongoDB**: Primary data storage for accomplishments and time logs
- **Redis**: Caching layer for active time log sessions

### Monitoring
- **Mongo Express**: MongoDB web interface (Port 8081)
- **Redis Insight**: Redis monitoring tool (Port 5540)

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Environment variables configured

### Environment Setup
Create `.env` files in respective service directories with:

```env
# MongoDB
MONGO_USERNAME=admin
MONGO_PASSWORD=password
MONGO_HOST=mongodb-arkline
MONGO_PORT=27017
MONGO_DATABASE=accomplishment_tracker

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=password

# JWT
SECRET_KEY=your_secret_key
ENCRYPTION_ALGORITHM=HS256

# AI Services
GROQ_API_KEY=your_groq_api_key
```

### Running the Services

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f
```

## API Endpoints

### Accomplishment Tracker Service

#### Time Logging
- `POST /accomplishment-tracker/time-service/time-in` - Record time in
- `POST /accomplishment-tracker/time-service/time-out` - Record time out
- `POST /accomplishment-tracker/time-service/lunch-break` - Start lunch break
- `POST /accomplishment-tracker/time-service/end-lunch-break` - End lunch break
- `GET /accomplishment-tracker/time-service/activity` - Get current activity

#### Accomplishment Management
- `POST /accomplishment-tracker/accomplishment-service/submit` - Submit accomplishment form
- `GET /accomplishment-tracker/accomplishment-service/form` - Get accomplishments (admin or log owner)
- `POST /accomplishment-tracker/accomplishment-service/form` - Update accomplishment (admin or log owner)

### Chatbot Service

#### Urgency Classification
- `POST /urgency/get` - Classify email urgency

#### Chat Q&A
- `POST /chat/response` - Get answers from company documents

## Authentication

All API endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer <jwt_token>
```

## Development

### Accomplishment Tracker Service
```bash
cd accomplishment-tracker-service
npm install
npm run dev
```

### Chatbot Service
```bash
cd chatbot-service
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

## Project Structure

```
arkline-backend/
├── docker-compose.yaml
├── accomplishment-tracker-service/
│   ├── controller/
│   ├── dal/
│   ├── middleware/
│   ├── routes/
│   ├── util/
│   └── index.js
└── chatbot-service/
        ├── app/
        │   ├── client/
        │   ├── routers/
        │   └── utils/
        └── main.py
```


## License

ISC
