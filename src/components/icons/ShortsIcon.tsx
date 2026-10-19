import React from 'react';

export const ShortsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5s.43-.2.83-.4c1.8-1 2.37-3.3 1.27-5.1-1.1-1.8-3.4-2.37-5.2-1.27L5.8 8.6c-1.5.87-2.02 2.77-1.17 4.28.77.32 1.2.5 1.2.5s-.43.2-.83.4c-1.8 1-2.37 3.3-1.27 5.1 1.1 1.8 3.4 2.37 5.2 1.27l8.67-5.55c1.5-.88 2.02-2.78 1.17-4.28zM10 14.65v-5.3l4.8 2.65L10 14.65z" />
  </svg>
);
