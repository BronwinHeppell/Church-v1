import { SectionTitle } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

/*
	A single contained photograph above the copy. The previous overlapping
	image pair needed a wide grid to work; inside a 700px column the two
	images would have been too small to read, so this is one image at full
	column width instead.

	The source is Youthfel.jpg rather than the old Church_Inside.png: that
	file is only 375x500 and rendered soft, and a photograph of parish life
	suits copy about a welcoming community better than an empty interior.
*/
const AboutUs = () => {
	return (
		<section id="AboutUs" className="border-line border-b">
			<div className="shell px-5 py-20 md:py-24">
				<Reveal>
					<div className="rounded-base overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`${prefix}/static/opt/community-1024.webp`}
							srcSet={`${prefix}/static/opt/community-640.webp 640w, ${prefix}/static/opt/community-1024.webp 1024w`}
							sizes="(max-width: 700px) 100vw, 660px"
							alt="Members of the parish together at a Corpus Christi gathering"
							loading="lazy"
							decoding="async"
							className="aspect-3/2 w-full object-cover"
						/>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<SectionTitle className="mt-10">Join us for a life-changing experience</SectionTitle>
					<p className="prose-body text-ink mt-6">
						Joining Corpus Christi Church brings a multitude of benefits, both in terms of community
						and spirituality.
					</p>
					<p className="prose-body text-muted mt-5">
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
