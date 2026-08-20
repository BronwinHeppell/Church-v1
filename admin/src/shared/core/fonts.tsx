import { Inter, Newsreader } from 'next/font/google';

export const newsreader = Newsreader({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-newsreader',
});

export const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});
