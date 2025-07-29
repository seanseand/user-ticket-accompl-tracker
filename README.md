
# Arkline Accomplishment Tracker

A microservices-based application for tracking employee accomplishments and time logs, featuring an AI-powered chatbot service for intelligent request management.

## Architecture Overview

This project consists of two main services:

- **Accomplishment Tracker Service** (Node.js/Express)
- **Chatbot Service** (Python/FastAPI)

## Services

### Accomplishment Tracker Service

A Node.js microservice that handles employee time tracking and accomplishment logging.

#### Features
- **Time Logging**: Clock in/out, lunch breaks
- **Accomplishment Tracking**: Submit and manage daily accomplishments
- **Role-based Access Control**: Admin and employee roles
- **Redis Caching**: Fast time log retrieval
- **MongoDB Storage**: Persistent data storage

#### Tech Stack
- Node.js with Express
- MongoDB for data persistence
- Redis for caching
- JWT authentication

### Chatbot Service

A Python-based AI service providing intelligent features for the accomplishment tracker.

#### Features
- **Urgency Classification**: Automatically classify intern requests by urgency (High/Medium/Low)
- **Document Q&A**: RAG-powered chatbot for company information
- **AI Integration**: Groq API with multiple models

#### Tech Stack
- Python with FastAPI
- LangChain for document processing
- ChromaDB for vector storage
- HuggingFace embeddings
- Groq API for LLM inference

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Python 3.10+
- Node.js 18+

### Environment Setup

Create `.env` files in both service directories with required variables:

**Accomplishment Tracker Service:**
```env
MONGO_USERNAME=admin
MONGO_PASSWORD=password
MONGO_HOST=mongodb-arkline
MONGO_PORT=27017
MONGO_DATABASE=accomplishment_tracker
REDIS_PASSWORD=password
REDIS_HOST=redis
REDIS_PORT=6379
SECRET_KEY=your_jwt_secret
```

**Chatbot Service:**
```env
GROQ_API_KEY=your_groq_api_key
```

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Development Setup

**Accomplishment Tracker Service:**
```bash
cd accomplishment-tracker-service
npm install
npm run dev
```

**Chatbot Service:**
```bash
cd chatbot-service
pip install -e .
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Accomplishment Tracker Service (Port 2010)

#### Time Logging
- `POST /accomplishment-tracker/time-service/time-in` - Clock in
- `POST /accomplishment-tracker/time-service/time-out` - Clock out
- `POST /accomplishment-tracker/time-service/lunch-break` - Start lunch break
- `POST /accomplishment-tracker/time-service/end-lunch-break` - End lunch break
- `GET /accomplishment-tracker/time-service/activity` - Get current activity

#### Accomplishments
- `POST /accomplishment-tracker/accomplishment-service/submit` - Submit accomplishment
- `GET /accomplishment-tracker/accomplishment-service/form` - Get accomplishments (Admin)

### Chatbot Service (Port 8000)

#### Urgency Classification
- `POST /urgency/get` - Classify request urgency

#### Chat
- `POST /chat/response` - Ask questions about company documents

## Development

### Project Structure

```
arkline-accomplishment-tracker/
├── accomplishment-tracker-service/     # Node.js service
│   ├── controller/                     # Request handlers
│   ├── dal/                           # Data access layer
│   ├── middleware/                    # JWT middleware
│   ├── routes/                        # API routes
│   └── util/                          # Utilities
├── chatbot-service/                   # Python service
│   ├── app/
│   │   ├── client/                    # AI clients
│   │   ├── routers/                   # FastAPI routes
│   │   └── utils/                     # Utilities
└── docker-compose.yaml               # Docker orchestration
```

### Key Features

#### AI-Powered Urgency Classification
The chatbot service uses few-shot learning to classify intern requests:
- **High**: Same-day deadlines, urgent signatures
- **Medium**: 1-3 day deadlines, important tasks
- **Low**: General inquiries, flexible scheduling

#### Document Q&A System
RAG (Retrieval-Augmented Generation) system for answering questions about company documents using:
- PDF document processing
- Vector embeddings with HuggingFace
- ChromaDB for similarity search
- Groq LLM for response generation

## Infrastructure

### Database Services
- **MongoDB**: Primary data storage
- **Redis**: Caching and session management
- **Mongo Express**: Database administration UI
- **Redis Insight**: Redis administration UI

### Ports
- Accomplishment Tracker API: 2010
- Chatbot API: 8000
- MongoDB: 27017
- Redis: 6379
- Mongo