import { X, Thermometer, Droplets, Lightbulb, Camera, Wind, Battery, Cpu, Wifi, Cable, Plug, DoorClosed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface AddDeviceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: { name: string; type: string; location: string; icon: LucideIcon; connection: 'wifi' | 'wired' }) => void;
}

const deviceTypes = [
  { name: 'Температура', icon: Thermometer },
  { name: 'Влажность', icon: Droplets },
  { name: 'Освещение', icon: Lightbulb },
  { name: 'Камера', icon: Camera },
  { name: 'Вентиляция', icon: Wind },
  { name: 'Питание', icon: Battery },
  { name: 'Розетка', icon: Plug },
  { name: 'Ворота', icon: DoorClosed },
  { name: 'Другое', icon: Cpu },
];

export function AddDeviceDialog({ isOpen, onClose, onSave }: AddDeviceDialogProps) {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(deviceTypes[0]);
  const [location, setLocation] = useState('');
  const [connection, setConnection] = useState<'wifi' | 'wired'>('wifi');

  const handleSave = () => {
    if (name.trim() && location.trim()) {
      onSave({
        name,
        type: selectedType.name,
        location,
        icon: selectedType.icon,
        connection,
      });
      setName('');
      setLocation('');
      setSelectedType(deviceTypes[0]);
      setConnection('wifi');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[550px] pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <Cpu className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl text-zinc-100">Добавить устройство</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Название устройства</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например: Датчик температуры #3"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Тип устройства</label>
                  <div className="grid grid-cols-4 gap-2">
                    {deviceTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType.name === type.name;
                      return (
                        <button
                          key={type.name}
                          onClick={() => setSelectedType(type)}
                          className={`
                            p-3 rounded-xl border transition-all
                            ${isSelected 
                              ? 'bg-emerald-600/20 border-emerald-600/60' 
                              : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                            }
                          `}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                            <span className={`text-xs ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`}>
                              {type.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Расположение</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Например: Теплица"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Тип подключения</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setConnection('wifi')}
                      className={`
                        p-4 rounded-xl border transition-all
                        ${connection === 'wifi'
                          ? 'bg-emerald-600/20 border-emerald-600/60'
                          : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Wifi className={`w-5 h-5 ${connection === 'wifi' ? 'text-emerald-400' : 'text-zinc-400'}`} />
                        <span className={connection === 'wifi' ? 'text-emerald-400' : 'text-zinc-400'}>
                          WiFi
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setConnection('wired')}
                      className={`
                        p-4 rounded-xl border transition-all
                        ${connection === 'wired'
                          ? 'bg-blue-600/20 border-blue-600/60'
                          : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Cable className={`w-5 h-5 ${connection === 'wired' ? 'text-blue-400' : 'text-zinc-400'}`} />
                        <span className={connection === 'wired' ? 'text-blue-400' : 'text-zinc-400'}>
                          Провод
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700">
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name.trim() || !location.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}