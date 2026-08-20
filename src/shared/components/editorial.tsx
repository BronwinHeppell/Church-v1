'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Numbered section rail. The number stays with you while the section scrolls,
 * which is what makes a long page feel like a publication rather than a stack
 * of blocks.
 */
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

/**
 * Headline that uncovers one line at a time. Lines are authored explicitly
 * rather than measured, so the rhythm is art-directed instead of accidental.
 */
export function Lines({
	lines,
	className,
	as: Tag = 'h2',
	delay = 0,
}: {
	lines: React.ReactNode[];
	className?: string;
	as?: 'h1' | 'h2';
	delay?: number;
}) {
	const reduce = useReducedMotion();

	if (reduce) {
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

	return (
		<Tag className={className}>
			{lines.map((line, i) => (
				<span key={i} className="block overflow-hidden pb-[0.06em]">
					<motion.span
						className="block"
						initial={{ y: '105%' }}
						whileInView={{ y: '0%' }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
					>
						{line}
					</motion.span>
				</span>
			))}
		</Tag>
	);
}

/**
 * Image that drifts against the scroll. `distance` is the total travel in
 * pixels across the whole time the element is on screen.
 */
export function Parallax({
	children,
	className,
	distance = 80,
}: {
	children: React.ReactNode;
	className?: string;
	distance?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

	return (
		<div ref={ref} className={cn('overflow-hidden', className)}>
			<motion.div
				className="h-[calc(100%+var(--drift))] w-full"
				style={{
					// The extra height covers the drift so no edge is ever exposed.
					['--drift' as string]: `${distance}px`,
					y: reduce ? 0 : y,
					marginTop: `calc(var(--drift) / -2)`,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
