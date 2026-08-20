import { Em, Eyebrow, SectionTitle } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const AboutUs = () => {
	return (
		<section id="about" className="bg-raised border-line border-y">
			<div className="shell px-5 py-24 md:px-10 md:py-32">
				{/* Mirrors the mission split and inverts its weighting, so the two
				    two-column sections do not read as the same block twice. */}
				<div className="grid items-center gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
					<Reveal kind="veil" className="rounded-frame overflow-hidden">
						<div className="photo aspect-4/3 w-full">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${prefix}/static/opt/community-1024.webp`}
								srcSet={`${prefix}/static/opt/community-640.webp 640w, ${prefix}/static/opt/community-1024.webp 1024w, ${prefix}/static/opt/community-1400.webp 1400w`}
								sizes="(max-width: 768px) 100vw, 640px"
								alt="Members of the parish together at a Corpus Christi gathering"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<Eyebrow>Belonging</Eyebrow>
						<SectionTitle className="mt-4 max-w-[20ch]">
							Join us for a <Em>life-changing</Em> experience
						</SectionTitle>
						<p className="text-ink mt-6 text-[1.0625rem] leading-relaxed">
							Joining Corpus Christi Church brings a multitude of benefits, both in terms of
							community and spirituality.
						</p>
						<p className="text-muted mt-4 text-[1.0625rem] leading-relaxed">
							Our church provides a welcoming and inclusive environment where you can connect with
							like-minded individuals and deepen your spiritual journey. Experience the power of
							collective worship, engage in meaningful conversations, and find support and guidance
							from our dedicated clergy and members.
						</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
