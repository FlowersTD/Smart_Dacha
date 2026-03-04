import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { motion } from 'motion/react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, Calendar } from 'lucide-react';

interface WeatherDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WeatherDialog({ isOpen, onClose }: WeatherDialogProps) {
  const currentWeather = {
    temperature: 18,
    feelsLike: 16,
    condition: 'Переменная облачность',
    icon: 'cloud',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'СЗ',
    pressure: 1013,
    visibility: 10,
    uvIndex: 3,
    sunrise: '05:24',
    sunset: '21:36',
  };

  const hourlyForecast = [
    { time: '18:00', temp: 18, icon: 'cloud', precipitation: 10 },
    { time: '19:00', temp: 17, icon: 'cloud', precipitation: 15 },
    { time: '20:00', temp: 16, icon: 'rain', precipitation: 40 },
    { time: '21:00', temp: 15, icon: 'rain', precipitation: 60 },
    { time: '22:00', temp: 14, icon: 'rain', precipitation: 50 },
    { time: '23:00', temp: 14, icon: 'cloud', precipitation: 30 },
    { time: '00:00', temp: 13, icon: 'cloud', precipitation: 20 },
    { time: '01:00', temp: 13, icon: 'cloud', precipitation: 10 },
  ];

  const dailyForecast = [
    { day: 'Завтра', date: '18 дек', high: 16, low: 9, icon: 'rain', precipitation: 70 },
    { day: 'Чт', date: '19 дек', high: 14, low: 7, icon: 'cloud', precipitation: 40 },
    { day: 'Пт', date: '20 дек', high: 12, low: 5, icon: 'snow', precipitation: 60 },
    { day: 'Сб', date: '21 дек', high: 10, low: 3, icon: 'snow', precipitation: 80 },
    { day: 'Вс', date: '22 дек', high: 8, low: 1, icon: 'cloud', precipitation: 30 },
  ];

  const getWeatherIcon = (icon: string, size: string = 'w-6 h-6') => {
    const icons: Record<string, any> = {
      sun: <Sun className={`${size} text-yellow-400`} />,
      cloud: <Cloud className={`${size} text-zinc-400`} />,
      rain: <CloudRain className={`${size} text-blue-400`} />,
      snow: <CloudSnow className={`${size} text-blue-300`} />,
    };
    return icons[icon] || icons.cloud;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-emerald-400">
            {getWeatherIcon('cloud', 'w-7 h-7')}
            Погода
          </DialogTitle>
          <p className="text-zinc-400">Московская область, Россия</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-900/30 to-zinc-800 rounded-xl p-6 border border-zinc-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-6xl mb-2">{currentWeather.temperature}°C</div>
                <div className="text-zinc-400 mb-1">Ощущается как {currentWeather.feelsLike}°C</div>
                <div className="text-xl text-zinc-300">{currentWeather.condition}</div>
              </div>
              <div className="flex flex-col items-center">
                {getWeatherIcon(currentWeather.icon, 'w-20 h-20')}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-zinc-500">Влажность</span>
                </div>
                <div className="text-lg text-zinc-100">{currentWeather.humidity}%</div>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs text-zinc-500">Ветер</span>
                </div>
                <div className="text-lg text-zinc-100">{currentWeather.windSpeed} м/с {currentWeather.windDirection}</div>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-zinc-500">Давление</span>
                </div>
                <div className="text-lg text-zinc-100">{currentWeather.pressure} мбар</div>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-zinc-500">Видимость</span>
                </div>
                <div className="text-lg text-zinc-100">{currentWeather.visibility} км</div>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <div className="flex-1 bg-zinc-900/50 rounded-lg p-3 flex items-center gap-2">
                <Sunrise className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xs text-zinc-500">Восход</div>
                  <div className="text-zinc-100">{currentWeather.sunrise}</div>
                </div>
              </div>
              <div className="flex-1 bg-zinc-900/50 rounded-lg p-3 flex items-center gap-2">
                <Sunset className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xs text-zinc-500">Закат</div>
                  <div className="text-zinc-100">{currentWeather.sunset}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700">
            <h3 className="text-lg text-zinc-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Почасовой прогноз
            </h3>
            <div className="grid grid-cols-8 gap-2">
              {hourlyForecast.map((hour, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900 rounded-lg p-3 text-center"
                >
                  <div className="text-xs text-zinc-500 mb-2">{hour.time}</div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(hour.icon, 'w-6 h-6')}
                  </div>
                  <div className="text-lg text-zinc-100 mb-1">{hour.temp}°</div>
                  <div className="text-xs text-blue-400">{hour.precipitation}%</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Daily Forecast */}
          <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700">
            <h3 className="text-lg text-zinc-100 mb-4">Прогноз на 5 дней</h3>
            <div className="space-y-2">
              {dailyForecast.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-20 text-zinc-100">{day.day}</div>
                  <div className="w-24 text-sm text-zinc-500">{day.date}</div>
                  <div className="flex-1 flex items-center gap-3">
                    {getWeatherIcon(day.icon)}
                    <div className="text-sm text-zinc-400">Осадки: {day.precipitation}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-100">{day.high}°</span>
                    <span className="text-zinc-500">/</span>
                    <span className="text-zinc-500">{day.low}°</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 border-t border-zinc-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition-colors"
          >
            Закрыть
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
