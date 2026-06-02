@app.get("/api/devices")
async def get_data():
    return MainDevices.get_devices_json()
@app.get("/api/eventlogger")
async def get_logs():
    return EventLogger.get_logs_as_dict()

