import type { Metadata } from 'next';
import { inter, newsreader } from '@/shared/core/fonts';
import { AuthProvider } from '@/admin/auth-context';
import './globals.css';

export const metadata: Metadata = {
	title: 'Corpus Christi Admin',
	description: 'Parish office tools for Corpus Christi Anglican Church.',
	// A private tool on a subdomain. It should never appear in a search result.
	robots: { index: false, follow: false, nocache: true },
	icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-ZA" className={`${newsreader.variable} ${inter.variable}`}>
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
