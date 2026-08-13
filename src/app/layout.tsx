import type { Metadata, Viewport } from 'next';
import { ebGaramond, outfit } from '@/shared/core/fonts';
import './globals.css';

export const metadata: Metadata = {
	applicationName: 'Corpus Christi Anglican Church',
	title: 'Corpus Christi Anglican Church | Worship in Garsfontein, Pretoria',
	description:
		'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein. We are a community of believers who are passionate about serving God and our neighbours.',
	keywords: ['Anglican Church', 'Garsfontein', 'Worship', 'Community Outreach'],
	metadataBase: new URL('https://www.corpus-christi-garsfontein.org'),
	openGraph: {
		title: 'Corpus Christi Anglican Church',
		type: 'website',
		locale: 'en_ZA',
		siteName: 'Corpus Christi Anglican Church',
		description:
			'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein.',
		images: [
			{
				url: '/static/hero.jpg',
			},
		],
	},
	twitter: {
		title: 'Corpus Christi Anglican Church',
		description:
			'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein.',
		images: ['/static/hero.jpg'],
		card: 'summary_large_image',
	},
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
	},
	authors: [
		{
			name: 'Corpus Christi Anglican Church',
			url: 'https://www.corpus-christi-garsfontein.org',
		},
	],
	icons: {
		shortcut: [
			{
				url: '/favicon.ico',
				type: 'image/x-icon',
			},
		],
	},
	category: 'Worship',
	appleWebApp: {
		title: 'Corpus Christi Anglican Church',
		statusBarStyle: 'default',
		capable: true,
	},
};

/* Next 15+ requires viewport to be its own export, not a metadata key. */
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	/* Light only, by request: the page does not follow the device setting. */
	colorScheme: 'light',
	themeColor: '#f2f3ef',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${ebGaramond.variable} ${outfit.variable}`}>
			<head>
				<link rel="icon" href="/icon.ico" sizes="any" />
			</head>
			<body>
				{/*
					Keyboard users would otherwise have to tab through all six nav
					items and the donate link on every visit before reaching content.
					Visually hidden until it receives focus.

					z-index scale for the whole site: 50 sticky nav and mobile
					drawer, 60 the paper-grain overlay, 70 this skip link.
				*/}
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
