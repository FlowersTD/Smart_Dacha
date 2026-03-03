import { Bell, Lock, Palette, Database, Wifi, Shield, Moon, Sun, Volume2, Smartphone, Zap, Globe, Clock, MapPin, Thermometer, Droplets, Wind, Camera, Power, Monitor, HardDrive, Cpu, Settings as SettingsIcon, Save, RotateCcw, Download, Upload, Trash2, User, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function SettingsScreen() {
  const [activeCategory, setActiveCategory] = useState('system');

  const categories = [
    { id: 'system', label: 'Система', icon: SettingsIcon },
    { id: 'devices', label: 'Устройства', icon: Monitor },
    { id: 'automation', label: 'Автоматизация', icon: Zap },
    { id: 'network', label: 'Сеть', icon: Wifi },
    { id: 'display', label: 'Дисплей', icon: Palette },
    { id: 'data', label: 'Данные', icon: Database },
    { id: 'activity', label: 'История активности', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'system':
        return <SystemSettings />;
      case 'devices':
        return <DevicesSettings />;
      case 'automation':
        return <AutomationSettings />;
      case 'network':
        return <NetworkSettings />;
      case 'display':
        return <DisplaySettings />;
      case 'data':
        return <DataSettings />;
      case 'activity':
        return <ActivitySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex gap-4 p-6 overflow-hidden">
      {/* Left Sidebar - Categories */}
      <div className="w-64 flex flex-col gap-2">
        <div className="mb-4">
          <h1 className="text-3xl text-emerald-400 mb-1">Настройки</h1>
          <p className="text-zinc-400">Конфигурация системы</p>
        </div>
        
        <div className="flex-1 space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 border border-zinc-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* System Info */}
        <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Версия</span>
            <span className="text-sm text-zinc-100">v2.4.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Обновлено</span>
            <span className="text-sm text-zinc-100">15.12.2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Память</span>
            <span className="text-sm text-emerald-400">3.4/8 ГБ</span>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

function SystemSettings() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [energySaving, setEnergySaving] = useState(false);

  return (
    <div className="space-y-4">
      {/* System Performance */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          Производительность системы
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-500">Процессор</span>
            </div>
            <div className="text-2xl text-zinc-100 mb-1">24%</div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-500">Память</span>
            </div>
            <div className="text-2xl text-zinc-100 mb-1">42%</div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '42%' }} />
            </div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-500">Диск</span>
            </div>
            <div className="text-2xl text-zinc-100 mb-1">18%</div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '18%' }} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <ToggleItem
            label="Режим энергосбережения"
            description="Снижение производительности для экономии энергии"
            enabled={energySaving}
            onChange={() => setEnergySaving(!energySaving)}
          />
          <ToggleItem
            label="Режим отладки"
            description="Расширенное логирование для диагностики"
            enabled={debugMode}
            onChange={() => setDebugMode(!debugMode)}
          />
        </div>
      </div>

      {/* Updates & Maintenance */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-400" />
          Обновления и обслуживание
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Автоматические обновления"
            description="Устанавливать обновления системы автоматически"
            enabled={autoUpdate}
            onChange={() => setAutoUpdate(!autoUpdate)}
          />
          <ToggleItem
            label="Автоматическое резервирование"
            description="Создавать резервные копии каждый день в 03:00"
            enabled={autoBackup}
            onChange={() => setAutoBackup(!autoBackup)}
          />
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-zinc-100 mb-1">Последнее обновление</div>
              <div className="text-sm text-zinc-500">15 декабря 2024, 14:32</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
            >
              Проверить обновления
            </motion.button>
          </div>
        </div>
      </div>

      {/* Time & Date */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Дата и время
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Часовой пояс</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>GMT+3 (Москва)</option>
              <option>GMT+0 (UTC)</option>
              <option>GMT-5 (Нью-Йорк)</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Формат времени</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>24-часовой</option>
              <option>12-часовой (AM/PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevicesSettings() {
  const [autoDiscovery, setAutoDiscovery] = useState(true);
  const [deviceNotifications, setDeviceNotifications] = useState(true);

  const devices = [
    { name: 'Датчик температуры', type: 'Температура', status: 'online', lastSeen: '1 мин назад', icon: Thermometer, color: 'text-orange-400' },
    { name: 'Датчик влажности', type: 'Влажность', status: 'online', lastSeen: '2 мин назад', icon: Droplets, color: 'text-blue-400' },
    { name: 'Камера безопасности', type: 'Камера', status: 'online', lastSeen: '30 сек назад', icon: Camera, color: 'text-purple-400' },
    { name: 'Система вентиляции', type: 'Вентиляция', status: 'online', lastSeen: '5 мин назад', icon: Wind, color: 'text-cyan-400' },
    { name: 'Модуль питания', type: 'Питание', status: 'offline', lastSeen: '2 часа назад', icon: Power, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Device Discovery */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-emerald-400" />
          Обнаружение устройств
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Автоматическое обнаружение"
            description="Автоматически находить новые устройства в сети"
            enabled={autoDiscovery}
            onChange={() => setAutoDiscovery(!autoDiscovery)}
          />
          <ToggleItem
            label="Уведомления об устройствах"
            description="Оповещать о подключении/отключении устройств"
            enabled={deviceNotifications}
            onChange={() => setDeviceNotifications(!deviceNotifications)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg transition-colors"
        >
          Сканировать сеть
        </motion.button>
      </div>

      {/* Connected Devices */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Подключенные устройства</h3>
        <div className="space-y-2">
          {devices.map((device, index) => {
            const Icon = device.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg hover:bg-zinc-850 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800 border border-zinc-700`}>
                    <Icon className={`w-5 h-5 ${device.color}`} />
                  </div>
                  <div>
                    <div className="text-zinc-100 mb-1">{device.name}</div>
                    <div className="text-sm text-zinc-500">{device.type} • {device.lastSeen}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    device.status === 'online' 
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40'
                      : 'bg-red-600/20 text-red-400 border border-red-600/40'
                  }`}>
                    {device.status === 'online' ? 'Онлайн' : 'Офлайн'}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-zinc-400 hover:text-zinc-100"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Device Limits */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Лимиты устройств</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Максимум одновременных подключений</span>
              <span className="text-zinc-100">5 из 10</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationSettings() {
  const [enableScripts, setEnableScripts] = useState(true);
  const [scriptNotifications, setScriptNotifications] = useState(true);
  const [autoRestart, setAutoRestart] = useState(false);

  return (
    <div className="space-y-4">
      {/* Automation Control */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          Управление автоматизацией
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Включить автоматизацию"
            description="Разрешить выполнение всех скриптов и сценариев"
            enabled={enableScripts}
            onChange={() => setEnableScripts(!enableScripts)}
          />
          <ToggleItem
            label="Уведомления о скриптах"
            description="Получать уведомления о выполнении скриптов"
            enabled={scriptNotifications}
            onChange={() => setScriptNotifications(!scriptNotifications)}
          />
          <ToggleItem
            label="Автоперезапуск при ошибках"
            description="Автоматически перезапускать упавшие скрипты"
            enabled={autoRestart}
            onChange={() => setAutoRestart(!autoRestart)}
          />
        </div>
      </div>

      {/* Script Execution Settings */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Параметры выполнения</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Максимальное время выполнения</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>30 секунд</option>
              <option>1 минута</option>
              <option>5 минут</option>
              <option>15 минут</option>
              <option>Без ограничений</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Максимум параллельных скриптов</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>3</option>
              <option>5</option>
              <option>10</option>
              <option>Без ограничений</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Приоритет выполнения</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>Низкий</option>
              <option>Средний</option>
              <option>Высокий</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Задержка между запусками</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>Нет</option>
              <option>1 секунда</option>
              <option>5 секунд</option>
              <option>10 секунд</option>
            </select>
          </div>
        </div>
      </div>

      {/* Triggers */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Триггеры автоматизации</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'По времени', count: 8, color: 'bg-blue-600/20 text-blue-400 border-blue-600/40' },
            { label: 'По событию', count: 12, color: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/40' },
            { label: 'По условию', count: 5, color: 'bg-purple-600/20 text-purple-400 border-purple-600/40' },
            { label: 'Вручную', count: 3, color: 'bg-orange-600/20 text-orange-400 border-orange-600/40' },
          ].map((trigger, index) => (
            <div key={index} className="bg-zinc-900 rounded-lg p-4">
              <div className="text-zinc-400 text-sm mb-2">{trigger.label}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl text-zinc-100">{trigger.count}</div>
                <div className={`px-3 py-1 rounded-full text-xs border ${trigger.color}`}>
                  Активных
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NetworkSettings() {
  const [wifi, setWifi] = useState(true);
  const [ethernet, setEthernet] = useState(true);
  const [vpn, setVpn] = useState(false);
  const [firewall, setFirewall] = useState(true);

  return (
    <div className="space-y-4">
      {/* Network Interfaces */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-emerald-400" />
          Сетевые интерфейсы
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Wi-Fi"
            description="192.168.1.100 • Подключено к 'Dacha-WiFi'"
            enabled={wifi}
            onChange={() => setWifi(!wifi)}
          />
          <ToggleItem
            label="Ethernet"
            description="192.168.1.101 • 1000 Mbps"
            enabled={ethernet}
            onChange={() => setEthernet(!ethernet)}
          />
        </div>
      </div>

      {/* Security */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Безопасность сети
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Брандмауэр"
            description="Защита от несанкционированного доступа"
            enabled={firewall}
            onChange={() => setFirewall(!firewall)}
          />
          <ToggleItem
            label="VPN соединение"
            description="Защищенный канал связи для удаленного доступа"
            enabled={vpn}
            onChange={() => setVpn(!vpn)}
          />
        </div>
      </div>

      {/* Port Configuration */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Конфигурация портов</h3>
        <div className="space-y-3">
          {[
            { port: '8080', service: 'Web интерфейс', status: 'Открыт' },
            { port: '22', service: 'SSH', status: 'Открыт' },
            { port: '443', service: 'HTTPS', status: 'Открыт' },
            { port: '1883', service: 'MQTT', status: 'Закрыт' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-zinc-100">Порт {item.port}</div>
                <div className="text-sm text-zinc-500">{item.service}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                item.status === 'Открыт'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40'
                  : 'bg-zinc-700 text-zinc-400 border border-zinc-600'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Settings */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">DNS серверы</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Первичный DNS</label>
            <input
              type="text"
              defaultValue="8.8.8.8"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Вторичный DNS</label>
            <input
              type="text"
              defaultValue="8.8.4.4"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplaySettings() {
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  return (
    <div className="space-y-4">
      {/* Theme */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-emerald-400" />
          Тема оформления
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Темная', selected: true, preview: 'bg-zinc-900' },
            { name: 'Свтлая', selected: false, preview: 'bg-zinc-100' },
            { name: 'Авто', selected: false, preview: 'bg-gradient-to-r from-zinc-900 to-zinc-100' },
          ].map((theme, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme.selected
                  ? 'border-emerald-600 bg-emerald-600/10'
                  : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
              }`}
            >
              <div className={`w-full h-16 rounded-lg mb-3 ${theme.preview}`} />
              <div className="text-zinc-100 text-sm">{theme.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-emerald-400" />
          Параметры отображения
        </h3>
        <div className="space-y-3">
          <ToggleItem
            label="Анимации интерфейса"
            description="Плавные переходы и эффекты"
            enabled={animations}
            onChange={() => setAnimations(!animations)}
          />
          <ToggleItem
            label="Компактный режим"
            description="Уменьшить размер элементов интерфейса"
            enabled={compactMode}
            onChange={() => setCompactMode(!compactMode)}
          />
          <ToggleItem
            label="Показывать подсказки"
            description="Всплывающие подсказки при наведении"
            enabled={showTooltips}
            onChange={() => setShowTooltips(!showTooltips)}
          />
        </div>
      </div>

      {/* Screen Settings */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Параметры экрана</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-500">Яркость экрана</label>
              <span className="text-zinc-100">85%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="85"
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Разрешение экрана</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>1024x600 (Текущее)</option>
              <option>1920x1080</option>
              <option>1280x720</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-2 block">Поворот экрана</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-emerald-600 focus:outline-none">
              <option>Альбомная (Текущая)</option>
              <option>Портретная</option>
              <option>Альбомная перевернутая</option>
              <option>Портретная перевернутая</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Цветовая схема</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Изумруд', color: 'bg-emerald-600', selected: true },
            { name: 'Синий', color: 'bg-blue-600', selected: false },
            { name: 'Фиолетовый', color: 'bg-purple-600', selected: false },
            { name: 'Янтарь', color: 'bg-amber-600', selected: false },
          ].map((scheme, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                scheme.selected
                  ? 'border-emerald-600'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              <div className={`w-full h-12 rounded-lg ${scheme.color} mb-2`} />
              <div className="text-zinc-100 text-sm">{scheme.name}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataSettings() {
  return (
    <div className="space-y-4">
      {/* Backup */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          Резервное копирование
        </h3>
        <div className="bg-zinc-900 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-zinc-100 mb-1">Последняя резервная копия</div>
              <div className="text-sm text-zinc-500">20 декабря 2024, 03:00</div>
            </div>
            <div className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-600/40">
              Успешно
            </div>
          </div>
          <div className="text-sm text-zinc-500">Размер: 2.4 ГБ • Хранится: 7 резервных копий</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Создать копию
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-700 hover:bg-zinc-600 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Восстановить
          </motion.button>
        </div>
      </div>

      {/* Storage */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-emerald-400" />
          Хранилище данных
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Конфигурация системы', size: '12 МБ', color: 'bg-blue-500' },
            { label: 'Данные устройств', size: '340 МБ', color: 'bg-emerald-500' },
            { label: 'Логи и журналы', size: '180 МБ', color: 'bg-purple-500' },
            { label: 'Резервные копии', size: '2.4 ГБ', color: 'bg-orange-500' },
            { label: 'Медиафайлы', size: '520 МБ', color: 'bg-pink-500' },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400">{item.label}</span>
                <span className="text-zinc-100">{item.size}</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2">
                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${Math.random() * 60 + 20}%` }} />
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-zinc-100">Всего использовано</span>
              <span className="text-emerald-400 text-xl">3.4 ГБ из 8 ГБ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Import / Export */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4">Импорт и экспорт</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900 hover:bg-zinc-850 p-4 rounded-lg border border-zinc-700 transition-colors"
          >
            <Upload className="w-6 h-6 text-emerald-400 mb-2" />
            <div className="text-zinc-100 mb-1">Импорт данных</div>
            <div className="text-sm text-zinc-500">Загрузить конфигурацию</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900 hover:bg-zinc-850 p-4 rounded-lg border border-zinc-700 transition-colors"
          >
            <Download className="w-6 h-6 text-blue-400 mb-2" />
            <div className="text-zinc-100 mb-1">Экспорт данных</div>
            <div className="text-sm text-zinc-500">Скачать все данные</div>
          </motion.button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 rounded-xl p-6 border border-red-700/40">
        <h3 className="text-xl text-red-400 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Опасная зона
        </h3>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-zinc-900 hover:bg-zinc-850 p-4 rounded-lg border border-zinc-700 transition-colors text-left"
          >
            <div className="text-zinc-100 mb-1">Очистить кэш</div>
            <div className="text-sm text-zinc-500">Освободить временные файлы</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-900/30 hover:bg-red-900/40 p-4 rounded-lg border border-red-700/40 transition-colors text-left"
          >
            <div className="text-red-400 mb-1">Сброс к заводским настройкам</div>
            <div className="text-sm text-red-500/70">Удалить все данные и настройки</div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ActivitySettings() {
  return (
    <div className="space-y-4">
      {/* Activity Log */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-xl text-zinc-100 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Журнал активности
        </h3>
        <div className="space-y-3">
          {[
            { date: '15.12.2024', time: '14:32', action: 'Обновление системы', user: 'JohnDoe' },
            { date: '14.12.2024', time: '09:45', action: 'Создание резервной копии', user: 'JohnDoe' },
            { date: '13.12.2024', time: '18:20', action: 'Изменение настроек сети', user: 'JohnDoe' },
            { date: '12.12.2024', time: '12:55', action: 'Добавление нового устройства', user: 'JohnDoe' },
            { date: '11.12.2024', time: '07:10', action: 'Изменение темы оформления', user: 'JohnDoe' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-zinc-100">{item.date}</div>
                <div className="text-sm text-zinc-500">{item.time}</div>
              </div>
              <div className="text-zinc-100">{item.action}</div>
              <div className="text-zinc-400">{item.user}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Component
function ToggleItem({ label, description, enabled, onChange }: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
      <div className="flex-1">
        <div className="text-zinc-100 mb-1">{label}</div>
        <div className="text-sm text-zinc-500">{description}</div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          enabled ? 'bg-emerald-600' : 'bg-zinc-700'
        }`}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full"
          animate={{ x: enabled ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}