import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Copyable } from '@/shared/components/copyable';
import MapLazy from '@/shared/components/map-lazy';
import { PewLeafletFooterLink } from '@/shared/components/pew-leaflet';
import { Reveal } from '@/shared/components/reveal';
import { MAPS_URL, PARISH, SERVICE_TIMES } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

const labelClass = 'font-ui text-footer-ink text-xs tracking-[0.14em] uppercase';
const valueClass =
	'text-footer-muted ease-fluid transition-colors duration-500 hover:text-footer-ink';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer id="contact" className="bg-footer text-footer-ink">
			<h2 className="sr-only">Contact and visiting information</h2>

			<div className="shell px-5 py-16 md:px-10 md:py-20">
				<Reveal kind="fade">
					<div className="grid gap-14 md:grid-cols-[1fr_1fr_1.1fr] md:gap-12">
						<div>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${prefix}/static/opt/crest-320.webp`}
								alt="Corpus Christi Anglican Church"
								width={150}
								height={155}
								loading="lazy"
								decoding="async"
								className="w-[104px]"
							/>
							<p className="font-display mt-6 max-w-[20ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.02em]">
								Join us for worship every <em className="font-display italic">Sunday</em>.
							</p>
							<Link
								href="/static/pdf/Banking_Details.pdf"
								target="_blank"
								className="font-ui ease-fluid mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-xs tracking-[0.1em] uppercase transition-colors duration-500 hover:border-white/60 hover:bg-white/10"
							>
								Banking details
								<ArrowUpRight strokeWidth={1.5} className="size-3.5" aria-hidden />
							</Link>

							<PewLeafletFooterLink
								className={`rule-link mt-5 block text-[0.9375rem] ${valueClass}`}
							/>
						</div>

						<div className="space-y-8 text-[0.9375rem]">
							<div>
								<h3 className={labelClass}>Services</h3>
								<p className={`numerals mt-3 ${valueClass}`}>
									Sundays {SERVICE_TIMES[0]} and {SERVICE_TIMES[1]}
								</p>
							</div>

							<div>
								<h3 className={labelClass}>Address</h3>
								<a
									href={MAPS_URL}
									target="_blank"
									rel="noreferrer"
									className={`rule-link mt-3 inline-block ${valueClass}`}
								>
									{PARISH.street}, {PARISH.suburb}, {PARISH.city}, {PARISH.postalCode}
								</a>
							</div>

							<div>
								<h3 className={labelClass}>Phone</h3>
								<div className="mt-3 flex items-center gap-1">
									<a href={PARISH.phoneHref} className={`rule-link numerals ${valueClass}`}>
										{PARISH.phone}
									</a>
									<Copyable
										value={PARISH.phone}
										label="phone number"
										className="text-footer-muted"
									/>
								</div>
							</div>

							<div>
								<h3 className={labelClass}>Email</h3>
								<div className="mt-3 flex items-center gap-1">
									<a
										href={`mailto:${PARISH.email}`}
										className={`rule-link break-words ${valueClass}`}
									>
										{PARISH.email}
									</a>
									<Copyable
										value={PARISH.email}
										label="email address"
										className="text-footer-muted"
									/>
								</div>
							</div>
						</div>

						<div>
							<h3 className={`${labelClass} mb-4`}>Find us</h3>
							<MapLazy />
						</div>
					</div>
				</Reveal>
			</div>

			<div className="border-t border-white/10">
				<div className="shell px-5 py-6 md:px-10">
					<p className="text-footer-muted numerals text-center text-sm md:text-end">
						&copy; {year} {PARISH.name}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
