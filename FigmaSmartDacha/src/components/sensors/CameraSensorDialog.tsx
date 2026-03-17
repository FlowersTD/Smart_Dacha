import { X, Camera, Play, Pause, Download, RotateCcw, Maximize, Video, Settings, Clock, Activity, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CameraSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    status: 'active' | 'inactive';
  } | null;
}

export function CameraSensorDialog({ isOpen, onClose, device }: CameraSensorDialogProps) {
  const [isRecording, setIsRecording] = useState(device?.value === 'Запись' || device?.value === 'Онлайн');
  const [activeTab, setActiveTab] = useState<'preview' | 'recordings' | 'activity' | 'settings'>('preview');
  const [enableMotionDetection, setEnableMotionDetection] = useState(true);
  const [enableNightVision, setEnableNightVision] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [recordingQuality, setRecordingQuality] = useState<'720p' | '1080p' | '4k'>('1080p');
  const [deviceName, setDeviceName] = useState(device?.name || '');

  if (!device) return null;

  const recordings = [
    { id: 1, date: '21.12.2025 14:30', duration: '1:23:45', size: '2.4 ГБ', type: 'motion' },
    { id: 2, date: '21.12.2025 08:15', duration: '2:10:30', size: '3.8 ГБ', type: 'manual' },
    { id: 3, date: '20.12.2025 18:45', duration: '0:45:20', size: '1.2 ГБ', type: 'motion' },
    { id: 4, date: '20.12.2025 12:00', duration: '1:55:10', size: '3.1 ГБ', type: 'manual' },
    { id: 5, date: '19.12.2025 22:30', duration: '0:35:12', size: '0.9 ГБ', type: 'motion' },
  ];

  const activityLog = [
    { time: '14:30', event: 'Обнаружено движение', type: 'motion' },
    { time: '12:15', event: 'Запись остановлена', type: 'stop' },
    { time: '09:00', event: 'Запись начата', type: 'start' },
    { time: '08:15', event: 'Обнаружено движение', type: 'motion' },
  ];

  const tabs = [
    { id: 'preview', label: 'Превью', icon: Camera },
    { id: 'recordings', label: 'Записи', icon: Video },
    { id: 'activity', label: 'События', icon: Activity },
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
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[800px] max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-600/40">
                    <Camera className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">{device.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {isRecording && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-red-500"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      <span className={`text-sm ${isRecording ? 'text-red-400' : 'text-zinc-400'}`}>
                        {isRecording ? 'Запись ведётся' : 'Не записывает'}
                      </span>
                    </div>
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
                          ? 'bg-zinc-700 text-purple-400 border-b-2 border-purple-400'
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
                {/* Preview Tab */}
                {activeTab === 'preview' && (
                  <div className="space-y-5">
                    {/* Live View */}
                    <div className="relative bg-zinc-900 rounded-xl overflow-hidden aspect-video border border-zinc-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-zinc-600 mx-auto mb-3" />
                          <p className="text-zinc-500">Предпросмотр камеры</p>
                          <p className="text-sm text-zinc-600 mt-1">Видеопоток защищен</p>
                        </div>
                      </div>
                      {isRecording && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span className="text-white text-sm">REC</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <span className="text-white text-sm font-mono">
                          {new Date().toLocaleTimeString('ru-RU')}
                        </span>
                      </div>
                    </div>

                    {/* Camera Controls */}
                    <div className="grid grid-cols-5 gap-3">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-4 rounded-xl transition-all ${
                          isRecording
                            ? 'bg-red-600/20 border border-red-600/40 hover:bg-red-600/30'
                            : 'bg-emerald-600/20 border border-emerald-600/40 hover:bg-emerald-600/30'
                        }`}
                      >
                        {isRecording ? (
                          <Pause className={`w-6 h-6 mx-auto ${isRecording ? 'text-red-400' : 'text-emerald-400'}`} />
                        ) : (
                          <Play className="w-6 h-6 mx-auto text-emerald-400" />
                        )}
                      </button>
                      <button className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
                        <Download className="w-6 h-6 mx-auto text-zinc-400" />
                      </button>
                      <button className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
                        <RotateCcw className="w-6 h-6 mx-auto text-zinc-400" />
                      </button>
                      <button className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
                        <Maximize className="w-6 h-6 mx-auto text-zinc-400" />
                      </button>
                      <button className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
                        <Video className="w-6 h-6 mx-auto text-zinc-400" />
                      </button>
                    </div>

                    {/* Camera Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-xs text-zinc-500 mb-1">Разрешение</div>
                        <div className="text-lg text-zinc-100">1920x1080</div>
                        <div className="text-xs text-zinc-500">Full HD</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-xs text-zinc-500 mb-1">Частота кадров</div>
                        <div className="text-lg text-zinc-100">30 FPS</div>
                        <div className="text-xs text-zinc-500">Плавное видео</div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                        <div className="text-xs text-zinc-500 mb-1">Хранилище</div>
                        <div className="text-lg text-zinc-100">45 ГБ</div>
                        <div className="text-xs text-zinc-500">из 128 ГБ</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recordings Tab */}
                {activeTab === 'recordings' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-zinc-100">Записи ({recordings.length})</h3>
                      <div className="text-sm text-zinc-400">Общий объем: 11.4 ГБ</div>
                    </div>
                    <div className="space-y-2">
                      {recordings.map((recording) => (
                        <div
                          key={recording.id}
                          className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-700"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              recording.type === 'motion' ? 'bg-red-600/20' : 'bg-purple-600/20'
                            }`}>
                              <Video className={`w-5 h-5 ${
                                recording.type === 'motion' ? 'text-red-400' : 'text-purple-400'
                              }`} />
                            </div>
                            <div>
                              <div className="text-zinc-100">{recording.date}</div>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-zinc-500">Длительность: {recording.duration}</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                                  {recording.type === 'motion' ? 'По движению' : 'Вручную'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-zinc-400">{recording.size}</span>
                            <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-zinc-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-zinc-100 mb-3">Журнал событий</h3>
                      <div className="space-y-2">
                        {activityLog.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                log.type === 'motion' ? 'bg-red-600/20' :
                                log.type === 'start' ? 'bg-emerald-600/20' :
                                'bg-zinc-800'
                              }`}>
                                {log.type === 'motion' && <Activity className="w-5 h-5 text-red-400" />}
                                {log.type === 'start' && <Play className="w-5 h-5 text-emerald-400" />}
                                {log.type === 'stop' && <Pause className="w-5 h-5 text-zinc-400" />}
                              </div>
                              <div>
                                <div className="text-zinc-100">{log.event}</div>
                                <div className="text-sm text-zinc-400">{log.time}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-3">Статистика за сегодня</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">Обнаружено движений</div>
                          <div className="text-2xl text-red-400">12</div>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
                          <div className="text-sm text-zinc-400 mb-1">Время записи</div>
                          <div className="text-2xl text-purple-400">3ч 45м</div>
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
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-zinc-400 mb-3">Качество записи</label>
                          <div className="grid grid-cols-3 gap-3">
                            {(['720p', '1080p', '4k'] as const).map((quality) => (
                              <button
                                key={quality}
                                onClick={() => setRecordingQuality(quality)}
                                className={`
                                  p-3 rounded-lg border transition-all
                                  ${recordingQuality === quality
                                    ? 'bg-purple-600/20 border-purple-600/40 text-purple-400'
                                    : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                  }
                                `}
                              >
                                {quality}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-zinc-100 mb-4">Функции</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Детекция движения</div>
                            <div className="text-sm text-zinc-500">Автозапись при обнаружении</div>
                          </div>
                          <button
                            onClick={() => setEnableMotionDetection(!enableMotionDetection)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableMotionDetection ? 'bg-red-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableMotionDetection ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Ночное видение</div>
                            <div className="text-sm text-zinc-500">ИК подсветка</div>
                          </div>
                          <button
                            onClick={() => setEnableNightVision(!enableNightVision)}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors
                              ${enableNightVision ? 'bg-purple-600' : 'bg-zinc-700'}
                            `}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: enableNightVision ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                          <div>
                            <div className="text-zinc-100">Уведомления</div>
                            <div className="text-sm text-zinc-500">О движении и событиях</div>
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
                          <span className="text-zinc-400">Модель</span>
                          <span className="text-zinc-100">IPCam Pro 2K</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">IP адрес</span>
                          <span className="text-zinc-100">192.168.1.24</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">MAC адрес</span>
                          <span className="text-zinc-100 font-mono text-sm">AA:BB:CC:DD:EE:04</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Версия прошивки</span>
                          <span className="text-zinc-100">v5.1.3</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Время работы</span>
                          <span className="text-zinc-100">120д 15ч</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <span className="text-zinc-400">Объектив</span>
                          <span className="text-zinc-100">3.6mm F/1.6</span>
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
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition-colors">
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
