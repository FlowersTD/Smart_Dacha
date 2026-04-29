import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { motion } from 'motion/react';
import { Sprout, Droplets, Sun, ThermometerSun, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface PlantsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlantsDialog({ isOpen, onClose }: PlantsDialogProps) {
  const plants = [
    {
      id: 1,
      name: 'Помидоры черри',
      type: 'Томаты',
      bed: 'Грядка 1',
      planted: '15 мая 2024',
      daysGrowing: 45,
      health: 95,
      moisture: 68,
      sunlight: 8.5,
      temperature: 24,
      status: 'excellent',
      nextWatering: 'Завтра, 8:00',
      notes: 'Требуется подвязка через неделю',
    },
    {
      id: 2,
      name: 'Огурцы длинноплодные',
      type: 'Огурцы',
      bed: 'Грядка 2',
      planted: '18 мая 2024',
      daysGrowing: 42,
      health: 88,
      moisture: 75,
      sunlight: 7.2,
      temperature: 23,
      status: 'good',
      nextWatering: 'Сегодня, 18:00',
      notes: 'Появились первые завязи',
    },
    {
      id: 3,
      name: 'Салат листовой',
      type: 'Зелень',
      bed: 'Грядка 3',
      planted: '1 июня 2024',
      daysGrowing: 29,
      health: 92,
      moisture: 62,
      sunlight: 6.8,
      temperature: 22,
      status: 'excellent',
      nextWatering: 'Завтра, 9:00',
      notes: 'Готов к частичному сбору',
    },
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-emerald-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'bg-emerald-600/20 text-emerald-400 border-emerald-600/40';
    if (status === 'good') return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/40';
    return 'bg-red-600/20 text-red-400 border-red-600/40';
  };

  const getStatusText = (status: string) => {
    if (status === 'excellent') return 'Отлично';
    if (status === 'good') return 'Хорошо';
    return 'Требует внимания';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-emerald-400">
            <Sprout className="w-7 h-7" />
            Мои растения
          </DialogTitle>
          <p className="text-zinc-400">Всего растений: {plants.reduce((sum, p) => sum + 8, 0)}</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {plants.map((plant) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800 rounded-xl p-5 border border-zinc-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-zinc-100">{plant.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(plant.status)}`}>
                      {getStatusText(plant.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>{plant.type}</span>
                    <span>•</span>
                    <span>{plant.bed}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {plant.daysGrowing} дней
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl ${getHealthColor(plant.health)}`}>{plant.health}%</div>
                  <div className="text-xs text-zinc-500">Здоровье</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-zinc-900 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-zinc-500">Влажность</span>
                  </div>
                  <div className="text-lg text-blue-400">{plant.moisture}%</div>
                </div>

                <div className="bg-zinc-900 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-zinc-500">Солнце</span>
                  </div>
                  <div className="text-lg text-yellow-400">{plant.sunlight} ч</div>
                </div>

                <div className="bg-zinc-900 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerSun className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-zinc-500">Температура</span>
                  </div>
                  <div className="text-lg text-orange-400">{plant.temperature}°C</div>
                </div>

                <div className="bg-zinc-900 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-zinc-500">Рост</span>
                  </div>
                  <div className="text-lg text-emerald-400">+2.5%</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <div className="text-zinc-300 mb-1">
                    <span className="text-zinc-500">Следующий полив:</span> {plant.nextWatering}
                  </div>
                  <div className="text-zinc-400">{plant.notes}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex-shrink-0 pt-4 border-t border-zinc-800">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
            >
              Добавить растение
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition-colors"
            >
              Закрыть
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
