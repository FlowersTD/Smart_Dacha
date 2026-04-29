import { NavigationPanel } from './components/NavigationPanel';
import { GardenAnimation } from './components/GardenAnimation';
import { DeviceWidget } from './components/DeviceWidget';
import { DeviceDetailDialog } from './components/DeviceDetailDialog';
import { PlantsDialog } from './components/PlantsDialog';
import { WeatherDialog } from './components/WeatherDialog';
import { Thermometer, Droplets, Lightbulb, Camera, Wind, Battery } from 'lucide-react';
import { useState } from 'react';
import { ScriptsScreen } from './components/screens/ScriptsScreen';
import { DevicesScreen } from './components/screens/DevicesScreen';
import { JournalScreen } from './components/screens/JournalScreen';
import { InternetScreen } from './components/screens/InternetScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AccountScreen } from './components/screens/AccountScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isDeviceDialogOpen, setIsDeviceDialogOpen] = useState(false);
  const [isPlantsDialogOpen, setIsPlantsDialogOpen] = useState(false);
  const [isWeatherDialogOpen, setIsWeatherDialogOpen] = useState(false);

  const devices = [
    { id: 1, name: 'Температура', value: '24°C', icon: Thermometer, status: 'active' },
    { id: 2, name: 'Влажность', value: '65%', icon: Droplets, status: 'active' },
    { id: 3, name: 'Освещение', value: 'Вкл', icon: Lightbulb, status: 'active' },
    { id: 4, name: 'Камера', value: 'Онлайн', icon: Camera, status: 'active' },
    { id: 5, name: 'Вентиляция', value: 'Выкл', icon: Wind, status: 'inactive' },
    { id: 6, name: 'Питание', value: '98%', icon: Battery, status: 'active' },
  ];

  const handleDeviceClick = (device: any) => {
    setSelectedDevice(device);
    setIsDeviceDialogOpen(true);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <div className="flex-1 flex flex-col p-6 gap-4">
            {/* Garden Animation Area */}
            <div className="flex-1 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <GardenAnimation 
                onPlantsClick={() => setIsPlantsDialogOpen(true)}
                onWeatherClick={() => setIsWeatherDialogOpen(true)}
              />
            </div>

            {/* Device Widgets */}
            <div className="grid grid-cols-6 gap-3">
              {devices.map((device) => (
                <DeviceWidget
                  key={device.id}
                  name={device.name}
                  value={device.value}
                  icon={device.icon}
                  status={device.status}
                  onClick={() => handleDeviceClick(device)}
                />
              ))}
            </div>
          </div>
        );
      case 'scripts':
        return <ScriptsScreen />;
      case 'devices':
        return <DevicesScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'internet':
        return <InternetScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden" style={{ width: '1024px', height: '600px' }}>
      {/* Main Content Area */}
      {renderScreen()}

      {/* Right Navigation Panel */}
      <NavigationPanel activeItem={activeScreen} onNavigate={setActiveScreen} />

      {/* Device Detail Dialog */}
      <DeviceDetailDialog
        isOpen={isDeviceDialogOpen}
        onClose={() => setIsDeviceDialogOpen(false)}
        device={selectedDevice}
      />

      {/* Plants Dialog */}
      <PlantsDialog
        isOpen={isPlantsDialogOpen}
        onClose={() => setIsPlantsDialogOpen(false)}
      />

      {/* Weather Dialog */}
      <WeatherDialog
        isOpen={isWeatherDialogOpen}
        onClose={() => setIsWeatherDialogOpen(false)}
      />
    </div>
  );
}