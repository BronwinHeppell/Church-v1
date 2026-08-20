import { ArrowUpRight } from 'lucide-react';
import { Lines, Rail } from '@/shared/components/editorial';
import { PewLeaflet } from '@/shared/components/pew-leaflet';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/reveal';
import { MAPS_URL, PARISH } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';
import React, { Fragment } from 'react';

const opt = `${prefix}/static/opt`;

type ServiceRow = {
	stamp: string;
	title: string;
	detail: string;
	/** Square, attention-cropped, tone-matched index plate. */
	plate: string;
	alt: string;
};

const ROWS: ServiceRow[] = [
	{
		stamp: '07:00',
		title: 'Sunday Service',
		detail: 'Our earlier Sunday morning service.',
		plate: 'plate-early',
		alt: 'The congregation at the early Sunday morning service',
	},
	{
		stamp: '09:00',
		title: 'Sunday Service',
		detail: 'Our later Sunday morning service.',
		plate: 'plate-service',
		alt: 'A Sunday morning service in progress',
	},
	{
		stamp: 'Sundays',
		title: 'Kids Sunday School',
		detail: 'For the children of the parish, every Sunday.',
		plate: 'plate-school',
		alt: 'Children at Corpus Christi Sunday School',
	},
];

const Services = () => {
	return (
		<section id="worship">
			<div className="shell px-5 py-20 md:px-10 md:py-32">
				<div className="grid gap-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-16">
					<Rail number="01" label="Worship" />

					<div>
						<Lines
							className="font-display max-w-[24ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em]"
							lines={[
								'Sunday services,',
								<React.Fragment key="servicesDesc">
									every week of the <em className="font-display italic">year</em>
								</React.Fragment>,
							]}
						/>
						<Reveal kind="fade" delay={0.2}>
							<p className="prose-body text-muted mt-6 max-w-[52ch] text-base">
								Two morning services and a Sunday School for the children of the parish. Everyone is
								welcome.
							</p>
						</Reveal>

						<RevealGroup className="border-line mt-10 border-t" as="div" stagger={0.1}>
							<ul>
								{ROWS.map((row) => (
									<RevealItem key={row.stamp + row.title} as="li" className="border-line border-b">
										{/*
										 * `lg:contents` collapses the type wrapper into the parent grid
										 * on wide screens, so one structure serves both arrangements: a
										 * stacked block beside a small plate on a phone, and three
										 * aligned columns on a desktop.
										 */}
										<div className="grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-5 py-6 sm:grid-cols-[minmax(0,1fr)_7rem] lg:grid-cols-[8rem_minmax(0,1fr)_11rem] lg:gap-10 lg:py-8">
											<div className="lg:contents">
												<p className="font-display numerals text-[clamp(2rem,3.4vw,2.75rem)] leading-none">
													{row.stamp}
												</p>

												<div className="mt-3 lg:mt-0">
													<h3 className="font-ui text-ink text-xs tracking-[0.14em] uppercase">
														{row.title}
													</h3>
													<p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
														{row.detail}
													</p>
												</div>
											</div>

											<div className="photo-plate rounded-frame aspect-square w-full lg:justify-self-end">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={`${opt}/${row.plate}-256.webp`}
													srcSet={`${opt}/${row.plate}-256.webp 256w, ${opt}/${row.plate}-384.webp 384w`}
													sizes="(max-width: 1024px) 7rem, 11rem"
													alt={row.alt}
													loading="lazy"
													decoding="async"
													className="h-full w-full object-cover"
												/>
											</div>
										</div>
									</RevealItem>
								))}
							</ul>
						</RevealGroup>

						<PewLeaflet />

						<Reveal kind="fade" delay={0.15}>
							<a
								href={MAPS_URL}
								target="_blank"
								rel="noreferrer"
								className="font-ui text-accent rule-link mt-8 inline-flex items-center gap-2 text-[0.9375rem]"
							>
								{PARISH.street}, {PARISH.suburb}
								<ArrowUpRight strokeWidth={1.5} className="size-4" aria-hidden />
							</a>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
