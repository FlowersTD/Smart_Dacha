from ClassHardwareInterface import *

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MainDevices = MainController()
MainDevices.register_device(SmartSocket("Wired",Location="Сарай"))
MainDevices.register_device(SmartSocket("WiFi",Location="Сарай"))
# MainDevices.__getitem__("WiFi_0").set_power(1.02)

@app.get("/api/devices")
async def get_data():
    return MainDevices.get_devices_json()