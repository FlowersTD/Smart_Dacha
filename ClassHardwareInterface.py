# Bismillahir Rahmanir Rahim
# Rabbana atina fid-dunya hasanatan 
# wa fil-akhirati hasanatan 
# wa qina 'azaban-nar

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
            'environment': self._environment.get_snapshot() if self._environment else None,
            }
    def __CheckDevice():
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
        

class HardwareInterface:
    __TypeConnectDevice = ["Zigbee","Matter","Cable","WiFi","Ble"]
    __TYPE_SENSOR = 0
    __TYPE_ACTUATOR = 1
    __TYPE_CONTROLLER = 2
    def __init__(self,TypeDevice:int = 0,TypeConnect:int = 0):
        self.__TypeDevice = TypeDevice
        self.__TypeConnect = self.__TypeConnectDevice[TypeConnect]
        self.__State = False
        self.__StatusConnect = True
        self.EnableLimits = True
        self.MinValue = 0
        self.MaxValue = 0
        self.__Value = None
        self.__Device_name=""
    def __setattr__(self, name, value):
        if name == "__Value" and self.__TypeDevice == self.__TYPE_ACTUATOR :
            if self.EnableLimits  and (self.MinValue <= value <= self.MaxValue):
                object.__setattr__(self,name,value)
                print("LOG") 
        elif not(name == "__Value" and self.__TypeDevice == self.__TYPE_SENSOR):
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
    def __init__(self, NewDataSensor:dict = None):
        self.__dict__ = self.__Data if not NewDataSensor else self.NewDataSensor

    def update_from_sensor(self, sensor_data: dict):
        """Обновление данных с датчика"""
        for key, value in sensor_data.items():
            if key in self.__shared_state:
                self.__shared_state[key] = value
        print("LOG")
    
    def get_snapshot(self) -> dict:
        """Получение текущего состояния"""
        return self.__shared_state.copy()
    
    def update_from_web(self, weather_api_data: dict):
        """Обновление данных из веб-сервиса погоды"""
        pass

