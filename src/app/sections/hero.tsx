import Link from 'next/link';
import { Button } from '@/shared/components/button';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

/*
	The original hero: full-bleed photograph, centred text inside an outlined,
	blurred panel, now with the two calls to action the old one lacked.

	Contrast is the one thing done differently. backdrop-blur alone does not
	guarantee legibility, because a blurred bright photograph is still bright.
	So the panel carries a translucent scrim fill as well as the blur: a 30%
	scrim on the photograph plus a 50% fill on the panel puts the near-white
	type at 5.1:1 even over a pure white patch of the image, which clears
	WCAG AA. Neither value is decorative, so changing them changes contrast.

	Also min-h-[calc(100dvh-72px)] rather than the old h-[100vh], which made
	the section jump as mobile Safari showed and hid its address bar.

	The 30px panel radius is a deliberate exception to the 4px shape scale
	used everywhere else: it is the signature of this hero, and the hero is a
	single moment rather than part of the page's component rhythm.
*/
const Hero = () => {
	const opt = `${prefix}/static/opt`;

	return (
		<section
			id="home"
			className="relative flex min-h-[calc(100dvh-72px)] items-center justify-center overflow-hidden"
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
				className="absolute inset-0 h-full w-full object-cover object-center"
			/>
			<div className="absolute inset-0 bg-[rgb(var(--scrim)/0.30)]" aria-hidden />

			<Reveal mode="mount" className="relative mx-5 w-full max-w-[550px]">
				<div className="text-on-image rounded-[30px] border-2 border-white/85 bg-[rgb(var(--scrim)/0.50)] px-7 py-9 text-center backdrop-blur-sm sm:px-9">
					<h1 className="font-display text-[2rem] leading-[1.12] sm:text-[2.5rem]">
						Welcome to Corpus Christi Anglican Church
					</h1>
					<p className="prose-body mx-auto mt-5 text-base">
						Experience the love of God and the warmth of community. Join us for worship, fellowship,
						and spiritual growth.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<Button asChild>
							<Link href="#services">Plan your visit</Link>
						</Button>
						<Button asChild variant="onImage">
							<Link href="#Events">Upcoming events</Link>
						</Button>
					</div>
				</div>
			</Reveal>
		</section>
	);
};

export default Hero;
