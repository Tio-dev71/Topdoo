import React from 'react';

/**
 * LoadingSkeleton — Shimmer loading component for data tables, cards, and text lines
 */
export function LoadingSkeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
  count = 1,
  className = '',
  style = {}
}) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      {items.map((key) => (
        <div
          key={key}
          className={`skeleton-shimmer ${className}`}
          style={{
            width,
            height,
            borderRadius,
            background: 'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-wave 1.6s infinite ease-in-out',
            ...style
          }}
        />
      ))}
      <style>{`
        @keyframes skeleton-wave {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
