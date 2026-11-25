import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const INITIAL_OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.94 },
  none: {},
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = INITIAL_OFFSETS[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.62,
        delay: delay / 1000,
        ease: REVEAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
