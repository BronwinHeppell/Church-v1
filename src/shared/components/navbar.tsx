'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './wordmark';
import { ScrollProgress } from './scroll-progress';

const LINKS = [
	{ label: 'Worship', href: '#worship' },
	{ label: 'About', href: '#belonging' },
	{ label: 'Events', href: '#diary' },
	{ label: 'FAQ', href: '#questions' },
	{ label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = ['home', 'worship', 'mission', 'belonging', 'diary', 'questions', 'contact'];

const drawerItem = {
	hidden: { opacity: 0, x: 18 },
	shown: { opacity: 1, x: 0 },
};

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

function useLanded() {
	const [landed, setLanded] = useState(false);

	useEffect(() => {
		const onScroll = () => setLanded(window.scrollY > window.innerHeight - 120);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, []);

	return landed;
}

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();
	const active = useActiveSection(SECTION_IDS);
	const landed = useLanded();

	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setOpen(false);
		triggerRef.current?.focus();
	}, []);

	useEffect(() => {
		if (!open) return;

		const panel = panelRef.current;
		panel?.querySelector<HTMLElement>('a, button')?.focus();

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
				return;
			}
			if (e.key !== 'Tab' || !panel) return;

			const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
			if (!focusables.length) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [open, close]);

	return (
		<header
			data-landed={landed || undefined}
			className="ease-fluid data-landed:border-line data-landed:bg-paper/85 fixed top-0 right-0 left-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-700"
		>
			<nav
				aria-label="Main"
				className="shell ease-fluid flex h-[88px] items-center justify-between px-5 transition-[height] duration-700 data-landed:h-[64px] md:px-10"
				data-landed={landed || undefined}
			>
				<Link
					href="#home"
					aria-label="Corpus Christi Anglican Church, back to top"
					className="ease-fluid origin-left transition-transform duration-700"
					style={{ transform: landed ? 'scale(0.84)' : 'scale(1)' }}
				>
					<Wordmark width={168} className={landed ? 'text-ink' : 'text-on-image'} />
				</Link>

				<div className="hidden items-center gap-8 lg:flex">
					{LINKS.map((l) => {
						const current = active === l.href.slice(1);
						const tone = landed
							? current
								? 'text-ink'
								: 'text-muted hover:text-ink'
							: current
								? 'text-white'
								: 'text-white/70 hover:text-white';
						return (
							<Link
								key={l.href}
								href={l.href}
								aria-current={current ? 'true' : undefined}
								className={`font-ui ease-fluid relative py-2 text-xs tracking-[0.1em] uppercase transition-colors duration-500 ${tone}`}
							>
								{l.label}
								{current && (
									<motion.span
										layoutId="nav-active"
										aria-hidden
										className={`absolute inset-x-0 -bottom-px h-px ${landed ? 'bg-accent' : 'bg-white'}`}
										transition={{ type: 'spring', stiffness: 380, damping: 32 }}
									/>
								)}
							</Link>
						);
					})}
					<Link
						href="/static/pdf/Banking_Details.pdf"
						target="_blank"
						className={`font-ui ease-fluid rounded-base border px-4 py-2.5 text-xs tracking-[0.1em] uppercase transition-colors duration-500 ${
							landed
								? 'bg-accent text-accent-ink hover:bg-accent-deep border-transparent'
								: 'text-on-image border-white/45 hover:border-white/85 hover:bg-white/10'
						}`}
					>
						Donate
					</Link>
				</div>

				<button
					ref={triggerRef}
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					aria-expanded={open}
					className={`rounded-base -mr-2 p-2 lg:hidden ${landed ? 'text-ink' : 'text-on-image'}`}
				>
					<Menu strokeWidth={1.5} className="size-6" />
				</button>
			</nav>

			{landed && <ScrollProgress />}

			<AnimatePresence>
				{open && (
					<motion.div
						className="fixed inset-0 z-50 lg:hidden"
						initial={reduce ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={reduce ? undefined : { opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						<div
							aria-hidden
							onClick={close}
							className="absolute inset-0 bg-[rgb(var(--scrim)/0.55)] backdrop-blur-[2px]"
						/>
						<motion.div
							ref={panelRef}
							role="dialog"
							aria-modal="true"
							aria-label="Site menu"
							className="bg-paper border-line absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l px-6 py-5"
							initial={reduce ? false : { x: '100%' }}
							animate={{ x: 0 }}
							exit={reduce ? undefined : { x: '100%' }}
							transition={{ type: 'spring', stiffness: 300, damping: 32 }}
						>
							<div className="flex items-center justify-between">
								<Wordmark width={148} className="text-ink" />
								<button
									type="button"
									onClick={close}
									aria-label="Close menu"
									className="text-ink rounded-base -mr-2 p-2"
								>
									<X strokeWidth={1.5} className="size-6" />
								</button>
							</div>

							<motion.div
								className="mt-12 flex flex-col"
								initial="hidden"
								animate="shown"
								variants={{
									hidden: {},
									shown: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
								}}
							>
								{LINKS.map((l, i) => (
									<motion.div
										key={l.href}
										variants={reduce ? undefined : drawerItem}
										transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
									>
										<Link
											href={l.href}
											onClick={close}
											className={`font-display border-line text-ink flex items-baseline gap-4 py-4 text-[1.75rem] leading-none ${
												i === LINKS.length - 1 ? '' : 'border-b'
											}`}
										>
											<span className="font-ui numerals text-muted text-[0.6875rem] tracking-[0.18em]">
												{String(i + 1).padStart(2, '0')}
											</span>
											{l.label}
										</Link>
									</motion.div>
								))}
								<motion.div
									variants={reduce ? undefined : drawerItem}
									transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								>
									{/*
									 * Centred and flanked by rules, so it closes the list rather than
									 * reading as a sixth item. The rules take the place of the last
									 * link's bottom border, which is why that border is dropped above.
									 */}
									<Link
										href="/static/pdf/Banking_Details.pdf"
										target="_blank"
										onClick={close}
										className="group flex items-center gap-5 py-5"
									>
										<span
											aria-hidden
											className="bg-line ease-fluid h-px flex-1 transition-colors duration-500 group-hover:bg-[color-mix(in_oklab,var(--color-accent)_45%,var(--color-line))]"
										/>
										<span className="font-display text-accent text-[1.75rem] leading-none italic">
											Donate
										</span>
										<span
											aria-hidden
											className="bg-line ease-fluid h-px flex-1 transition-colors duration-500 group-hover:bg-[color-mix(in_oklab,var(--color-accent)_45%,var(--color-line))]"
										/>
									</Link>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
