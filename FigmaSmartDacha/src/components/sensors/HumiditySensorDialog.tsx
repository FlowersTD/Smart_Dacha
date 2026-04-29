import { X, Droplets, TrendingUp, Activity, AlertCircle, Cloud, BarChart3, Clock, Settings, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HumiditySensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    status: 'active' | 'inactive';
  } | null;
}

// Mock data for detailed chart
const generateHumidityData = () => {
  const hours = 24;
  const data = [];
  for (let i = 0; i < hours; i++) {
    const time = `${String(i).padStart(2, '0')}:00`;
    const humidity = 60 + Math.random() * 20 + Math.sin(i / 3) * 10;
    data.push({ time, humidity: parseFloat(humidity.toFixed(1)) });
  }
  return data;
};

export function HumiditySensorDialog({ isOpen, onClose, device }: HumiditySensorDialogProps) {
  if (!device) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'history' | 'settings'>('overview');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [minHumidityAlert, setMinHumidityAlert] = useState(40);
  const [maxHumidityAlert, setMaxHumidityAlert] = useState(80);

  const currentHumidity = parseFloat(device.value);
  const minHumidity = 55;
  const maxHumidity = 78;
  const avgHumidity = 65;
  const isLow = currentHumidity < 40;
  const isHigh = currentHumidity > 80;
  const humidityData = generateHumidityData();

  const historyData = [
    { time: '2 мин назад', value: '65%', trend: 'up' },
    { time: '10 мин назад', value: '63%', trend: 'up' },
    { time: '30 мин назад', value: '62%', trend: 'stable' },
    { time: '1 час назад', value: '62%', trend: 'down' },
    { time: '2 часа назад', value: '64%', trend: 'stable' },
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
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-600/40">
                    <Droplets className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <p className="text-sm text-zinc-400">Датчик влажности</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
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
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    {/* Current Humidity */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-600/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Текущая влажность</div>
                          <div className="text-5xl text-blue-400">{device.value}</div>
                          <div className="text-sm text-zinc-500 mt-2">
                            {isLow && 'Низкая влажность'}
                            {isHigh && 'Высокая влажность'}
                            {!isLow && !isHigh && 'Нормальный уровень'}
                          </div>
                        </div>
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="rgba(59, 130, 246, 0.2)"
                              strokeWidth="12"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="12"
                              strokeDasharray={`${(currentHumidity / 100) * 352} 352`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Droplets className="w-10 h-10 text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Humidity Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs text-zinc-500">Макс. за сутки</span>
                        </div>
                        <div className="text-2xl text-cyan-400">{maxHumidity}%</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-zinc-500">Средняя</span>
                        </div>
                        <div className="text-2xl text-emerald-400">{avgHumidity}%</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Cloud className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-500">Мин. за сутки</span>
                        </div>
                        <div className="text-2xl text-blue-400">{minHumidity}%</div>
                      </div>
                    </div>

                    {/* Moisture Recommendations */}
                    <div>
                      <h3 className="text-zinc-100 mb-3">Рекомендации по влажности</h3>
                      <div className="space-y-3 bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                          <div>
                            <div className="text-zinc-100">Оптимальная влажность для растений</div>
                            <div className="text-sm text-zinc-400">60-75% для большинства культур</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                          <div>
                            <div className="text-zinc-100">Критические уровни</div>
                            <div className="text-sm text-zinc-400">&lt;40% - требуется полив, &gt;80% - риск плесени</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                          <div>
                            <div className="text-zinc-100">Текущий статус</div>
                            <div className="text-sm text-zinc-400">
                              {isLow && 'Рекомендуется включить систему полива'}
                              {isHigh && 'Рекомендуется усилить вентиляцию'}
                              {!isLow && !isHigh && 'Влажность в норме, действий не требуется'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(isLow || isHigh) && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-600/10 border border-yellow-600/40 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-yellow-400 mb-1">Внимание</div>
                          <div className="text-sm text-zinc-400">
                            {isLow && 'Влажность ниже рекомендуемого уровня. Включите автоматический полив.'}
                            {isHigh && 'Влажность выше рекомендуемого уровня. Проверьте систему вентиляции.'}
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
                      <h3 className="text-zinc-100 mb-4">График влажности за 24 часа</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={humidityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                            <XAxis 
                              dataKey="time" 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                            />
                            <YAxis 
                              stroke="#71717a"
                              tick={{ fill: '#71717a', fontSize: 12 }}
                              label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#71717a' }}
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
                              dataKey="humidity" 
                              stroke="#3b82f6" 
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
                        {[65, 64, 63, 62, 60, 59, 58, 60, 62, 65, 67, 70, 72, 74, 75, 73, 70, 68, 66, 65, 64, 63, 64, 65].map((humidity, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t"
                              style={{ height: `${humidity}%` }}
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
                                item.trend === 'up' ? 'bg-cyan-600/20' :
                                item.trend === 'down' ? 'bg-blue-600/20' :
                                'bg-emerald-600/20'
                              }`}>
                                {item.trend === 'up' ? (
                                  <TrendingUp className="w-5 h-5 text-cyan-400" />
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
                          <div className="text-xl text-blue-400">Средняя: 66.2%</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">За месяц</div>
                          <div className="text-xl text-blue-400">Средняя: 64.8%</div>
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

                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Оповещения о критических уровнях</div>
                            <div className="text-sm text-zinc-500">При выходе за пределы нормы</div>
                          </div>
                          <button
                            onClick={() => setEnableAlerts(!enableAlerts)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableAlerts ? 'bg-cyan-600' : 'bg-zinc-700'}
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
                            <label className="text-zinc-100">Минимальная влажность</label>
                            <span className="text-blue-400">{minHumidityAlert}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="50"
                            value={minHumidityAlert}
                            onChange={(e) => setMinHumidityAlert(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-zinc-100">Максимальная влажность</label>
                            <span className="text-cyan-400">{maxHumidityAlert}%</span>
                          </div>
                          <input
                            type="range"
                            min="70"
                            max="95"
                            value={maxHumidityAlert}
                            onChange={(e) => setMaxHumidityAlert(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Техническая информация</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Точность</span>
                          <span className="text-zinc-100">±2%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Интервал обновления</span>
                          <span className="text-zinc-100">30 секунд</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.22</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:02</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v2.3.8</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">30д 8ч</span>
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
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition-colors">
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
