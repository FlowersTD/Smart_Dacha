from security_access_control import User, SecurityPanel
from functools import warps

#Установка текущей сесии? (скорее всего будет более сложная ситема аутентификации)
def set_cur_session(session):
    global cur_session
    current_session = session

#Декоратор для проверки прав администратора
def requires_admin(func):
    @wraps(func)
    def wrapper (*args, **kwds):
        global current_session
        if current_session:
            if current_session.user.role == "admin":
                return func(*args, **kwds)
            else:
                print("Access Denied: Требуются права администратора")
                return None
        else:
            print("Access Denied: Нет активной сессии")
            return None
    return wrapper

#Наследование класса для версии SecurityPanel с магическим методом __call__
class ProtectSecurityPanel(SecurityPanel):
    @requires_admin
    def change_pin(self, old_pin, new_pin):
        return super().change_pin(old_pin, new_pin)

    def __call__(self, pin_code):
        if self.SecurityPanel__pin_code == pin_code:
            if self.status == "Armed":
                self.disarm_system(pin_code)
            else:
                self.arm_system(pin_code)
        else:
            print("Невереый ПИН-код. Операция переключения не выполнена")
        
        return self.status