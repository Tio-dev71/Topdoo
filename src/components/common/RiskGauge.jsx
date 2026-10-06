import React from 'react';
import { getRiskMeta } from '../../data/securityData';
import { RiskBadge } from './RiskBadge';

export function RiskGauge({ score = 0, size = 'lg', showDetails = true, showFactors = false }) {
  const meta = getRiskMeta(score);

  // SVG circular arc calculations
  const radius = 42;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: size === 'lg' ? 104 : 76, height: size === 'lg' ? 104 : 76, flexShrink: 0 }}>
        <svg
          width={size === 'lg' ? 104 : 76}
          height={size === 'lg' ? 104 : 76}
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--border-default)"
            strokeWidth={strokeWidth}
          />
          {/* Active Colored Arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={meta.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        {/* Center score readout */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}
        >
          <span style={{ fontSize: size === 'lg' ? 26 : 18, fontWeight: 800, color: meta.color, letterSpacing: '-0.02em' }}>
            {score}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>/ 100</span>
        </div>
      </div>

      {showDetails && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RiskBadge score={score} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Security Assessment</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
            {score >= 81 && 'Critical threat profile. Active malicious signals.'}
            {score >= 61 && score < 81 && 'Elevated risk profile. Caution warranted.'}
            {score >= 41 && score < 61 && 'Moderate risk profile. Suspicious signals.'}
            {score >= 21 && score < 41 && 'Low risk profile. Minor anomalies.'}
            {score < 21 && 'Safe profile. Verified trustworthy asset.'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Calculated across {score > 40 ? 'multiple threat telemetry feeds & reports' : 'established verification baseline'}.
          </div>
        </div>
      )}
    </div>
  );
}
