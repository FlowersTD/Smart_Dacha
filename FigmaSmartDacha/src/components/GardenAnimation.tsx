import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';

interface GardenAnimationProps {
  onPlantsClick?: () => void;
  onWeatherClick?: () => void;
}

export function GardenAnimation({ onPlantsClick, onWeatherClick }: GardenAnimationProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Header with time */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10">
        <div>
          <h1 className="text-3xl text-emerald-400 mb-1">Умная Дача</h1>
          <p className="text-zinc-400">{time.toLocaleTimeString('ru-RU')}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onWeatherClick}
          className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 transition-colors cursor-pointer"
        >
          <Moon className="w-5 h-5 text-slate-300" />
          <span className="text-slate-300">+18°C</span>
        </motion.button>
      </div>

      {/* Moon with gentle animation */}
      <motion.div
        className="absolute top-20 right-40"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-20 h-20 bg-slate-200 rounded-full opacity-90" 
             style={{ boxShadow: '0 0 40px rgba(226, 232, 240, 0.3)' }} />
      </motion.div>

      {/* Minimalist stars */}
      {[
        { x: 100, y: 60, delay: 0 },
        { x: 200, y: 100, delay: 1 },
        { x: 600, y: 80, delay: 2 },
        { x: 700, y: 120, delay: 1.5 },
      ].map((star, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-slate-300 rounded-full"
          style={{ left: star.x, top: star.y }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Main content - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 800 450" className="opacity-90" preserveAspectRatio="xMidYMid slice">
          {/* Clouds with looping animation */}
          <motion.g
            animate={{ x: [-100, 900] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <ellipse cx="150" cy="80" rx="30" ry="15" fill="#475569" opacity="0.3" />
            <ellipse cx="170" cy="75" rx="25" ry="13" fill="#475569" opacity="0.3" />
            <ellipse cx="185" cy="80" rx="20" ry="12" fill="#475569" opacity="0.3" />
          </motion.g>

          <motion.g
            animate={{ x: [-150, 950] }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear', delay: 5 }}
          >
            <ellipse cx="400" cy="100" rx="35" ry="18" fill="#475569" opacity="0.25" />
            <ellipse cx="425" cy="95" rx="30" ry="15" fill="#475569" opacity="0.25" />
            <ellipse cx="445" cy="100" rx="25" ry="14" fill="#475569" opacity="0.25" />
          </motion.g>

          <motion.g
            animate={{ x: [-80, 880] }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear', delay: 15 }}
          >
            <ellipse cx="600" cy="120" rx="28" ry="14" fill="#475569" opacity="0.28" />
            <ellipse cx="620" cy="115" rx="22" ry="12" fill="#475569" opacity="0.28" />
          </motion.g>

          {/* Background trees - simplified silhouettes */}
          <g opacity="0.4">
            {[20, 80, 150, 480, 550, 650, 720, 780].map((x, i) => (
              <motion.polygon
                key={`tree-${i}`}
                points={`${x},220 ${x - 30},280 ${x + 30},280`}
                fill="#334155"
                animate={{ opacity: [0.4, 0.5, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              />
            ))}
          </g>

          {/* Ground - extended to full edges with margin */}
          <rect x="-10" y="280" width="820" height="180" fill="#1e293b" opacity="0.6" />
          <line x1="-10" y1="280" x2="810" y2="280" stroke="#334155" strokeWidth="1" opacity="0.5" />

          {/* House - minimal design */}
          <g>
            {/* House body */}
            <rect x="340" y="200" width="120" height="80" fill="#475569" opacity="0.9" />
            
            {/* Roof */}
            <polygon points="330,200 400,170 470,200" fill="#334155" opacity="0.9" />
            
            {/* Window with gentle glow */}
            <motion.rect
              x="370"
              y="220"
              width="30"
              height="30"
              rx="2"
              fill="#fbbf24"
              opacity="0.7"
              animate={{ opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <rect x="370" y="220" width="30" height="30" rx="2" fill="none" stroke="#334155" strokeWidth="2" />
            <line x1="385" y1="220" x2="385" y2="250" stroke="#334155" strokeWidth="1.5" />
            <line x1="370" y1="235" x2="400" y2="235" stroke="#334155" strokeWidth="1.5" />
            
            {/* Door */}
            <rect x="415" y="240" width="25" height="40" rx="1" fill="#334155" />
            
            {/* Chimney with subtle smoke */}
            <rect x="420" y="175" width="15" height="25" fill="#334155" opacity="0.8" />
            <motion.g
              animate={{ y: [0, -10], opacity: [0.3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeOut' }}
            >
              <circle cx="427" cy="165" r="4" fill="#64748b" opacity="0.4" />
              <circle cx="430" cy="155" r="5" fill="#64748b" opacity="0.3" />
            </motion.g>
          </g>

          {/* Simple garden beds */}
          <g opacity="0.7">
            {[300, 380, 460].map((x, i) => (
              <g key={`bed-${i}`}>
                <rect x={x} y="300" width="50" height="25" rx="3" fill="#065f46" opacity="0.4" stroke="#10b981" strokeWidth="1" opacity="0.3" />
                
                {/* Minimal plants */}
                {[0, 1, 2].map((p) => (
                  <motion.g
                    key={`plant-${i}-${p}`}
                    animate={{ scaleY: [1, 1.03, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 + p * 0.2, ease: 'easeInOut' }}
                  >
                    <line
                      x1={x + 12 + p * 13}
                      y1={315}
                      x2={x + 12 + p * 13}
                      y2={308}
                      stroke="#10b981"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    <circle cx={x + 12 + p * 13} cy={307} r="2" fill="#34d399" opacity="0.7" />
                  </motion.g>
                ))}
              </g>
            ))}
          </g>

          {/* Simple fence - extended to edges */}
          <g opacity="0.5">
            {Array.from({ length: 24 }, (_, i) => (
              <rect
                key={`fence-${i}`}
                x={10 + i * 33}
                y="285"
                width="4"
                height="25"
                rx="1"
                fill="#475569"
              />
            ))}
            <rect x="10" y="295" width="780" height="2" rx="1" fill="#475569" />
          </g>

          {/* Gentle fireflies */}
          {[
            { x: 280, y: 240 },
            { x: 450, y: 260 },
            { x: 520, y: 235 },
          ].map((fly, i) => (
            <motion.circle
              key={`fly-${i}`}
              cx={fly.x}
              cy={fly.y}
              r="2"
              fill="#fef08a"
              opacity="0"
              animate={{
                cx: [fly.x, fly.x + 20, fly.x],
                cy: [fly.y, fly.y - 15, fly.y],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      </div>

      {/* Stats overlay - minimalist */}
      <div className="absolute bottom-6 left-6 flex gap-3">
        <motion.button
          onClick={onPlantsClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/30 hover:bg-slate-800/60 transition-colors cursor-pointer"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-slate-300 text-sm">Растений: 24</div>
        </motion.button>
        <motion.div 
          className="bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/30"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
        >
          <div className="text-slate-300 text-sm">Система активна</div>
        </motion.div>
      </div>
    </div>
  );
}