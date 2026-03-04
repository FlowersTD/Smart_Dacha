import { Wifi, Signal, Activity, RefreshCw, Plus, Bluetooth, Cable, Server, Check, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { WiFiConnectDialog } from '../WiFiConnectDialog';

type ConnectionType = 'wifi' | 'ethernet' | 'bluetooth' | 'none';

export function InternetScreen() {
  const [isWiFiDialogOpen, setIsWiFiDialogOpen] = useState(false);
  const [isCustomServerDialogOpen, setIsCustomServerDialogOpen] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState('Dacha_WiFi_5G');
  const [connectionType, setConnectionType] = useState<ConnectionType>('wifi');
  const [selectedServer, setSelectedServer] = useState('server-1');
  const [customServerName, setCustomServerName] = useState('');
  const [customServerAddress, setCustomServerAddress] = useState('');
  const [serverList, setServerList] = useState([
    { id: 'server-1', name: 'Основной сервер', location: 'Москва', ping: 12, status: 'online' },
    { id: 'server-2', name: 'Резервный сервер', location: 'Санкт-Петербург', ping: 28, status: 'online' },
    { id: 'server-3', name: 'Локальный сервер', location: 'Локальная сеть', ping: 2, status: 'online' },
    { id: 'server-4', name: 'Облачный сервер', location: 'AWS EU-Central', ping: 45, status: 'maintenance' },
  ]);

  const availableNetworks = [
    { ssid: 'Dacha_WiFi_5G', signal: 95, secured: true },
    { ssid: 'Neighbors_WiFi', signal: 72, secured: true },
    { ssid: 'Guest_Network', signal: 45, secured: false },
    { ssid: 'Mobile_Hotspot', signal: 88, secured: true },
  ];

  const bluetoothDevices = [
    { name: 'Датчик температуры BT-01', signal: 92, battery: 85, connected: true },
    { name: 'Контроллер освещения BT-02', signal: 88, battery: 72, connected: true },
    { name: 'Метеостанция BT-03', signal: 65, battery: 90, connected: false },
  ];

  const handleWiFiConnect = (ssid: string, password: string) => {
    setCurrentNetwork(ssid);
    setConnectionType('wifi');
  };

  const handleAddCustomServer = () => {
    if (customServerName.trim() && customServerAddress.trim()) {
      const newServer = {
        id: `custom-${Date.now()}`,
        name: customServerName,
        location: customServerAddress,
        ping: Math.floor(Math.random() * 50) + 10,
        status: 'online' as const,
      };
      setServerList([...serverList, newServer]);
      setCustomServerName('');
      setCustomServerAddress('');
      setIsCustomServerDialogOpen(false);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionType) {
      case 'wifi':
        return <Wifi className="w-6 h-6 text-emerald-400" />;
      case 'ethernet':
        return <Cable className="w-6 h-6 text-blue-400" />;
      case 'bluetooth':
        return <Bluetooth className="w-6 h-6 text-purple-400" />;
      default:
        return <Radio className="w-6 h-6 text-zinc-500" />;
    }
  };

  const getConnectionLabel = () => {
    switch (connectionType) {
      case 'wifi':
        return 'Wi-Fi подключение';
      case 'ethernet':
        return 'Проводное подключение';
      case 'bluetooth':
        return 'Bluetooth соединение';
      default:
        return 'Нет подключения';
    }
  };

  const getConnectionColor = () => {
    switch (connectionType) {
      case 'wifi':
        return 'from-emerald-600/20 to-emerald-800/20 border-emerald-600/40';
      case 'ethernet':
        return 'from-blue-600/20 to-blue-800/20 border-blue-600/40';
      case 'bluetooth':
        return 'from-purple-600/20 to-purple-800/20 border-purple-600/40';
      default:
        return 'from-zinc-600/20 to-zinc-800/20 border-zinc-600/40';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Интернет и сеть</h1>
          <p className="text-zinc-400">Управление подключениями и серверами</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className={`flex items-center gap-2 bg-gradient-to-br ${getConnectionColor()} px-4 py-2 rounded-xl border`}
            animate={connectionType !== 'none' ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getConnectionIcon()}
            <span className={connectionType !== 'none' ? 'text-emerald-400' : 'text-zinc-500'}>
              {connectionType !== 'none' ? 'Подключено' : 'Отключено'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Connection Type Selector */}
      <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
        <div className="text-zinc-100 mb-3">Тип подключения</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setConnectionType('wifi')}
            className={`
              p-4 rounded-xl border transition-all
              ${connectionType === 'wifi'
                ? 'bg-emerald-600/20 border-emerald-600/40 text-emerald-400'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }
            `}
          >
            <Wifi className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">Wi-Fi</div>
            {connectionType === 'wifi' && <div className="text-xs mt-1 opacity-70">{currentNetwork}</div>}
          </button>
          <button
            onClick={() => setConnectionType('ethernet')}
            className={`
              p-4 rounded-xl border transition-all
              ${connectionType === 'ethernet'
                ? 'bg-blue-600/20 border-blue-600/40 text-blue-400'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }
            `}
          >
            <Cable className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">Ethernet</div>
            {connectionType === 'ethernet' && <div className="text-xs mt-1 opacity-70">100 Мбит/с</div>}
          </button>
          <button
            onClick={() => setConnectionType('bluetooth')}
            className={`
              p-4 rounded-xl border transition-all
              ${connectionType === 'bluetooth'
                ? 'bg-purple-600/20 border-purple-600/40 text-purple-400'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }
            `}
          >
            <Bluetooth className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">Bluetooth</div>
            {connectionType === 'bluetooth' && <div className="text-xs mt-1 opacity-70">{bluetoothDevices.filter(d => d.connected).length} устр.</div>}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {/* Connection Details */}
          <div className={`bg-zinc-800 rounded-xl p-5 border ${getConnectionColor()}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${connectionType === 'wifi' ? 'bg-emerald-600/20' : connectionType === 'ethernet' ? 'bg-blue-600/20' : 'bg-purple-600/20'}`}>
                {getConnectionIcon()}
              </div>
              <div>
                <h2 className="text-zinc-100">{getConnectionLabel()}</h2>
                <p className="text-sm text-zinc-400">Информация о подключении</p>
              </div>
            </div>

            <div className="space-y-3">
              {connectionType === 'wifi' && (
                <>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Сеть</span>
                    <span className="text-zinc-100">{currentNetwork}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Сигнал</span>
                    <span className="text-emerald-400">95%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Частота</span>
                    <span className="text-zinc-100">5 ГГц</span>
                  </div>
                  <button
                    onClick={() => setIsWiFiDialogOpen(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Сменить сеть
                  </button>
                </>
              )}

              {connectionType === 'ethernet' && (
                <>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Порт</span>
                    <span className="text-zinc-100">eth0</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Скорость</span>
                    <span className="text-blue-400">100 Мбит/с</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Дуплекс</span>
                    <span className="text-zinc-100">Full</span>
                  </div>
                </>
              )}

              {connectionType === 'bluetooth' && (
                <>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Версия</span>
                    <span className="text-zinc-100">Bluetooth 5.0</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Устройств</span>
                    <span className="text-purple-400">{bluetoothDevices.filter(d => d.connected).length} подключено</span>
                  </div>
                </>
              )}

              {connectionType !== 'none' && (
                <>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">IP адрес</span>
                    <span className="text-zinc-100">192.168.1.42</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span className="text-zinc-400">Шлюз</span>
                    <span className="text-zinc-100">192.168.1.1</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bluetooth Devices */}
          {connectionType === 'bluetooth' && (
            <div className="bg-zinc-800 rounded-xl p-5 border border-purple-600/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-100">Bluetooth устройства</h3>
                <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
              <div className="space-y-2">
                {bluetoothDevices.map((device, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-colors ${
                      device.connected
                        ? 'bg-purple-600/10 border-purple-600/40'
                        : 'bg-zinc-900 border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${device.connected ? 'text-purple-400' : 'text-zinc-400'}`}>
                        {device.name}
                      </span>
                      {device.connected && <Check className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <div>Сигнал: {device.signal}%</div>
                      <div>Батарея: {device.battery}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Server Selection */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Server className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-zinc-100">Выбор сервера</h2>
                <p className="text-sm text-zinc-400">Уравление подключением к серверам</p>
              </div>
            </div>

            <div className="space-y-3">
              {serverList.map((server) => (
                <button
                  key={server.id}
                  onClick={() => setSelectedServer(server.id)}
                  className={`
                    w-full p-4 rounded-xl border transition-all text-left
                    ${selectedServer === server.id
                      ? 'bg-blue-600/20 border-blue-600/40'
                      : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={selectedServer === server.id ? 'text-blue-400' : 'text-zinc-100'}>
                          {server.name}
                        </span>
                        {selectedServer === server.id && (
                          <Check className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="text-sm text-zinc-500">{server.location}</div>
                    </div>
                    <div className={`
                      px-2 py-1 rounded-lg text-xs
                      ${server.status === 'online'
                        ? 'bg-emerald-600/20 text-emerald-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                      }
                    `}>
                      {server.status === 'online' ? 'Online' : 'Maintenance'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Signal className="w-3 h-3 text-zinc-500" />
                      <span className={server.ping < 20 ? 'text-emerald-400' : server.ping < 50 ? 'text-yellow-400' : 'text-red-400'}>
                        {server.ping} мс
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setIsCustomServerDialogOpen(true)}
                className="w-full p-4 rounded-xl border transition-all text-left bg-zinc-900 border-zinc-700 hover:border-zinc-600"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-zinc-100">
                        Добавить сервер
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Network Activity */}
          <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-zinc-100">Сетевая активность</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                <span className="text-zinc-300">Подключенные устройства</span>
                <span className="text-emerald-400">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                <span className="text-zinc-300">Активных соединений</span>
                <span className="text-blue-400">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                <span className="text-zinc-300">Загружено за день</span>
                <span className="text-purple-400">3.2 ГБ</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                <span className="text-zinc-300">Время работы</span>
                <span className="text-yellow-400">15д 8ч 42м</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WiFiConnectDialog
        isOpen={isWiFiDialogOpen}
        onClose={() => setIsWiFiDialogOpen(false)}
        onConnect={handleWiFiConnect}
        availableNetworks={availableNetworks}
      />

      {/* Custom Server Dialog */}
      {isCustomServerDialogOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCustomServerDialogOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[500px] pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Server className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl text-zinc-100">Добавить сервер</h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Название сервера</label>
                  <input
                    type="text"
                    value={customServerName}
                    onChange={(e) => setCustomServerName(e.target.value)}
                    placeholder="Например: Мой сервер"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Адрес сервера</label>
                  <input
                    type="text"
                    value={customServerAddress}
                    onChange={(e) => setCustomServerAddress(e.target.value)}
                    placeholder="Например: my-server.example.com или 192.168.1.100"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-zinc-700">
                <button
                  onClick={() => setIsCustomServerDialogOpen(false)}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddCustomServer}
                  disabled={!customServerName.trim() || !customServerAddress.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}