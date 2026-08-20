import { BookOpen, Cross } from 'lucide-react';
import { Em, Eyebrow, SectionTitle } from '@/shared/components/heading';
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
];

const MissionStatement = () => {
	return (
		<section id="mission">
			<div className="shell px-5 py-24 md:px-10 md:py-28">
				{/* Asymmetric 5/7 split rather than a centred half-and-half, which is
				    what makes the old layout read as a template. */}
				<div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
					<div>
						<Reveal>
							<Eyebrow>Who we are</Eyebrow>
							<SectionTitle className="mt-4 max-w-[22ch]">
								Sharing God&rsquo;s love and <Em>spreading the message</Em>
							</SectionTitle>
							<p className="text-ink mt-6 text-[1.0625rem] leading-relaxed">
								At Corpus Christi, we are dedicated to serving our community and nurturing a strong
								relationship with God. Join us in worship and fellowship.
							</p>
						</Reveal>

						<RevealGroup className="mt-10 grid gap-8 sm:grid-cols-2" stagger={0.12}>
							{VALUES.map(({ Icon, title, body }) => (
								<RevealItem key={title}>
									<Icon strokeWidth={1.25} aria-hidden className="text-accent size-7" />
									<h3 className="font-ui text-ink mt-4 text-xs tracking-[0.14em] uppercase">
										{title}
									</h3>
									<p className="text-muted mt-3 text-[0.9375rem] leading-relaxed">{body}</p>
								</RevealItem>
							))}
						</RevealGroup>
					</div>

					<Reveal kind="veil" className="rounded-frame overflow-hidden">
						<div className="photo aspect-4/3 w-full">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${prefix}/static/opt/mission-1280.webp`}
								srcSet={`${prefix}/static/opt/mission-768.webp 768w, ${prefix}/static/opt/mission-1280.webp 1280w`}
								sizes="(max-width: 768px) 100vw, 640px"
								alt="Bread and a chalice laid out for communion"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default MissionStatement;
