'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Scopes Framer Motion config for a subtree. `reducedMotion="user"` makes every
 * `motion.*` inside respect `prefers-reduced-motion` automatically (transforms
 * are dropped, only opacity animates), so components do not each need a guard.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
