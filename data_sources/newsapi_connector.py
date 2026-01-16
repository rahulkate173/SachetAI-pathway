import requests
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Optional

from config import settings


class NewsConnector:
    
    def __init__(self):
        self.api_key = settings.NEWSAPI_KEY
        self.url = "https://newsapi.org/v2/everything"
        self._cache:  List[Dict] = []
    
    def _query(self) -> str:
        kw = ["flood", "landslide", "NDRF", "rescue", "disaster"]
        loc = ["Mumbai", "Pune", "Sholapur", "Kolhapur", "Ratnagiri"]
        return f"({' OR '.join(kw)}) AND (Maharashtra OR {' OR '.join(loc)})"
    
    def _hash(self, s: str) -> str:
        return hashlib.md5(s.encode()).hexdigest()[:8]
    
    def fetch(self) -> List[Dict]:
        if not self.api_key:
            return self._samples()
        
        try:
            since = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
            params = {
                "q": self._query(),
                "from": since,
                "sortBy": "publishedAt",
                "language": "en",
                "apiKey": self.api_key,
                "pageSize": 50
            }
            
            resp = requests.get(self.url, params=params, timeout=10)
            resp.raise_for_status()
            
            items = resp.json().get("articles", [])
            docs = []
            
            for item in items[: settings.MAX_DOCS // 2]:
                doc = self._parse(item)
                if doc:
                    docs.append(doc)
            
            self._cache = docs
            return docs
            
        except Exception as e:
            print(f"[news] fetch error: {e}")
            return self._cache if self._cache else self._samples()
    
    def _parse(self, item: Dict) -> Optional[Dict]:
        title = item.get("title", "")
        if not title:
            return None
        
        desc = item.get("description", "") or ""
        content = item.get("content", "") or ""
        text = f"{title} {desc}".lower()
        
        dtype = "general"
        for t in ["flood", "landslide", "cyclone", "rescue"]:
            if t in text: 
                dtype = t
                break
        
        region = "Maharashtra"
        for d in settings.DISTRICTS:
            if d. lower() in text:
                region = d
                break
        
        body = f"""NEWS:  {title}
Source: {item.get('source', {}).get('name', 'Unknown')}
Date: {item.get('publishedAt', '')[:10]}
Region: {region} | Type: {dtype}

{desc}

{content[: 400] if content else ''}"""
        
        return {
            "id": f"news_{self._hash(item. get('url', title))}",
            "content": body. strip(),
            "metadata": {
                "source": "newsapi",
                "region": region,
                "type":  dtype,
                "url": item.get("url", "")
            }
        }
    
    def _samples(self) -> List[Dict]:
        return [
            {
                "id": "news_sample_1",
                "content": """NEWS:  NDRF conducts flood rescue in Sholapur district
Source: Local News
Date: 2026-01-16
Region:  Sholapur | Type: flood

NDRF teams deployed for flood rescue operations.  Multiple teams conducting evacuation in affected villages. 
Emergency helpline: 011-24363260""",
                "metadata": {"source": "sample", "region": "Sholapur", "type": "flood"}
            },
            {
                "id": "news_sample_2",
                "content": """NEWS: Landslide warning for Ratnagiri after heavy rain
Source: Local News
Date:  2026-01-16
Region: Ratnagiri | Type: landslide

Heavy rainfall triggers landslide alert.  Residents advised to stay away from hill slopes. 
Evacuation route: NH66 towards Kolhapur.""",
                "metadata": {"source": "sample", "region": "Ratnagiri", "type": "landslide"}
            }
        ]