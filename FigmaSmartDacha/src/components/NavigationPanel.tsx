import { Home, FileCode, Cpu, FileText, Globe, Settings, User } from 'lucide-react';

const navigationItems = [
  { id: 'home', icon: Home, label: 'Главный экран' },
  { id: 'scripts', icon: FileCode, label: 'Скрипты' },
  { id: 'devices', icon: Cpu, label: 'Устройства' },
  { id: 'journal', icon: FileText, label: 'Журнал' },
  { id: 'internet', icon: Globe, label: 'Интернет' },
  { id: 'settings', icon: Settings, label: 'Настройки' },
  { id: 'account', icon: User, label: 'Аккаунт' },
];

interface NavigationPanelProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
}

export function NavigationPanel({ activeItem, onNavigate }: NavigationPanelProps) {
  return (
    <div className="w-24 bg-zinc-900 border-l border-zinc-800 flex flex-col items-center py-6 gap-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 transition-all
              ${isActive 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              }
            `}
            title={item.label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px]">{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  );
}