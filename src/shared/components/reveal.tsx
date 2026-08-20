'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Three motions, used deliberately:
 *   rise — text and blocks arrive from below
 *   fade — quiet supporting detail
 *   veil — images uncover instead of fading, which reads as intent not latency
 */
export type RevealKind = 'rise' | 'fade' | 'veil';

const VARIANTS: Record<RevealKind, Variants> = {
	rise: {
		hidden: { opacity: 0, y: 22 },
		shown: { opacity: 1, y: 0 },
	},
	fade: {
		hidden: { opacity: 0 },
		shown: { opacity: 1 },
	},
	veil: {
		hidden: { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.05 },
		shown: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
	},
};

const DURATION: Record<RevealKind, number> = {
	rise: 0.85,
	fade: 1.1,
	veil: 1.05,
};

const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;

type Tag = 'div' | 'li' | 'article' | 'section';

const TAGS = {
	div: motion.div,
	li: motion.li,
	article: motion.article,
	section: motion.section,
} as const;

type Common = {
	children: React.ReactNode;
	className?: string;
	kind?: RevealKind;
	as?: Tag;
};

/** A single element that reveals itself when scrolled into view. */
export function Reveal({
	children,
	className,
	kind = 'rise',
	delay = 0,
	as = 'div',
}: Common & { delay?: number }) {
	const reduce = useReducedMotion();
	const Tag = TAGS[as];

	if (reduce) {
		const Plain = as;
		return <Plain className={className}>{children}</Plain>;
	}

	return (
		<Tag
			className={cn(className)}
			variants={VARIANTS[kind]}
			initial="hidden"
			whileInView="shown"
			viewport={VIEWPORT}
			transition={{ duration: DURATION[kind], delay, ease: EASE }}
		>
			{children}
		</Tag>
	);
}

/**
 * Parent that stages its children in sequence. Use with RevealItem so a row of
 * cards arrives one after another rather than as a single slab.
 */
export function RevealGroup({
	children,
	className,
	stagger = 0.1,
	delay = 0.05,
	as = 'div',
}: Omit<Common, 'kind'> & { stagger?: number; delay?: number }) {
	const reduce = useReducedMotion();
	const Tag = TAGS[as];

	if (reduce) {
		const Plain = as;
		return <Plain className={className}>{children}</Plain>;
	}

	return (
		<Tag
			className={cn(className)}
			initial="hidden"
			whileInView="shown"
			viewport={VIEWPORT}
			variants={{
				hidden: {},
				shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
			}}
		>
			{children}
		</Tag>
	);
}

/** Child of RevealGroup. Inherits the parent's timing — no viewport of its own. */
export function RevealItem({ children, className, kind = 'rise', as = 'div' }: Common) {
	const reduce = useReducedMotion();
	const Tag = TAGS[as];

	if (reduce) {
		const Plain = as;
		return <Plain className={className}>{children}</Plain>;
	}

	return (
		<Tag
			className={cn(className)}
			variants={VARIANTS[kind]}
			transition={{ duration: DURATION[kind], ease: EASE }}
		>
			{children}
		</Tag>
	);
}
