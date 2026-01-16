# SachetAI - NDRF Disaster Response System

Real-time disaster information system for Maharashtra using Pathway RAG. 

## Setup

```bash
# Install dependencies
uv sync

# Configure
cp .env.example .env
# Add your OPENAI_API_KEY
```

## Usage

```bash
# Server mode (default)
uv run python main.py

# Interactive CLI
uv run python main.py --cli

# Quick test
uv run python main. py --test
```

## API

- `POST /api/query` - Ask disaster questions
- `GET /api/status` - System status  
- `POST /api/refresh` - Refresh data

## Sample Questions

- Current Sholapur flood rescue status?
- Latest landslide evacuation routes? 
- NDRF teams deployed in Maharashtra? 

## Team

- Aditya
- Rahul
- Saanidhi
- Yashodeep