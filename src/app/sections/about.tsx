import { SectionTitle } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const AboutUs = () => {
	return (
		<section id="AboutUs" className="border-line border-b">
			<div className="shell grid gap-8 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10 md:py-24">
				<Reveal>
					<div className="rounded-base overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`${prefix}/static/opt/community-640.webp`}
							srcSet={`${prefix}/static/opt/community-640.webp 640w, ${prefix}/static/opt/community-1024.webp 1024w`}
							sizes="(max-width: 768px) 100vw, 320px"
							alt="Members of the parish together at a Corpus Christi gathering"
							loading="lazy"
							decoding="async"
							className="aspect-3/2 w-full object-cover md:aspect-4/5"
						/>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<SectionTitle>Join us for a life-changing experience</SectionTitle>
					<p className="prose-body text-ink mt-5">
						Joining Corpus Christi Church brings a multitude of benefits, both in terms of community
						and spirituality.
					</p>
					<p className="prose-body text-muted mt-4">
						Our church provides a welcoming and inclusive environment where you can connect with
						like-minded individuals and deepen your spiritual journey. Experience the power of
						collective worship, engage in meaningful conversations, and find support and guidance
						from our dedicated clergy and members.
					</p>
				</Reveal>
			</div>
		</section>
	);
};

export default AboutUs;
