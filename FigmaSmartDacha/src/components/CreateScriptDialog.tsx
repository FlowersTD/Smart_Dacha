import { X, Clock, Calendar, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CreateScriptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (script: { name: string; time: string; enabled: boolean }) => void;
}

export function CreateScriptDialog({ isOpen, onClose, onSave }: CreateScriptDialogProps) {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, time: '12:00', enabled: true });
      setName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[500px] pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">Создать скрипт</h2>
                    <p className="text-sm text-zinc-400">Базовая настройка сценария</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Название скрипта</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например: Утренний полив"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600 transition-colors"
                    autoFocus
                  />
                </div>

                <div className="bg-blue-600/10 border border-blue-600/40 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-zinc-300">
                      <p className="text-blue-400 mb-1">Подсказка</p>
                      После создания вы сможете открыть редактирование сценария для настройки триггеров, условий, действий и расписания.
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700">
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Создать
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}