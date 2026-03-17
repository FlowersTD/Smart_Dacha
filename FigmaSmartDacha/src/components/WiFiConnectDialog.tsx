import { X, Wifi, Lock, Signal, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface WiFiConnectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (ssid: string, password: string) => void;
  availableNetworks: Array<{ ssid: string; signal: number; secured: boolean }>;
}

export function WiFiConnectDialog({ isOpen, onClose, onConnect, availableNetworks }: WiFiConnectDialogProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleConnect = () => {
    if (selectedNetwork) {
      onConnect(selectedNetwork, password);
      setPassword('');
      setSelectedNetwork('');
      onClose();
    }
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return 'text-emerald-400';
    if (signal >= 50) return 'text-yellow-400';
    return 'text-red-400';
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
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-[500px] max-h-[600px] flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Wifi className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl text-zinc-100">Подключение к WiFi</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Доступные сети</label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availableNetworks.map((network) => (
                      <button
                        key={network.ssid}
                        onClick={() => setSelectedNetwork(network.ssid)}
                        className={`
                          w-full p-4 rounded-xl border transition-all text-left
                          ${selectedNetwork === network.ssid
                            ? 'bg-blue-600/20 border-blue-600/60'
                            : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Wifi className={`w-5 h-5 ${selectedNetwork === network.ssid ? 'text-blue-400' : 'text-zinc-400'}`} />
                            <div>
                              <div className={`${selectedNetwork === network.ssid ? 'text-blue-400' : 'text-zinc-100'}`}>
                                {network.ssid}
                              </div>
                              {network.secured && (
                                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                                  <Lock className="w-3 h-3" />
                                  Защищена
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Signal className={`w-4 h-4 ${getSignalColor(network.signal)}`} />
                            <span className={`text-sm ${getSignalColor(network.signal)}`}>
                              {network.signal}%
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedNetwork && availableNetworks.find(n => n.ssid === selectedNetwork)?.secured && (
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-12 pr-12 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
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
                  Отмена
                </button>
                <button
                  onClick={handleConnect}
                  disabled={!selectedNetwork}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Подключиться
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
