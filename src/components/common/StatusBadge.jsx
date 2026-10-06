import React from 'react';

export function StatusBadge({ status, type }) {
  const s = (status || '').toLowerCase();
  let className = 'status-badge';

  if (s.includes('verified') && !s.includes('unverified')) {
    className += ' verified';
  } else if (s.includes('review') || s.includes('suspicious') || s.includes('unverified') || s.includes('submitted')) {
    className += ' review';
  } else if (s.includes('rejected') || s.includes('sanctioned') || s.includes('phishing') || s.includes('malicious') || s.includes('fraud')) {
    className += ' rejected';
  }

  return (
    <span className={className}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
      <span>{status}</span>
    </span>
  );
}
