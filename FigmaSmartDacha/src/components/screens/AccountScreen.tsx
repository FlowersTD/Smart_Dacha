import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, Settings, LogOut, Activity, Clock, Eye, EyeOff, Key, Smartphone, Laptop, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function AccountScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Аккаунт</h1>
          <p className="text-zinc-400">Управление профилем и настройками</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Выйти
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex gap-2 bg-zinc-900 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-900/30 to-zinc-800 rounded-xl p-6 border border-zinc-700">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-zinc-100 mb-1">Иван Петров</h2>
            <p className="text-zinc-400 mb-4">Владелец системы "Умная дача"</p>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
              >
                Изменить фото
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg transition-colors"
              >
                Удалить фото
              </motion.button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-500 mb-1">Участник с</div>
            <div className="text-zinc-100">15 янва��я 2024</div>
            <div className="text-2xl text-emerald-400 mt-2">342 дня</div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" />
          Личная информация
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Имя</label>
            <input
              type="text"
              defaultValue="Иван"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Фамилия</label>
            <input
              type="text"
              defaultValue="Петров"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Email</label>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2">
              <Mail className="w-4 h-4 text-zinc-500" />
              <input
                type="email"
                defaultValue="ivan@dacha.ru"
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none"
              />
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Телефон</label>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2">
              <Phone className="w-4 h-4 text-zinc-500" />
              <input
                type="tel"
                defaultValue="+7 (999) 123-45-67"
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-zinc-500 mb-2 block">Местоположение</label>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                defaultValue="Московская область, Россия"
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors"
        >
          Сохранить изменения
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <span className="text-zinc-400">Устройств</span>
          </div>
          <div className="text-3xl text-zinc-100">8</div>
        </div>
        <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-zinc-400">Скриптов</span>
          </div>
          <div className="text-3xl text-zinc-100">12</div>
        </div>
        <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-zinc-400">Время работы</span>
          </div>
          <div className="text-3xl text-zinc-100">342 д</div>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      {/* Password Section */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-emerald-400" />
          Пароль и аутентификация
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Текущий пароль</label>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите текущий пароль"
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-zinc-500" />
                ) : (
                  <Eye className="w-4 h-4 text-zinc-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Новый пароль</label>
            <input
              type="password"
              placeholder="Введите новый пароль"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Подтвердите пароль</label>
            <input
              type="password"
              placeholder="Повторите новый пароль"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors"
        >
          Изменить пароль
        </motion.button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl text-zinc-100 mb-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Двухфакторная аутентификация
            </h3>
            <p className="text-sm text-zinc-400">Дополнительный уровень защиты вашего аккаунта</p>
          </div>
          <div className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-600/40">
            Включено
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-zinc-100">SMS на телефон</div>
                <div className="text-sm text-zinc-500">+7 (999) ***-**-67</div>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-zinc-100">Приложение-аутентификатор</div>
                <div className="text-sm text-zinc-500">Google Authenticator</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Настроить
            </motion.button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-emerald-400" />
          Активные сеансы
        </h3>
        <div className="space-y-3">
          {[
            { device: 'Панель управления', location: 'Московская обл.', time: 'Активен сейчас', current: true },
            { device: 'iPhone 13', location: 'Московская обл.', time: '2 часа назад', current: false },
            { device: 'Windows PC', location: 'Москва', time: '1 день назад', current: false },
          ].map((session, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                session.current ? 'bg-emerald-900/20 border border-emerald-600/30' : 'bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-zinc-500" />
                <div>
                  <div className="text-zinc-100 flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded-full">
                        Текущий
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {session.location} • {session.time}
                  </div>
                </div>
              </div>
              {!session.current && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Завершить
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notificationSettings = [
    { id: 'email', label: 'Email уведомления', description: 'Получать уведомления на почту', enabled: true },
    { id: 'push', label: 'Push уведомления', description: 'Уведомления на устройство', enabled: true },
    { id: 'device_alerts', label: 'Уведомления устройств', description: 'Предупреждения о проблемах', enabled: true },
    { id: 'script_alerts', label: 'Уведомления скриптов', description: 'Информация о выполнении скриптов', enabled: false },
    { id: 'weekly_report', label: 'Еженедельные отчеты', description: 'Статистика за неделю', enabled: true },
    { id: 'news', label: 'Новости и обновления', description: 'Информация о новых функциях', enabled: false },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-400" />
          Настройки уведомлений
        </h3>
        <div className="space-y-3">
          {notificationSettings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg"
            >
              <div className="flex-1">
                <div className="text-zinc-100 mb-1">{setting.label}</div>
                <div className="text-sm text-zinc-500">{setting.description}</div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Schedule */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Расписание уведомлений
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Не беспокоить с</label>
            <input
              type="time"
              defaultValue="23:00"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Не беспокоить до</label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}