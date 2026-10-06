import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter — animates a number from 0 to target value
 * Uses requestAnimationFrame for smooth 60fps counting
 */
export function AnimatedCounter({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  className = '',
  style = {}
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const startRef = useRef(null);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9.-]/g, ''), 10) : value;
    if (isNaN(numValue)) {
      setDisplayValue(value);
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = numValue;
    prevValueRef.current = numValue;

    let animationId;
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);

      setDisplayValue(current);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    startRef.current = null;
    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [value, duration]);

  const formattedValue = typeof displayValue === 'number'
    ? displayValue.toLocaleString()
    : displayValue;

  return (
    <span className={className} style={style}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
