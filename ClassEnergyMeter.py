class EnergyMeter:
    def __init__(self, a):
        object.__setattr__(self, "kWh", a)

    def __setattr__(self, key, value):
        if key == "kWh":
            if value <= self.kWh:
                raise ValueError("Недопустимое значение")
            else:
                object.__setattr__(self, key, value)

    def __delattr__(self, key):
        if key == "kWh":
            raise KeyError("Невозможно удаления аттрибута кВт/ч")

    @staticmethod
    def calculate_cost(kWh, tariff_type):
        if tariff_type == "night":
            return kWh * 1.2
        elif tariff_type == "day":
            return kWh * 1.1


class EventLogger:
    __shared_attrs = {
        'data' : [],
        'date' : [],
        'info' : []
    }

    def __init__(self):
        self.__dict__ = self.__shared_attrs

    def get_log(self):
        return self.info

    def add_log(self, event, date):
        self.data.append(event)
        self.date.append(date)
        self.info.append(date + ' - ' + event)





en = EnergyMeter(15)
print(en.kWh)
en.kWh = 30
print(en.kWh)
en.kWh = 40
print(en.kWh)
print(en.calculate_cost(en.kWh, "night"))
print(en.calculate_cost(en.kWh, "day"))
print('---------------------')
log = EventLogger()
log.add_log('soil contamination', '12.03.2026')
print(log.get_log())
log2 = EventLogger()
log2.add_log('soil refreshened', '13.03.2026')
print(log2.get_log())

