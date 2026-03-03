import { Play, Pause, Plus, Trash2, Clock, Calendar, Edit } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CreateScriptDialog } from '../CreateScriptDialog';
import { EditScriptDialog } from '../EditScriptDialog';

const scripts = [
  { id: 1, name: 'Утренний полив', status: 'active', time: '06:00', enabled: true, lastRun: '1 час назад' },
  { id: 2, name: 'Вечернее освещение', status: 'active', time: '18:00', enabled: true, lastRun: '2 дня назад' },
  { id: 3, name: 'Проветривание теплицы', status: 'inactive', time: '12:00', enabled: false, lastRun: '5 дней назад' },
  { id: 4, name: 'Контроль влажности', status: 'active', time: 'Авто', enabled: true, lastRun: '15 мин назад' },
  { id: 5, name: 'Ночной режим', status: 'active', time: '22:00', enabled: true, lastRun: '8 часов назад' },
];

export function ScriptsScreen() {
  const [scriptList, setScriptList] = useState(scripts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<any>(null);

  const toggleScript = (id: number) => {
    setScriptList(scriptList.map(script => 
      script.id === id ? { ...script, enabled: !script.enabled, status: script.enabled ? 'inactive' : 'active' } : script
    ));
  };

  const handleCreateScript = (newScript: { name: string; time: string; enabled: boolean }) => {
    const id = Math.max(...scriptList.map(s => s.id), 0) + 1;
    setScriptList([
      ...scriptList,
      {
        id,
        name: newScript.name,
        status: newScript.enabled ? 'active' : 'inactive',
        time: newScript.time,
        enabled: newScript.enabled,
        lastRun: 'Никогда',
      },
    ]);
  };

  const handleEditScript = (script: any) => {
    setSelectedScript(script);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Скрипты автоматизации</h1>
          <p className="text-zinc-400">Управление автоматическими задачами</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Создать скрипт
        </motion.button>
      </div>

      {/* Scripts List */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-3">
          {scriptList.map((script, index) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                bg-zinc-800 rounded-xl p-4 border transition-all
                ${script.enabled 
                  ? 'border-emerald-600/40 hover:border-emerald-600/60' 
                  : 'border-zinc-700 hover:border-zinc-600'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${script.enabled ? 'bg-emerald-600/20' : 'bg-zinc-700/50'}
                  `}>
                    {script.enabled ? (
                      <Play className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Pause className="w-6 h-6 text-zinc-500" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-zinc-100 mb-1">{script.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {script.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {script.lastRun}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEditScript(script)}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <Edit className="w-5 h-5 text-blue-400" />
                  </button>
                  <button
                    onClick={() => toggleScript(script.id)}
                    className={`
                      relative w-14 h-7 rounded-full transition-colors
                      ${script.enabled ? 'bg-emerald-600' : 'bg-zinc-700'}
                    `}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full"
                      animate={{ x: script.enabled ? 28 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                  
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CreateScriptDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateScript}
      />

      <EditScriptDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        script={selectedScript}
      />
    </div>
  );
}