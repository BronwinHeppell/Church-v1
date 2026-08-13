import Link from 'next/link';
import MapLazy from '@/shared/components/map-lazy';
import { Wordmark } from '@/shared/components/wordmark';
import { MAPS_URL, PARISH } from '@/shared/core/parish';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer id="Footer" className="bg-surface">
			<div className="shell px-5 py-16 md:px-10">
				<div className="grid gap-10 sm:grid-cols-2">
					<div>
						<Wordmark width={168} className="text-ink" />
						<p className="prose-body text-muted mt-5 text-base">
							An Anglican parish serving Garsfontein and the surrounding suburbs of Pretoria.
						</p>
						<Link
							href="/static/pdf/Banking_Details.pdf"
							target="_blank"
							className="font-ui text-accent mt-5 inline-block text-[0.9375rem] hover:underline"
						>
							Donate
						</Link>
					</div>

					<div className="font-ui flex flex-col gap-6 text-[0.9375rem]">
						<div>
							<h2 className="text-muted text-[0.8125rem] font-medium">Sunday services</h2>
							<p className="numerals text-ink mt-2">07:00 and 09:00</p>
							<p className="text-muted mt-1">Kids Sunday School every Sunday</p>
						</div>
						<div>
							<h2 className="text-muted text-[0.8125rem] font-medium">Contact</h2>
							<a
								href={PARISH.phoneHref}
								className="text-ink hover:text-accent ease-fluid mt-2 block transition-colors duration-300"
							>
								{PARISH.phone}
							</a>
							<a
								href={`mailto:${PARISH.email}`}
								className="text-ink hover:text-accent ease-fluid block break-words transition-colors duration-300"
							>
								{PARISH.email}
							</a>
						</div>
						<div>
							<h2 className="text-muted text-[0.8125rem] font-medium">Address</h2>
							<a
								href={MAPS_URL}
								target="_blank"
								rel="noreferrer"
								className="text-ink hover:text-accent ease-fluid mt-2 block transition-colors duration-300"
							>
								{PARISH.street}, {PARISH.suburb},
								<br />
								{PARISH.city}, {PARISH.postalCode}
							</a>
						</div>
					</div>
				</div>

				<div className="mt-10">
					<MapLazy />
				</div>
			</div>

			<div className="border-line shell border-t px-5 py-6">
				<p className="font-ui text-muted text-sm">
					&copy; {year} {PARISH.name}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
