'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './wordmark';

const LINKS = [
	{ label: 'Services', href: '#services' },
	{ label: 'About us', href: '#AboutUs' },
	{ label: 'Events', href: '#Events' },
	{ label: 'FAQ', href: '#faq' },
	{ label: 'Contact us', href: '#Footer' },
] as const;

const linkClass = 'font-ui text-[0.9375rem] transition-colors duration-200 hover:text-ink';

function useActiveSection(ids: readonly string[]) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const els = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (!els.length) return;

		const visible = new Map<string, number>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
					else visible.delete(e.target.id);
				}
				if (!visible.size) return;
				const [top] = [...visible.entries()].sort((a, b) => b[1] - a[1]);
				setActive(top[0]);
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
		);

		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [ids]);

	return active;
}

const SECTION_IDS = ['home', 'services', 'MissionStatement', 'AboutUs', 'Events', 'faq', 'Footer'];

const donateClass =
	'font-ui rounded-base border border-line px-3.5 py-2 text-[0.9375rem] text-ink transition-colors duration-200 hover:border-accent hover:text-accent active:translate-y-[1px]';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();
	const active = useActiveSection(SECTION_IDS);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header className="bg-paper/90 border-line sticky top-0 z-50 border-b backdrop-blur-sm">
			<nav
				aria-label="Main"
				className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-5 md:px-10"
			>
				<Link href="#home" aria-label="Corpus Christi Anglican Church, back to top">
					<Wordmark width={158} className="text-ink" />
				</Link>

				<div className="hidden items-center gap-7 lg:flex">
					{LINKS.map((l) => {
						const current = active === l.href.slice(1);
						return (
							<Link
								key={l.href}
								href={l.href}
								aria-current={current ? 'true' : undefined}
								className={`${linkClass} ${current ? 'text-ink' : 'text-muted'}`}
							>
								{l.label}
							</Link>
						);
					})}
					<Link href="/static/pdf/Banking_Details.pdf" target="_blank" className={donateClass}>
						Donate
					</Link>
				</div>

				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					aria-expanded={open}
					className="text-ink rounded-base -mr-2 p-2 lg:hidden"
				>
					<Menu strokeWidth={1.5} className="size-6" />
				</button>
			</nav>

			<AnimatePresence>
				{open && (
					<motion.div
						className="fixed inset-0 z-50 lg:hidden"
						initial={reduce ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={reduce ? undefined : { opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<button
							type="button"
							aria-label="Close menu"
							onClick={() => setOpen(false)}
							className="absolute inset-0 bg-[rgb(var(--scrim)/0.5)]"
						/>
						<motion.div
							className="bg-paper border-line absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l px-6 py-5"
							initial={reduce ? false : { x: '100%' }}
							animate={{ x: 0 }}
							exit={reduce ? undefined : { x: '100%' }}
							transition={{ type: 'spring', stiffness: 320, damping: 34 }}
						>
							<div className="flex items-center justify-between">
								<Wordmark width={140} className="text-ink" />
								<button
									type="button"
									onClick={() => setOpen(false)}
									aria-label="Close menu"
									className="text-ink rounded-base -mr-2 p-2"
								>
									<X strokeWidth={1.5} className="size-6" />
								</button>
							</div>

							<div className="mt-10 flex flex-col">
								{LINKS.map((l) => (
									<Link
										key={l.href}
										href={l.href}
										onClick={() => setOpen(false)}
										className="font-display border-line text-ink border-b py-4 text-2xl"
									>
										{l.label}
									</Link>
								))}
								<Link
									href="/static/pdf/Banking_Details.pdf"
									target="_blank"
									onClick={() => setOpen(false)}
									className="font-display text-accent py-4 text-2xl"
								>
									Donate
								</Link>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
