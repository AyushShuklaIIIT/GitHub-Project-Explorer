import React from 'react'

const Sparkline = ({ data, className = "" }) => {
  if(!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 15;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return (
    <svg className={`w-16 h-6 ${className}`} viewBox='0 0 60 20' preserveAspectRatio='none'>
      <polyline fill='none' stroke='currentColor' strokeWidth={1.5} points={points} />
    </svg>
  )
}

export default Sparkline
