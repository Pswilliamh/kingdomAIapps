import React, { useState, useEffect, useRef } from 'react';

interface MatrixTerminalGlitchTextProps {
  text: string;
  className?: string;
}

export const MatrixTerminalGlitchText: React.FC<MatrixTerminalGlitchTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()<>_+-=[]{}|";
  const observerRef = useRef<HTMLSpanElement>(null);

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
      
      iteration += Math.max(1, text.length / 10);
    }, 40);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        triggerGlitch();
      }
    }, { threshold: 0.1 });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [text]);

  return (
    <span 
      ref={observerRef} 
      onMouseEnter={triggerGlitch}
      className={`${className} cursor-pointer inline-flex items-center select-none`}
    >
      <span>{displayText}</span>
      <span className="w-1 md:w-1.5 h-4 md:h-5 bg-indigo-400 ml-1.5 inline-block animate-pulse shrink-0" style={{ animationDuration: '0.8s' }} />
    </span>
  );
};
