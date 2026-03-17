import { X, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

interface ChartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    type: string;
  };
}

export function ChartDialog({ isOpen, onClose, device }: ChartDialogProps) {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  // Generate mock data based on device type
  const generateData = () => {
    const dataPoints = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      let value;
      let label;
      
      if (timeRange === 'day') {
        label = `${i}:00`;
        value = device.type === 'temperature' 
          ? 20 + Math.random() * 8 + Math.sin(i / 3) * 3
          : device.type === 'humidity'
          ? 55 + Math.random() * 15 + Math.cos(i / 4) * 5
          : device.type === 'power'
          ? 85 + Math.random() * 15
          : 50 + Math.random() * 40;
      } else if (timeRange === 'week') {
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        label = days[i];
        value = device.type === 'temperature' 
          ? 22 + Math.random() * 6
          : device.type === 'humidity'
          ? 60 + Math.random() * 10
          : device.type === 'power'
          ? 90 + Math.random() * 10
          : 55 + Math.random() * 30;
      } else {
        label = `${i + 1}`;
        value = device.type === 'temperature' 
          ? 21 + Math.random() * 7
          : device.type === 'humidity'
          ? 58 + Math.random() * 12
          : device.type === 'power'
          ? 88 + Math.random() * 12
          : 50 + Math.random() * 35;
      }
      
      data.push({
        name: label,
        value: Math.round(value * 10) / 10,
        min: Math.round((value - 2) * 10) / 10,
        max: Math.round((value + 2) * 10) / 10,
      });
    }
    
    return data;
  };

  const data = generateData();

  const getUnit = () => {
    switch (device.type) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'power': return '%';
      default: return '';
    }
  };

  const getColor = () => {
    switch (device.type) {
      case 'temperature': return { primary: '#fb923c', secondary: '#fdba74', gradient: ['#fb923c', '#f97316'] };
      case 'humidity': return { primary: '#60a5fa', secondary: '#93c5fd', gradient: ['#60a5fa', '#3b82f6'] };
      case 'power': return { primary: '#34d399', secondary: '#6ee7b7', gradient: ['#34d399', '#10b981'] };
      default: return { primary: '#a855f7', secondary: '#c084fc', gradient: ['#a855f7', '#9333ea'] };
    }
  };

  const colors = getColor();
  const unit = getUnit();

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = currentValue - previousValue;
  const changePercent = previousValue !== 0 ? (change / previousValue * 100).toFixed(1) : 0;

  const avgValue = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);
  const maxValue = Math.max(...data.map(d => d.value)).toFixed(1);
  const minValue = Math.min(...data.map(d => d.value)).toFixed(1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl">
          <p className="text-zinc-400 text-sm mb-1">{payload[0].payload.name}</p>
          <p className="text-zinc-100">
            {payload[0].value.toFixed(1)} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

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
              className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <div>
                  <h2 className="text-2xl text-zinc-100 mb-1">График: {device.name}</h2>
                  <p className="text-sm text-zinc-400">Исторические данные устройства</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700 bg-zinc-900">
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimeRange('day')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      timeRange === 'day'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    День
                  </button>
                  <button
                    onClick={() => setTimeRange('week')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      timeRange === 'week'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    Неделя
                  </button>
                  <button
                    onClick={() => setTimeRange('month')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      timeRange === 'month'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    Месяц
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      chartType === 'line'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    Линия
                  </button>
                  <button
                    onClick={() => setChartType('area')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      chartType === 'area'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    Область
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      chartType === 'bar'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    Столбцы
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 p-6 border-b border-zinc-700">
                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500">Текущее</span>
                    <div className={`flex items-center gap-1 text-xs ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(Number(changePercent))}%
                    </div>
                  </div>
                  <div className="text-2xl" style={{ color: colors.primary }}>
                    {currentValue.toFixed(1)} {unit}
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="text-xs text-zinc-500 mb-2">Среднее</div>
                  <div className="text-2xl text-zinc-100">
                    {avgValue} {unit}
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="text-xs text-zinc-500 mb-2">Максимум</div>
                  <div className="text-2xl text-blue-400">
                    {maxValue} {unit}
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="text-xs text-zinc-500 mb-2">Минимум</div>
                  <div className="text-2xl text-purple-400">
                    {minValue} {unit}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 p-6 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={colors.gradient[0]} />
                          <stop offset="100%" stopColor={colors.gradient[1]} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                      <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{ fill: colors.primary, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  ) : chartType === 'area' ? (
                    <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                      <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={colors.primary}
                        strokeWidth={2}
                        fill="url(#areaGradient)"
                      />
                    </AreaChart>
                  ) : (
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} />
                          <stop offset="100%" stopColor={colors.gradient[1]} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                      <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        fill="url(#barGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-zinc-700 bg-zinc-800">
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl transition-colors"
                >
                  Закрыть
                </button>
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Экспорт данных
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
