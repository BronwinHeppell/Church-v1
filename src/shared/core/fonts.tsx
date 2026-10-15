import { EB_Garamond, Montserrat } from 'next/font/google';

export const ebGaramond = EB_Garamond({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-eb-garamond',
});

export const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});
