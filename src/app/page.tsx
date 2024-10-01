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
					name="Corpus Christi Anglican Church"
					content="Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Navbar />

			<Hero />

			<main className="mx-auto px-5 md:max-w-4xl md:px-10">
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
