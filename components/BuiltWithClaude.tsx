'use client';

import { useEffect, useState, useRef } from 'react';

const WORDS = [
  'Thinking', 'Pondering', 'Cogitating', 'Smooshing',
  'Spelunking', 'Booping', 'Wibbling', 'Clauding',
  'Gallivanting', 'Lollygagging', 'Skedaddling', 'Moonwalking',
  "Beboppin'", 'Shenaniganing', 'Razzle-dazzling', 'Whatchamacalliting',
];

const FINAL_TEXT = 'Built with Claude';

export default function BuiltWithClaude() {
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  // Trigger on scroll into view — only once
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Word cycling
  useEffect(() => {
    if (!started || done) return;
    const interval = setInterval(() => {
      setWordIndex(prev => {
        const next = prev + 1;
        if (next >= WORDS.length) {
          setDone(true);
          clearInterval(interval);
          return prev;
        }
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [started, done]);

  return (
    <div ref={ref} className="flex items-center justify-center gap-2">
      {/* Claude asterisk — pulses while cycling, static when done */}
      <span
        className={started && !done ? 'animate-pulse' : ''}
        style={{ color: '#D97757', fontSize: '1.25rem', lineHeight: 1 }}
      >
        ✻
      </span>
      <span
        className="font-mono text-sm"
        style={{
          color: done ? '#9CA3AF' : '#D97757',
          fontStyle: done ? 'normal' : 'italic',
          minWidth: '14rem',
        }}
      >
        {started ? (
          done ? (
            <>
              <span className="text-gradient-cycle font-mono text-sm font-semibold">Built</span>
              {' with Claude'}
            </>
          ) : (
            `${WORDS[wordIndex]}...`
          )
        ) : '\u00A0'}
      </span>
    </div>
  );
}
