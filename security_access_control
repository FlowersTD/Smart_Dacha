#Фабрика пользователей. Класс пользователь с фабричными методами создания ролей и их уровней доступа
class User:
    def __init__(self, name, role, access_level):
        self.name = name
        self.role = role
        self.access_level = access_level

    #Фабричный метод создания администратора
    @classmethod
    def create_admin(cls, name):
        return cls(name, role="admin", access_class = 5)

    #Фабричный метод создания гостя
    @classmethod
    def create_guest(cls, name):
        return cls(name, role="guest", access_class = 1)

    def __str__ (self):
        return f"User(name={self.name}, role={self.role}, access_level={self.access_level})"


#Панель охраны. Класс панели охраны с с защещённым пинкодом и статусом системы
class SecurityPanel:
    def __init__(self, pin_code):
        self.__pin_code = pin_code
        self.__status = "Disarmed"

    #Включение охраны с проверкой пин кода
    def arm_system(self, pin):
        if pin == self.__pin_code:
            self.__status = "Armed"
            print("Охрана включена")
        else:
            print("Неверный PIN-код. Охрана не включена")

    #Выключение охраны с проверкой пин кода
    def disarm_system(self, pin):
        if pin == self.__pin_code:
            self.__status = "Disarmed"
            print("Охрана выключена")
        else:
            print("Неверный PIN-код. Охрана не выключена")

    #Смена пин кода
    def change_pin(self, old_pin, new_pin):
        if old_pin == self.__pin_code:
            self.__pin_code = new_pin
            print("PIn-код успешно изменён")
            return True
        else:
            print("Неверный текущий PIN код")
            return False

    #Геттер для статуса системы
    @property
    def status (self):
        return self.__status

    #Запрет на прямое изменение статуса
    @status.setter
    def status(self, val):
        raise AttributeError("Нельзя изменить статус напрямую. Используйте метод arm_system или disarm_system с паролем")

#Журнал доступа. 
class Session:
    def __init__ (self, user, login_time, logout_time = None): #Предположим, что время передаётся как: год:месяц:день - час:минута
        self.user = user
        self.login_time = login_time
        self.login_time = logout_time
        print(f"{self.login_time}. Пользователь {user.name} вошёл в систему управления")

    def __del__(self):
        if logout_time == None:
            print ("Ошибка. Не указана дата выхода")
        else:
            logout_time = logout_time
            print (f"{logout_time}. Сессия {self.user.name} завершена")

