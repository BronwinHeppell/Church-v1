import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

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
				className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.85]"
			/>
			<Reveal mode="mount" className="relative mx-5 w-full max-w-[550px]">
				<div className="text-on-image rounded-[30px] border-2 border-white/85 px-7 py-9 text-center backdrop-blur-md backdrop-brightness-[0.5] sm:px-9">
					<h1 className="font-display text-[2rem] leading-[1.12] sm:text-[2.5rem]">
						Welcome to Corpus Christi Anglican Church
					</h1>
					<p className="prose-body mx-auto mt-5 text-base">
						Experience the love of God and the warmth of community. Join us for worship, fellowship,
						and spiritual growth.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<Button asChild className="group gap-2.5 pr-2">
							<Link href="#services">
								Plan your visit
								<span className="bg-accent-ink/15 ease-fluid flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
									<ArrowRight strokeWidth={1.5} className="size-3.5" aria-hidden />
								</span>
							</Link>
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
