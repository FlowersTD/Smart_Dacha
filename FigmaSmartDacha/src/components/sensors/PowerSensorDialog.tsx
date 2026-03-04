import { X, Battery, Zap, TrendingDown, AlertTriangle, Clock, Sun, Settings, Activity, BarChart3, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PowerSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    status: 'active' | 'inactive';
  } | null;
}

// Mock data for detailed chart
const generatePowerData = () => {
  const hours = 24;
  const data = [];
  for (let i = 0; i < hours; i++) {
    const time = `${String(i).padStart(2, '0')}:00`;
    const charge = 85 + Math.random() * 10 + Math.sin(i / 4) * 5;
    data.push({ time, charge: parseFloat(charge.toFixed(1)) });
  }
  return data;
};

export function PowerSensorDialog({ isOpen, onClose, device }: PowerSensorDialogProps) {
  if (!device) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'sources' | 'settings'>('overview');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableAutoSwitch, setEnableAutoSwitch] = useState(true);
  const [lowBatteryThreshold, setLowBatteryThreshold] = useState(20);
  const [deviceName, setDeviceName] = useState(device.name);

  const currentCharge = parseFloat(device.value);
  const isLowBattery = currentCharge < 20;
  const estimatedTime = Math.floor((currentCharge / 100) * 48); // hours
  const powerData = generatePowerData();

  const historyData = [
    { time: '2 часа назад', charge: '98%', event: 'Полная зарядка' },
    { time: '6 часов назад', charge: '85%', event: 'Разрядка' },
    { time: '12 часов назад', charge: '92%', event: 'Зарядка' },
    { time: '24 часа назад', charge: '88%', event: 'Разрядка' },
  ];

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: Battery },
    { id: 'charts', label: 'Графики', icon: BarChart3 },
    { id: 'sources', label: 'Источники', icon: Sun },
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
                  <div className={`p-3 rounded-xl bg-gradient-to-br border ${
                    isLowBattery 
                      ? 'from-red-600/20 to-orange-600/20 border-red-600/40'
                      : 'from-emerald-600/20 to-green-600/20 border-emerald-600/40'
                  }`}>
                    <Battery className={`w-8 h-8 ${isLowBattery ? 'text-red-400' : 'text-emerald-400'}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <p className="text-sm text-zinc-400">Система питания и энергии</p>
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
                          ? 'bg-zinc-700 text-emerald-400 border-b-2 border-emerald-400'
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
                    {/* Current Charge */}
                    <div className={`bg-gradient-to-br rounded-xl p-6 border ${
                      isLowBattery
                        ? 'from-red-600/20 to-orange-600/20 border-red-600/40'
                        : 'from-emerald-600/20 to-green-600/20 border-emerald-600/40'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Текущий заряд батареи</div>
                          <div className={`text-5xl ${isLowBattery ? 'text-red-400' : 'text-emerald-400'}`}>
                            {device.value}
                          </div>
                          <div className="text-sm text-zinc-400 mt-2">
                            Осталось ~{estimatedTime} часов работы
                          </div>
                        </div>
                        <div className="relative w-32 h-48">
                          {/* Battery Visual */}
                          <div className="absolute inset-x-8 top-2 bottom-0 bg-zinc-700 rounded-lg border-4 border-zinc-600">
                            <div className="absolute inset-x-0 top-0 w-8 h-4 bg-zinc-600 rounded-t-sm mx-auto -mt-6" />
                            <motion.div
                              className={`absolute inset-x-0 bottom-0 rounded-md ${
                                isLowBattery 
                                  ? 'bg-gradient-to-t from-red-500 to-orange-500'
                                  : 'bg-gradient-to-t from-emerald-500 to-green-400'
                              }`}
                              initial={{ height: 0 }}
                              animate={{ height: `${currentCharge}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Power Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-zinc-500">Потребление</span>
                        </div>
                        <div className="text-2xl text-yellow-400">245 Вт</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="w-4 h-4 text-orange-400" />
                          <span className="text-xs text-zinc-500">Солн. панели</span>
                        </div>
                        <div className="text-2xl text-orange-400">180 Вт</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-500">Разряд</span>
                        </div>
                        <div className="text-2xl text-blue-400">-65 Вт</div>
                      </div>
                    </div>

                    {/* Energy Saving Tips */}
                    <div className="bg-blue-600/10 border border-blue-600/40 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-blue-400 mb-2">Рекомендации по энергосбережению</div>
                          <div className="space-y-1 text-sm text-zinc-400">
                            <div>• Отключите неиспользуемые устройства</div>
                            <div>• Настройте таймеры освещения</div>
                            <div>• Проверьте ориентацию солнечных панелей</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isLowBattery && (
                      <div className="flex items-start gap-3 p-4 bg-red-600/10 border border-red-600/40 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-red-400 mb-1">Низкий заряд батареи!</div>
                          <div className="text-sm text-zinc-400">
                            Рекомендуется подключить внешнее питание или отключить энергозатратные устройства.
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
                      <h3 className="text-zinc-100 mb-4">Уровень заряда за 24 часа</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <ResponsiveContainer width="100%" height={300}>
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
                              dataKey="charge" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div>
                      <h3 className="text-zinc-100 mb-3">Уровень заряда (7 дней)</h3>
                      <div className="bg-zinc-900 rounded-xl p-4 h-32 flex items-end gap-2">
                        {[85, 78, 82, 90, 88, 92, 95, 93, 90, 88, 85, 80, 78, 82, 88, 92, 95, 98].map((charge, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div
                              className={`w-full rounded-t ${
                                charge < 20 ? 'bg-gradient-to-t from-red-600 to-red-400' : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                              }`}
                              style={{ height: `${charge}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500 mt-2 px-2">
                        <span>7 дней назад</span>
                        <span>Сегодня</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">История событий</h3>
                      <div className="space-y-2">
                        {historyData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-emerald-400" />
                              <div>
                                <div className="text-zinc-100">{item.event}</div>
                                <div className="text-sm text-zinc-400">{item.time}</div>
                              </div>
                            </div>
                            <div className="text-emerald-400">{item.charge}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sources Tab */}
                {activeTab === 'sources' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-3">Источники энергии</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Sun className="w-5 h-5 text-orange-400" />
                              <span className="text-zinc-100">Солнечные панели</span>
                            </div>
                            <span className="text-emerald-400">Активны</span>
                          </div>
                          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 rounded-full" style={{ width: '75%' }} />
                          </div>
                          <div className="text-xs text-zinc-500 mt-2">Генерация: 180 Вт из 240 Вт макс.</div>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-yellow-400" />
                              <span className="text-zinc-100">Сеть 220В</span>
                            </div>
                            <span className="text-zinc-400">Резерв</span>
                          </div>
                          <div className="text-xs text-zinc-500">Подключение при низком заряде (&lt;15%)</div>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Battery className="w-5 h-5 text-emerald-400" />
                              <span className="text-zinc-100">Аккумулятор</span>
                            </div>
                            <span className="text-emerald-400">{device.value}</span>
                          </div>
                          <div className="text-xs text-zinc-500">Емкость: 10 кВт⋅ч • Напряжение: 48В</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">Статистика потребления</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">За сегодня</div>
                          <div className="text-2xl text-yellow-400">4.2 кВт⋅ч</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">За неделю</div>
                          <div className="text-2xl text-orange-400">28.5 кВт⋅ч</div>
                        </div>
                      </div>
                    </div>
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
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Автоматическое управление</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Автопереключение на сеть</div>
                            <div className="text-sm text-zinc-500">При низком заряде батареи</div>
                          </div>
                          <button
                            onClick={() => setEnableAutoSwitch(!enableAutoSwitch)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableAutoSwitch ? 'bg-emerald-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableAutoSwitch ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-zinc-100">Порог низкого заряда</label>
                            <span className="text-red-400">{lowBatteryThreshold}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="30"
                            value={lowBatteryThreshold}
                            onChange={(e) => setLowBatteryThreshold(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
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
                            <div className="text-sm text-zinc-500">О низком заряде и переключениях</div>
                          </div>
                          <button
                            onClick={() => setEnableNotifications(!enableNotifications)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableNotifications ? 'bg-emerald-600' : 'bg-zinc-700'}
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
                          <span className="text-zinc-400">Тип батареи</span>
                          <span className="text-zinc-100">LiFePO4</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Емкость</span>
                          <span className="text-zinc-100">10 кВт⋅ч</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Напряжение</span>
                          <span className="text-zinc-100">48В</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.26</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:07</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v6.2.1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Циклов зарядки</span>
                          <span className="text-zinc-100">342</span>
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
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors">
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
