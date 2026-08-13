import Link from 'next/link';
import MapLazy from '@/shared/components/map-lazy';
import { MAPS_URL, PARISH } from '@/shared/core/parish';
import { prefix } from '@/shared/core/prefix';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer id="Footer" className="bg-footer text-footer-ink">
			<div className="shell px-5 py-14 md:px-10">
				<div className="grid items-center gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left">
					<div className="text-[0.9375rem]">
						<div>
							<h2 className="font-display text-base">Address</h2>
							<a
								href={MAPS_URL}
								target="_blank"
								rel="noreferrer"
								className="text-footer-muted ease-fluid mt-1 inline-block transition-opacity duration-300 hover:opacity-70"
							>
								{PARISH.street}, {PARISH.suburb}, {PARISH.city}, {PARISH.postalCode}
							</a>
						</div>
						<div className="mt-5">
							<h2 className="font-display text-base">Phone</h2>
							<a
								href={PARISH.phoneHref}
								className="text-footer-muted ease-fluid mt-1 inline-block transition-opacity duration-300 hover:opacity-70"
							>
								{PARISH.phone}
							</a>
						</div>
						<div className="mt-5">
							<h2 className="font-display text-base">Email</h2>
							<a
								href={`mailto:${PARISH.email}`}
								className="text-footer-muted ease-fluid mt-1 inline-block break-words transition-opacity duration-300 hover:opacity-70"
							>
								{PARISH.email}
							</a>
						</div>
					</div>

					<div className="flex flex-col items-center text-center">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`${prefix}/static/opt/crest-320.webp`}
							alt="Corpus Christi Anglican Church"
							width={150}
							height={155}
							loading="lazy"
							decoding="async"
							className="w-[130px]"
						/>
						<p className="text-footer-muted mt-3 text-sm">
							Join us for worship every Sunday at Corpus Christi
						</p>
						<Link
							href="/static/pdf/Banking_Details.pdf"
							target="_blank"
							className="ease-fluid mt-4 inline-block rounded-full bg-white/10 px-5 py-2 text-sm transition-colors duration-300 hover:bg-white/20 active:scale-[0.98]"
						>
							Donate
						</Link>
					</div>

					<div>
						<MapLazy />
					</div>
				</div>
			</div>

			<div className="border-t border-white/10">
				<div className="shell px-5 py-5 md:px-10">
					<p className="text-footer-muted text-center text-sm md:text-end">
						&copy; {year} {PARISH.name}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
