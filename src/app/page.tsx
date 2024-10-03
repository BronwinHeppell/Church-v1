import Navbar from '@/shared/components/navbar';
import Head from 'next/head';
import React from 'react';
import AboutUs from './sections/about';
import Events from './sections/events';
import { FAQ } from './sections/faq';
import Footer from './sections/footer';
import Hero from './sections/hero';
import MissionStatement from './sections/mission-statement';
import Services from './sections/services';

const Home: React.FC = () => {
	return (
		<>
			<Head>
				<title>Corpus Christi Anglican Church | Worship in [Garsfontein]</title>
				<meta
					name="description"
					content="Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein. We are a community of believers who are passionate about serving God and our neighbours."
				/>
				<meta name="keywords" content="Anglican Church, Garsfontein, Worship, Community Outreach" />
				<meta property="og:title" content="Corpus Christi Anglican Church" />
				<meta
					property="og:description"
					content="Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein."
				/>
				<meta property="og:image" content="/static/hero.jpg" />
				<meta name="twitter:title" content="Corpus Christi Anglican Church" />
				<meta
					name="twitter:description"
					content="Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein."
				/>
				<meta name="twitter:image" content="/static/hero.jpg" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Navbar />

			<Hero />

			<main className="mx-auto px-5 text-gray-800 md:max-w-4xl md:px-10">
				<Services />

				<MissionStatement />

				<AboutUs />

				<Events />

				<FAQ />
			</main>

			<Footer />
		</>
	);
};

export default Home;
