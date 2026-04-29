from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from ClassHardwareInterface import *
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MainDevices = MainController()
MainDevices.register_device(SmartSocket(3,Location="Сарай"))
MainDevices.register_device(SmartSocket(2,Location="Сарай"))

@app.get("/api/devices")
async def get_data():
    return MainDevices.get_devices_json()