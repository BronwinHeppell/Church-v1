import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MAPS_URL, PARISH, SERVICE_TIMES } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

/**
 * Full-bleed typographic hero. The headline sits directly on the photograph at
 * the foot of the frame, and the two facts a visitor came for run along the
 * bottom edge as a rule of information rather than a floating card.
 *
 * The line reveal is CSS so the largest element on the page never waits for
 * hydration to become visible.
 */
const Hero = () => {
	const opt = `${prefix}/static/opt`;

	return (
		<section
			id="home"
			className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`${opt}/hero-1280.webp`}
				srcSet={`${opt}/hero-768.webp 768w, ${opt}/hero-1280.webp 1280w, ${opt}/hero-1920.webp 1920w`}
				sizes="100vw"
				width={1920}
				height={1280}
				alt="Corpus Christi Anglican Church in Garsfontein, Pretoria"
				fetchPriority="high"
				decoding="async"
				className="animate-ken-burns absolute inset-0 h-full w-full object-cover object-center"
			/>

			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_33_28/0.55)_0%,rgb(20_33_28/0.18)_38%,rgb(20_33_28/0.5)_72%,rgb(20_33_28/0.82)_100%)]"
			/>

			<div className="text-on-image shell relative px-5 pt-32 pb-10 md:px-10 md:pt-40 md:pb-12">
				{/*
				 * Marks the top of the hero's own text. The header watches this to know
				 * when to stop being transparent — see useLanded in the navbar. Without
				 * it the white headline scrolls behind a transparent header and tangles
				 * with the white wordmark.
				 */}
				<div id="hero-sentinel" aria-hidden className="h-px w-full" />

				<p
					className="font-ui animate-fade text-xs tracking-[0.2em] text-white/70 uppercase"
					style={{ animationDelay: '120ms' }}
				>
					Anglican Church &middot; {PARISH.suburb}, {PARISH.city}
				</p>

				<h1 className="font-display mt-7 text-[clamp(3rem,10.5vw,7.5rem)] leading-[0.94] tracking-[-0.035em]">
					<span className="block overflow-hidden pb-[0.06em]">
						<span className="animate-line block" style={{ animationDelay: '180ms' }}>
							Corpus Christi
						</span>
					</span>
					<span className="block overflow-hidden pb-[0.06em]">
						<span className="animate-line block" style={{ animationDelay: '290ms' }}>
							Anglican <em className="font-display italic">Church</em>
						</span>
					</span>
				</h1>

				<div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<p
						className="prose-body animate-rise max-w-[46ch] text-base text-white/80"
						style={{ animationDelay: '440ms' }}
					>
						Experience the love of God and the warmth of community. Join us for worship, fellowship,
						and spiritual growth.
					</p>

					<div
						className="animate-rise flex flex-wrap items-center gap-3"
						style={{ animationDelay: '520ms' }}
					>
						<Link
							href="#worship"
							className="font-ui bg-paper text-ink ease-fluid group rounded-base inline-flex h-12 items-center gap-3 pr-2.5 pl-6 text-[0.9375rem] transition-transform duration-500 hover:-translate-y-px active:scale-[0.98]"
						>
							Plan your visit
							<span className="bg-accent text-accent-ink ease-fluid flex size-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5">
								<ArrowRight strokeWidth={1.5} className="size-3.5" aria-hidden />
							</span>
						</Link>
						<Link
							href="#diary"
							className="font-ui ease-fluid rounded-base inline-flex h-12 items-center border border-white/45 px-6 text-[0.9375rem] backdrop-blur-sm transition-colors duration-500 hover:border-white/85 hover:bg-white/10"
						>
							Upcoming events
						</Link>
					</div>
				</div>
			</div>

			{/* A rule of information along the foot of the frame. */}
			<div
				className="text-on-image animate-fade relative border-t border-white/20"
				style={{ animationDelay: '640ms' }}
			>
				<dl className="shell font-ui grid grid-cols-1 divide-white/15 px-5 text-[0.8125rem] sm:grid-cols-3 sm:divide-x md:px-10">
					<div className="flex flex-col gap-1 py-4 sm:py-5 sm:pr-8">
						<dt className="text-[0.6875rem] tracking-[0.18em] text-white/55 uppercase">Services</dt>
						<dd className="numerals text-white/90">
							Sundays {SERVICE_TIMES[0]} and {SERVICE_TIMES[1]}
						</dd>
					</div>
					<div className="flex flex-col gap-1 border-t border-white/15 py-4 sm:border-t-0 sm:px-8 sm:py-5">
						<dt className="text-[0.6875rem] tracking-[0.18em] text-white/55 uppercase">Find us</dt>
						<dd>
							<a
								href={MAPS_URL}
								target="_blank"
								rel="noreferrer"
								className="rule-link text-white/90"
							>
								{PARISH.street}, {PARISH.suburb}
							</a>
						</dd>
					</div>
					<div className="flex flex-col gap-1 border-t border-white/15 py-4 sm:border-t-0 sm:py-5 sm:pl-8">
						<dt className="text-[0.6875rem] tracking-[0.18em] text-white/55 uppercase">Office</dt>
						<dd>
							<a href={PARISH.phoneHref} className="rule-link numerals text-white/90">
								{PARISH.phone}
							</a>
						</dd>
					</div>
				</dl>
			</div>
		</section>
	);
};

export default Hero;
