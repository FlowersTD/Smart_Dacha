import { LucideIcon } from 'lucide-react';
import { TemperatureSensorDialog } from './sensors/TemperatureSensorDialog';
import { HumiditySensorDialog } from './sensors/HumiditySensorDialog';
import { PowerSensorDialog } from './sensors/PowerSensorDialog';
import { LightSensorDialog } from './sensors/LightSensorDialog';
import { CameraSensorDialog } from './sensors/CameraSensorDialog';
import { VentilationSensorDialog } from './sensors/VentilationSensorDialog';
import { SocketSensorDialog } from './sensors/SocketSensorDialog';
import { GateSensorDialog } from './sensors/GateSensorDialog';

interface DeviceInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    id: number;
    name: string;
    type: string;
    value: string;
    icon: LucideIcon;
    status: 'online' | 'offline';
    location: string;
    connection?: 'wifi' | 'wired';
  } | null;
}

export function DeviceInfoDialog({ isOpen, onClose, device }: DeviceInfoDialogProps) {
  if (!device) return null;

  // Convert device to format expected by sensor dialogs
  const sensorDevice = {
    name: device.name,
    value: device.value,
    icon: device.icon,
    status: device.status === 'online' ? 'active' as const : 'inactive' as const,
  };

  // Render appropriate dialog based on device type
  if (device.type === 'Температура') {
    return (
      <TemperatureSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Влажность') {
    return (
      <HumiditySensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Питание') {
    return (
      <PowerSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Освещение') {
    return (
      <LightSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Камера') {
    return (
      <CameraSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Вентиляция') {
    return (
      <VentilationSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Розетка') {
    return (
      <SocketSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  if (device.type === 'Ворота') {
    return (
      <GateSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={sensorDevice}
      />
    );
  }

  return null;
}