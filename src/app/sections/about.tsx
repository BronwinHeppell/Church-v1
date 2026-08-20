import { Lines, Parallax, Rail } from '@/shared/components/editorial';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';
import React from 'react';

/**
 * The image runs flush to the edge of the viewport rather than sitting in a
 * column, and the text half keeps its left edge aligned to the shell so the
 * page grid still holds: the column is half the client width, so
 * max(0, 100% - 37.5rem) + 2.5rem reproduces the shell gutter exactly. Using
 * 100vw here would be 32px out, because vw includes the scrollbar.
 */
const AboutUs = () => {
	return (
		<section id="belonging" className="border-line border-b">
			<div className="grid lg:grid-cols-2">
				<div className="flex items-center px-5 py-20 md:px-10 md:py-32 lg:pr-16 lg:pl-[calc(max(0px,100%_-_37.5rem)_+_2.5rem)]">
					<div>
						<Rail number="03" label="Belonging" className="md:static" />

						<Lines
							className="font-display mt-6 max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em]"
							lines={[
								'Join us for a',
								<React.Fragment key="aboutDesc">
									<em className="font-display italic">life-changing</em> experience
								</React.Fragment>,
							]}
						/>

						<Reveal kind="fade" delay={0.2}>
							<p className="text-ink mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed">
								Joining Corpus Christi Church brings a multitude of benefits, both in terms of
								community and spirituality.
							</p>
							<p className="text-muted mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed">
								Our church provides a welcoming and inclusive environment where you can connect with
								like-minded individuals and deepen your spiritual journey. Experience the power of
								collective worship, engage in meaningful conversations, and find support and
								guidance from our dedicated clergy and members.
							</p>
						</Reveal>
					</div>
				</div>

				<Parallax className="photo min-h-[60svh] lg:min-h-full" distance={90}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={`${prefix}/static/opt/community-1024.webp`}
						srcSet={`${prefix}/static/opt/community-640.webp 640w, ${prefix}/static/opt/community-1024.webp 1024w, ${prefix}/static/opt/community-1400.webp 1400w`}
						sizes="(max-width: 1024px) 100vw, 50vw"
						alt="Members of the parish together at a Corpus Christi gathering"
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover"
					/>
				</Parallax>
			</div>
		</section>
	);
};

export default AboutUs;
