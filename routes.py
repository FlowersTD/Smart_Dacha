@app.get("/api/devices")
async def get_data():
    return MainDevices.get_devices_json()
