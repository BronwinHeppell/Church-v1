import type { Metadata, Viewport } from 'next';
import { inter, newsreader } from '@/shared/core/fonts';
import { PARISH } from '@/shared/core/parish';
import './globals.css';

const DESCRIPTION =
	'Corpus Christi Anglican Church in Garsfontein, Pretoria. Sunday services at 07:00 and 09:00, with Sunday School for children. Everyone is welcome.';

export const metadata: Metadata = {
	applicationName: PARISH.name,
	title: `${PARISH.name} | Worship in ${PARISH.suburb}, ${PARISH.city}`,
	description: DESCRIPTION,
	metadataBase: new URL(PARISH.url),

	// Without a canonical, the trailing-slash and www variants of this page can
	// be treated as separate URLs.
	alternates: {
		canonical: '/',
	},

	openGraph: {
		title: PARISH.name,
		type: 'website',
		locale: 'en_ZA',
		url: '/',
		siteName: PARISH.name,
		description: DESCRIPTION,
		images: [
			{
				url: '/og.jpg',
				width: 1200,
				height: 630,
				type: 'image/jpeg',
				alt: `${PARISH.name}, ${PARISH.street}, ${PARISH.suburb}`,
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: PARISH.name,
		description: DESCRIPTION,
		images: ['/og.jpg'],
	},

	/*
	 * Google looks for a search-result favicon that is 48px square or a multiple
	 * of it, and it also probes /favicon.ico directly. The previous set declared
	 * a shortcut at /favicon.ico that did not exist, so the only usable icon was
	 * the 48px frame inside the ICO.
	 */
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
			{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
		shortcut: ['/favicon.ico'],
	},

	manifest: '/manifest.webmanifest',

	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
	},

	authors: [{ name: PARISH.name, url: PARISH.url }],
	category: 'Worship',
	appleWebApp: {
		title: 'Corpus Christi',
		statusBarStyle: 'default',
		capable: true,
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	colorScheme: 'light',
	themeColor: '#fbfaf7',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-ZA" className={`${newsreader.variable} ${inter.variable}`}>
			<body>
				<a
					href="#main"
					className="focus:rounded-base focus:bg-accent focus:text-accent-ink sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2"
				>
					Skip to content
				</a>
				{children}
			</body>
		</html>
	);
}
