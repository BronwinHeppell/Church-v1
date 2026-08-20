'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './wordmark';
import { ScrollProgress } from './scroll-progress';

const LINKS = [
	{ label: 'Services', href: '#services' },
	{ label: 'About', href: '#about' },
	{ label: 'Events', href: '#events' },
	{ label: 'FAQ', href: '#faq' },
	{ label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = ['home', 'services', 'mission', 'about', 'events', 'faq', 'contact'];

const linkClass =
	'font-ui ease-fluid relative py-2 text-xs tracking-[0.1em] uppercase transition-colors duration-500';

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

/** Header condenses as soon as you leave the top of the page. */
function useCondensed() {
	const [condensed, setCondensed] = useState(false);

	useEffect(() => {
		const onScroll = () => setCondensed(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return condensed;
}

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();
	const active = useActiveSection(SECTION_IDS);
	const condensed = useCondensed();

	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setOpen(false);
		triggerRef.current?.focus();
	}, []);

	// The drawer behaves like a dialog: scroll locked, Escape closes, Tab is
	// trapped inside the panel, and focus returns to the button that opened it.
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
		<header className="bg-paper/85 border-line sticky top-0 z-50 border-b backdrop-blur-md">
			<nav
				aria-label="Main"
				data-condensed={condensed || undefined}
				className="shell ease-fluid flex h-[88px] items-center justify-between px-5 transition-[height] duration-700 data-condensed:h-[64px] md:px-10"
			>
				<Link
					href="#home"
					aria-label="Corpus Christi Anglican Church, back to top"
					className="ease-fluid origin-left transition-transform duration-700"
					style={{ transform: condensed ? 'scale(0.84)' : 'scale(1)' }}
				>
					<Wordmark width={168} className="text-ink" />
				</Link>

				<div className="hidden items-center gap-8 lg:flex">
					{LINKS.map((l) => {
						const current = active === l.href.slice(1);
						return (
							<Link
								key={l.href}
								href={l.href}
								aria-current={current ? 'true' : undefined}
								className={`${linkClass} ${current ? 'text-ink' : 'text-muted hover:text-ink'}`}
							>
								{l.label}
								{current && (
									<motion.span
										layoutId="nav-active"
										aria-hidden
										className="bg-accent absolute inset-x-0 -bottom-px h-px"
										transition={{ type: 'spring', stiffness: 380, damping: 32 }}
									/>
								)}
							</Link>
						);
					})}
					<Link
						href="/static/pdf/Banking_Details.pdf"
						target="_blank"
						className="font-ui bg-accent text-accent-ink ease-fluid rounded-base px-4 py-2.5 text-xs tracking-[0.1em] uppercase transition-transform duration-500 hover:-translate-y-px active:scale-[0.98]"
					>
						Give
					</Link>
				</div>

				<button
					ref={triggerRef}
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					aria-expanded={open}
					className="text-ink rounded-base -mr-2 p-2 lg:hidden"
				>
					<Menu strokeWidth={1.5} className="size-6" />
				</button>
			</nav>

			<ScrollProgress />

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
								{LINKS.map((l) => (
									<motion.div
										key={l.href}
										variants={reduce ? undefined : drawerItem}
										transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
									>
										<Link
											href={l.href}
											onClick={close}
											className="font-display border-line text-ink text-subtitle block border-b py-4"
										>
											{l.label}
										</Link>
									</motion.div>
								))}
								<motion.div
									variants={reduce ? undefined : drawerItem}
									transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								>
									<Link
										href="/static/pdf/Banking_Details.pdf"
										target="_blank"
										onClick={close}
										className="font-display text-accent text-subtitle block py-4 italic"
									>
										Give
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
