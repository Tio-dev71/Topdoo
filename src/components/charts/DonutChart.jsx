import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * DonutChart — Reusable Recharts Donut / Pie Chart for risk distribution & metric breakdowns
 */
export function DonutChart({
  data = [],
  colors = ['#DC2626', '#EA580C', '#D97706', '#2563EB', '#059669'],
  innerRadius = 55,
  outerRadius = 78,
  height = 190,
  centerLabel = '',
  centerValue = ''
}) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: '8px 12px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
          fontSize: 12
        }}>
          <div style={{ fontWeight: 600, color: item.payload.fill || item.color, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.payload.fill || item.color }} />
            {item.name}
          </div>
          <div style={{ marginTop: 2, color: '#0F172A', fontWeight: 700 }}>
            {item.value.toLocaleString()} <span style={{ fontWeight: 400, color: '#64748B' }}>entities ({item.payload.percentage || Math.round((item.value / (data.reduce((a, b) => a + b.value, 0) || 1)) * 100)}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
            animationDuration={800}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || colors[index % colors.length]}
                style={{ outline: 'none' }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {centerValue && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            {centerValue}
          </div>
          {centerLabel && (
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>
              {centerLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
