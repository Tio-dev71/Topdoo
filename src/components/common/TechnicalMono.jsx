import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

export function TechnicalMono({ value, truncate = false, length = 16, canCopy = true, isLink = false, onLinkClick }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const displayVal = truncate && value.length > length
    ? `${value.substring(0, Math.floor(length / 2))}...${value.substring(value.length - Math.floor(length / 2))}`
    : value;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 6px',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-default)',
        borderRadius: 6,
        fontSize: '12px',
        color: isLink ? '#2563EB' : 'var(--text-primary)',
        cursor: isLink ? 'pointer' : 'default',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      onClick={isLink && onLinkClick ? onLinkClick : undefined}
      title={value}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayVal}</span>
      {canCopy && (
        <button
          onClick={handleCopy}
          style={{
            color: copied ? '#10B981' : 'var(--text-muted)',
            padding: 2,
            display: 'inline-flex',
            alignItems: 'center'
          }}
          title={copied ? 'Copied to clipboard' : 'Copy'}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
      {isLink && <ExternalLink size={11} style={{ opacity: 0.7 }} />}
    </span>
  );
}
