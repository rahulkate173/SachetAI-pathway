# SachetAI - NDRF Disaster Response System

## Complete Architecture & Pipeline Documentation

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Core Components](#core-components)
4. [Data Pipeline](#data-pipeline)
5. [RAG Pipeline](#rag-pipeline)
6. [API Architecture](#api-architecture)
7. [Data Flow](#data-flow)
8. [Technology Stack](#technology-stack)
9. [Deployment Architecture](#deployment-architecture)
10. [Security & Performance](#security--performance)

---

## System Overview

**SachetAI** is a real-time disaster response AI assistant designed specifically for **NDRF (National Disaster Response Force)** operators and emergency responders in Maharashtra. The system combines Retrieval-Augmented Generation (RAG), real-time data ingestion, and conversational AI to provide actionable disaster intelligence.

### Key Capabilities

- **Real-time Disaster Monitoring**: Floods, cyclones, landslides, earthquakes
- **Intelligent Query Processing**: Natural language understanding for emergency questions
- **Multi-source Data Integration**: NDRF alerts + News aggregation
- **Evacuation Intelligence**: Routes, safe zones, emergency contacts
- **Voice & Text Interface**: Accessibility for field operations
- **Interactive Mapping**: Geospatial visualization of disaster zones

### Design Principles

- **Safety First**: Life-saving information prioritized
- **Real-time Updates**: Background data refresh every 60-120 seconds
- **Offline Resilience**: Cached data ensures continuity
- **Modular Architecture**: Easy to extend with new data sources
- **Low Latency**: Fast responses for emergency scenarios

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                          │
│                                                                   │
│  ┌─────────────────────┐         ┌─────────────────────┐       │
│  │  React Frontend     │         │   Voice Interface   │       │
│  │  (Vite + Tailwind)  │         │  (MediaRecorder)    │       │
│  └──────────┬──────────┘         └──────────┬──────────┘       │
│             │                               │                    │
│             └───────────────┬───────────────┘                    │
└─────────────────────────────┼────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              │
┌─────────────────────────────┼────────────────────────────────────┐
│                    BACKEND API LAYER                              │
│                     (FastAPI Server)                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               API Endpoints                               │   │
│  │  • POST /api/query    - Process user questions           │   │
│  │  • GET  /api/status   - System health                    │   │
│  │  • POST /api/refresh  - Manual data refresh              │   │
│  │  • GET  /health       - Health check                     │   │
│  └─────────────────────────┬────────────────────────────────┘   │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   RAG ENGINE                             │   │
│  │  • Query Processing                                      │   │
│  │  • Context Retrieval                                     │   │
│  │  • LLM Integration (Groq/Llama 3.1)                     │   │
│  │  • Response Generation                                   │   │
│  └─────────────────────────┬────────────────────────────────┘   │
└────────────────────────────┼──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA PIPELINE LAYER                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               DataPipeline (Streaming)                    │   │
│  │  • Background Refresh Thread                             │   │
│  │  • Data Aggregation                                      │   │
│  │  • Vector Index Management                               │   │
│  └───────────┬────────────────────────────┬─────────────────┘   │
│              │                            │                      │
│              ▼                            ▼                      │
│  ┌─────────────────────┐     ┌────────────────────────┐        │
│  │   VectorIndex       │     │  Data Connectors       │        │
│  │  • Embeddings       │     │  ┌──────────────────┐  │        │
│  │  • Semantic Search  │     │  │ NewsConnector    │  │        │
│  │  • Similarity       │     │  │  (NewsAPI)       │  │        │
│  │  • Document Store   │     │  └──────────────────┘  │        │
│  └─────────────────────┘     │  ┌──────────────────┐  │        │
│                               │  │ NDRFConnector    │  │        │
│                               │  │  (Mock/Real)     │  │        │
│                               │  └──────────────────┘  │        │
│                               └────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL DATA SOURCES                       │
│                                                                   │
│  ┌─────────────────────┐         ┌─────────────────────┐       │
│  │    NewsAPI.org      │         │   NDRF Live Alerts  │       │
│  │  • Disaster News    │         │  • Rescue Ops       │       │
│  │  • Maharashtra      │         │  • Evacuation       │       │
│  │  • Real-time        │         │  • Status Updates   │       │
│  └─────────────────────┘         └─────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ML/AI SERVICES                              │
│                                                                   │
│  ┌─────────────────────┐         ┌─────────────────────┐       │
│  │   Groq Cloud API    │         │ Sentence Transformers│       │
│  │  • Llama 3.1 8B     │         │ • all-MiniLM-L6-v2  │       │
│  │  • Fast Inference   │         │ • 384-dim vectors   │       │
│  │  • Streaming        │         │ • Local embeddings  │       │
│  └─────────────────────┘         └─────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Configuration Management (`config.py`)

**Purpose**: Centralized configuration for all system parameters.

```python
Settings:
  ├── API Keys (GROQ_API_KEY, NEWSAPI_KEY)
  ├── Server Config (HOST, PORT)
  ├── ML Models
  │   ├── EMBEDDING_MODEL: "all-MiniLM-L6-v2"
  │   ├── EMBEDDING_DIM: 384
  │   └── LLM_MODEL: "llama-3.1-8b-instant"
  ├── RAG Parameters
  │   ├── CHUNK_SIZE: 300 chars
  │   ├── MAX_DOCS: 100 documents
  │   └── TOP_K: 3 results
  ├── Refresh Intervals
  │   ├── NEWS_INTERVAL: 120 seconds
  │   └── NDRF_INTERVAL: 60 seconds
  └── Disaster Coverage
      ├── DISTRICTS: 13 Maharashtra districts
      └── KEYWORDS: flood, landslide, cyclone, etc.
```

**Key Features**:

- Environment variable loading via `dotenv`
- Validation checks for API keys
- Easy scaling through parameter adjustment

---

### 2. Data Sources Layer

#### A. NewsConnector (`data_sources/newsapi_connector.py`)

**Purpose**: Fetch real-time disaster news from NewsAPI.org.

**Architecture**:

```
NewsConnector
├── Initialization
│   ├── API Key from config
│   └── In-memory cache
├── Query Builder
│   ├── Keywords: flood, landslide, NDRF, rescue
│   └── Locations: Mumbai, Pune, Sholapur, etc.
├── Fetch Pipeline
│   ├── API Request (last 24 hours)
│   ├── Error Handling (fallback to cache/samples)
│   └── Rate Limiting Awareness
├── Document Parser
│   ├── Extract: title, description, content
│   ├── Classify: flood/landslide/rescue/general
│   ├── Region Detection (13 districts)
│   └── Format for RAG ingestion
└── Output
    └── Structured documents with metadata
```

**Data Model**:

```python
{
  "id": "news_8a7f3b1c",
  "content": "NEWS: Title\nSource: ...\nDate: ...\nRegion: ...\nType: ...",
  "metadata": {
    "source": "newsapi",
    "region": "Mumbai",
    "type": "flood",
    "url": "https://..."
  }
}
```

**Features**:

- Automatic deduplication using content hashing
- Graceful degradation with sample data
- Region-aware content classification
- 50 articles per fetch, limited to MAX_DOCS/2

---

#### B. NDRFConnector (`data_sources/ndrf_connector.py`)

**Purpose**: Provide NDRF operational alerts (currently mock, ready for live integration).

**Architecture**:

```
NDRFConnector
├── Alert Generation
│   ├── Real-time timestamps
│   └── Structured format
├── Alert Types
│   ├── ACTIVE: Ongoing operations
│   ├── MONITORING: Watch status
│   ├── STANDBY: Preparedness
│   └── ADVISORY: Preventive info
├── Information Structure
│   ├── Location details
│   ├── Team deployment
│   ├── Rescue statistics
│   ├── Evacuation routes
│   └── Emergency contacts
└── Output
    └── Ready for vector indexing
```

**Coverage**:

- 4 active regions: Sholapur, Ratnagiri, Mumbai, Kolhapur
- Real deployment stats: teams, rescued, evacuated
- Route status: OPEN, RESTRICTED, CLOSED, PARTIAL
- Multi-level contacts: NDRF national, district, emergency

---

### 3. Pipeline Layer (`pipeline/streaming.py`)

#### A. VectorIndex

**Purpose**: In-memory semantic search engine.

**Architecture**:

```
VectorIndex
├── Storage
│   ├── docs: List of document dictionaries
│   └── vectors: NumPy array of embeddings (384-dim)
├── Embedder
│   ├── Model: SentenceTransformer (all-MiniLM-L6-v2)
│   ├── Lazy Loading: Initialize on first use
│   └── Thread-safe caching
├── Add Operation
│   ├── Deduplication by document ID
│   ├── LRU eviction when MAX_DOCS exceeded
│   ├── Embedding generation (2000 char limit)
│   └── Thread-safe with locks
├── Search Operation
│   ├── Query embedding
│   ├── Cosine similarity calculation
│   ├── Top-K retrieval
│   └── Score normalization
└── Performance
    ├── O(n) search complexity
    └── Fast NumPy operations
```

**Embedding Pipeline**:

1. Text preprocessing (truncate to 2000 chars)
2. SentenceTransformer encoding
3. NumPy float32 conversion
4. Normalization for cosine similarity

**Search Algorithm**:

```python
Cosine Similarity:
  score = dot(query_norm, doc_norm)

  where:
    query_norm = query_vec / ||query_vec||
    doc_norm = doc_vec / ||doc_vec||
```

---

#### B. DataPipeline

**Purpose**: Orchestrate data collection and index management.

**Architecture**:

```
DataPipeline
├── Connectors
│   ├── NewsConnector instance
│   └── NDRFConnector instance
├── VectorIndex
│   └── Shared index for all documents
├── Background Thread
│   ├── Daemon mode (auto-cleanup)
│   ├── Periodic refresh loop
│   └── Error isolation per connector
├── Lifecycle
│   ├── start(): Initial refresh + thread spawn
│   ├── refresh(): Collect + index documents
│   └── stop(): Graceful thread termination
└── Query Interface
    └── Delegate to VectorIndex.search()
```

**Refresh Cycle**:

```
1. Collect from NewsConnector → List[Doc]
2. Collect from NDRFConnector → List[Doc]
3. Merge documents
4. Add to VectorIndex (dedup + embed)
5. Update timestamp
6. Sleep for min(NEWS_INTERVAL, NDRF_INTERVAL)
7. Repeat
```

**Thread Safety**:

- VectorIndex uses `threading.Lock()`
- Pipeline thread is daemon (won't block exit)
- Graceful shutdown with `join(timeout=3)`

---

### 4. RAG Engine (`rag/engine.py`)

**Purpose**: Core intelligence layer - retrieval + LLM generation.

**Architecture**:

```
RAGEngine
├── DataPipeline Integration
│   └── Manages background data refresh
├── LLM Client
│   ├── Lazy initialization (ChatGroq)
│   ├── Model: llama-3.1-8b-instant
│   ├── Temperature: 0.3 (factual)
│   └── Max tokens: 800
├── System Prompt
│   ├── Role definition (NDRF assistant)
│   ├── Real-time timestamp
│   ├── Safety guidelines
│   └── Emergency contacts
├── Context Retrieval
│   ├── Query vector index (TOP_K=3)
│   ├── Format with sources + scores
│   └── Fallback message if no data
├── Response Generation
│   ├── Prompt assembly (system + context + query)
│   ├── LLM invocation
│   └── Error handling with emergency contacts
└── History Tracking
    └── Last 20 queries (ring buffer)
```

**Prompt Engineering**:

```
Structure:
  [System Prompt]
  - Role & timestamp
  - Safety rules
  - Emergency numbers

  [Real-time Data]
  - Source 1 (score: 0.85)
  - Source 2 (score: 0.78)
  - Source 3 (score: 0.72)

  [User Question]

  [Instructions]
  - Answer from data
  - Mention sources
  - Provide general advice if data insufficient
```

**Response Format**:

```python
{
  "answer": "LLM-generated response",
  "query": "Original question",
  "time": "2026-01-18T10:30:45",
  "sources": ["NDRF", "NewsAPI"],
  "docs": 87  # Total indexed
}
```

---

### 5. API Layer (`api/server.py`)

**Purpose**: HTTP interface for client applications.

**Architecture**:

```
FastAPI Application
├── Lifespan Management
│   ├── Startup: Initialize RAGEngine
│   ├── Background: Data refresh thread
│   └── Shutdown: Graceful cleanup
├── CORS Middleware
│   └── Allow all origins (frontend flexibility)
├── Endpoints
│   ├── GET  /          → API info
│   ├── GET  /health    → Health check
│   ├── POST /api/query → Process question
│   ├── GET  /api/status → System status
│   └── POST /api/refresh → Manual refresh
└── Error Handling
    ├── 503: Service not ready
    └── 500: Internal error
```

**Endpoint Details**:

| Endpoint       | Method | Purpose           | Response             |
| -------------- | ------ | ----------------- | -------------------- |
| `/`            | GET    | API metadata      | JSON with endpoints  |
| `/health`      | GET    | Health check      | `{"status": "ok"}`   |
| `/api/query`   | POST   | Ask question      | `QueryRes` model     |
| `/api/status`  | GET    | System stats      | `StatusRes` model    |
| `/api/refresh` | POST   | Force data update | Refresh confirmation |

**Request/Response Models**:

```python
QueryReq:
  - question: str

QueryRes:
  - answer: str
  - query: str
  - time: str (ISO 8601)
  - sources: List[str]
  - docs: int

StatusRes:
  - status: str ("running"/"stopped")
  - docs: int
  - updated: str (optional)
  - queries: int
```

---

## Data Pipeline

### Detailed Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA INGESTION PHASE                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  Background Refresh Thread         │
        │  (Every 60-120 seconds)           │
        └───────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│   NewsConnector       │       │   NDRFConnector       │
│   • Query NewsAPI     │       │   • Generate alerts   │
│   • Last 24h          │       │   • Mock data         │
│   • 50 articles       │       │   • 4 regions         │
└───────────┬───────────┘       └───────────┬───────────┘
            │                               │
            └───────────────┬───────────────┘
                            ▼
                ┌───────────────────────┐
                │   Document Merger     │
                │   • Combine sources   │
                │   • Add timestamps    │
                └───────────┬───────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   EMBEDDING PHASE                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   VectorIndex.add()   │
                │   • Deduplication     │
                │   • LRU eviction      │
                └───────────┬───────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
    ┌───────────────────┐   ┌───────────────────┐
    │  Text Embedding   │   │  Storage Update   │
    │  • Truncate 2000  │   │  • docs.append()  │
    │  • SentenceT      │   │  • vectors.append()│
    │  • 384-dim vec    │   │  • Thread-safe    │
    └───────────────────┘   └───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   QUERY PHASE                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   User Question       │
                │   "Flood status in    │
                │    Sholapur?"         │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Query Embedding     │
                │   • Same model        │
                │   • 384-dim vector    │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Semantic Search     │
                │   • Cosine similarity │
                │   • Top-K=3 results   │
                └───────────┬───────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │   Retrieved Documents              │
        │   1. [NDRF Alert - 0.89]          │
        │   2. [News Article - 0.82]        │
        │   3. [Advisory - 0.75]            │
        └───────────────┬───────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   GENERATION PHASE                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Context Assembly    │
                │   • Format sources    │
                │   • Add metadata      │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Prompt Construction │
                │   • System prompt     │
                │   • Context docs      │
                │   • User query        │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   LLM Invocation      │
                │   (Groq/Llama 3.1)    │
                │   • Temperature 0.3   │
                │   • Max tokens 800    │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Response Formatting │
                │   • Add metadata      │
                │   • Include sources   │
                │   • Log query         │
                └───────────┬───────────┘
                            │
                            ▼
                   ┌────────────────┐
                   │  Return to API  │
                   └────────────────┘
```

---

## RAG Pipeline

### Retrieval-Augmented Generation Process

```
┌─────────────────────────────────────────────────────────────┐
│                        RAG WORKFLOW                          │
└─────────────────────────────────────────────────────────────┘

STEP 1: USER QUERY
┌──────────────────────────────────────────┐
│ Input: "What is the current flood        │
│         situation in Sholapur?"          │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 2: QUERY UNDERSTANDING
┌──────────────────────────────────────────┐
│ • Intent: Status check                   │
│ • Location: Sholapur                     │
│ • Type: Flood disaster                   │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 3: VECTOR RETRIEVAL
┌──────────────────────────────────────────┐
│ VectorIndex.search(query, k=3)          │
│                                          │
│ Embedding: [0.23, -0.45, 0.67, ...]    │
│                                          │
│ Results:                                 │
│ ┌─────────────────────────────────┐    │
│ │ 1. NDRF Sholapur Alert          │    │
│ │    Score: 0.89                  │    │
│ │    Source: ndrf                 │    │
│ │    "NDRF ALERT - FLOOD RESCUE   │    │
│ │     Operation: Sholapur..."     │    │
│ ├─────────────────────────────────┤    │
│ │ 2. News: Flood in Sholapur      │    │
│ │    Score: 0.82                  │    │
│ │    Source: newsapi              │    │
│ │    "NDRF teams deployed for..." │    │
│ ├─────────────────────────────────┤    │
│ │ 3. Evacuation Advisory          │    │
│ │    Score: 0.75                  │    │
│ │    Source: ndrf                 │    │
│ │    "Evacuation routes: NH52..." │    │
│ └─────────────────────────────────┘    │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 4: CONTEXT PREPARATION
┌──────────────────────────────────────────┐
│ Formatted Context:                       │
│                                          │
│ [1. ndrf] (score: 0.89)                 │
│ NDRF ALERT - FLOOD RESCUE               │
│ Operation: Sholapur District...         │
│ Status: ACTIVE | Severity: HIGH         │
│ Teams: 3 battalions (90 personnel)      │
│ Rescued: 156 people                     │
│ Evacuated: 450+                         │
│ Routes: NH52 OPEN, SH10 RESTRICTED      │
│                                          │
│ ---                                      │
│                                          │
│ [2. newsapi] (score: 0.82)              │
│ NEWS: NDRF conducts flood rescue...     │
│ [Content excerpt]                        │
│                                          │
│ ---                                      │
│                                          │
│ [3. ndrf] (score: 0.75)                 │
│ [Advisory content]                       │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 5: PROMPT ASSEMBLY
┌──────────────────────────────────────────┐
│ You are NDRF Disaster Response           │
│ Assistant for Maharashtra.               │
│                                          │
│ Time: 2026-01-18 10:30 IST              │
│                                          │
│ Role: [Instructions...]                  │
│ Rules: [Guidelines...]                   │
│ Emergency Numbers: [Contacts...]         │
│                                          │
│ ---                                      │
│                                          │
│ REAL-TIME DATA:                          │
│ [Formatted context from Step 4]         │
│                                          │
│ ---                                      │
│                                          │
│ USER QUESTION:                           │
│ What is the current flood situation      │
│ in Sholapur?                             │
│                                          │
│ Answer based on the data above.          │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 6: LLM GENERATION
┌──────────────────────────────────────────┐
│ Groq API Call                            │
│ Model: llama-3.1-8b-instant             │
│ Temperature: 0.3 (factual)              │
│ Max Tokens: 800                          │
│                                          │
│ [Processing...]                          │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 7: RESPONSE GENERATION
┌──────────────────────────────────────────┐
│ Generated Answer:                        │
│                                          │
│ "Based on real-time NDRF alerts, the    │
│  flood situation in Sholapur district    │
│  is currently ACTIVE with HIGH severity. │
│                                          │
│  Current Status:                         │
│  • 3 NDRF battalions (90 personnel)     │
│    deployed                              │
│  • 156 people rescued                    │
│  • 450+ evacuated                        │
│  • Affected areas: Akkalkot, Barshi,    │
│    Karmala                               │
│                                          │
│  Evacuation Routes:                      │
│  • NH52 to Pune: OPEN                    │
│  • SH10 to Osmanabad: RESTRICTED        │
│  • Via Tuljapur: CLOSED                  │
│                                          │
│  Emergency Contacts:                     │
│  • NDRF: 011-24363260                    │
│  • District: 02182-222222                │
│  • Emergency: 112                        │
│                                          │
│  Sources: NDRF live alerts, local news"  │
└──────────────────┬───────────────────────┘
                   │
                   ▼
STEP 8: RESPONSE PACKAGING
┌──────────────────────────────────────────┐
│ {                                        │
│   "answer": "[Generated text]",         │
│   "query": "What is the current...",    │
│   "time": "2026-01-18T10:30:45.123Z",  │
│   "sources": ["NDRF", "NewsAPI"],       │
│   "docs": 87                             │
│ }                                        │
└──────────────────┬───────────────────────┘
                   │
                   ▼
              ┌─────────┐
              │   API   │
              │ Response│
              └─────────┘
```

### RAG Quality Factors

**Retrieval Quality**:

- Semantic similarity threshold: ~0.7+
- Top-K=3 ensures focused context
- Source diversity (NDRF + News)

**Generation Quality**:

- Low temperature (0.3) for factual accuracy
- Structured prompt engineering
- Emergency contact fallback
- Source attribution

---

## API Architecture

### Request Flow

```
Client Request
      │
      ▼
┌──────────────────┐
│  CORS Middleware │  ← Allow cross-origin (React frontend)
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  Route Handler   │  ← Match endpoint
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  Input Validation│  ← Pydantic models
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  RAGEngine.ask() │  ← Core processing
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│ Response Format  │  ← Pydantic models
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  JSON Response   │  ← Return to client
└──────────────────┘
```

### Lifespan Management

```python
Application Lifecycle:

Startup:
  1. Print banner
  2. Check API keys (settings.check())
  3. Initialize RAGEngine()
  4. Start background data refresh
  5. Log "ready"

Running:
  - Handle API requests
  - Background thread refreshes data
  - Engine maintains state

Shutdown:
  1. Stop background thread
  2. Clean up resources
  3. Exit gracefully
```

---

## Data Flow

### End-to-End Flow

```
1. USER ACTION (Frontend)
   └─→ User types: "Landslide routes in Ratnagiri?"

2. HTTP REQUEST
   └─→ POST /api/query
       Body: {"question": "Landslide routes in Ratnagiri?"}

3. API SERVER (server.py)
   └─→ Validate request (Pydantic)
   └─→ Call engine.ask(question)

4. RAG ENGINE (engine.py)
   └─→ Query pipeline for context
   └─→ Build prompt
   └─→ Call Groq LLM
   └─→ Format response

5. DATA PIPELINE (streaming.py)
   └─→ VectorIndex.search(query, k=3)
   └─→ Return top documents

6. VECTOR INDEX (streaming.py)
   └─→ Embed query (384-dim)
   └─→ Compute cosine similarity
   └─→ Sort by score
   └─→ Return top-3

   Data Sources (continuous):
   ├─→ NewsConnector (every 120s)
   │   └─→ Fetch from NewsAPI
   │   └─→ Parse & format
   │   └─→ Return documents
   │
   └─→ NDRFConnector (every 60s)
       └─→ Generate alerts
       └─→ Return documents

7. LLM PROCESSING (Groq Cloud)
   └─→ Receive prompt
   └─→ Generate response
   └─→ Return completion

8. RESPONSE ASSEMBLY
   └─→ {answer, query, time, sources, docs}

9. HTTP RESPONSE
   └─→ JSON to client

10. FRONTEND DISPLAY
    └─→ Render answer
    └─→ Show sources
    └─→ Update UI
```

---

## Technology Stack

### Backend Stack

| Layer           | Technology           | Version  | Purpose                    |
| --------------- | -------------------- | -------- | -------------------------- |
| **Framework**   | FastAPI              | 0.104.0+ | High-performance async API |
| **Server**      | Uvicorn              | 0.24.0+  | ASGI server                |
| **LLM Client**  | LangChain-Groq       | 0.1.0+   | Groq API integration       |
| **Embeddings**  | SentenceTransformers | 2.2.0+   | Local embeddings           |
| **Vector Ops**  | NumPy                | 1.24.0+  | Fast numerical computing   |
| **HTTP Client** | Requests             | 2.31.0+  | External API calls         |
| **Config**      | python-dotenv        | 1.0.0+   | Environment management     |
| **Validation**  | Pydantic             | 2.5.0+   | Data validation            |
| **Runtime**     | Python               | 3.10+    | Core language              |

### ML/AI Stack

| Component      | Technology             | Details                         |
| -------------- | ---------------------- | ------------------------------- |
| **LLM**        | Llama 3.1 8B           | Via Groq Cloud (fast inference) |
| **Embeddings** | all-MiniLM-L6-v2       | 384-dim, sentence-transformers  |
| **Similarity** | Cosine Similarity      | NumPy-based computation         |
| **Indexing**   | In-memory Vector Store | Custom implementation           |

### External Services

| Service           | Provider              | Purpose                  |
| ----------------- | --------------------- | ------------------------ |
| **News API**      | NewsAPI.org           | Real-time disaster news  |
| **LLM Inference** | Groq Cloud            | Fast Llama 3.1 inference |
| **NDRF Data**     | Mock (ready for live) | Operational alerts       |

### Frontend Stack (Reference)

| Component     | Technology              |
| ------------- | ----------------------- |
| **Framework** | React + Vite            |
| **Styling**   | Tailwind CSS            |
| **Maps**      | Leaflet + OpenStreetMap |
| **Icons**     | Lucide React            |
| **Audio**     | Web MediaRecorder API   |

---

## Deployment Architecture

### Development Environment

```
Local Machine
├── Backend (Python)
│   ├── Virtual Environment (uv)
│   ├── Port: 8000 (configurable)
│   └── Hot Reload: Uvicorn
└── Frontend (Node.js)
    ├── Node Modules
    ├── Port: 5173 (Vite default)
    └── Hot Module Replacement
```

### Production Architecture (Recommended)

```
┌─────────────────────────────────────────────────────────┐
│                     Load Balancer                        │
│                     (Nginx/Traefik)                      │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌───────────────┐  ┌───────────────┐
│  Backend #1   │  │  Backend #2   │  (Horizontal Scaling)
│  (Uvicorn)    │  │  (Uvicorn)    │
└───────┬───────┘  └───────┬───────┘
        │                  │
        └──────────┬───────┘
                   │
                   ▼
        ┌──────────────────┐
        │  External Services│
        │  • Groq API       │
        │  • NewsAPI        │
        │  • NDRF Endpoint  │
        └──────────────────┘
```

### Deployment Considerations

**Containerization (Docker)**:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install uv && uv sync
CMD ["uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Environment Variables**:

- `GROQ_API_KEY`: Required for LLM
- `NEWSAPI_KEY`: Optional (falls back to samples)
- `HOST`: Default 127.0.0.1
- `PORT`: Default 8000

**Scaling Strategy**:

- **Stateless Design**: Each instance independent
- **Shared Context**: Consider Redis for multi-instance vector store
- **Background Jobs**: Separate data refresh workers
- **Rate Limiting**: Implement per-user limits

---

## Security & Performance

### Security Measures

**API Security**:

- CORS configured (adjust for production)
- Environment-based secrets
- Input validation via Pydantic
- Error messages sanitized (no stack traces to client)

**Data Privacy**:

- No persistent storage of user queries (in-memory only)
- 20-query history limit (ring buffer)
- API keys in environment variables

**Production Recommendations**:

- Add API key authentication
- Rate limiting per client
- HTTPS only
- Helmet middleware
- Input sanitization for injections

### Performance Optimizations

**Current**:

- In-memory vector store (fast access)
- NumPy for efficient similarity computation
- Background data refresh (non-blocking)
- LLM caching (lazy initialization)
- Thread-safe operations

**Bottlenecks**:

- Embedding generation: ~50-100ms per document
- LLM inference: ~500-2000ms per query (Groq is fast!)
- News API rate limit: 100 requests/day (free tier)
- Vector search: O(n) complexity

**Scaling Improvements**:

1. **Vector DB**: Replace in-memory with Pinecone/Weaviate/Qdrant
2. **Caching**: Redis for frequent queries
3. **Async**: Convert connectors to async/await
4. **Batch Processing**: Bulk embedding generation
5. **Index Optimization**: HNSW or FAISS for sub-linear search

---

## Module Dependencies

```
main.py
  └─→ run.py
       ├─→ config.py
       │    └─→ dotenv
       │
       └─→ api/server.py
            ├─→ FastAPI
            ├─→ Pydantic
            └─→ rag/engine.py
                 ├─→ LangChain-Groq
                 └─→ pipeline/streaming.py
                      ├─→ SentenceTransformers
                      ├─→ NumPy
                      └─→ data_sources/
                           ├─→ newsapi_connector.py
                           │    └─→ requests
                           │
                           └─→ ndrf_connector.py
```

---

## Configuration Summary

### System Parameters

| Parameter         | Default              | Purpose                |
| ----------------- | -------------------- | ---------------------- |
| `EMBEDDING_MODEL` | all-MiniLM-L6-v2     | Sentence embeddings    |
| `EMBEDDING_DIM`   | 384                  | Vector dimensions      |
| `LLM_MODEL`       | llama-3.1-8b-instant | Groq model             |
| `CHUNK_SIZE`      | 300                  | Text chunk size        |
| `MAX_DOCS`        | 100                  | Max documents in index |
| `TOP_K`           | 3                    | Retrieval results      |
| `NEWS_INTERVAL`   | 120s                 | News refresh rate      |
| `NDRF_INTERVAL`   | 60s                  | NDRF refresh rate      |
| `LLM_TEMPERATURE` | 0.3                  | Generation randomness  |
| `LLM_MAX_TOKENS`  | 800                  | Response length        |

---

## Development Workflow

### Setup

```bash
# Clone repository
git clone <repo>

# Install dependencies
uv sync

# Configure
cp .env.example .env
# Edit .env with API keys

# Run
uv run python main.py
```

### Testing

```bash
# CLI mode
uv run python main.py --cli

# Test mode
uv run python main.py --test
```

### Adding New Data Sources

1. Create connector in `data_sources/`:

```python
class NewConnector:
    def fetch(self) -> List[Dict]:
        # Return structured documents
        pass
```

2. Integrate in `pipeline/streaming.py`:

```python
self.new_source = NewConnector()

def _collect(self):
    docs.extend(self.new_source.fetch())
```

3. Update configuration if needed

---

## Future Enhancements

### Short-term

- [ ] Persistent vector storage (SQLite/Chroma)
- [ ] Query caching layer
- [ ] User authentication
- [ ] Webhook support for real-time alerts

### Medium-term

- [ ] Multi-language support (Hindi, Marathi)
- [ ] Historical data analysis
- [ ] SMS/WhatsApp integration
- [ ] Offline mode with sync

### Long-term

- [ ] Predictive disaster modeling
- [ ] Satellite imagery integration
- [ ] Multi-state expansion
- [ ] Mobile app (React Native)

---

## Team Contributions

| Member        | Role           | Modules Owned            |
| ------------- | -------------- | ------------------------ |
| **Rahul**     | Backend Lead   | `api/`, integration      |
| **Yashodeep** | RAG Specialist | `rag/`, `pipeline/`      |
| **Saanidhi**  | Frontend Lead  | React UI (separate repo) |
| **Aditya**    | DevOps         | Deployment, monitoring   |

---

## Contact & Resources

- **NDRF National**: 011-24363260
- **Emergency**: 112
- **Disaster Helpline**: 1078
- **Groq Console**: https://console.groq.com/keys
- **NewsAPI**: https://newsapi.org/

---

**Document Version**: 1.0  
**Last Updated**: January 18, 2026  
**Maintainer**: SachetAI Team
