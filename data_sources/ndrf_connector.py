from datetime import datetime
from typing import List, Dict

from config import settings


class NDRFConnector:
    
    def __init__(self):
        self._cache: List[Dict] = []
    
    def fetch(self) -> List[Dict]:
        alerts = self._get_alerts()
        self._cache = alerts
        return alerts
    
    def _get_alerts(self) -> List[Dict]:
        ts = datetime.now().strftime("%Y-%m-%d %H:%M")
        
        return [
            {
                "id": "ndrf_sholapur_001",
                "content": f"""NDRF ALERT - FLOOD RESCUE
========================
Operation: Sholapur District Flood Response
Status:  ACTIVE | Severity: HIGH
Updated: {ts}

Location: 
- District: Sholapur
- Areas: Akkalkot, Barshi, Karmala

Deployment:
- Teams: 3 battalions (90 personnel)
- Rescued: 156 people
- Evacuated: 450+

Evacuation Routes:
- NH52 to Pune:  OPEN
- SH10 to Osmanabad: RESTRICTED
- Via Tuljapur: CLOSED

Contacts:
- NDRF:  011-24363260
- District: 02182-222222
- Emergency: 112""",
                "metadata": {
                    "source": "ndrf",
                    "region": "Sholapur",
                    "type": "flood",
                    "status": "active"
                }
            },
            {
                "id":  "ndrf_ratnagiri_001",
                "content":  f"""NDRF ALERT - LANDSLIDE RESPONSE
================================
Operation: Ratnagiri Landslide Search & Rescue
Status: ACTIVE | Severity: CRITICAL
Updated:  {ts}

Location:
- District: Ratnagiri
- Areas: Chiplun, Khed, Dapoli

Deployment:
- Teams: 2 battalions (60 personnel)
- Rescued: 28 people
- Missing: 5 (search ongoing)

Evacuation Routes: 
- NH66 Mumbai-Goa: PARTIAL
- Via Kolhapur: RECOMMENDED
- Coastal roads: AVOID

Contacts:
- NDRF: 011-24363260
- Ratnagiri: 02352-222333
- Emergency: 112""",
                "metadata": {
                    "source": "ndrf",
                    "region": "Ratnagiri",
                    "type": "landslide",
                    "status": "active"
                }
            },
            {
                "id":  "ndrf_mumbai_001",
                "content": f"""NDRF ADVISORY - MUMBAI REGION
==============================
Type: Monsoon Preparedness
Status: STANDBY
Updated: {ts}

Coverage:  Mumbai, Thane, Raigad

Readiness:
- Teams: 4 battalions on standby
- Locations:  Andheri, Thane, Panvel

Known Problem Areas:
- Hindmata, King Circle, Sion
- Andheri Subway, Milan Subway
- Kurla, Chunabhatti

Contacts:
- BMC: 1916
- NDRF: 011-24363260
- Emergency: 112""",
                "metadata": {
                    "source": "ndrf",
                    "region": "Mumbai",
                    "type": "advisory",
                    "status": "standby"
                }
            },
            {
                "id": "ndrf_kolhapur_001",
                "content": f"""NDRF ALERT - FLOOD WATCH
========================
Operation: Kolhapur Monitoring
Status: MONITORING | Severity: MODERATE
Updated: {ts}

Location:
- District: Kolhapur
- Watch:  Panchganga basin, Shirol

Status:
- Water level: Near warning
- Teams ready: 2 battalions

Routes:
- Kolhapur-Sangli: OPEN
- Kolhapur-Belgaum: OPEN
- Low bridges: CAUTION

Contact:  0231-2652222""",
                "metadata": {
                    "source": "ndrf",
                    "region": "Kolhapur",
                    "type": "flood",
                    "status": "monitoring"
                }
            }
        ]