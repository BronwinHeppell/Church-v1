import Navbar from '@/shared/components/navbar';
import React from 'react';
import AboutUs from './sections/about';
import Events from './sections/events';
import { FAQ } from './sections/faq';
import Footer from './sections/footer';
import Hero from './sections/hero';
import MissionStatement from './sections/mission-statement';
import Services from './sections/services';
import { jsonLd } from '@/shared/core/jsonLd';

const Home: React.FC = () => {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
