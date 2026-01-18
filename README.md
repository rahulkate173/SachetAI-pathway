# SachetAI – NDRF Disaster Response System

**SachetAI** is a real-time disaster-response AI assistant designed for **NDRF operators and emergency responders** in Maharashtra. It integrates a **retrieval-augmented generation (RAG) pipeline**, voice + text conversational AI, live alerts, and interactive mapping to provide actionable disaster information.

---

## Project Overview

- Real-time tracking of **floods, cyclones, landslides, and evacuation routes**.
- Supports **text + voice queries**.
- Provides **actionable emergency insights** for NDRF teams.
- Combines **FastAPI backend** with a **React + Tailwind frontend**.
- Built to demonstrate a fully functional operational workflow while allowing modular integration.

---

## Tech Stack

**Backend:**

- Python 3.11+
- FastAPI
- RAG (Retrieval-Augmented Generation)
- Gemini / Generative AI API for embeddings & LLM
- Uvicorn

**Frontend:**

- React + Vite
- Tailwind CSS
- Leaflet + OpenStreetMap
- Lucide React icons
- Web MediaRecorder API
- React Hooks for state management

---

## Team Roles

| Team Member | Contribution |
|-------------|-------------|
| Rahul       | Backend + API integration |
| Yashodeep   | RAG pipeline implementation |
| Saanidhi    | Frontend UI & integration |
| Aditya      | Pipeline monitoring & deployment |

---

## Setup Instructions

### .env 
 Create and .env file and write:
 ```
 GEMINI_API_KEY=<your-gemini-api-key>
NEWSAPI_KEY=<your-news-api-key>
HOST=127.0.0.1
PORT=8000

 ```

### Backend

```bash
# Install dependencies
uv sync

# Configure environment
cp .env.example .env

# Add your Gemini API key in the .env file
# Example:
# GEMINI_API_KEY="YOUR_API_KEY_HERE"

```
Backend server will run at:
```
http://127.0.0.1:8000/
```
### Frontend
```bash
# Navigate to frontend folder
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at:

```
http://localhost:5173
```

