import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()


class Settings:

    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
    NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")

    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", 8000))

    # Groq LLM and local embeddings
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"  # sentence-transformers model
    EMBEDDING_DIM = 384  # dimension for all-MiniLM-L6-v2
    LLM_MODEL = "llama-3.1-8b-instant"  # Groq model

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
        if not cls.GROQ_API_KEY:
            print("[config] warning: GROQ_API_KEY missing")
            print("Get free key: https://console.groq.com/keys")
            return False
        return True


settings = Settings()
