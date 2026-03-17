import { X, Plus, Trash2, ChevronDown, ChevronRight, Clock, Thermometer, Droplets, Lightbulb, Wind, Zap, Calendar, Bell, FileText, AlertTriangle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface EditScriptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  script?: {
    id: number;
    name: string;
    triggers: any[];
    actions: any[];
  };
}

interface Trigger {
  id: string;
  type: 'time' | 'device' | 'condition';
  device?: string;
  condition?: string;
  value?: string;
  time?: string;
}

interface Action {
  id: string;
  device: string;
  action: string;
  value?: string;
}

export function EditScriptDialog({ isOpen, onClose, script }: EditScriptDialogProps) {
  const [scriptName, setScriptName] = useState(script?.name || 'Новый сценарий');
  const [triggers, setTriggers] = useState<Trigger[]>(script?.triggers || []);
  const [actions, setActions] = useState<Action[]>(script?.actions || []);
  const [expandedTrigger, setExpandedTrigger] = useState(true);
  const [expandedAction, setExpandedAction] = useState(true);
  const [expandedSchedule, setExpandedSchedule] = useState(false);
  const [expandedSettings, setExpandedSettings] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState(false);
  
  // Schedule settings
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  
  // Script settings
  const [priority, setPriority] = useState('medium');
  const [enableLogging, setEnableLogging] = useState(true);
  const [timeout, setTimeout] = useState('60');
  const [retryOnError, setRetryOnError] = useState(true);
  
  // Notification settings
  const [notifyOnStart, setNotifyOnStart] = useState(false);
  const [notifyOnComplete, setNotifyOnComplete] = useState(true);
  const [notifyOnError, setNotifyOnError] = useState(true);

  const weekDays = [
    { id: 'mon', label: 'Пн' },
    { id: 'tue', label: 'Вт' },
    { id: 'wed', label: 'Ср' },
    { id: 'thu', label: 'Чт' },
    { id: 'fri', label: 'Пт' },
    { id: 'sat', label: 'Сб' },
    { id: 'sun', label: 'Вс' },
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const deviceOptions = [
    { value: 'temperature', label: 'Датчик температуры', icon: Thermometer },
    { value: 'humidity', label: 'Датчик влажности', icon: Droplets },
    { value: 'light', label: 'Освещение', icon: Lightbulb },
    { value: 'ventilation', label: 'Вентиляция', icon: Wind },
  ];

  const conditionOptions = [
    { value: 'greater', label: 'Больше чем' },
    { value: 'less', label: 'Меньше чем' },
    { value: 'equals', label: 'Равно' },
    { value: 'between', label: 'В диапазоне' },
  ];

  const actionOptions = {
    light: [
      { value: 'turn_on', label: 'Включить' },
      { value: 'turn_off', label: 'Выключить' },
      { value: 'set_brightness', label: 'Установить яркость' },
    ],
    ventilation: [
      { value: 'turn_on', label: 'Включить' },
      { value: 'turn_off', label: 'Выключить' },
      { value: 'set_speed', label: 'Установить скорость' },
    ],
  };

  const addTrigger = (type: 'time' | 'device' | 'condition') => {
    const newTrigger: Trigger = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      ...(type === 'time' && { time: '12:00' }),
      ...(type === 'device' && { device: 'temperature', condition: 'greater', value: '25' }),
      ...(type === 'condition' && { device: 'humidity', condition: 'less', value: '60' }),
    };
    setTriggers([...triggers, newTrigger]);
  };

  const addAction = () => {
    const newAction: Action = {
      id: Math.random().toString(36).substr(2, 9),
      device: 'light',
      action: 'turn_on',
      value: '',
    };
    setActions([...actions, newAction]);
  };

  const removeTrigger = (id: string) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const updateTrigger = (id: string, field: string, value: any) => {
    setTriggers(triggers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const updateAction = (id: string, field: string, value: any) => {
    setActions(actions.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const getTriggerLabel = (trigger: Trigger) => {
    if (trigger.type === 'time') {
      return `В ${trigger.time}`;
    }
    const device = deviceOptions.find(d => d.value === trigger.device)?.label || '';
    const condition = conditionOptions.find(c => c.value === trigger.condition)?.label.toLowerCase() || '';
    return `${device} ${condition} ${trigger.value}`;
  };

  const getActionLabel = (action: Action) => {
    const device = deviceOptions.find(d => d.value === action.device)?.label || '';
    const actionLabel = (actionOptions[action.device as keyof typeof actionOptions] || [])
      .find(a => a.value === action.action)?.label || '';
    return `${device}: ${actionLabel}${action.value ? ` (${action.value})` : ''}`;
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
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex-1">
                  <input
                    type="text"
                    value={scriptName}
                    onChange={(e) => setScriptName(e.target.value)}
                    className="text-2xl text-zinc-100 bg-transparent border-none outline-none w-full"
                    placeholder="Название сценария"
                  />
                  <p className="text-sm text-zinc-400 mt-1">Редактирование сценария автоматизации</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors ml-4"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Triggers Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setExpandedTrigger(!expandedTrigger)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedTrigger ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                      <Zap className="w-5 h-5 text-emerald-400" />
                      <div className="text-left">
                        <h3 className="text-zinc-100">Условия запуска</h3>
                        <p className="text-sm text-zinc-400">Когда выполнить сценарий</p>
                      </div>
                    </div>
                    <span className="text-sm text-zinc-500">{triggers.length} условий</span>
                  </button>

                  {expandedTrigger && (
                    <div className="p-4 pt-0 space-y-3">
                      {triggers.map((trigger, index) => (
                        <motion.div
                          key={trigger.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-zinc-800 rounded-xl p-4 border border-zinc-700"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                                  {index === 0 ? 'ЕСЛИ' : 'И'}
                                </span>
                                <select
                                  value={trigger.type}
                                  onChange={(e) => updateTrigger(trigger.id, 'type', e.target.value)}
                                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-600"
                                >
                                  <option value="time">По времени</option>
                                  <option value="device">По устройству</option>
                                  <option value="condition">По условию</option>
                                </select>
                              </div>

                              {trigger.type === 'time' && (
                                <input
                                  type="time"
                                  value={trigger.time || '12:00'}
                                  onChange={(e) => updateTrigger(trigger.id, 'time', e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-600"
                                />
                              )}

                              {(trigger.type === 'device' || trigger.type === 'condition') && (
                                <div className="grid grid-cols-3 gap-2">
                                  <select
                                    value={trigger.device}
                                    onChange={(e) => updateTrigger(trigger.id, 'device', e.target.value)}
                                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-600"
                                  >
                                    {deviceOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                  </select>
                                  <select
                                    value={trigger.condition}
                                    onChange={(e) => updateTrigger(trigger.id, 'condition', e.target.value)}
                                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-600"
                                  >
                                    {conditionOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                  </select>
                                  <input
                                    type="text"
                                    value={trigger.value || ''}
                                    onChange={(e) => updateTrigger(trigger.id, 'value', e.target.value)}
                                    placeholder="Значение"
                                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-600"
                                  />
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3 py-2 rounded-lg">
                                <Zap className="w-3 h-3" />
                                {getTriggerLabel(trigger)}
                              </div>
                            </div>

                            <button
                              onClick={() => removeTrigger(trigger.id)}
                              className="p-2 hover:bg-zinc-900 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </motion.div>
                      ))}

                      <div className="flex gap-2">
                        <button
                          onClick={() => addTrigger('time')}
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2 px-3 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <Clock className="w-4 h-4" />
                          По времени
                        </button>
                        <button
                          onClick={() => addTrigger('device')}
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2 px-3 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <Thermometer className="w-4 h-4" />
                          По устройству
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setExpandedAction(!expandedAction)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedAction ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                      <Lightbulb className="w-5 h-5 text-blue-400" />
                      <div className="text-left">
                        <h3 className="text-zinc-100">Действия</h3>
                        <p className="text-sm text-zinc-400">Что нужно сделать</p>
                      </div>
                    </div>
                    <span className="text-sm text-zinc-500">{actions.length} действий</span>
                  </button>

                  {expandedAction && (
                    <div className="p-4 pt-0 space-y-3">
                      {actions.map((action, index) => (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-zinc-800 rounded-xl p-4 border border-zinc-700"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                                  {index + 1}
                                </span>
                                <select
                                  value={action.device}
                                  onChange={(e) => updateAction(action.id, 'device', e.target.value)}
                                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-blue-600"
                                >
                                  {deviceOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <select
                                  value={action.action}
                                  onChange={(e) => updateAction(action.id, 'action', e.target.value)}
                                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-blue-600"
                                >
                                  {(actionOptions[action.device as keyof typeof actionOptions] || []).map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </select>
                                {(action.action === 'set_brightness' || action.action === 'set_speed') && (
                                  <input
                                    type="text"
                                    value={action.value || ''}
                                    onChange={(e) => updateAction(action.id, 'value', e.target.value)}
                                    placeholder="Значение (%)"
                                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-blue-600"
                                  />
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3 py-2 rounded-lg">
                                <Lightbulb className="w-3 h-3" />
                                {getActionLabel(action)}
                              </div>
                            </div>

                            <button
                              onClick={() => removeAction(action.id)}
                              className="p-2 hover:bg-zinc-900 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </motion.div>
                      ))}

                      <button
                        onClick={addAction}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3 px-4 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Добавить действие
                      </button>
                    </div>
                  )}
                </div>

                {/* Schedule Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setExpandedSchedule(!expandedSchedule)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSchedule ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div className="text-left">
                        <h3 className="text-zinc-100">Расписание</h3>
                        <p className="text-sm text-zinc-400">Настройка времени выполнения</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnableSchedule(!enableSchedule);
                        }}
                        className={`
                          relative w-12 h-6 rounded-full transition-colors
                          ${enableSchedule ? 'bg-purple-600' : 'bg-zinc-700'}
                        `}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                          animate={{ x: enableSchedule ? 24 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </button>

                  {expandedSchedule && enableSchedule && (
                    <div className="p-4 pt-0 space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Дни недели</label>
                        <div className="grid grid-cols-7 gap-2">
                          {weekDays.map((day) => (
                            <button
                              key={day.id}
                              onClick={() => toggleDay(day.id)}
                              className={`
                                py-2 rounded-lg text-sm transition-all
                                ${selectedDays.includes(day.id)
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                }
                              `}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Время начала</label>
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-purple-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Время окончания</label>
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setExpandedSettings(!expandedSettings)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSettings ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                      <FileText className="w-5 h-5 text-orange-400" />
                      <div className="text-left">
                        <h3 className="text-zinc-100">Настройки выполнения</h3>
                        <p className="text-sm text-zinc-400">Приоритет, логирование и повторы</p>
                      </div>
                    </div>
                  </button>

                  {expandedSettings && (
                    <div className="p-4 pt-0 space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Приоритет</label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-orange-600"
                        >
                          <option value="low">Низкий</option>
                          <option value="medium">Средний</option>
                          <option value="high">Высокий</option>
                          <option value="critical">Критический</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Таймаут (секунды)</label>
                        <input
                          type="number"
                          value={timeout}
                          onChange={(e) => setTimeout(e.target.value)}
                          placeholder="60"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-orange-600"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-zinc-400" />
                          <div>
                            <div className="text-zinc-100">Логирование</div>
                            <div className="text-sm text-zinc-500">Записывать все выполнения</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setEnableLogging(!enableLogging)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${enableLogging ? 'bg-orange-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: enableLogging ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Repeat className="w-5 h-5 text-zinc-400" />
                          <div>
                            <div className="text-zinc-100">Повтор при ошибке</div>
                            <div className="text-sm text-zinc-500">Автоматический перезапуск</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setRetryOnError(!retryOnError)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${retryOnError ? 'bg-orange-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: retryOnError ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setExpandedNotifications(!expandedNotifications)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedNotifications ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                      <Bell className="w-5 h-5 text-yellow-400" />
                      <div className="text-left">
                        <h3 className="text-zinc-100">Уведомления</h3>
                        <p className="text-sm text-zinc-400">Когда отправлять уведомления</p>
                      </div>
                    </div>
                  </button>

                  {expandedNotifications && (
                    <div className="p-4 pt-0 space-y-3">
                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-zinc-400" />
                          <div>
                            <div className="text-zinc-100">При запуске</div>
                            <div className="text-sm text-zinc-500">Уведомление о начале выполнения</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifyOnStart(!notifyOnStart)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${notifyOnStart ? 'bg-yellow-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: notifyOnStart ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-zinc-400" />
                          <div>
                            <div className="text-zinc-100">При завершении</div>
                            <div className="text-sm text-zinc-500">Уведомление об успешном выполнении</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifyOnComplete(!notifyOnComplete)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${notifyOnComplete ? 'bg-yellow-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: notifyOnComplete ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-zinc-400" />
                          <div>
                            <div className="text-zinc-100">При ошибке</div>
                            <div className="text-sm text-zinc-500">Уведомление о сбоях</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifyOnError(!notifyOnError)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${notifyOnError ? 'bg-yellow-600' : 'bg-zinc-700'}
                          `}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: notifyOnError ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview */}
                {triggers.length > 0 && actions.length > 0 && (
                  <div className="bg-gradient-to-br from-emerald-600/10 to-blue-600/10 border border-emerald-600/40 rounded-xl p-4">
                    <h4 className="text-emerald-400 mb-2">Предпросмотр сценария</h4>
                    <div className="text-sm text-zinc-300 space-y-1">
                      <p className="text-zinc-400">
                        <span className="text-emerald-400">ЕСЛИ:</span>{' '}
                        {triggers.map((t, i) => (
                          <span key={t.id}>
                            {i > 0 && ' И '}
                            {getTriggerLabel(t)}
                          </span>
                        ))}
                      </p>
                      <p className="text-zinc-400">
                        <span className="text-blue-400">ТОГДА:</span>{' '}
                        {actions.map((a, i) => (
                          <span key={a.id}>
                            {i > 0 && ', '}
                            {getActionLabel(a)}
                          </span>
                        ))}
                      </p>
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
                  Отменить
                </button>
                <button
                  onClick={() => {
                    // Save logic here
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 py-3 rounded-xl transition-all"
                >
                  Сохранить сценарий
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
