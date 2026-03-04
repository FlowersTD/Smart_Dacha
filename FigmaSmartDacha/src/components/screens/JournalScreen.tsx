import { AlertCircle, CheckCircle, Info, AlertTriangle, Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const logs = [
  { id: 1, type: 'success', message: 'Полив завершен успешно', device: 'Система полива #1', time: '5 мин назад', timestamp: '21.12.2025 14:30' },
  { id: 2, type: 'info', message: 'Температура в теплице: 24°C', device: 'Датчик температуры #1', time: '12 мин назад', timestamp: '21.12.2025 14:23' },
  { id: 3, type: 'warning', message: 'Низкий уровень влажности почвы', device: 'Датчик влажности', time: '25 мин назад', timestamp: '21.12.2025 14:10' },
  { id: 4, type: 'success', message: 'Освещение включено по расписанию', device: 'LED освещение', time: '1 час назад', timestamp: '21.12.2025 13:35' },
  { id: 5, type: 'error', message: 'Потеряно соединение с устройством', device: 'Система вентиляции', time: '2 часа назад', timestamp: '21.12.2025 12:35' },
  { id: 6, type: 'info', message: 'Скрипт "Утренний полив" выполнен', device: 'Система автоматизации', time: '3 часа назад', timestamp: '21.12.2025 11:35' },
  { id: 7, type: 'success', message: 'Камера начала запись', device: 'IP камера', time: '4 часа назад', timestamp: '21.12.2025 10:35' },
  { id: 8, type: 'warning', message: 'Уровень заряда батареи: 20%', device: 'Аккумулятор', time: '5 часов назад', timestamp: '21.12.2025 09:35' },
  { id: 9, type: 'info', message: 'Влажность воздуха: 72%', device: 'Датчик влажности воздуха', time: '6 часов назад', timestamp: '21.12.2025 08:35' },
  { id: 10, type: 'success', message: 'Проветривание завершено', device: 'Система вентиляции', time: '8 часов назад', timestamp: '21.12.2025 06:35' },
  { id: 11, type: 'error', message: 'Сбой датчика температуры', device: 'Датчик температуры #2', time: '10 часов назад', timestamp: '21.12.2025 04:35' },
  { id: 12, type: 'info', message: 'Включена умная розетка', device: 'Умная розетка', time: '12 часов назад', timestamp: '21.12.2025 02:35' },
  { id: 13, type: 'warning', message: 'Высокая температура в теплице', device: 'Датчик температуры #1', time: '14 часов назад', timestamp: '21.12.2025 00:35' },
  { id: 14, type: 'success', message: 'Ворота закрыты', device: 'Въездные ворота', time: '16 часов назад', timestamp: '20.12.2025 22:35' },
];

export function JournalScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-600/40 hover:border-emerald-600/60 bg-emerald-600/5';
      case 'warning':
        return 'border-yellow-600/40 hover:border-yellow-600/60 bg-yellow-600/5';
      case 'error':
        return 'border-red-600/40 hover:border-red-600/60 bg-red-600/5';
      default:
        return 'border-blue-600/40 hover:border-blue-600/60 bg-blue-600/5';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.device.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterType || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleEventClick = (log: any) => {
    setSelectedEvent(log);
    setIsEventDialogOpen(true);
  };

  const filterOptions = [
    { id: null, label: 'Все события', color: 'bg-zinc-600', count: logs.length },
    { id: 'success', label: 'Успешно', color: 'bg-emerald-600', count: logs.filter(l => l.type === 'success').length },
    { id: 'info', label: 'Информация', color: 'bg-blue-600', count: logs.filter(l => l.type === 'info').length },
    { id: 'warning', label: 'Предупреждения', color: 'bg-yellow-600', count: logs.filter(l => l.type === 'warning').length },
    { id: 'error', label: 'Ошибки', color: 'bg-red-600', count: logs.filter(l => l.type === 'error').length },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Журнал событий</h1>
          <p className="text-zinc-400">Последние события системы • Найдено: {filteredLogs.length}</p>
        </div>
        <div className="flex gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по событиям..."
              className="bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600 transition-colors w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 border transition-colors ${
                filterType
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'
              }`}
            >
              <Filter className="w-5 h-5" />
              Фильтры
              {filterType && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">1</span>
              )}
            </motion.button>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {isFilterMenuOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterMenuOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-2">
                      {filterOptions.map((option) => (
                        <button
                          key={option.id || 'all'}
                          onClick={() => {
                            setFilterType(option.id);
                            setIsFilterMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            filterType === option.id
                              ? 'bg-emerald-600/20 text-emerald-400'
                              : 'hover:bg-zinc-700 text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                          <span className="text-sm text-zinc-500">{option.count}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filterType || searchQuery) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Активные фильтры:</span>
          {filterType && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/20 border border-emerald-600/40 rounded-lg text-emerald-400 text-sm"
            >
              {filterOptions.find(f => f.id === filterType)?.label}
              <button
                onClick={() => setFilterType(null)}
                className="hover:bg-emerald-600/30 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
          {searchQuery && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 text-sm"
            >
              Поиск: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="hover:bg-blue-600/30 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
          <button
            onClick={() => {
              setFilterType(null);
              setSearchQuery('');
            }}
            className="text-sm text-zinc-400 hover:text-zinc-200 ml-2"
          >
            Сбросить все
          </button>
        </div>
      )}

      {/* Logs List */}
      <div className="flex-1 overflow-auto">
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Info className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">Нет событий, соответствующих запросу</p>
              <button
                onClick={() => {
                  setFilterType(null);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleEventClick(log)}
                className={`
                  rounded-xl p-4 border transition-all cursor-pointer
                  ${getLogColor(log.type)}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getLogIcon(log.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-zinc-100 truncate">{log.message}</h3>
                      <span className="text-sm text-zinc-500 flex-shrink-0 ml-4">{log.time}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{log.device}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Event Detail Dialog */}
      <AnimatePresence>
        {isEventDialogOpen && selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEventDialogOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[600px] pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      selectedEvent.type === 'success' ? 'bg-emerald-600/20 border border-emerald-600/40' :
                      selectedEvent.type === 'warning' ? 'bg-yellow-600/20 border border-yellow-600/40' :
                      selectedEvent.type === 'error' ? 'bg-red-600/20 border border-red-600/40' :
                      'bg-blue-600/20 border border-blue-600/40'
                    }`}>
                      {getLogIcon(selectedEvent.type)}
                    </div>
                    <div>
                      <h2 className="text-2xl text-zinc-100">Детали события</h2>
                      <p className="text-sm text-zinc-400">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEventDialogOpen(false)}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Event Info */}
                  <div>
                    <h3 className="text-zinc-100 mb-4">Информация о событии</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">Тип события</span>
                        <span className={`
                          ${selectedEvent.type === 'success' ? 'text-emerald-400' :
                            selectedEvent.type === 'warning' ? 'text-yellow-400' :
                            selectedEvent.type === 'error' ? 'text-red-400' :
                            'text-blue-400'}
                        `}>
                          {selectedEvent.type === 'success' ? 'Успешно' :
                           selectedEvent.type === 'warning' ? 'Предупреждение' :
                           selectedEvent.type === 'error' ? 'Ошибка' :
                           'Информация'}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">Устройство</span>
                        <span className="text-zinc-100">{selectedEvent.device}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">Время</span>
                        <span className="text-zinc-100">{selectedEvent.timestamp}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">ID события</span>
                        <span className="text-zinc-100 font-mono">#{selectedEvent.id.toString().padStart(6, '0')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h3 className="text-zinc-100 mb-3">Сообщение</h3>
                    <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
                      <p className="text-zinc-300">{selectedEvent.message}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h3 className="text-zinc-100 mb-3">Дополнительно</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">Статус обработки</span>
                        <span className="text-emerald-400">Завершено</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                        <span className="text-zinc-400">Источник</span>
                        <span className="text-zinc-100">Система автоматизации</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-zinc-700">
                  <button
                    onClick={() => setIsEventDialogOpen(false)}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                  >
                    Закрыть
                  </button>
                  <button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
                  >
                    Перейти к устройству
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
