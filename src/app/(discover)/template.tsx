'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { transitions } from '@/lib/motion';

/**
 * Next re-mounts the template on each in-segment navigation, so it animates the
 * per-pillar content (header + grid) on pillar switches while the layout's nav
 * and tab bar stay put. Reduced motion is honored via the layout's
 * `MotionProvider`.
 */
export default function DiscoverTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.fast}
    >
      {children}
    </motion.div>
  );
}
