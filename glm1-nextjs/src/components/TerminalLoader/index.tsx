'use client';

import { useEffect, useState } from 'react';

const TerminalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  const terminalLines = [
    '> INITIALIZING COMMAND CENTER...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> LOADING FRAUD DETECTION PROTOCOLS...',
    '> SYSTEM READY. WELCOME, AGENT.'
  ];

  useEffect(() => {
    // Show lines one by one
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev.length < terminalLines.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 1500);

    // Hide loader after all lines are shown
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`terminal-loader ${!isLoading ? 'hidden' : ''}`}>
      <div className="terminal-content">
        {terminalLines.map((line, index) => (
          <div
            key={index}
            className={`terminal-line ${visibleLines.includes(index) ? 'typing' : ''}`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalLoader;