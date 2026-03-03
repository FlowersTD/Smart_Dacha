import { X, Thermometer, TrendingUp, TrendingDown, Activity, AlertTriangle, BarChart3, Clock, Settings, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    status: 'active' | 'inactive';
  } | null;
}

// Mock data for detailed chart
const generateTempData = () => {
  const hours = 24;
  const data = [];
  for (let i = 0; i < hours; i++) {
    const time = `${String(i).padStart(2, '0')}:00`;
    const temp = 18 + Math.random() * 8 + Math.sin(i / 4) * 3;
    data.push({ time, temp: parseFloat(temp.toFixed(1)) });
  }
  return data;
};

export function TemperatureSensorDialog({ isOpen, onClose, device }: TemperatureSensorDialogProps) {
  if (!device) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'history' | 'settings'>('overview');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [minTempAlert, setMinTempAlert] = useState(15);
  const [maxTempAlert, setMaxTempAlert] = useState(30);

  const currentTemp = parseFloat(device.value);
  const minTemp = 18;
  const maxTemp = 28;
  const avgTemp = 22;
  const isWarning = currentTemp < 15 || currentTemp > 30;
  const tempData = generateTempData();

  const historyData = [
    { time: '2 мин назад', value: '24°C', trend: 'up' },
    { time: '10 мин назад', value: '23°C', trend: 'stable' },
    { time: '30 мин назад', value: '23°C', trend: 'down' },
    { time: '1 час назад', value: '22°C', trend: 'stable' },
    { time: '2 часа назад', value: '22°C', trend: 'up' },
  ];

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: Activity },
    { id: 'charts', label: 'Графики', icon: BarChart3 },
    { id: 'history', label: 'История', icon: Clock },
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
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-600/40">
                    <Thermometer className="w-8 h-8 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <p className="text-sm text-zinc-400">Датчик температуры</p>
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
                          ? 'bg-zinc-700 text-orange-400 border-b-2 border-orange-400'
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
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    {/* Current Temperature */}
                    <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-600/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Текущая температура</div>
                          <div className="text-5xl text-orange-400">{device.value}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-emerald-400">+1.5°C за последний час</span>
                          </div>
                        </div>
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="rgba(251, 146, 60, 0.2)"
                              strokeWidth="12"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="#fb923c"
                              strokeWidth="12"
                              strokeDasharray={`${(currentTemp / 40) * 352} 352`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Thermometer className="w-10 h-10 text-orange-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Temperature Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-red-400" />
                          <span className="text-xs text-zinc-500">Макс. за сутки</span>
                        </div>
                        <div className="text-2xl text-red-400">{maxTemp}°C</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-zinc-500">Средняя</span>
                        </div>
                        <div className="text-2xl text-emerald-400">{avgTemp}°C</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-500">Мин. за сутки</span>
                        </div>
                        <div className="text-2xl text-blue-400">{minTemp}°C</div>
                      </div>
                    </div>

                    {/* Temperature Zones */}
                    <div>
                      <h3 className="text-zinc-100 mb-3">Температурные зоны</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-red-600/10 border border-red-600/40 rounded-lg">
                          <span className="text-red-400">Критично высокая</span>
                          <span className="text-zinc-100">&gt; 30°C</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-emerald-600/10 border border-emerald-600/40 rounded-lg">
                          <span className="text-emerald-400">Оптимальная</span>
                          <span className="text-zinc-100">20-28°C</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/40 rounded-lg">
                          <span className="text-blue-400">Критично низкая</span>
                          <span className="text-zinc-100">&lt; 15°C</span>
                        </div>
                      </div>
                    </div>

                    {isWarning && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-600/10 border border-yellow-600/40 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-yellow-400 mb-1">Предупреждение</div>
                          <div className="text-sm text-zinc-400">
                            Температура вышла за пределы оптимального диапазона. Рекомендуется проверить систему вентиляции.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Charts Tab */}
                {activeTab === 'charts' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-4">График температуры за 24 часа</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={tempData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                            <XAxis 
                              dataKey="time" 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                            />
                            <YAxis 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                              label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#71717a' }}
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
                              dataKey="temp" 
                              stroke="#fb923c" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div>
                      <h3 className="text-zinc-100 mb-3">Почасовая динамика</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 h-40 flex items-end gap-2">
                        {[22, 21, 20, 19, 20, 21, 22, 23, 24, 25, 24, 23, 22, 23, 24, 25, 24, 23, 22, 21, 20, 21, 22, 24].map((temp, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t"
                              style={{ height: `${(temp / 30) * 100}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500 mt-2 px-2">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-3">История измерений</h3>
                      <div className="space-y-2">
                        {historyData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                item.trend === 'up' ? 'bg-red-600/20' :
                                item.trend === 'down' ? 'bg-blue-600/20' :
                                'bg-emerald-600/20'
                              }`}>
                                {item.trend === 'up' ? (
                                  <TrendingUp className="w-5 h-5 text-red-400" />
                                ) : item.trend === 'down' ? (
                                  <TrendingDown className="w-5 h-5 text-blue-400" />
                                ) : (
                                  <Activity className="w-5 h-5 text-emerald-400" />
                                )}
                              </div>
                              <div>
                                <div className="text-zinc-100">{item.value}</div>
                                <div className="text-sm text-zinc-400">{item.time}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">Статистика за период</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">За неделю</div>
                          <div className="text-xl text-orange-400">Средняя: 22.5°C</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">За месяц</div>
                          <div className="text-xl text-orange-400">Средняя: 21.8°C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-4">Оповещения</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Уведомления включены</div>
                            <div className="text-sm text-zinc-500">Получать все уведомления</div>
                          </div>
                          <button
                            onClick={() => setEnableNotifications(!enableNotifications)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableNotifications ? 'bg-orange-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableNotifications ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Оповещения о выходе за пределы</div>
                            <div className="text-sm text-zinc-500">При критических значениях</div>
                          </div>
                          <button
                            onClick={() => setEnableAlerts(!enableAlerts)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableAlerts ? 'bg-red-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableAlerts ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Пороги оповещений</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-zinc-100">Минимальная температура</label>
                            <span className="text-blue-400">{minTempAlert}°C</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="20"
                            value={minTempAlert}
                            onChange={(e) => setMinTempAlert(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-zinc-100">Максимальная температура</label>
                            <span className="text-red-400">{maxTempAlert}°C</span>
                          </div>
                          <input
                            type="range"
                            min="25"
                            max="40"
                            value={maxTempAlert}
                            onChange={(e) => setMaxTempAlert(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Техническая информация</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Точность</span>
                          <span className="text-zinc-100">±0.5°C</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Интервал обновления</span>
                          <span className="text-zinc-100">30 секунд</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.21</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:01</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v2.4.1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">24д 12ч</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700 bg-zinc-800">
                <button onClick={onClose} className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors">
                  Закрыть
                </button>
                {activeTab === 'settings' && (
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 py-3 rounded-xl transition-colors">
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
