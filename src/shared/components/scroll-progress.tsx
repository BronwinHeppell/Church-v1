'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/** Hairline reading indicator on the bottom edge of the header. */
export function ScrollProgress() {
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

	if (reduce) return null;

	return (
		<motion.div
			aria-hidden
			style={{ scaleX }}
			className="bg-accent absolute inset-x-0 bottom-[-1px] h-px origin-left"
		/>
	);
}
