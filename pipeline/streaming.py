import threading
import time
import numpy as np
from datetime import datetime
from typing import List, Dict, Tuple, Optional

from config import settings
from data_sources import NewsConnector, NDRFConnector


class VectorIndex:

    def __init__(self):
        self.docs = []
        self.vectors = []
        self._lock = threading.Lock()
        self._embedder = None

    def _get_embedder(self):
        if self._embedder is None:
            from sentence_transformers import SentenceTransformer
            self._embedder = SentenceTransformer(settings.EMBEDDING_MODEL)
        return self._embedder

    def _embed(self, text):
        try:
            text = text[:2000]
            embedder = self._get_embedder()
            embedding = embedder.encode(text, convert_to_numpy=True)
            return np.array(embedding, dtype=np.float32)
        except Exception as e:
            print(f"[index] embed error: {e}")
            return np.zeros(settings.EMBEDDING_DIM, dtype=np.float32)

    def _embed_query(self, text):
        try:
            text = text[:2000]
            embedder = self._get_embedder()
            embedding = embedder.encode(text, convert_to_numpy=True)
            return np.array(embedding, dtype=np.float32)
        except Exception as e:
            print(f"[index] query embed error: {e}")
            return np.zeros(settings.EMBEDDING_DIM, dtype=np.float32)

    def add(self, docs):
        with self._lock:
            existing = {d["id"] for d in self.docs}

            for doc in docs:
                if doc["id"] in existing:
                    continue

                if len(self.docs) >= settings.MAX_DOCS:
                    self.docs. pop(0)
                    self.vectors.pop(0)

                vec = self._embed(doc["content"])
                self.docs.append(doc)
                self.vectors.append(vec)

    def search(self, query, k=None):
        k = k or settings. TOP_K

        if not self.docs:
            return []

        with self._lock:
            qvec = self._embed_query(query)

            matrix = np. array(self.vectors)
            qnorm = qvec / (np.linalg.norm(qvec) + 1e-8)
            dnorm = matrix / \
                (np.linalg.norm(matrix, axis=1, keepdims=True) + 1e-8)

            scores = np.dot(dnorm, qnorm)
            idx = np.argsort(scores)[-k:][::-1]

            return [(self.docs[i], float(scores[i])) for i in idx]

    def count(self):
        return len(self.docs)


class DataPipeline:

    def __init__(self):
        self.news = NewsConnector()
        self.ndrf = NDRFConnector()
        self.index = VectorIndex()

        self._running = False
        self._thread = None
        self._updated = None

    def _collect(self):
        docs = []

        try:
            docs. extend(self.news.fetch())
        except Exception as e:
            print(f"[pipeline] news error: {e}")

        try:
            docs. extend(self.ndrf. fetch())
        except Exception as e:
            print(f"[pipeline] ndrf error: {e}")

        return docs

    def refresh(self):
        print(
            f"[pipeline] refreshing at {datetime.now().strftime('%H:%M:%S')}")
        docs = self._collect()

        if docs:
            self.index. add(docs)

        self._updated = datetime.now()
        print(f"[pipeline] indexed {self.index.count()} docs")

    def _loop(self):
        while self._running:
            try:
                self.refresh()
            except Exception as e:
                print(f"[pipeline] loop error: {e}")

            time.sleep(min(settings.NEWS_INTERVAL, settings. NDRF_INTERVAL))

    def start(self):
        if self._running:
            return

        self. refresh()

        self._running = True
        self._thread = threading.Thread(target=self._loop, daemon=True)
        self._thread.start()

    def stop(self):
        self._running = False
        if self._thread:
            self._thread.join(timeout=3)

    def query(self, text, k=None):
        results = self.index.search(text, k)
        return [{"doc": d, "score": s} for d, s in results]

    def status(self):
        return {
            "running": self._running,
            "docs":  self.index.count(),
            "updated": self._updated.isoformat() if self._updated else None
        }
