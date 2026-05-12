# Кастомное исключение для счетчика энергии
class EnergyMeterError(Exception):
    #Исключение для ошибок EnergyMeter
    pass


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
    __shared_attrs = {
        'data': [],
        'date': [],
        'info': []
    }

    def __init__(self):
        self.__dict__ = self.__shared_attrs

    def get_log(self):
        return self.info

    def add_log(self, event, date):
        self.data.append(event)
        self.date.append(date)
        self.info.append(date + ' - ' + event)
