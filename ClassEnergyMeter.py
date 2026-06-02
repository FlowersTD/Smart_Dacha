# Кастомное исключение для счетчика энергии
class EnergyMeterError(Exception):
    #Исключение для ошибок EnergyMeter
    pass
import json
from typing import Optional, List


class EnergyMeter:
    def __init__(self, a):
        object.__setattr__(self, "_EnergyMeter__kwh", a)

    @property
    def kWh(self):
        # для чтения значения счетчика
        return self._EnergyMeter__kwh

    def __setattr__(self, key, value):
        if key == "_EnergyMeter__kwh":
            # Защита от уменьшения показаний счетчика
            if hasattr(self, "_EnergyMeter__kwh"):
                if value <= self._EnergyMeter__kwh:
                    raise EnergyMeterError("Нельзя уменьшить показания счетчика!")
            object.__setattr__(self, key, value)
        else:
            object.__setattr__(self, key, value)

    def __delattr__(self, key):
        if key == "_EnergyMeter__kwh":
            raise EnergyMeterError("Невозможно удалить атрибут счетчика кВт/ч")
        else:
            object.__delattr__(self, key)

    @staticmethod
    def calculate_cost(kWh, tariff_type):
        #метод расчета стоимости электроэнергии по тарифу
        if tariff_type == "Ночь":
            return kWh * 1.2
        elif tariff_type == "День":
            return kWh * 1.1
        else:
            return kWh * 1.15  #стандартный тариф
        
    #Формирует словарь
    def to_dict(self, tariff_type="День"):
        return {
            "current_kwh": self.kWh,
            "cost_rubles": self.calculate_cost(self.kWh, tariff_type)
        }


#Профили растений
from dataclasses import dataclass

@dataclass
class PlantProfile:
    name: str
    min_humidity: int
    max_humidity: int

    #Формирует словарь
    def to_dict(self):
        return {
            "name": self.name,
            "min_humidity": self.min_humidity,
            "max_humidity": self.max_humidity
        }


class EventLogger:
    __shared_state = {
        'logs': []
    }

    def __init__(self):
        self.logs = None
        self.__dict__ = self.__shared_state

    def add_log(self, id:int, type: str, message: str, device: str, time: str, timestamp: str):
        log_entry = {
            "id": id,
            "type": type,
            "message": message,
            "device": device,
            "time": time,
            "timestamp": timestamp
        }
        self.logs.append(log_entry)

    def get_logs_as_dict(self, limit: int = 50):
        if limit > 0:
            return self.logs[-limit:]
        else:
            return self.logs

    def save_to_json(self, filename: str, limit: Optional[int] = None):
        logs_to_save = self.get_logs_as_dict(limit) if limit else self.logs
        with open(filename, "w",encoding = "utf-8") as f:
            json.dump(logs_to_save, f, ensure_ascii=False, indent=4)

    def load_from_json(self, filename: str):
        with open(filename, "r", encoding = "utf-8") as f:
            self.logs = json.load(f)

    def clear_logs(self):
        self.logs.clear()