import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * AreaSparkline — Reusable Area Sparkline / Time-series chart using Recharts
 */
export function AreaSparkline({
  data = [],
  dataKey = 'value',
  xAxisKey = 'time',
  height = 70,
  strokeColor = '#2563EB',
  fillColor = '#2563EB',
  showAxis = false,
  showTooltip = true,
  gradientId = 'areaGrad'
}) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 6,
          padding: '6px 10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          fontSize: 11
        }}>
          <div style={{ color: '#64748B' }}>{label}</div>
          <div style={{ fontWeight: 700, color: strokeColor, marginTop: 2 }}>
            {payload[0].value.toLocaleString()} checks/hr
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fillColor} stopOpacity={0.28} />
              <stop offset="95%" stopColor={fillColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          {showAxis && (
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
            />
          )}
          {showAxis && (
            <YAxis
              hide
              domain={['dataMin - 10', 'dataMax + 10']}
            />
          )}
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
