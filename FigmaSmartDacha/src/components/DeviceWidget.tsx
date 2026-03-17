import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceWidgetProps {
  name: string;
  value: string;
  icon: LucideIcon;
  status: 'active' | 'inactive';
  onClick?: () => void;
}

export function DeviceWidget({ name, value, icon: Icon, status, onClick }: DeviceWidgetProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        bg-zinc-800 rounded-xl p-3 border cursor-pointer transition-all
        ${status === 'active' 
          ? 'border-emerald-600/40 hover:border-emerald-600/60' 
          : 'border-zinc-700 hover:border-zinc-600'
        }
      `}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={`
          p-2 rounded-lg
          ${status === 'active' ? 'bg-emerald-600/20' : 'bg-zinc-700/50'}
        `}>
          <Icon className={`w-5 h-5 ${status === 'active' ? 'text-emerald-400' : 'text-zinc-500'}`} />
        </div>
        <div className="text-center">
          <div className="text-[10px] text-zinc-400 mb-1">{name}</div>
          <div className={`text-sm ${status === 'active' ? 'text-zinc-100' : 'text-zinc-500'}`}>
            {value}
          </div>
        </div>
        {status === 'active' && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}