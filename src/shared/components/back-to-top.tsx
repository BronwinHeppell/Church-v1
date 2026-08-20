'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
	const [show, setShow] = useState(false);
	const reduce = useReducedMotion();

	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.a
					href="#home"
					aria-label="Back to top"
					initial={reduce ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={reduce ? undefined : { opacity: 0, y: 12 }}
					transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
					className="bg-accent text-accent-ink ease-fluid fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full transition-transform duration-500 hover:-translate-y-0.5 active:scale-95 md:right-8 md:bottom-8"
				>
					<ArrowUp strokeWidth={1.5} className="size-4" aria-hidden />
				</motion.a>
			)}
		</AnimatePresence>
	);
};

export default BackToTop;
