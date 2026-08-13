'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Map = dynamic(() => import('./map'), { ssr: false });

const Placeholder = () => <div className="rounded-base h-[200px] w-full bg-white/10" aria-hidden />;

const MapLazy = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShow(true);
					io.disconnect();
				}
			},
			{ rootMargin: '300px' },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return <div ref={ref}>{show ? <Map /> : <Placeholder />}</div>;
};

export default MapLazy;
