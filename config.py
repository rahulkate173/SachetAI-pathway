import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()


class Settings:
    
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")
    
    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", 8000))
    
    # FIXED: Updated model names
    EMBEDDING_MODEL = "models/embedding-001"
    EMBEDDING_DIM = 768
    LLM_MODEL = "gemini-1.5-flash-latest"
    
    CHUNK_SIZE = 300
    MAX_DOCS = 100
    TOP_K = 3
    
    NEWS_INTERVAL = 120
    NDRF_INTERVAL = 60
    
    DISTRICTS = [
        "Mumbai", "Pune", "Nashik", "Nagpur", "Sholapur",
        "Kolhapur", "Sangli", "Satara", "Ratnagiri", "Sindhudurg",
        "Thane", "Raigad", "Ahmednagar"
    ]
    
    KEYWORDS = [
        "flood", "landslide", "cyclone", "earthquake",
        "rescue", "evacuation", "NDRF", "disaster"
    ]
    
    BASE_DIR = Path(__file__).parent
    
    @classmethod
    def check(cls):
        if not cls. GEMINI_API_KEY: 
            print("[config] warning: GEMINI_API_KEY missing")
            return False
        return True


settings = Settings()