import { BookOpen, Cross, HandHeart } from 'lucide-react';
import { Lines, Parallax, Rail } from '@/shared/components/editorial';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const VALUES = [
	{
		Icon: Cross,
		title: 'Our Mission',
		body: 'To inspire and empower individuals to live a Christ-centered life and make a positive impact.',
	},
	{
		Icon: BookOpen,
		title: 'Core Values',
		body: 'Faith, Love, Compassion, Community and Service are at the heart of everything we do.',
	},
	{
		Icon: HandHeart,
		title: 'Our Community',
		body: 'Serving our neighbours in Garsfontein and nurturing a strong relationship with God.',
	},
];

const MissionStatement = () => {
	return (
		<section id="mission" className="bg-raised border-line border-y">
			<div className="shell px-5 py-28 md:px-10 md:py-40">
				<div className="grid gap-12 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-16">
					<Rail number="02" label="Mission" />

					<div>
						<div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
							<div>
								<Lines
									className="font-display max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em]"
									lines={[
										'Sharing God’s love',
										<>
											and <em className="font-display italic">spreading the message</em>
										</>,
									]}
								/>
								<Reveal kind="fade" delay={0.2}>
									<p className="prose-body text-muted mt-8 max-w-[52ch] text-base">
										At Corpus Christi, we are dedicated to serving our community and nurturing a
										strong relationship with God. Join us in worship and fellowship.
									</p>
								</Reveal>
							</div>

							<Reveal kind="veil" className="rounded-frame hidden xl:block">
								<Parallax className="photo aspect-3/4 w-full" distance={60}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`${prefix}/static/opt/mission-1280.webp`}
										srcSet={`${prefix}/static/opt/mission-768.webp 768w, ${prefix}/static/opt/mission-1280.webp 1280w`}
										sizes="352px"
										alt="Bread and a chalice laid out for communion"
										loading="lazy"
										decoding="async"
										className="h-full w-full object-cover"
									/>
								</Parallax>
							</Reveal>
						</div>

						{/* Values as an indexed list, not a grid of tiles. */}
						<RevealGroup className="border-line mt-20 border-t" stagger={0.12}>
							{VALUES.map(({ Icon, title, body }, i) => (
								<RevealItem key={title} className="border-line border-b">
									<div className="grid items-start gap-4 py-8 lg:grid-cols-[3rem_14rem_minmax(0,1fr)] lg:gap-10 lg:py-10">
										<p className="font-ui numerals text-muted text-[0.6875rem] tracking-[0.18em]">
											{String(i + 1).padStart(2, '0')}
										</p>
										<h3 className="font-display flex items-center gap-3 text-[1.375rem] leading-none">
											<Icon strokeWidth={1.25} aria-hidden className="text-accent size-5" />
											{title}
										</h3>
										<p className="text-muted max-w-[56ch] text-[0.9375rem] leading-relaxed">
											{body}
										</p>
									</div>
								</RevealItem>
							))}
						</RevealGroup>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionStatement;
