from datetime import datetime
from typing import Dict, List, Optional

from config import settings
from pipeline import DataPipeline


class RAGEngine:

    def __init__(self):
        self.pipe = DataPipeline()
        self._model = None
        self._history = []

    def _get_llm(self):
        if self._model is None:
            from langchain_groq import ChatGroq
            self._model = ChatGroq(
                api_key=settings.GROQ_API_KEY,
                model=settings.LLM_MODEL,
                temperature=0.3,
                max_tokens=800,
            )
        return self._model

    def start(self):
        self.pipe.start()

    def stop(self):
        self.pipe.stop()

    def _system_prompt(self):
        now = datetime.now().strftime("%Y-%m-%d %H:%M IST")
        return f"""You are NDRF Disaster Response Assistant for Maharashtra. 

Time: {now}

Role: 
- Provide real-time disaster info for Maharashtra
- Share evacuation routes and safety guidance
- Give NDRF operation updates
- Provide emergency contacts

Rules:
1. Safety first - prioritize life-saving info
2. Be specific - locations, routes, numbers
3. Be concise - emergencies need quick answers
4. Mention data sources
5. Say if info might be outdated

Emergency Numbers:
- NDRF: 011-24363260
- Emergency: 112
- Disaster: 1078"""

    def _context(self, query):
        results = self.pipe.query(query)

        if not results:
            return "No current data.  Providing general guidance."

        parts = []
        for i, r in enumerate(results, 1):
            doc = r["doc"]
            score = r["score"]
            src = doc. get("metadata", {}).get("source", "unknown")
            parts.append(
                f"[{i}.  {src}] (score: {score:.2f})\n{doc['content']}")

        return "\n\n---\n\n".join(parts)

    def ask(self, question):
        ctx = self._context(question)

        prompt = f"""{self._system_prompt()}

---

REAL-TIME DATA: 
{ctx}

---

USER QUESTION:  {question}

Answer based on the data above.  If data is insufficient, provide general safety advice."""

        try:
            llm = self._get_llm()
            response = llm.invoke(prompt)
            answer = response.content
        except Exception as e:
            answer = f"Error: {e}\n\nEmergency contacts:\n- NDRF: 011-24363260\n- Emergency: 112"

        result = {
            "answer": answer,
            "query": question,
            "time": datetime.now().isoformat(),
            "sources": ["NDRF", "NewsAPI"],
            "docs": self.pipe.index.count()
        }

        self._history.append({"q": question[: 80], "t": result["time"]})
        if len(self._history) > 20:
            self._history.pop(0)

        return result

    def status(self):
        ps = self. pipe.status()
        return {
            "status": "running" if ps["running"] else "stopped",
            "docs":  ps["docs"],
            "updated": ps["updated"],
            "queries": len(self._history)
        }

    def refresh(self):
        self.pipe.refresh()
        return {"msg": "refreshed", "docs": self.pipe.index.count()}
