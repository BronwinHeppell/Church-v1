import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/shared/components/button';
import { Wordmark } from '@/shared/components/wordmark';
import { MAPS_URL, PARISH } from '@/shared/core/parish';

export const metadata: Metadata = {
	title: 'Page not found | Corpus Christi Anglican Church',
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<main className="shell flex min-h-[100dvh] flex-col px-5 py-10">
			<Link href="/" aria-label="Corpus Christi Anglican Church, home">
				<Wordmark width={158} className="text-ink" />
			</Link>

			<div className="flex flex-1 flex-col justify-center py-16">
				<p className="font-ui text-muted numerals text-sm">Error 404</p>
				<h1 className="font-display mt-3 max-w-[22ch] text-4xl leading-[1.1] md:text-6xl">
					We could not find that page
				</h1>
				<p className="prose-body text-muted mt-6">
					The page may have moved, or the link you followed may be out of date. Everything on the
					site is reachable from the home page.
				</p>

				<div className="mt-9 flex flex-wrap items-center gap-3">
					<Button asChild size="lg">
						<Link href="/">Back to the home page</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link href="/#services">Sunday service times</Link>
					</Button>
				</div>

				<div className="border-line mt-14 grid gap-6 border-t pt-8 sm:grid-cols-3">
					<div>
						<h2 className="font-ui text-muted text-[0.8125rem] font-medium">Sunday services</h2>
						<p className="numerals text-ink font-ui mt-2 text-[0.9375rem]">07:00 and 09:00</p>
					</div>
					<div>
						<h2 className="font-ui text-muted text-[0.8125rem] font-medium">Contact</h2>
						<a
							href={PARISH.phoneHref}
							className="font-ui text-ink hover:text-accent ease-fluid mt-2 block text-[0.9375rem] transition-colors duration-300"
						>
							{PARISH.phone}
						</a>
						<a
							href={`mailto:${PARISH.email}`}
							className="font-ui text-ink hover:text-accent ease-fluid block text-[0.9375rem] break-words transition-colors duration-300"
						>
							{PARISH.email}
						</a>
					</div>
					<div>
						<h2 className="font-ui text-muted text-[0.8125rem] font-medium">Address</h2>
						<a
							href={MAPS_URL}
							target="_blank"
							rel="noreferrer"
							className="font-ui text-ink hover:text-accent ease-fluid mt-2 block text-[0.9375rem] transition-colors duration-300"
						>
							{PARISH.street}, {PARISH.suburb}
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
