'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPS_URL, PARISH } from '@/shared/core/parish';
import { prefix } from '../core/prefix';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const Map = () => {
	const container = useRef<HTMLDivElement>(null);
	const [failed, setFailed] = useState(!TOKEN);

	useEffect(() => {
		if (!TOKEN || !container.current) return;

		let map: mapboxgl.Map;

		try {
			mapboxgl.accessToken = TOKEN;
			map = new mapboxgl.Map({
				container: container.current,
				style: 'mapbox://styles/mapbox/light-v11',
				center: [PARISH.lng, PARISH.lat],
				zoom: 15,
				attributionControl: false,
			});
		} catch {
			Promise.resolve().then(() => setFailed(true));
			return;
		}

		map.scrollZoom.disable();
		map.on('error', () => setFailed(true));

		new mapboxgl.Marker({ color: '#1e4d3b' }).setLngLat([PARISH.lng, PARISH.lat]).addTo(map);

		return () => map.remove();
	}, []);

	if (failed) {
		return (
			<a
				href={MAPS_URL}
				target="_blank"
				rel="noreferrer"
				className="rounded-base border-line relative block h-[200px] w-full overflow-hidden border"
			>
				<Image
					src={`${prefix}/static/map_placeholder.png`}
					alt={`Map showing Corpus Christi Anglican Church at ${PARISH.street}, ${PARISH.suburb}`}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover"
				/>
			</a>
		);
	}

	return (
		<div
			ref={container}
			role="img"
			aria-label={`Map showing Corpus Christi Anglican Church at ${PARISH.street}, ${PARISH.suburb}`}
			className="rounded-base border-line h-[200px] w-full overflow-hidden border"
		/>
	);
};

export default Map;
