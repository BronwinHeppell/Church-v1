import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/shared/components/heading';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/reveal';
import { MAPS_URL, PARISH } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

const opt = `${prefix}/static/opt`;

type ServiceCard = {
	/** The fact visitors came for, set as the display element. */
	stamp: string;
	title: string;
	detail: string;
	img: string;
	alt: string;
};

const CARDS: ServiceCard[] = [
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
		<section id="services" className="bg-raised border-line border-y">
			<div className="shell px-5 py-24 md:px-10 md:py-32">
				<Reveal>
					<SectionHeader
						eyebrow="Worship"
						title="Sunday services"
						sub="Connecting people to God and to one another, every week of the year."
					/>
				</Reveal>

				<RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
					{CARDS.map((card) => (
						<RevealItem key={card.stamp + card.title} as="article" className="card flex flex-col">
							<div className="photo aspect-4/3 w-full">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`${opt}/${card.img}-960.webp`}
									srcSet={`${opt}/${card.img}-640.webp 640w, ${opt}/${card.img}-960.webp 960w`}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
									alt={card.alt}
									loading="lazy"
									decoding="async"
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="flex flex-1 flex-col p-7 md:p-8">
								<h3>
									<span className="font-display text-title numerals block leading-none">
										{card.stamp}
									</span>
									<span className="font-ui text-muted mt-3 block text-xs tracking-[0.14em] uppercase">
										{card.title}
									</span>
								</h3>
								<p className="text-muted mt-4 text-[0.9375rem] leading-relaxed">{card.detail}</p>

								<a
									href={MAPS_URL}
									target="_blank"
									rel="noreferrer"
									className="font-ui text-accent rule-link mt-6 inline-flex items-center gap-1.5 self-start text-[0.8125rem] tracking-[0.04em]"
								>
									Get directions
									<ArrowUpRight strokeWidth={1.5} className="size-3.5" aria-hidden />
								</a>
							</div>
						</RevealItem>
					))}
				</RevealGroup>

				<Reveal kind="fade" delay={0.15}>
					<p className="text-muted mt-14 text-center text-[0.9375rem]">
						You will find us at{' '}
						<a
							href={MAPS_URL}
							target="_blank"
							rel="noreferrer"
							className="text-ink rule-link font-medium"
						>
							{PARISH.street}, {PARISH.suburb}
						</a>
						. Everyone is welcome.
					</p>
				</Reveal>
			</div>
		</section>
	);
};

export default Services;
