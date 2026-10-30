'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Rail({
	number,
	label,
	className,
}: {
	number: string;
	label: string;
	className?: string;
}) {
	return (
		<div className={cn('lg:sticky lg:top-32 lg:self-start', className)}>
			<p className="font-ui text-muted numerals flex items-baseline gap-3 text-xs tracking-[0.2em] uppercase">
				<span className="text-accent">{number}</span>
				<span aria-hidden className="bg-line h-px w-8 translate-y-[-0.2em]" />
				{label}
			</p>
		</div>
	);
}

export function Lines({
	lines,
	className,
	as: Tag = 'h2',
}: {
	lines: React.ReactNode[];
	className?: string;
	as?: 'h1' | 'h2';
	delay?: number;
}) {
	return (
		<Tag className={className}>
			{lines.map((line, i) => (
				<span key={i} className="block">
					{line}
				</span>
			))}
		</Tag>
	);
}

// Keep existing image sizing while replacing scroll-linked movement with a brief reveal.
export function Parallax({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
	distance?: number;
}) {
	const reduce = useReducedMotion();
	return (
		<div className={cn('overflow-hidden', className)}>
			<motion.div
				className="h-full w-full"
				initial={reduce ? false : { opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.35, ease: EASE }}
			>
				{children}
			</motion.div>
		</div>
	);
}
