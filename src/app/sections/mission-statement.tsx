import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const MissionStatement = () => {
	return (
		<section id="MissionStatement" className="border-line border-b">
			<div className="shell px-5 py-20 md:py-24">
				<Reveal>
					<h2 className="font-display max-w-[26ch] text-[2rem] leading-[1.12] md:text-[2.5rem]">
						Sharing God’s love and spreading the message
					</h2>
					<p className="prose-body text-muted mt-6">
						At Corpus Christi, we are dedicated to serving our community and nurturing a strong
						relationship with God. Join us in worship and fellowship.
					</p>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="rounded-base relative mt-10 overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`${prefix}/static/opt/mission-768.webp`}
							srcSet={`${prefix}/static/opt/mission-768.webp 768w, ${prefix}/static/opt/mission-1280.webp 1280w`}
							sizes="(max-width: 700px) 100vw, 660px"
							alt="Members of the Corpus Christi congregation gathered together"
							loading="lazy"
							decoding="async"
							className="aspect-16/10 w-full object-cover"
						/>
					</div>
				</Reveal>

				<Reveal delay={0.15}>
					<div className="mt-10 grid gap-8 sm:grid-cols-2">
						<div className="border-line border-t pt-5">
							<h3 className="font-ui text-ink text-[0.9375rem] font-medium">Our mission</h3>
							<p className="prose-body text-muted mt-3 text-base">
								To inspire and empower individuals to live a Christ-centered life and make a
								positive impact.
							</p>
						</div>
						<div className="border-line border-t pt-5">
							<h3 className="font-ui text-ink text-[0.9375rem] font-medium">Core values</h3>
							<p className="prose-body text-muted mt-3 text-base">
								Faith, Love, Compassion, Community and Service are at the heart of everything we do.
							</p>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
};

export default MissionStatement;
