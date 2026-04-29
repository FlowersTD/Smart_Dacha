import { X, Lightbulb, Timer, Zap, Sun, Moon, TrendingUp, BarChart3, Settings, Activity, Clock, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface LightSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    icon: LucideIcon;
    status: 'active' | 'inactive';
  };
}

export function LightSensorDialog({ isOpen, onClose, device }: LightSensorDialogProps) {
  const [brightness, setBrightness] = useState(75);
  const [colorTemp, setColorTemp] = useState(3500);
  const [isOn, setIsOn] = useState(device.status === 'active');
  const [mode, setMode] = useState<'manual' | 'auto' | 'schedule'>('manual');
  const [activeTab, setActiveTab] = useState<'control' | 'modes' | 'schedule' | 'settings'>('control');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [deviceName, setDeviceName] = useState(device.name);

  const modes = [
    { id: 'manual', label: 'Ручной', icon: Zap },
    { id: 'auto', label: 'Авто', icon: Sun },
    { id: 'schedule', label: 'Расписание', icon: Timer },
  ];

  const presets = [
    { name: 'Яркий день', brightness: 100, temp: 5000, color: 'from-blue-400 to-blue-600' },
    { name: 'Комфорт', brightness: 75, temp: 3500, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Вечер', brightness: 50, temp: 2700, color: 'from-orange-400 to-orange-600' },
    { name: 'Ночь', brightness: 20, temp: 2200, color: 'from-red-400 to-red-600' },
  ];

  const schedules = [
    { time: '06:00', action: 'Включение', brightness: 50, status: 'active' },
    { time: '12:00', action: 'Полная яркость', brightness: 100, status: 'active' },
    { time: '18:00', action: 'Приглушить', brightness: 60, status: 'active' },
    { time: '22:00', action: 'Выключение', brightness: 0, status: 'inactive' },
  ];

  const usageHistory = [
    { time: '2 часа назад', action: 'Включено', brightness: 75 },
    { time: '5 часов назад', action: 'Выключено', brightness: 0 },
    { time: '8 часов назад', action: 'Приглушено', brightness: 40 },
    { time: '12 часов назад', action: 'Включено', brightness: 100 },
  ];

  const tabs = [
    { id: 'control', label: 'Управление', icon: Lightbulb },
    { id: 'modes', label: 'Режимы', icon: Zap },
    { id: 'schedule', label: 'Расписание', icon: Timer },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[750px] max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isOn ? 'bg-yellow-600/20' : 'bg-zinc-700/50'}`}>
                    <Lightbulb className={`w-8 h-8 ${isOn ? 'text-yellow-400' : 'text-zinc-500'}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-yellow-400' : 'bg-zinc-500'}`} />
                      <span className="text-sm text-zinc-400">
                        {isOn ? 'Включено' : 'Выключено'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 px-6 pt-4 border-b border-zinc-700">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                        flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all text-sm
                        ${isActive
                          ? 'bg-zinc-700 text-yellow-400 border-b-2 border-yellow-400'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                        }
                      `}
                    >
                      <TabIcon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Control Tab */}
                {activeTab === 'control' && (
                  <div className="space-y-6">
                    {/* Power Toggle */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl p-6 border border-yellow-600/40">
                      <div>
                        <div className="text-zinc-100 mb-1">Питание</div>
                        <div className="text-sm text-zinc-400">
                          {isOn ? `Яркость ${brightness}%` : 'Выключено'}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOn(!isOn)}
                        className={`
                          relative w-20 h-10 rounded-full transition-all
                          ${isOn ? 'bg-yellow-600 shadow-lg shadow-yellow-600/50' : 'bg-zinc-700'}
                        `}
                      >
                        <motion.div
                          className={`absolute top-1 left-1 w-8 h-8 rounded-full ${isOn ? 'bg-yellow-300' : 'bg-zinc-500'}`}
                          animate={{ x: isOn ? 40 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    {/* Brightness Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sun className="w-5 h-5 text-yellow-400" />
                          <span className="text-zinc-100">Яркость</span>
                        </div>
                        <span className="text-yellow-400">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        disabled={!isOn}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        style={{
                          background: `linear-gradient(to right, rgb(234 179 8) 0%, rgb(234 179 8) ${brightness}%, rgb(63 63 70) ${brightness}%, rgb(63 63 70) 100%)`
                        }}
                      />
                    </div>

                    {/* Color Temperature Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Moon className="w-5 h-5 text-orange-400" />
                          <span className="text-zinc-100">Цветовая температура</span>
                        </div>
                        <span className="text-orange-400">{colorTemp}K</span>
                      </div>
                      <input
                        type="range"
                        min="2200"
                        max="6500"
                        value={colorTemp}
                        onChange={(e) => setColorTemp(Number(e.target.value))}
                        disabled={!isOn}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, rgb(251 146 60) 0%, rgb(234 179 8) 50%, rgb(96 165 250) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>Теплый</span>
                        <span>Нейтральный</span>
                        <span>Холодный</span>
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div>
                      <div className="text-zinc-100 mb-3">Быстрые настройки</div>
                      <div className="grid grid-cols-4 gap-3">
                        {presets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => {
                              setBrightness(preset.brightness);
                              setColorTemp(preset.temp);
                              setIsOn(true);
                            }}
                            className="group relative overflow-hidden rounded-xl p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-zinc-600 transition-all"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                            <Lightbulb className="w-5 h-5 mx-auto mb-1 text-zinc-400 group-hover:text-zinc-200 relative z-10" />
                            <div className="text-xs text-zinc-400 group-hover:text-zinc-200 relative z-10">{preset.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-500">Потребление</span>
                        </div>
                        <div className="text-xl text-blue-400">12 Вт</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Timer className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-zinc-500">Работает</span>
                        </div>
                        <div className="text-xl text-emerald-400">8ч 24м</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-zinc-500">За день</span>
                        </div>
                        <div className="text-xl text-purple-400">0.3 кВт</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modes Tab */}
                {activeTab === 'modes' && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-zinc-100 mb-3">Режим работы</div>
                      <div className="grid grid-cols-3 gap-3">
                        {modes.map((m) => {
                          const Icon = m.icon;
                          return (
                            <button
                              key={m.id}
                              onClick={() => setMode(m.id as any)}
                              className={`
                                p-4 rounded-xl border transition-all
                                ${mode === m.id
                                  ? 'bg-yellow-600/20 border-yellow-600/40 text-yellow-400'
                                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                }
                              `}
                            >
                              <Icon className="w-6 h-6 mx-auto mb-2" />
                              <div className="text-sm">{m.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {mode === 'manual' && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <div className="text-zinc-100 mb-1">Ручной режим</div>
                            <div className="text-sm text-zinc-400">
                              Управляйте яркостью и цветовой температурой вручную через вкладку "Управление"
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {mode === 'auto' && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <Sun className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <div className="text-zinc-100 mb-1">Автоматический режим</div>
                            <div className="text-sm text-zinc-400">
                              Освещение автоматически адаптируется к времени суток и уровню естественного освещения
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {mode === 'schedule' && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <Timer className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <div className="text-zinc-100 mb-1">Режим по расписанию</div>
                            <div className="text-sm text-zinc-400">
                              Освещение работает согласно установленному расписанию. Перейдите на вкладку "Расписание" для настройки
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-zinc-100 mb-3">История использования</h3>
                      <div className="space-y-2">
                        {usageHistory.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-yellow-400" />
                              <div>
                                <div className="text-zinc-100 text-sm">{item.action}</div>
                                <div className="text-xs text-zinc-500">{item.time}</div>
                              </div>
                            </div>
                            <div className="text-yellow-400">{item.brightness}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-zinc-100 mb-3">Расписание работы</div>
                      <div className="space-y-2">
                        {schedules.map((schedule, index) => (
                          <div
                            key={index}
                            className={`
                              flex items-center justify-between p-4 rounded-xl border
                              ${schedule.status === 'active'
                                ? 'bg-yellow-600/10 border-yellow-600/40'
                                : 'bg-zinc-900 border-zinc-700'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center
                                ${schedule.status === 'active' ? 'bg-yellow-600/20' : 'bg-zinc-800'}
                              `}>
                                <Timer className={`w-5 h-5 ${schedule.status === 'active' ? 'text-yellow-400' : 'text-zinc-500'}`} />
                              </div>
                              <div>
                                <div className="text-zinc-100">{schedule.action}</div>
                                <div className="text-sm text-zinc-400">{schedule.time}</div>
                              </div>
                            </div>
                            <div className="text-yellow-400">{schedule.brightness}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/40 py-3 rounded-xl transition-colors text-yellow-400">
                      + Добавить расписание
                    </button>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-4">Общие настройки</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Название устройства</label>
                          <input
                            type="text"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-yellow-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Включить уведомления</div>
                            <div className="text-sm text-zinc-500">О включении, выключении и изменениях</div>
                          </div>
                          <button
                            onClick={() => setEnableNotifications(!enableNotifications)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableNotifications ? 'bg-yellow-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableNotifications ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Техническая информация</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Тип устройства</span>
                          <span className="text-zinc-100">LED Smart Light</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Мощность</span>
                          <span className="text-zinc-100">12W</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.23</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:03</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v3.2.5</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">18д 4ч</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700 bg-zinc-800">
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Закрыть
                </button>
                {activeTab === 'settings' && (
                  <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-3 rounded-xl transition-colors">
                    Сохранить настройки
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
