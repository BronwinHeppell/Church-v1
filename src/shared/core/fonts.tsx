import { Inter, Newsreader } from 'next/font/google';

// Newsreader is variable (optical size + weight) and ships a real italic, which
// the section titles lean on. Merriweather was built for small-size body text
// and flattens out at display sizes.
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
