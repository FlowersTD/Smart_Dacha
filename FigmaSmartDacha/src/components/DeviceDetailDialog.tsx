import {
  X,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "lucide-react";
import { TemperatureSensorDialog } from "./sensors/TemperatureSensorDialog";
import { HumiditySensorDialog } from "./sensors/HumiditySensorDialog";
import { CameraSensorDialog } from "./sensors/CameraSensorDialog";
import { PowerSensorDialog } from "./sensors/PowerSensorDialog";
import { LightSensorDialog } from "./sensors/LightSensorDialog";
import { VentilationSensorDialog } from "./sensors/VentilationSensorDialog";

interface DeviceDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    value: string;
    icon: LucideIcon;
    status: "active" | "inactive";
  } | null;
}

export function DeviceDetailDialog({
  isOpen,
  onClose,
  device,
}: DeviceDetailDialogProps) {
  if (!device) return null;

  // Determine sensor type based on device name
  const isTemperature = device.name
    .toLowerCase()
    .includes("температура");
  const isHumidity = device.name
    .toLowerCase()
    .includes("влажность");
  const isCamera = device.name.toLowerCase().includes("камера");
  const isPower =
    device.name.toLowerCase().includes("питание") ||
    device.name.toLowerCase().includes("аккумулятор");
  const isLight =
    device.name.toLowerCase().includes("освещение") ||
    device.name.toLowerCase().includes("лампа") ||
    device.name.toLowerCase().includes("свет");
  const isVentilation =
    device.name.toLowerCase().includes("вентиляция") ||
    device.name.toLowerCase().includes("вентилятор");

  // Render specialized dialog based on device type
  if (isTemperature) {
    return (
      <TemperatureSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  if (isHumidity) {
    return (
      <HumiditySensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  if (isCamera) {
    return (
      <CameraSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  if (isPower) {
    return (
      <PowerSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  if (isLight) {
    return (
      <LightSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  if (isVentilation) {
    return (
      <VentilationSensorDialog
        isOpen={isOpen}
        onClose={onClose}
        device={device}
      />
    );
  }

  // Default generic dialog for other devices
  const Icon = device.icon;

  // Mock history data
  const historyData = [
    { time: "Сейчас", value: device.value },
    {
      time: "10 мин",
      value: device.name.includes("Температура")
        ? "23°C"
        : device.name.includes("Влажность")
          ? "63%"
          : device.value,
    },
    {
      time: "20 мин",
      value: device.name.includes("Температура")
        ? "23°C"
        : device.name.includes("Влажность")
          ? "64%"
          : device.value,
    },
    {
      time: "30 мин",
      value: device.name.includes("Температура")
        ? "22°C"
        : device.name.includes("Влажность")
          ? "66%"
          : device.value,
    },
    {
      time: "1 час",
      value: device.name.includes("Температура")
        ? "22°C"
        : device.name.includes("Влажность")
          ? "67%"
          : device.value,
    },
  ];

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
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[600px] pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    p-3 rounded-xl
                    ${device.status === "active" ? "bg-emerald-600/20" : "bg-zinc-700/50"}
                  `}
                  >
                    <Icon
                      className={`w-8 h-8 ${device.status === "active" ? "text-emerald-400" : "text-zinc-500"}`}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl text-zinc-100">
                      {device.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${device.status === "active" ? "bg-emerald-400" : "bg-zinc-500"}`}
                      />
                      <span className="text-sm text-zinc-400">
                        {device.status === "active"
                          ? "Активно"
                          : "Неактивно"}
                      </span>
                    </div>
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
              <div className="p-6 space-y-6">
                {/* Current Value */}
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-xl p-6 border border-emerald-600/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-zinc-400 mb-1">
                        Текущее значение
                      </div>
                      <div className="text-4xl text-emerald-400">
                        {device.value}
                      </div>
                    </div>
                    <Activity className="w-12 h-12 text-emerald-400/50" />
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-zinc-500">
                        Макс.
                      </span>
                    </div>
                    <div className="text-xl text-blue-400">
                      {device.name.includes("Температура")
                        ? "25°C"
                        : device.name.includes("Влажность")
                          ? "70%"
                          : device.value}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-400 rotate-180" />
                      <span className="text-xs text-zinc-500">
                        Мин.
                      </span>
                    </div>
                    <div className="text-xl text-purple-400">
                      {device.name.includes("Температура")
                        ? "20°C"
                        : device.name.includes("Влажность")
                          ? "60%"
                          : device.value}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-zinc-500">
                        Средн.
                      </span>
                    </div>
                    <div className="text-xl text-emerald-400">
                      {device.name.includes("Температура")
                        ? "22°C"
                        : device.name.includes("Влажность")
                          ? "65%"
                          : device.value}
                    </div>
                  </div>
                </div>

                {/* History */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-zinc-400" />
                    <h3 className="text-zinc-100">
                      История изменений
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {historyData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg"
                      >
                        <span className="text-zinc-400">
                          {item.time}
                        </span>
                        <span className="text-zinc-100">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert if inactive */}
                {device.status === "inactive" && (
                  <div className="flex items-start gap-3 p-4 bg-red-600/10 border border-red-600/40 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-400 mb-1">
                        Устройство неактивно
                      </div>
                      <div className="text-sm text-zinc-400">
                        Проверьте подключение устройства или
                        попробуйте перезапустить его.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700">
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Закрыть
                </button>
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors">
                  Настроить
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}