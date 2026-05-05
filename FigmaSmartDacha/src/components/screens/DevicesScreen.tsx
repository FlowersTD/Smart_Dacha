import { Thermometer, Droplets, Lightbulb, Camera, Wind, Battery, WifiOff, Wifi, Plus, Cable, Plug, DoorClosed } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { AddDeviceDialog } from '../AddDeviceDialog';
import { DeviceInfoDialog } from '../DeviceInfoDialog';

interface Device {
  id: number;
  name: string;
  type: string;
  value: string;
  status: 'online' | 'offline'; 
  location: string;
  connection: string;
}

const iconMap: Record<string, any> = {
  Thermometer: Thermometer,
  Droplets: Droplets,
  Lightbulb: Lightbulb,
  Camera: Camera,
  Wind: Wind,
  Battery: Battery,
  socket: Plug,
  DoorClosed: DoorClosed,
};

export function DevicesScreen() {

  const [deviceList, setDeviceList] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/devices');
        if (!response.ok) {
          throw new Error('Ошибка загрузки устройств');
        }
        const data = await response.json();
        setDeviceList(data);
      } catch (error) {
        console.error('Ошибка:', error);
      } 
    };

  
  const onlineDevices = deviceList.filter(d => d.status === true).length;

  
    useEffect(() => {
    fetchDevices();
    }, []);

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
      <div className="flex-1 overflow-auto scrollbar-hide">
        <div className="p-2">
        <div className="grid grid-cols-2 gap-4">
          {deviceList.map((device, index) => {
            const Icon = iconMap[device.type]
            const isOnline = device.status === true;
            
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
                      {device.value === false ? 'Выкл' :device.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
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