import { X, Wind, Gauge, Thermometer, Droplets, Timer, Activity, BarChart3, Settings, Clock, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface VentilationSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    icon: LucideIcon;
    status: 'active' | 'inactive';
  };
}

export function VentilationSensorDialog({ isOpen, onClose, device }: VentilationSensorDialogProps) {
  const [speed, setSpeed] = useState(50);
  const [isOn, setIsOn] = useState(device.status === 'active');
  const [mode, setMode] = useState<'manual' | 'auto' | 'smart'>('manual');
  const [targetTemp, setTargetTemp] = useState(22);
  const [targetHumidity, setTargetHumidity] = useState(60);
  const [activeTab, setActiveTab] = useState<'control' | 'modes' | 'schedule' | 'settings'>('control');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [deviceName, setDeviceName] = useState(device.name);

  const modes = [
    { id: 'manual', label: 'Ручной', description: 'Управление скоростью вентилятора', icon: Gauge },
    { id: 'auto', label: 'Авто', description: 'По расписанию', icon: Timer },
    { id: 'smart', label: 'Умный', description: 'По температуре и влажности', icon: Activity },
  ];

  const speedPresets = [
    { name: 'Тихо', value: 25, color: 'from-blue-400 to-blue-600' },
    { name: 'Средне', value: 50, color: 'from-emerald-400 to-emerald-600' },
    { name: 'Быстро', value: 75, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Максимум', value: 100, color: 'from-red-400 to-red-600' },
  ];

  const schedules = [
    { time: '06:00', action: 'Утреннее проветривание', speed: 75, duration: '30 мин', active: true },
    { time: '12:00', action: 'Дневная циркуляция', speed: 50, duration: '1 час', active: true },
    { time: '18:00', action: 'Вечернее охлаждение', speed: 60, duration: '45 мин', active: true },
    { time: '22:00', action: 'Ночной режим', speed: 25, duration: 'До утра', active: false },
  ];

  const usageHistory = [
    { time: '2 часа назад', action: 'Скорость изменена', speed: 75 },
    { time: '5 часов назад', action: 'Выключено', speed: 0 },
    { time: '8 часов назад', action: 'Включено', speed: 50 },
  ];

  const tabs = [
    { id: 'control', label: 'Управление', icon: Wind },
    { id: 'modes', label: 'Режимы', icon: Activity },
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
                  <div className={`p-3 rounded-xl ${isOn ? 'bg-cyan-600/20' : 'bg-zinc-700/50'} relative`}>
                    <Wind className={`w-8 h-8 ${isOn ? 'text-cyan-400' : 'text-zinc-500'}`} />
                    {isOn && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-cyan-400/30"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-cyan-400' : 'bg-zinc-500'}`} />
                      <span className="text-sm text-zinc-400">
                        {isOn ? `Работает ${speed}%` : 'Выключено'}
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
                          ? 'bg-zinc-700 text-cyan-400 border-b-2 border-cyan-400'
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
                    <div className="flex items-center justify-between bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-xl p-6 border border-cyan-600/40">
                      <div>
                        <div className="text-zinc-100 mb-1">Питание</div>
                        <div className="text-sm text-zinc-400">
                          {isOn ? `Скорость ${speed}% • ${Math.round(speed * 1.5)} об/мин` : 'Выключено'}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOn(!isOn)}
                        className={`
                          relative w-20 h-10 rounded-full transition-all
                          ${isOn ? 'bg-cyan-600 shadow-lg shadow-cyan-600/50' : 'bg-zinc-700'}
                        `}
                      >
                        <motion.div
                          className={`absolute top-1 left-1 w-8 h-8 rounded-full ${isOn ? 'bg-cyan-300' : 'bg-zinc-500'}`}
                          animate={{ x: isOn ? 40 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    {/* Speed Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-5 h-5 text-cyan-400" />
                          <span className="text-zinc-100">Скорость вентилятора</span>
                        </div>
                        <span className="text-cyan-400">{speed}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        disabled={!isOn}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) ${speed}%, rgb(63 63 70) ${speed}%, rgb(63 63 70) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>Тихо</span>
                        <span>Максимум</span>
                      </div>
                    </div>

                    {/* Speed Presets */}
                    <div>
                      <div className="text-zinc-100 mb-3">Быстрые настройки</div>
                      <div className="grid grid-cols-4 gap-3">
                        {speedPresets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => {
                              setSpeed(preset.value);
                              setIsOn(true);
                            }}
                            className="group relative overflow-hidden rounded-xl p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-zinc-600 transition-all"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                            <Wind className="w-5 h-5 mx-auto mb-1 text-zinc-400 group-hover:text-zinc-200 relative z-10" />
                            <div className="text-xs text-zinc-400 group-hover:text-zinc-200 mb-1 relative z-10">{preset.name}</div>
                            <div className="text-xs text-zinc-500 relative z-10">{preset.value}%</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Current Conditions */}
                    <div>
                      <div className="text-zinc-100 mb-3">Текущие условия</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Thermometer className="w-4 h-4 text-orange-400" />
                            <span className="text-xs text-zinc-500">Температура</span>
                          </div>
                          <div className="text-xl text-orange-400">23.5°C</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-zinc-500">Влажность</span>
                          </div>
                          <div className="text-xl text-blue-400">62%</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Wind className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-zinc-500">Воздухообмен</span>
                          </div>
                          <div className="text-xl text-cyan-400">{Math.round(speed * 3)} м³/ч</div>
                        </div>
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
                                p-4 rounded-xl border transition-all text-left
                                ${mode === m.id
                                  ? 'bg-cyan-600/20 border-cyan-600/40 text-cyan-400'
                                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                }
                              `}
                            >
                              <Icon className={`w-6 h-6 mb-2 ${mode === m.id ? 'text-cyan-400' : 'text-zinc-500'}`} />
                              <div className="text-sm mb-1">{m.label}</div>
                              <div className="text-xs opacity-70">{m.description}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {mode === 'manual' && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <Gauge className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <div>
                            <div className="text-zinc-100 mb-1">Ручной режим</div>
                            <div className="text-sm text-zinc-400">
                              Управляйте скоростью вентилятора вручную через вкладку "Управление"
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {mode === 'auto' && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <Timer className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <div>
                            <div className="text-zinc-100 mb-1">Автоматический режим</div>
                            <div className="text-sm text-zinc-400">
                              Вентиляция работает по заданному расписанию. Перейдите на вкладку "Расписание" для настройки
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {mode === 'smart' && (
                      <div className="space-y-4">
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-zinc-100 mb-4">Целевые параметры</div>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Thermometer className="w-4 h-4 text-orange-400" />
                                  <span className="text-zinc-300">Температура</span>
                                </div>
                                <span className="text-orange-400">{targetTemp}°C</span>
                              </div>
                              <input
                                type="range"
                                min="15"
                                max="30"
                                value={targetTemp}
                                onChange={(e) => setTargetTemp(Number(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Droplets className="w-4 h-4 text-blue-400" />
                                  <span className="text-zinc-300">Влажность</span>
                                </div>
                                <span className="text-blue-400">{targetHumidity}%</span>
                              </div>
                              <input
                                type="range"
                                min="30"
                                max="80"
                                value={targetHumidity}
                                onChange={(e) => setTargetHumidity(Number(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-cyan-600/10 border border-cyan-600/40 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Activity className="w-4 h-4" />
                            <span className="text-sm">Умный режим активен</span>
                          </div>
                          <p className="text-xs text-zinc-400">
                            Система автоматически регулирует скорость вентиляции для поддержания целевых параметров
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-zinc-100 mb-3">История использования</h3>
                      <div className="space-y-2">
                        {usageHistory.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-cyan-400" />
                              <div>
                                <div className="text-zinc-100 text-sm">{item.action}</div>
                                <div className="text-xs text-zinc-500">{item.time}</div>
                              </div>
                            </div>
                            <div className="text-cyan-400">{item.speed}%</div>
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
                              flex items-center justify-between p-4 rounded-xl border transition-colors
                              ${schedule.active
                                ? 'bg-cyan-600/10 border-cyan-600/40'
                                : 'bg-zinc-900 border-zinc-700'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center
                                ${schedule.active ? 'bg-cyan-600/20' : 'bg-zinc-800'}
                              `}>
                                <Timer className={`w-5 h-5 ${schedule.active ? 'text-cyan-400' : 'text-zinc-500'}`} />
                              </div>
                              <div>
                                <div className="text-zinc-100">{schedule.action}</div>
                                <div className="text-sm text-zinc-400">{schedule.time} • {schedule.duration}</div>
                              </div>
                            </div>
                            <div className="text-cyan-400">{schedule.speed}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-600/40 py-3 rounded-xl transition-colors text-cyan-400">
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
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-cyan-600"
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
                              ${enableNotifications ? 'bg-cyan-600' : 'bg-zinc-700'}
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
                          <span className="text-zinc-400">Модель</span>
                          <span className="text-zinc-100">AirFlow Pro 3000</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Макс. производительность</span>
                          <span className="text-zinc-100">300 м³/ч</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Мощность</span>
                          <span className="text-zinc-100">45 Вт</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.25</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:06</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v4.0.2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">62д 7ч</span>
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
                  <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 py-3 rounded-xl transition-colors">
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
