import { Thermometer, Droplets, Lightbulb, Camera, Wind, Battery, WifiOff, Wifi, Plus, Cable, Plug, DoorClosed } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AddDeviceDialog } from '../AddDeviceDialog';
import { DeviceInfoDialog } from '../DeviceInfoDialog';

const devices = [
  { id: 1, name: 'Датчик температуры #1', type: 'Температура', value: '24°C', icon: Thermometer, status: 'online', location: 'Теплица', connection: 'wifi' },
  { id: 2, name: 'Датчик влажности почвы', type: 'Влажность', value: '65%', icon: Droplets, status: 'online', location: 'Грядка 1', connection: 'wired' },
  { id: 3, name: 'LED освещение', type: 'Освещение', value: 'Включено', icon: Lightbulb, status: 'online', location: 'Теплица', connection: 'wired' },
  { id: 4, name: 'IP камера', type: 'Камера', value: 'Запись', icon: Camera, status: 'online', location: 'Вход', connection: 'wifi' },
  { id: 5, name: 'Система вентиляции', type: 'Вентиляция', value: 'Выключено', icon: Wind, status: 'offline', location: 'Теплица', connection: 'wired' },
  { id: 6, name: 'Аккумулятор', type: 'Питание', value: '98%', icon: Battery, status: 'online', location: 'Главный щит', connection: 'wired' },
  { id: 7, name: 'Датчик температуры #2', type: 'Температура', value: '22°C', icon: Thermometer, status: 'online', location: 'Улица', connection: 'wifi' },
  { id: 8, name: 'Датчик влажности воздуха', type: 'Влажность', value: '72%', icon: Droplets, status: 'online', location: 'Теплица', connection: 'wifi' },
  { id: 9, name: 'Умная розетка', type: 'Розетка', value: '125W', icon: Plug, status: 'online', location: 'Насосная', connection: 'wifi' },
  { id: 10, name: 'Въездные ворота', type: 'Ворота', value: 'Закрыто', icon: DoorClosed, status: 'online', location: 'Въезд', connection: 'wired' },
];

export function DevicesScreen() {
  const [deviceList, setDeviceList] = useState(devices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const onlineDevices = deviceList.filter(d => d.status === 'online').length;

  const handleAddDevice = (newDevice: any) => {
    const id = Math.max(...deviceList.map(d => d.id), 0) + 1;
    setDeviceList([
      ...deviceList,
      {
        id,
        ...newDevice,
        value: 'Н/Д',
        status: 'online',
      },
    ]);
  };

  const handleDeviceClick = (device: any) => {
    setSelectedDevice(device);
    setIsInfoDialogOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Устройства</h1>
          <p className="text-zinc-400">Онлайн: {onlineDevices} из {deviceList.length}</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Добавить устройство
          </motion.button>
          <div className="bg-zinc-800 px-4 py-2 rounded-xl border border-emerald-600/40">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400">Сеть активна</span>
            </div>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {deviceList.map((device, index) => {
            const Icon = device.icon;
            const isOnline = device.status === 'online';

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDeviceClick(device)}
                className={`
                  bg-zinc-800 rounded-xl p-5 border cursor-pointer transition-all
                  ${isOnline 
                    ? 'border-emerald-600/40 hover:border-emerald-600/60' 
                    : 'border-red-600/40 hover:border-red-600/60'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-3 rounded-xl
                    ${isOnline ? 'bg-emerald-600/20' : 'bg-red-600/20'}
                  `}>
                    <Icon className={`w-7 h-7 ${isOnline ? 'text-emerald-400' : 'text-red-400'}`} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {device.connection === 'wifi' ? (
                      <>
                        {isOnline ? (
                          <>
                            <Wifi className="w-4 h-4 text-emerald-400" />
                            <motion.div
                              className="w-2 h-2 rounded-full bg-emerald-400"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </>
                        ) : (
                          <WifiOff className="w-4 h-4 text-red-400" />
                        )}
                      </>
                    ) : (
                      <>
                        <Cable className={`w-4 h-4 ${isOnline ? 'text-blue-400' : 'text-red-400'}`} />
                        {isOnline && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-zinc-100 mb-1">{device.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-zinc-400">{device.location}</p>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500">
                    {device.connection === 'wifi' ? 'WiFi' : 'Провод'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">{device.type}</div>
                    <div className={`text-lg ${isOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                      {device.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AddDeviceDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddDevice}
      />

      <DeviceInfoDialog
        isOpen={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
        device={selectedDevice}
      />
    </div>
  );
}