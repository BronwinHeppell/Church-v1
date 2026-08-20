import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { PARISH, SERVICE_TIMES } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

const Hero = () => {
	const opt = `${prefix}/static/opt`;

	return (
		<section
			id="home"
			className="relative flex min-h-[calc(100dvh-88px)] items-center justify-center overflow-hidden"
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

			{/* A graded scrim rather than a flat brightness cut, so contrast is
			    guaranteed behind the text without dulling the whole photograph. */}
			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_33_28/0.32)_0%,rgb(20_33_28/0.18)_45%,rgb(20_33_28/0.55)_100%)]"
			/>

			{/*
			 * The entrance is CSS, not JS. The old version rendered the headline at
			 * opacity 0 and waited for the motion bundle to hydrate, which meant the
			 * LCP element was blank on slow connections.
			 */}
			<div className="relative mx-5 w-full max-w-[620px]">
				<div className="text-on-image animate-fade rounded-[30px] border border-white/55 px-7 py-10 text-center backdrop-blur-md backdrop-brightness-[0.55] sm:px-10 sm:py-12">
					<h1 className="font-display text-title animate-rise" style={{ animationDelay: '80ms' }}>
						Welcome to Corpus Christi <em className="font-display italic">Anglican Church</em>
					</h1>
					<p
						className="prose-body animate-rise mx-auto mt-5 text-base text-white/85"
						style={{ animationDelay: '180ms' }}
					>
						Experience the love of God and the warmth of community. Join us for worship, fellowship,
						and spiritual growth.
					</p>

					<div
						className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3"
						style={{ animationDelay: '280ms' }}
					>
						<Button asChild className="group gap-2.5 pr-2">
							<Link href="#services">
								Plan your visit
								<span className="bg-accent-ink/20 ease-fluid flex size-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-105">
									<ArrowRight strokeWidth={1.5} className="size-3.5" aria-hidden />
								</span>
							</Link>
						</Button>
						<Button asChild variant="onImage">
							<Link href="#events">Upcoming events</Link>
						</Button>
					</div>

					{/* The two facts a first-time visitor is actually here for. */}
					<div
						className="animate-rise mt-9 border-t border-white/25 pt-6"
						style={{ animationDelay: '380ms' }}
					>
						<dl className="font-ui flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.8125rem] text-white/80">
							<dt className="sr-only">Service times</dt>
							<dd className="numerals tracking-[0.06em]">
								Sundays {SERVICE_TIMES[0]} &amp; {SERVICE_TIMES[1]}
							</dd>
							<span aria-hidden className="text-white/40">
								&middot;
							</span>
							<dt className="sr-only">Address</dt>
							<dd>
								{PARISH.street}, {PARISH.suburb}
							</dd>
						</dl>
					</div>
				</div>
			</div>

			<Link
				href="#services"
				aria-label="Scroll to Sunday services"
				className="animate-fade absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
				style={{ animationDelay: '700ms' }}
			>
				<span aria-hidden className="block h-10 w-px overflow-hidden bg-white/30">
					<span className="animate-trickle block h-4 w-px bg-white/90" />
				</span>
			</Link>
		</section>
	);
};

export default Hero;
