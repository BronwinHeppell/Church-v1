import { Parallax } from '@/shared/components/editorial';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const Band = () => {
	const opt = `${prefix}/static/opt`;

	return (
		<section aria-labelledby="band-line" className="relative">
			<Parallax className="photo h-[62svh] min-h-[380px] w-full md:h-[78svh]" distance={110}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={`${opt}/fellowship-1280.webp`}
					srcSet={`${opt}/fellowship-1280.webp 1280w, ${opt}/fellowship-1920.webp 1920w`}
					sizes="100vw"
					alt="Parishioners gathered around a table for Bible study"
					loading="lazy"
					decoding="async"
					className="h-full w-full object-cover"
				/>
			</Parallax>

			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_33_28/0.34)_0%,rgb(20_33_28/0.18)_50%,rgb(20_33_28/0.6)_100%)]"
			/>

			<div className="absolute inset-0 flex items-end">
				<div className="shell text-on-image px-5 pb-12 md:px-10 md:pb-20">
					<Reveal kind="rise">
						<p
							id="band-line"
							className="font-display max-w-[30ch] text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.02em]"
						>
							A place to belong, <em className="font-display italic">before</em> a place to believe.
						</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default Band;
