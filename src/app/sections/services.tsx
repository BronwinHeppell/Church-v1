import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { MAPS_URL } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

type ServiceCard = {
	title: string;
	detail: string;
	img: string;
	alt: string;
};

const opt = `${prefix}/static/opt`;

const CARDS: ServiceCard[] = [
	{
		title: 'Sunday Services 7am',
		detail: 'Our earlier Sunday morning service.',
		img: 'service-early',
		alt: 'The congregation at the early Sunday morning service',
	},
	{
		title: 'Sunday Services 9am',
		detail: 'Our later Sunday morning service.',
		img: 'sunday-service',
		alt: 'A Sunday morning service in progress',
	},
	{
		title: 'Kids Sunday School',
		detail: 'For the children of the parish, every Sunday.',
		img: 'sunday-school',
		alt: 'Children at Corpus Christi Sunday School',
	},
];

const SRCSET: Record<string, string> = {
	'service-early': `${opt}/service-early-640.webp 640w, ${opt}/service-early-960.webp 960w`,
	'sunday-service': `${opt}/sunday-service-640.webp 640w, ${opt}/sunday-service-960.webp 960w`,
	'sunday-school': `${opt}/sunday-school-640.webp 640w, ${opt}/sunday-school-960.webp 960w`,
};

const FALLBACK: Record<string, string> = {
	'service-early': `${opt}/service-early-960.webp`,
	'sunday-service': `${opt}/sunday-service-960.webp`,
	'sunday-school': `${opt}/sunday-school-960.webp`,
};

const Services = () => {
	return (
		<section id="services">
			<div className="shell px-5 py-20 md:px-10 md:py-24">
				<Reveal>
					<SectionHeader
						eyebrow="Connecting People to God and Community"
						title="Sunday Services Schedule"
						sub="Join us for worship every Sunday at Corpus Christi"
					/>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="measure mt-12 grid gap-6 sm:grid-cols-3">
						{CARDS.map((card) => (
							<article
								key={card.title}
								className="rounded-base card-lift bg-paper flex flex-col overflow-hidden"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={FALLBACK[card.img]}
									srcSet={SRCSET[card.img]}
									sizes="(max-width: 640px) 100vw, 280px"
									alt={card.alt}
									loading="lazy"
									decoding="async"
									className="aspect-4/3 w-full object-cover"
								/>
								<div className="flex flex-1 flex-col p-6 text-center">
									<h3 className="font-display text-lg leading-snug">{card.title}</h3>
									<p className="text-muted mt-2 text-sm leading-relaxed">{card.detail}</p>
								</div>
							</article>
						))}
					</div>
				</Reveal>

				<Reveal delay={0.15}>
					<div className="mt-10 text-center">
						<a
							href={MAPS_URL}
							target="_blank"
							rel="noreferrer"
							className="text-ink ease-fluid inline-flex items-center gap-1.5 text-[0.9375rem] underline decoration-1 underline-offset-4 transition-opacity duration-300 hover:opacity-60"
						>
							482 De Bron Road, Garsfontein
							<ArrowUpRight strokeWidth={1.5} className="size-4" />
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
};

export default Services;
