import React from 'react';
import { Search } from 'lucide-react';

/**
 * EmptyState — Clean empty state placeholder with modern light styling
 */
export function EmptyState({
  icon: Icon = Search,
  title = 'No records found',
  description = 'Try adjusting your search filters or scan a new identifier.',
  actionLabel,
  onAction,
  className = '',
  style = {}
}) {
  return (
    <div
      className={`empty-state-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px dashed #CBD5E1',
        margin: '16px 0',
        ...style
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgba(37, 99, 235, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2563EB',
          marginBottom: 16
        }}
      >
        <Icon size={24} />
      </div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: 6
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: '#64748B',
          maxWidth: 380,
          lineHeight: 1.5,
          marginBottom: actionLabel ? 20 : 0
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary btn-sm"
          style={{
            padding: '8px 18px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
