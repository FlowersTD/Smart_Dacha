# Bismillahir Rahmanir Rahim
# Rabbana atina fid-dunya hasanatan 
# wa fil-akhirati hasanatan 
# wa qina 'azaban-nar
class SmartSocketPowerError(Exception):
    """Кастомное исключение для ошибок установки мощности розетки"""
    def __init__(self, value, reason):
        self.value = value
        self.reason = reason
        super().__init__(f"Некорректное значение мощности '{value}': {reason}")
class MainController:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    def __init__(self,config_path: str = ""):
        self.config_path = config_path
        self._Devices = {}
        self._MqttClient = None
        self._WebServer = None
        self._Environment = None
        self.IterValue = -1
    def register_device(self, device: 'HardwareInterface'):
        """Регистрация устройства в системе"""
        DeviceId = f"{device.get_type_name()}_{sum(1 for x in self._Devices.values() if x.get_type_connect() == device.get_type_connect())}"
        self._Devices[DeviceId] = device
        return DeviceId
    def get_system_status(self) -> dict:
        """Получение статуса всей системы"""
        return {
            'devices_count': len(self._Devices),
            'devices_online': sum(1 for d in self._Devices.values() if d.get_connect_status()),
            'environment': self._Environment.get_snapshot() if self._Environment else None,
            }
    def __CheckDevice(self):
        pass
    def __len__(self):
        return len(self._Devices)
    def get_active_connect(self):
        return sum(1 for x in self._Devices.values() if x.get_connect_status())
    def __getitem__(self, key):
        return self._Devices[key] if key in self._Devices else None
    def __next__(self):
        if self.IterValue + 1 < len(self._Devices):
            self.IterValue+=1
            return list(self._Devices)[self.IterValue]
        else:
            raise StopIteration
    def __iter__(self):
       self.IterValue = -1
       return self
    def get_devices_json(self) -> list:
        """Получение JSON-списка"""
        return [device.to_dict() for device in self._Devices.values()]



class HardwareInterface:
    # __TypeConnectDevice = ["Zigbee","Matter","Wired","WiFi","Ble"]
    _TYPE_SENSOR = 0
    _TYPE_ACTUATOR = 1
    _TYPE_CONTROLLER = 2
    _Count = 0
    _CountFavorite = 0 
    _ListLocation = []
    def __init__(self,TypeDevice:int = 0,TypeConnect:str = "Wired",DeviceName: str = "",Location:str = ""):
        HardwareInterface._Count+=1
        self.id = HardwareInterface._Count
        self.__TypeDevice = TypeDevice
        self.__TypeConnect = TypeConnect
        self.__State = False
        self.__StatusConnect = True
        self.EnableLimits = True
        self.MinValue = 0
        self.MaxValue = 0
        self._Device_name=DeviceName
        self._Location = Location
        self.__Favorite  = False
        self._VersionSoftware = ""
        self._TimeWork = ""
        self.__Value = None
    def __setattr__(self, name, value):
        if name == "__Value" and self.__TypeDevice == self._TYPE_ACTUATOR :
            if self.EnableLimits  and (self.MinValue <= value <= self.MaxValue):
                if name=="current_power":
                    if not isinstance(value, (int, float)):
                        raise ValueError(f"Должна быть числом")
                object.__setattr__(self,name,value)
        elif not(name == "__Value" and self.__TypeDevice == self._TYPE_SENSOR):
            object.__setattr__(self,name,value)
    def update_state(self, State):
        """Обновление состояния устройства"""
        if self.__StatusConnect:
            self.__State = State
            print("LOG")
    def get_state(self):
        """Получение текущего состояния"""
        return self.__State
    def get_connect_status(self):
        """Получение статуса подключения"""
        return self.__StatusConnect
    def get_type_name(self):
        return self.__TypeConnect
    def get_type_connect(self):
        return self.__TypeConnect
    def to_dict(self)->dict:
        raise NotImplementedError("Метод to_dict должен быть реализован")
    def get_favorite(self):
        return self.__Favorite
    def set_favorite(self):
        self.__Favorite = not self.__Favorite



class SmartSocket(HardwareInterface):
    def __init__(self, Type_connect: str ,Device_name = None,Location:str = ""):
        if Device_name == None:
            Device_name = f"Розетка {HardwareInterface._Count+1}"
        super().__init__(self._TYPE_ACTUATOR, Type_connect,Device_name,Location)
        self.current_power = 0
        self.__Power = 0
        self.__AutoShutdown = None
        self.__Timer = False
        self.__IP = ""
        self.__MAC = ""
    def __setattr__(self, name, value):
        if isinstance(value, float):
             raise SmartSocketPowerError(value, f"должен быть числом (int/float), получен {type(value).__name__}")
        return super().__setattr__(name, value)
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name":self._Device_name,
            "type": "socket",
            "value":self.get_state(),
            "status":self.get_connect_status(),
            "location":self._Location,
            "connection":self.get_type_name()
        }   
    def set_power(self, power: int = 0):
        """Установка мощности"""
        self.current_power = power
    

class SmartGate(HardwareInterface):
    def __init__(self, Type_connect: str,Device_name = None,Location:str = ""):
        if not Device_name :
            Device_name = f"Ворота {HardwareInterface._Count+1}"
        super().__init__(self._TYPE_ACTUATOR, Type_connect, Device_name,Location)
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name":self._Device_name,
            "type": "gate",
            "value":self.get_state(),
            "status":self.get_connect_status(),
            "location":self._Location,
            "connection":self.get_type_name()
        }    

class EnvironmentState:
    __Data ={
    'temperature_outdoor': 0.0,
    'humidity_outdoor': 0.0,
    'is_raining': False,
    'luminosity': 0.0,
    'time_of_day': "",
    'season': "",
    'pressure': 0.0,
    'wind_speed': 0.0
    }
    def __init__(self, NewDataSensor):
        self.__dict__ = self.__Data if not NewDataSensor else NewDataSensor
        self.__shared_state = []
    def update_from_sensor(self, sensor_data: dict):
        """Обновление данных с датчика"""
        for key, value in sensor_data.items():
            if key in self.__shared_state:
                self.__shared_state[key] = value
        print("LOG")
    
    def get_snapshot(self):
        """Получение текущего состояния"""
        # return self.__shared_state.copy()
        pass
    
    def update_from_web(self, weather_api_data: dict):
        """Обновление данных из веб-сервиса погоды"""
        pass

