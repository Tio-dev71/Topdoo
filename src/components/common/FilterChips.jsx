import React from 'react';

/**
 * FilterChips — Pill-style filter bar matching marketing website pill style
 */
export function FilterChips({
  options = [],
  value,
  onChange,
  className = '',
  size = 'md'
}) {
  return (
    <div
      className={`filter-chips-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap'
      }}
    >
      {options.map((opt) => {
        const isActive = value === opt.id;
        const Icon = opt.icon;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: size === 'sm' ? '4px 10px' : '6px 14px',
              fontSize: size === 'sm' ? 12 : 13,
              fontWeight: isActive ? 600 : 500,
              borderRadius: 9999,
              border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
              background: isActive ? '#2563EB' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#475569',
              cursor: 'pointer',
              transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isActive
                ? '0 2px 8px rgba(37, 99, 235, 0.25)'
                : '0 1px 2px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.color = '#0F172A';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#475569';
              }
            }}
          >
            {Icon && <Icon size={size === 'sm' ? 13 : 15} />}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 9999,
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#64748B',
                  marginLeft: 2
                }}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
