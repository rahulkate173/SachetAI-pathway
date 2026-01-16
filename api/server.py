from fastapi import FastAPI, HTTPException
from fastapi.middleware. cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from contextlib import asynccontextmanager

from rag import RAGEngine
from config import settings


class QueryReq(BaseModel):
    question: str


class QueryRes(BaseModel):
    answer: str
    query:  str
    time: str
    sources: List[str]
    docs: int


class StatusRes(BaseModel):
    status: str
    docs: int
    updated: Optional[str]
    queries: int


engine:  Optional[RAGEngine] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global engine
    
    print("[server] starting...")
    settings.check()
    
    engine = RAGEngine()
    engine.start()
    
    print("[server] ready")
    yield
    
    print("[server] stopping...")
    if engine:
        engine.stop()


def create_app() -> FastAPI:
    application = FastAPI(
        title="NDRF Disaster Assistant",
        version="0.1.0",
        lifespan=lifespan
    )
    
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    return application


app = create_app()


@app.get("/")
async def root():
    return {
        "name": "NDRF Disaster Assistant",
        "version": "0.1.0",
        "endpoints": ["POST /api/query", "GET /api/status", "POST /api/refresh"]
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/query", response_model=QueryRes)
async def query(req: QueryReq):
    if not engine:
        raise HTTPException(503, "not ready")
    
    try:
        r = engine.ask(req.question)
        return QueryRes(
            answer=r["answer"],
            query=r["query"],
            time=r["time"],
            sources=r["sources"],
            docs=r["docs"]
        )
    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/api/status", response_model=StatusRes)
async def status():
    if not engine:
        raise HTTPException(503, "not ready")
    
    s = engine.status()
    return StatusRes(
        status=s["status"],
        docs=s["docs"],
        updated=s["updated"],
        queries=s["queries"]
    )


@app.post("/api/refresh")
async def refresh():
    if not engine:
        raise HTTPException(503, "not ready")
    
    r = engine.refresh()
    return r


def serve():
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)


if __name__ == "__main__": 
    serve()