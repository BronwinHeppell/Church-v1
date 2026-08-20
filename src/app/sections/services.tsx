import { ArrowUpRight } from 'lucide-react';
import { Lines, Rail } from '@/shared/components/editorial';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/reveal';
import { MAPS_URL, PARISH } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';
import React, { Fragment } from 'react';

const opt = `${prefix}/static/opt`;

type ServiceRow = {
	stamp: string;
	title: string;
	detail: string;
	img: string;
	alt: string;
};

const ROWS: ServiceRow[] = [
	{
		stamp: '07:00',
		title: 'Sunday Service',
		detail: 'Our earlier Sunday morning service.',
		img: 'service-early',
		alt: 'The congregation at the early Sunday morning service',
	},
	{
		stamp: '09:00',
		title: 'Sunday Service',
		detail: 'Our later Sunday morning service.',
		img: 'sunday-service',
		alt: 'A Sunday morning service in progress',
	},
	{
		stamp: 'Sundays',
		title: 'Kids Sunday School',
		detail: 'For the children of the parish, every Sunday.',
		img: 'sunday-school',
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
										<div className="grid items-center gap-6 py-6 lg:grid-cols-[8rem_minmax(0,1fr)_9rem] lg:gap-10 lg:py-8">
											<p className="font-display numerals text-[clamp(2rem,3.4vw,2.75rem)] leading-none">
												{row.stamp}
											</p>

											<div>
												<h3 className="font-ui text-ink text-xs tracking-[0.14em] uppercase">
													{row.title}
												</h3>
												<p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
													{row.detail}
												</p>
											</div>

											<div className="photo rounded-frame aspect-3/2 w-full lg:justify-self-end">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={`${opt}/${row.img}-640.webp`}
													srcSet={`${opt}/${row.img}-640.webp 640w, ${opt}/${row.img}-960.webp 960w`}
													sizes="(max-width: 1024px) 100vw, 144px"
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
