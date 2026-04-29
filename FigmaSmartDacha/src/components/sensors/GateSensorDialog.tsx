import { X, DoorOpen, DoorClosed, Lock, Unlock, Clock, Shield, Settings, AlertTriangle, Activity, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface GateSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    icon: LucideIcon;
    status: 'active' | 'inactive';
  };
}

export function GateSensorDialog({ isOpen, onClose, device }: GateSensorDialogProps) {
  const [gateStatus, setGateStatus] = useState<'opened' | 'closed' | 'opening' | 'closing'>('closed');
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState<'control' | 'history' | 'security' | 'settings'>('control');
  const [autoCloseMinutes, setAutoCloseMinutes] = useState(5);
  const [enableAutoClose, setEnableAutoClose] = useState(true);
  const [enableSafetyStop, setEnableSafetyStop] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [deviceName, setDeviceName] = useState(device.name);

  const openingsHistory = [
    { time: '14:30', action: 'Открыто', user: 'Иван П.', method: 'Пульт' },
    { time: '14:35', action: 'Закрыто', user: 'Автоматически', method: 'Таймер' },
    { time: '09:15', action: 'Открыто', user: 'Мария С.', method: 'Приложение' },
    { time: '09:20', action: 'Закрыто', user: 'Мария С.', method: 'Приложение' },
    { time: '07:00', action: 'Открыто', user: 'Иван П.', method: 'Приложение' },
  ];

  const accessLog = [
    { date: '21.12.2025', opens: 8, closes: 8, alerts: 0 },
    { date: '20.12.2025', opens: 12, closes: 12, alerts: 1 },
    { date: '19.12.2025', opens: 6, closes: 6, alerts: 0 },
    { date: '18.12.2025', opens: 10, closes: 10, alerts: 0 },
  ];

  const tabs = [
    { id: 'control', label: 'Управление', icon: DoorOpen },
    { id: 'history', label: 'История', icon: Clock },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  const handleOpenClose = () => {
    if (gateStatus === 'closed') {
      setGateStatus('opening');
      setTimeout(() => setGateStatus('opened'), 2000);
    } else if (gateStatus === 'opened') {
      setGateStatus('closing');
      setTimeout(() => setGateStatus('closed'), 2000);
    }
  };

  const getStatusColor = () => {
    switch (gateStatus) {
      case 'opened': return 'text-emerald-400';
      case 'closed': return 'text-red-400';
      case 'opening':
      case 'closing': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  const getStatusText = () => {
    switch (gateStatus) {
      case 'opened': return 'Открыто';
      case 'closed': return 'Закрыто';
      case 'opening': return 'Открывается...';
      case 'closing': return 'Закрывается...';
      default: return 'Неизвестно';
    }
  };

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
                  <div className={`p-3 rounded-xl ${
                    gateStatus === 'opened' ? 'bg-emerald-600/20' : 
                    gateStatus === 'closed' ? 'bg-red-600/20' : 
                    'bg-yellow-600/20'
                  }`}>
                    {gateStatus === 'opened' ? (
                      <DoorOpen className={`w-8 h-8 ${getStatusColor()}`} />
                    ) : (
                      <DoorClosed className={`w-8 h-8 ${getStatusColor()}`} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          gateStatus === 'opened' ? 'bg-emerald-400' : 
                          gateStatus === 'closed' ? 'bg-red-400' : 
                          'bg-yellow-400'
                        }`}
                        animate={
                          gateStatus === 'opening' || gateStatus === 'closing'
                            ? { opacity: [1, 0.3, 1] }
                            : {}
                        }
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className={`text-sm ${getStatusColor()}`}>
                        {getStatusText()}
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
                {/* Control Tab */}
                {activeTab === 'control' && (
                  <div className="space-y-6">
                    {/* Status Display */}
                    <div className={`
                      rounded-xl p-6 border
                      ${gateStatus === 'opened' ? 'bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-600/40' : 
                        gateStatus === 'closed' ? 'bg-gradient-to-br from-red-600/20 to-red-800/20 border-red-600/40' : 
                        'bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-600/40'
                      }
                    `}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Состояние ворот</div>
                          <div className={`text-4xl ${getStatusColor()}`}>
                            {getStatusText()}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {isLocked ? (
                              <>
                                <Lock className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-red-400">Заблокировано</span>
                              </>
                            ) : (
                              <>
                                <Unlock className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">Разблокировано</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke={
                                gateStatus === 'opened' ? 'rgba(52, 211, 153, 0.2)' :
                                gateStatus === 'closed' ? 'rgba(248, 113, 113, 0.2)' :
                                'rgba(251, 191, 36, 0.2)'
                              }
                              strokeWidth="12"
                            />
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke={
                                gateStatus === 'opened' ? '#34d399' :
                                gateStatus === 'closed' ? '#f87171' :
                                '#fbbf24'
                              }
                              strokeWidth="12"
                              strokeDasharray="352"
                              strokeDashoffset={gateStatus === 'opened' ? 0 : 352}
                              strokeLinecap="round"
                              animate={{
                                strokeDashoffset: gateStatus === 'opened' ? 0 : gateStatus === 'closed' ? 352 : 176
                              }}
                              transition={{ duration: 0.5 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            {gateStatus === 'opened' ? (
                              <DoorOpen className={`w-12 h-12 ${getStatusColor()}`} />
                            ) : (
                              <DoorClosed className={`w-12 h-12 ${getStatusColor()}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleOpenClose}
                        disabled={gateStatus === 'opening' || gateStatus === 'closing'}
                        className={`
                          py-6 rounded-xl border transition-all
                          ${gateStatus === 'closed'
                            ? 'bg-emerald-600/20 border-emerald-600/40 hover:bg-emerald-600/30 text-emerald-400'
                            : 'bg-red-600/20 border-red-600/40 hover:bg-red-600/30 text-red-400'
                          }
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                      >
                        {gateStatus === 'closed' ? (
                          <>
                            <DoorOpen className="w-8 h-8 mx-auto mb-2" />
                            <div>Открыть ворота</div>
                          </>
                        ) : (
                          <>
                            <DoorClosed className="w-8 h-8 mx-auto mb-2" />
                            <div>Закрыть ворота</div>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsLocked(!isLocked)}
                        className={`
                          py-6 rounded-xl border transition-all
                          ${isLocked
                            ? 'bg-red-600/20 border-red-600/40 hover:bg-red-600/30 text-red-400'
                            : 'bg-emerald-600/20 border-emerald-600/40 hover:bg-emerald-600/30 text-emerald-400'
                          }
                        `}
                      >
                        {isLocked ? (
                          <>
                            <Lock className="w-8 h-8 mx-auto mb-2" />
                            <div>Разблокировать</div>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-8 h-8 mx-auto mb-2" />
                            <div>Заблокировать</div>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Auto-Close Timer */}
                    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span className="text-zinc-100">Автозакрытие</span>
                          </div>
                          <div className="text-sm text-zinc-500 mt-1">
                            {enableAutoClose ? `Закроется через ${autoCloseMinutes} мин после открытия` : 'Отключено'}
                          </div>
                        </div>
                        <button
                          onClick={() => setEnableAutoClose(!enableAutoClose)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${enableAutoClose ? 'bg-blue-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: enableAutoClose ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                      {enableAutoClose && (
                        <>
                          <input
                            type="range"
                            min="1"
                            max="15"
                            value={autoCloseMinutes}
                            onChange={(e) => setAutoCloseMinutes(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-xs text-zinc-500 mt-2">
                            <span>1 мин</span>
                            <span>7 мин</span>
                            <span>15 мин</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-zinc-500">Открытий сегодня</span>
                        </div>
                        <div className="text-2xl text-emerald-400">8</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-500">Среднее время</span>
                        </div>
                        <div className="text-2xl text-blue-400">4м 30с</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-zinc-500">Тревог</span>
                        </div>
                        <div className="text-2xl text-purple-400">0</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-3">Последние события</h3>
                      <div className="space-y-2">
                        {openingsHistory.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                log.action === 'Открыто' ? 'bg-emerald-600/20' : 'bg-red-600/20'
                              }`}>
                                {log.action === 'Открыто' ? (
                                  <DoorOpen className={`w-5 h-5 text-emerald-400`} />
                                ) : (
                                  <DoorClosed className={`w-5 h-5 text-red-400`} />
                                )}
                              </div>
                              <div>
                                <div className="text-zinc-100">{log.action}</div>
                                <div className="text-sm text-zinc-400">{log.user} • {log.method}</div>
                              </div>
                            </div>
                            <div className="text-sm text-zinc-400">{log.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">Статистика по дням</h3>
                      <div className="space-y-2">
                        {accessLog.map((log, index) => (
                          <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-zinc-100">{log.date}</div>
                              {log.alerts > 0 && (
                                <div className="flex items-center gap-1 text-red-400 text-sm">
                                  <AlertTriangle className="w-4 h-4" />
                                  {log.alerts} тревога
                                </div>
                              )}
                            </div>
                            <div className="flex gap-4 text-sm">
                              <div className="text-zinc-400">
                                Открытий: <span className="text-emerald-400">{log.opens}</span>
                              </div>
                              <div className="text-zinc-400">
                                Закрытий: <span className="text-red-400">{log.closes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-4">Датчики безопасности</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-emerald-600/10 border border-emerald-600/40 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-emerald-400" />
                            <div>
                              <div className="text-zinc-100">Датчик препятствий</div>
                              <div className="text-sm text-zinc-500">Активен</div>
                            </div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-emerald-600/10 border border-emerald-600/40 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-emerald-400" />
                            <div>
                              <div className="text-zinc-100">Датчик касания</div>
                              <div className="text-sm text-zinc-500">Активен</div>
                            </div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Настройки безопасности</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Автостоп при препятствии</div>
                            <div className="text-sm text-zinc-500">Остановка при обнаружении объекта</div>
                          </div>
                          <button
                            onClick={() => setEnableSafetyStop(!enableSafetyStop)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableSafetyStop ? 'bg-emerald-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableSafetyStop ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Авторизованные пользователи</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="text-zinc-100">Иван П.</div>
                              <div className="text-sm text-zinc-500">Полный доступ</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-emerald-400" />
                            <div>
                              <div className="text-zinc-100">Мария С.</div>
                              <div className="text-sm text-zinc-500">Полный доступ</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/40 py-3 rounded-xl transition-colors text-emerald-400">
                        + Добавить пользователя
                      </button>
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
                      <h3 className="text-zinc-100 mb-4">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Включить уведомления</div>
                            <div className="text-sm text-zinc-500">О каждом открытии/закрытии</div>
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
                          <span className="text-zinc-400">Модель</span>
                          <span className="text-zinc-100">SmartGate Pro 3000</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.50</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:10</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v4.2.1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Циклов открытия</span>
                          <span className="text-zinc-100">12,458</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">2г 3м</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Обслуживание</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-zinc-900 hover:bg-zinc-800 py-3 px-4 rounded-xl border border-zinc-700 transition-colors">
                          Калибровка
                        </button>
                        <button className="bg-zinc-900 hover:bg-zinc-800 py-3 px-4 rounded-xl border border-zinc-700 transition-colors">
                          Диагностика
                        </button>
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
