import React from 'react';
import Image from 'next/image';
import { HeaderText } from '@/shared/components/headerText';
import { prefix } from '@/shared/core/prefix';

const Hero = () => {
	return (
		<div
			className="relative flex h-[100vh] w-full items-center justify-center text-white sm:h-[780px]"
			id="home"
		>
			<div className="absolute inset-0">
				<Image
					src={`${prefix}/static/hero.jpg`}
					alt="Background Image"
					className="h-full w-full object-cover object-center brightness-[0.85]"
					width={0}
					height={0}
					fill
				/>
			</div>
			<div className="absolute m-auto mx-4 max-w-[550px] space-y-4 rounded-[30px] border-2 border-white px-8 py-8 text-center backdrop-blur-sm">
				<HeaderText text="Welcome to Corpus Christi Anglican Church" />
				<p className="text-base">
					Experience the love of God and the warmth of community at Corpus Christi Anglican Church.
					Join us for worship, fellowship, and spiritual growth.
				</p>
			</div>
		</div>
	);
};
export default Hero;
