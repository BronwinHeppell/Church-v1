import React from 'react';
import Navbar from '@/shared/components/navbar';
import BackToTop from '@/shared/components/back-to-top';
import Hero from './sections/hero';
import Services from './sections/services';
import MissionStatement from './sections/mission-statement';
import AboutUs from './sections/about';
import Events from './sections/events';
import { FAQ } from './sections/faq';
import Footer from './sections/footer';
import { jsonLd } from '@/shared/core/jsonLd';

const Home: React.FC = () => {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Navbar />

			<main id="main">
				<Hero />
				<Services />
				<MissionStatement />
				<AboutUs />
				<Events />
				<FAQ />
			</main>

			<Footer />
			<BackToTop />
		</>
	);
};

export default Home;
