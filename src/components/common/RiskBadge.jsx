import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { getRiskMeta } from '../../data/securityData';

export function RiskBadge({ score, labelOverride, size = 'md' }) {
  const meta = getRiskMeta(score);
  const label = labelOverride || meta.label;

  const getIcon = () => {
    if (score >= 81) return <AlertCircle size={size === 'sm' ? 11 : 13} />;
    if (score >= 61) return <ShieldAlert size={size === 'sm' ? 11 : 13} />;
    if (score >= 41) return <AlertTriangle size={size === 'sm' ? 11 : 13} />;
    if (score >= 21) return <Info size={size === 'sm' ? 11 : 13} />;
    return <ShieldCheck size={size === 'sm' ? 11 : 13} />;
  };

  const getClassName = () => {
    if (score >= 81) return 'critical';
    if (score >= 61) return 'high';
    if (score >= 41) return 'medium';
    if (score >= 21) return 'low';
    return 'safe';
  };

  return (
    <span className={`risk-badge ${getClassName()}`} style={{ fontSize: size === 'sm' ? '10px' : '11px' }}>
      {getIcon()}
      <span>{label}</span>
      {score !== undefined && <span style={{ opacity: 0.85, fontWeight: 700 }}>({score})</span>}
    </span>
  );
}

export function StatusBadge({ status, type }) {
  const s = (status || '').toLowerCase();
  let className = 'status-badge';

  if (s.includes('verified') && !s.includes('unverified')) {
    className += ' verified';
  } else if (s.includes('review') || s.includes('suspicious') || s.includes('unverified')) {
    className += ' review';
  } else if (s.includes('rejected') || s.includes('sanctioned') || s.includes('phishing') || s.includes('malicious')) {
    className += ' rejected';
  }

  return (
    <span className={className}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
      <span>{status}</span>
    </span>
  );
}
