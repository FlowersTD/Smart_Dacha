import { X, Plug, Zap, Timer, Clock, TrendingUp, BarChart3, Settings, Power, AlertTriangle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SocketSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    icon: LucideIcon;
    status: 'active' | 'inactive';
  };
}

// Mock data for power consumption
const generatePowerData = () => {
  const hours = 24;
  const data = [];
  for (let i = 0; i < hours; i++) {
    const time = `${String(i).padStart(2, '0')}:00`;
    const power = 50 + Math.random() * 100 + (i >= 8 && i <= 22 ? 50 : 0);
    data.push({ time, power: parseFloat(power.toFixed(1)) });
  }
  return data;
};

export function SocketSensorDialog({ isOpen, onClose, device }: SocketSensorDialogProps) {
  const [isOn, setIsOn] = useState(device.status === 'active');
  const [activeTab, setActiveTab] = useState<'control' | 'stats' | 'schedule' | 'settings'>('control');
  const [autoOffMinutes, setAutoOffMinutes] = useState(60);
  const [maxPower, setMaxPower] = useState(2000);
  const [enableOverloadProtection, setEnableOverloadProtection] = useState(true);
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [deviceName, setDeviceName] = useState(device.name);
  const [enableNotifications, setEnableNotifications] = useState(true);

  const powerData = generatePowerData();
  const currentPower = 125; // W
  const totalEnergyToday = 2.4; // kWh
  const cost = (totalEnergyToday * 5).toFixed(2); // руб

  const schedules = [
    { id: 1, time: '06:00', action: 'Включить', enabled: true },
    { id: 2, time: '09:00', action: 'Выключить', enabled: true },
    { id: 3, time: '18:00', action: 'Включить', enabled: true },
    { id: 4, time: '23:00', action: 'Выключить', enabled: true },
  ];

  const activityLog = [
    { time: '14:30', action: 'Включено', user: 'Вручную' },
    { time: '12:15', action: 'Выключено', user: 'По расписанию' },
    { time: '09:00', action: 'Выключено', user: 'По расписанию' },
    { time: '06:00', action: 'Включено', user: 'По расписанию' },
  ];

  const tabs = [
    { id: 'control', label: 'Управление', icon: Plug },
    { id: 'stats', label: 'Статистика', icon: BarChart3 },
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
                  <div className={`p-3 rounded-xl ${isOn ? 'bg-blue-600/20' : 'bg-zinc-700/50'}`}>
                    <Plug className={`w-8 h-8 ${isOn ? 'text-blue-400' : 'text-zinc-500'}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-blue-400' : 'bg-zinc-500'}`} />
                      <span className="text-sm text-zinc-400">
                        {isOn ? `Включено • ${currentPower}W` : 'Выключено'}
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
                          ? 'bg-zinc-700 text-blue-400 border-b-2 border-blue-400'
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
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-600/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-zinc-100 mb-1">Питание розетки</div>
                          <div className="text-sm text-zinc-400">
                            {isOn ? `Потребление: ${currentPower}W` : 'Розетка выключена'}
                          </div>
                        </div>
                        <button
                          onClick={() => setIsOn(!isOn)}
                          className={`
                            relative w-20 h-10 rounded-full transition-all
                            ${isOn ? 'bg-blue-600 shadow-lg shadow-blue-600/50' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className={`absolute top-1 left-1 w-8 h-8 rounded-full ${isOn ? 'bg-blue-300' : 'bg-zinc-500'}`}
                            animate={{ x: isOn ? 40 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Current Power Display */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-zinc-500">Мощность</span>
                        </div>
                        <div className="text-2xl text-yellow-400">{currentPower}W</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-zinc-500">За сегодня</span>
                        </div>
                        <div className="text-2xl text-emerald-400">{totalEnergyToday} кВт⋅ч</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-zinc-500">Стоимость</span>
                        </div>
                        <div className="text-2xl text-purple-400">{cost}₽</div>
                      </div>
                    </div>

                    {/* Auto-Off Timer */}
                    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Timer className="w-5 h-5 text-blue-400" />
                          <span className="text-zinc-100">Автоотключение</span>
                        </div>
                        <span className="text-blue-400">{autoOffMinutes} мин</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={autoOffMinutes}
                        onChange={(e) => setAutoOffMinutes(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-zinc-500 mt-2">
                        <span>5 мин</span>
                        <span>60 мин</span>
                        <span>120 мин</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-zinc-900 hover:bg-zinc-800 py-4 px-4 rounded-xl border border-zinc-700 transition-colors">
                        <Power className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                        <div className="text-zinc-100 text-sm">Перезапустить</div>
                      </button>
                      <button className="bg-zinc-900 hover:bg-zinc-800 py-4 px-4 rounded-xl border border-zinc-700 transition-colors">
                        <Clock className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
                        <div className="text-zinc-100 text-sm">Таймер</div>
                      </button>
                    </div>

                    {/* Overload Warning */}
                    {currentPower > maxPower * 0.8 && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-600/10 border border-yellow-600/40 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-yellow-400 mb-1">Предупреждение о нагрузке</div>
                          <div className="text-sm text-zinc-400">
                            Потребление близко к максимальному. Рекомендуется снизить нагрузку.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Statistics Tab */}
                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-4">График потребления за 24 часа</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={powerData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                            <XAxis 
                              dataKey="time" 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                            />
                            <YAxis 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                              label={{ value: 'Ватт', angle: -90, position: 'insideLeft', fill: '#71717a' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#27272a', 
                                border: '1px solid #3f3f46',
                                borderRadius: '8px'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="power" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Energy Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">За неделю</div>
                        <div className="text-2xl text-blue-400">16.8 кВт⋅ч</div>
                        <div className="text-xs text-zinc-500 mt-1">~84₽</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">За месяц</div>
                        <div className="text-2xl text-emerald-400">68.2 кВт⋅ч</div>
                        <div className="text-xs text-zinc-500 mt-1">~341₽</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">Пиковая нагрузка</div>
                        <div className="text-2xl text-yellow-400">245W</div>
                        <div className="text-xs text-zinc-500 mt-1">Сегодня в 14:30</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">Время работ��</div>
                        <div className="text-2xl text-purple-400">18ч 24м</div>
                        <div className="text-xs text-zinc-500 mt-1">За сегодня</div>
                      </div>
                    </div>

                    {/* Activity Log */}
                    <div>
                      <h3 className="text-zinc-100 mb-3">История активности</h3>
                      <div className="space-y-2">
                        {activityLog.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${log.action === 'Включено' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                              <div>
                                <div className="text-zinc-100 text-sm">{log.action}</div>
                                <div className="text-xs text-zinc-500">{log.user}</div>
                              </div>
                            </div>
                            <div className="text-sm text-zinc-400">{log.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                      <div>
                        <div className="text-zinc-100">Расписание включено</div>
                        <div className="text-sm text-zinc-500">Автоматическое управление по времени</div>
                      </div>
                      <button
                        onClick={() => setEnableSchedule(!enableSchedule)}
                        className={`
                          relative w-16 h-8 rounded-full transition-colors
                          ${enableSchedule ? 'bg-blue-600' : 'bg-zinc-700'}
                        `}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                          animate={{ x: enableSchedule ? 32 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">Расписание работы</h3>
                      <div className="space-y-2">
                        {schedules.map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`
                              flex items-center justify-between p-4 rounded-xl border transition-all
                              ${schedule.enabled && enableSchedule
                                ? 'bg-blue-600/10 border-blue-600/40'
                                : 'bg-zinc-900 border-zinc-700'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Timer className={`w-5 h-5 ${schedule.enabled && enableSchedule ? 'text-blue-400' : 'text-zinc-500'}`} />
                              <div>
                                <div className="text-zinc-100">{schedule.action}</div>
                                <div className="text-sm text-zinc-400">{schedule.time}</div>
                              </div>
                            </div>
                            <button
                              className={`
                                relative w-12 h-6 rounded-full transition-colors
                                ${schedule.enabled ? 'bg-blue-600' : 'bg-zinc-700'}
                              `}
                            >
                              <motion.div
                                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                                animate={{ x: schedule.enabled ? 24 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 py-3 rounded-xl transition-colors text-blue-400">
                      + Добавить новое расписание
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
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Максимальная мощность (Вт)</label>
                          <input
                            type="number"
                            value={maxPower}
                            onChange={(e) => setMaxPower(Number(e.target.value))}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Безопасность</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Защита от перегрузки</div>
                            <div className="text-sm text-zinc-500">Автоотключение при превышении мощности</div>
                          </div>
                          <button
                            onClick={() => setEnableOverloadProtection(!enableOverloadProtection)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableOverloadProtection ? 'bg-red-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableOverloadProtection ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Включить уведомления</div>
                            <div className="text-sm text-zinc-500">О включении, выключении и ошибках</div>
                          </div>
                          <button
                            onClick={() => setEnableNotifications(!enableNotifications)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableNotifications ? 'bg-blue-600' : 'bg-zinc-700'}
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
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.45</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:05</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v3.1.2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">45д 12ч</span>
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
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition-colors">
                  Сохранить настройки
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
