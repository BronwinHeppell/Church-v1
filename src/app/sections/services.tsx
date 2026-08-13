import { ArrowUpRight } from 'lucide-react';
import { SectionTitle, Lede } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { MAPS_URL } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

/*
	The card layout from the original site, rebuilt on the current palette.
	Three services, each with a photograph, title and one line of detail.

	It is a scroll-snap row on phones rather than a JS carousel: it swipes the
	same way, but embla-carousel-react does not need to come back as a
	dependency. On sm and up it is a plain three column grid.

	Shadows are tinted with the scrim channels rather than pure black, which
	on a warm sage paper is the difference between depth and grime.
*/
type ServiceCard = {
	title: string;
	detail: string;
	img: string;
	alt: string;
};

const CARDS: ServiceCard[] = [
	{
		title: 'Sunday service, 07:00',
		detail: 'Our earlier Sunday morning service.',
		img: 'service-early',
		alt: 'The congregation at the early Sunday morning service',
	},
	{
		title: 'Sunday service, 09:00',
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
	'service-early': `${prefix}/static/opt/service-early-320.webp 320w, ${prefix}/static/opt/service-early-640.webp 640w`,
	'sunday-service': `${prefix}/static/opt/sunday-service-320.webp 320w, ${prefix}/static/opt/sunday-service-480.webp 480w`,
	'sunday-school': `${prefix}/static/opt/sunday-school-320.webp 320w, ${prefix}/static/opt/sunday-school-640.webp 640w`,
};

const FALLBACK: Record<string, string> = {
	'service-early': `${prefix}/static/opt/service-early-640.webp`,
	'sunday-service': `${prefix}/static/opt/sunday-service-480.webp`,
	'sunday-school': `${prefix}/static/opt/sunday-school-640.webp`,
};

const Services = () => {
	return (
		<section id="services" className="border-line border-b">
			<div className="shell px-5 py-20 md:py-24">
				<Reveal>
					<SectionTitle>Sunday at Corpus Christi</SectionTitle>
					<Lede className="mt-5">
						Our services are open to everyone. You will find us at 482 De Bron Road, Garsfontein.
					</Lede>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
						{CARDS.map((card) => (
							<article
								key={card.title}
								className="rounded-base border-line bg-surface w-[74%] shrink-0 snap-start overflow-hidden border shadow-[0_1px_2px_rgb(var(--scrim)/0.04),0_10px_24px_-14px_rgb(var(--scrim)/0.12)] sm:w-auto"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={FALLBACK[card.img]}
									srcSet={SRCSET[card.img]}
									sizes="(max-width: 640px) 74vw, 215px"
									alt={card.alt}
									loading="lazy"
									decoding="async"
									className="aspect-4/3 w-full object-cover"
								/>
								<div className="p-4">
									<h3 className="font-display numerals text-lg leading-snug">{card.title}</h3>
									<p className="font-ui text-muted mt-1.5 text-sm">{card.detail}</p>
								</div>
							</article>
						))}
					</div>
				</Reveal>

				<Reveal delay={0.15}>
					<a
						href={MAPS_URL}
						target="_blank"
						rel="noreferrer"
						className="font-ui text-accent mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] hover:underline"
					>
						Get directions
						<ArrowUpRight strokeWidth={1.5} className="size-4" />
					</a>
				</Reveal>
			</div>
		</section>
	);
};

export default Services;
