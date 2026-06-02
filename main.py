from ClassEnergyMeter import EventLogger
from ClassHardwareInterface import *
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MainDevices = MainController()
MainDevices.register_device(SmartSocket("Wired",Location="Сарай"))
MainDevices.register_device(SmartSocket("WiFi",Location="Сарай"))
# MainDevices.__getitem__("WiFi_0").set_power(1.02)

EventLogger = EventLogger()
LOG_FILE = "event_logs.json"

@app.post("/api/eventlogger/load")
async def load_logs():
    try:
        if os.path.exists(LOG_FILE):
            EventLogger.load_from_json(LOG_FILE)
            return {"status": "success", "message": f"Загружено логов: {len(EventLogger.get_logs_as_dict())}"}
        else:
            raise HTTPException(status_code=404, detail=f"Файл {LOG_FILE} не найден")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка загрузки: {e}")

@app.post("/api/eventlogger/save")
async def save_logs():
    try:
        EventLogger.save_to_json(LsOG_FILE)
        return {"status": "success", "message": f"Логи сохранены в {LOG_FILE}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения: {e}")

EventLogger.add_log(1, "error", "no device found", "tracker", "3 hours ago", "02.06.2026 11:33")

load_logs()

@app.get("/api/devices")
async def get_data():
    return MainDevices.get_devices_json()
@app.get("/api/eventlogger")
async def get_logs():
    return EventLogger.get_logs_as_dict()