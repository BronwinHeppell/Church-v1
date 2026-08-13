import { SectionTitle } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const AboutUs = () => {
	return (
		<section id="AboutUs">
			<div className="shell px-5 py-20 md:px-10 md:py-24">
				<div className="measure grid items-center gap-10 md:grid-cols-2 md:gap-14">
					<Reveal>
						<div className="rounded-base card-lift overflow-hidden">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${prefix}/static/opt/community-640.webp`}
								srcSet={`${prefix}/static/opt/community-640.webp 640w, ${prefix}/static/opt/community-1024.webp 1024w`}
								sizes="(max-width: 768px) 100vw, 430px"
								alt="Members of the parish together at a Corpus Christi gathering"
								loading="lazy"
								decoding="async"
								className="aspect-4/3 w-full object-cover"
							/>
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<SectionTitle className="max-w-[20ch]">
							Join Us for a Life-Changing Experience
						</SectionTitle>
						<p className="text-ink mt-5 text-[1.0625rem] leading-relaxed font-semibold">
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
