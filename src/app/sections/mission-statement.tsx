import { SectionTitle } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { prefix } from '@/shared/core/prefix';

const VALUES = [
	{
		icon: 'cross.png',
		alt: '',
		title: 'Our Mission',
		body: 'To inspire and empower individuals to live a Christ-centered life and make a positive impact.',
	},
	{
		icon: 'bible.png',
		alt: '',
		title: 'Core Values',
		body: 'Faith, Love, Compassion, Community and Service are at the heart of everything we do.',
	},
];

const MissionStatement = () => {
	return (
		<section id="MissionStatement">
			<div className="shell px-5 py-20 md:px-10 md:py-24">
				<div className="measure grid items-center gap-10 md:grid-cols-2 md:gap-14">
					<Reveal>
						<SectionTitle className="max-w-[22ch]">
							Sharing God’s love and spreading the message
						</SectionTitle>
						<p className="text-ink mt-5 text-[1.0625rem] leading-relaxed font-semibold">
							At Corpus Christi, we are dedicated to serving our community and nurturing a strong
							relationship with God. Join us in worship and fellowship.
						</p>

						<div className="mt-8 grid gap-7 sm:grid-cols-2">
							{VALUES.map((v) => (
								<div key={v.title}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`${prefix}/static/${v.icon}`}
										alt={v.alt}
										width={36}
										height={36}
										loading="lazy"
										decoding="async"
										className="size-9"
									/>
									<h3 className="font-ui text-ink mt-3 text-sm font-bold">{v.title}</h3>
									<p className="text-muted mt-1.5 text-sm leading-relaxed">{v.body}</p>
								</div>
							))}
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<div className="rounded-base card-lift overflow-hidden">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${prefix}/static/opt/mission-768.webp`}
								srcSet={`${prefix}/static/opt/mission-768.webp 768w, ${prefix}/static/opt/mission-1280.webp 1280w`}
								sizes="(max-width: 768px) 100vw, 430px"
								alt="Bread and a chalice laid out for communion"
								loading="lazy"
								decoding="async"
								className="aspect-4/3 w-full object-cover"
							/>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default MissionStatement;
