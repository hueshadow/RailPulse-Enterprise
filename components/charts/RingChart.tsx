import React, { useEffect, useState } from 'react';

interface RingChartProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'danger' | 'warning' | 'success';
  label?: string;
  subLabel?: string;
  showValue?: boolean;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { size: 60, fontSize: 'text-sm', subFontSize: 'text-[8px]', strokeWidth: 6 },
  md: { size: 100, fontSize: 'text-xl', subFontSize: 'text-xs', strokeWidth: 8 },
  lg: { size: 140, fontSize: 'text-3xl', subFontSize: 'text-sm', strokeWidth: 10 },
};

const COLOR_CONFIG = {
  primary: {
    stroke: '#25c0f4',
    gradient: ['#25c0f4', '#1a9cc9'],
    glow: 'rgba(37, 192, 244, 0.5)',
    text: 'text-quantix-purple',
  },
  danger: {
    stroke: '#ef4444',
    gradient: ['#ef4444', '#dc2626'],
    glow: 'rgba(239, 68, 68, 0.5)',
    text: 'text-rail-danger',
  },
  warning: {
    stroke: '#f59e0b',
    gradient: ['#f59e0b', '#d97706'],
    glow: 'rgba(245, 158, 11, 0.5)',
    text: 'text-rail-warning',
  },
  success: {
    stroke: '#10b981',
    gradient: ['#10b981', '#059669'],
    glow: 'rgba(16, 185, 129, 0.5)',
    text: 'text-rail-success',
  },
};

export const RingChart: React.FC<RingChartProps> = ({
  value,
  size = 'md',
  color = 'primary',
  label,
  subLabel,
  showValue = true,
  strokeWidth: customStrokeWidth,
  animated = true,
  className = '',
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  const sizeConfig = SIZE_CONFIG[size];
  const colorConfig = COLOR_CONFIG[color];
  const strokeWidth = customStrokeWidth || sizeConfig.strokeWidth;

  const svgSize = sizeConfig.size;
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    if (animated) {
      const duration = 1000;
      const startTime = Date.now();
      const startValue = animatedValue;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (clampedValue - startValue) * easeOut;

        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setAnimatedValue(clampedValue);
    }
  }, [clampedValue, animated]);

  const offset = circumference - (animatedValue / 100) * circumference;
  const gradientId = `ring-gradient-${color}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        width={svgSize}
        height={svgSize}
        className="transform -rotate-90"
        style={{ filter: `drop-shadow(0 0 8px ${colorConfig.glow})` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorConfig.gradient[0]} />
            <stop offset="100%" stopColor={colorConfig.gradient[1]} />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="rgba(42, 59, 66, 0.5)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: animated ? 'none' : 'stroke-dashoffset 0.3s ease-out',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className={`${sizeConfig.fontSize} font-bold font-mono ${colorConfig.text}`}>
            {Math.round(animatedValue)}%
          </span>
        )}
        {label && (
          <span className={`${sizeConfig.subFontSize} text-gray-400 mt-0.5`}>
            {label}
          </span>
        )}
      </div>

      {/* Sub label below chart */}
      {subLabel && (
        <span className="text-xs text-gray-500 mt-2">{subLabel}</span>
      )}
    </div>
  );
};

// Multi-ring variant for comparing values
interface MultiRingChartProps {
  rings: Array<{
    value: number;
    color: 'primary' | 'danger' | 'warning' | 'success';
    label: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  showLegend?: boolean;
  className?: string;
}

export const MultiRingChart: React.FC<MultiRingChartProps> = ({
  rings,
  size = 'md',
  showLegend = true,
  className = '',
}) => {
  const sizeConfig = SIZE_CONFIG[size];
  const svgSize = sizeConfig.size;
  const baseStrokeWidth = sizeConfig.strokeWidth - 2;
  const gap = baseStrokeWidth + 4;

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg width={svgSize} height={svgSize} className="transform -rotate-90">
        {rings.map((ring, index) => {
          const radius = (svgSize - baseStrokeWidth) / 2 - index * gap;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (ring.value / 100) * circumference;
          const colorConfig = COLOR_CONFIG[ring.color];
          const gradientId = `multi-ring-${index}-${Math.random().toString(36).substr(2, 9)}`;

          return (
            <React.Fragment key={index}>
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.gradient[0]} />
                  <stop offset="100%" stopColor={colorConfig.gradient[1]} />
                </linearGradient>
              </defs>

              {/* Background */}
              <circle
                cx={svgSize / 2}
                cy={svgSize / 2}
                r={radius}
                fill="none"
                stroke="rgba(42, 59, 66, 0.3)"
                strokeWidth={baseStrokeWidth}
              />

              {/* Progress */}
              <circle
                cx={svgSize / 2}
                cy={svgSize / 2}
                r={radius}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ filter: `drop-shadow(0 0 4px ${colorConfig.glow})` }}
              />
            </React.Fragment>
          );
        })}
      </svg>

      {showLegend && (
        <div className="flex flex-wrap gap-3 mt-3 justify-center">
          {rings.map((ring, index) => {
            const colorConfig = COLOR_CONFIG[ring.color];
            return (
              <div key={index} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colorConfig.stroke }}
                />
                <span className="text-xs text-gray-400">{ring.label}</span>
                <span className={`text-xs font-mono font-medium ${colorConfig.text}`}>
                  {ring.value}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
