'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type RevealProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	mode?: 'mount' | 'view';
};

export function Reveal({ children, className, delay = 0, mode = 'view' }: RevealProps) {
	const reduce = useReducedMotion();

	if (reduce) return <div className={className}>{children}</div>;

	const hidden = { opacity: 0, y: 18 };
	const shown = { opacity: 1, y: 0 };

	return (
		<motion.div
			className={cn(className)}
			initial={hidden}
			{...(mode === 'mount'
				? { animate: shown }
				: {
						whileInView: shown,
						viewport: { once: true, amount: 0.2, margin: '9999px 0px 0px 0px' },
					})}
			transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			{children}
		</motion.div>
	);
}
