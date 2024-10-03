'use client';
import Image from 'next/image';
import Map from '@/shared/components/map';
import { merriweather } from '@/shared/core/fonts';
import Link from 'next/link';
import { prefix } from '@/shared/core/prefix';

const ContactDetails = () => {
	const showInMapClicked = () => {
		window.open(
			'https://www.google.com/maps/place/Corpus+Christi+Anglican+Church/@-25.7961862,28.2931054,17z/data=!3m1!4b1!4m6!3m5!1s0x1e955ffb3657c89b:0x84e228c1cd662421!8m2!3d-25.7961862!4d28.2956857!16s%2Fg%2F11cs18f00p?entry=ttu',
		);
	};

	return (
		<div className="flex w-full flex-col space-y-2 p-4">
			<div>
				<p className={`${merriweather.className}`}>Address:</p>
				<p
					onClick={() => showInMapClicked()}
					className="transform cursor-pointer rounded-lg transition duration-200 ease-out hover:scale-[110%]"
				>
					482 De Bron Rd, Garsfontein, Pretoria, 0042
				</p>
			</div>
			<div>
				<p className={`${merriweather.className}`}>Phone: </p>
				<p
					onClick={() => window.open('tel:0129935161')}
					className="transform cursor-pointer rounded-lg transition duration-200 ease-out hover:scale-[110%]"
				>
					(012) 993 5161
				</p>
			</div>
			<div>
				<p className={`${merriweather.className}`}>Email:</p>
				<a href="mailto:garsfontein.acsa@gmail.com" target="_blank">
					<button className="transform cursor-pointer rounded-lg transition duration-200 ease-out hover:scale-[110%]">
						garsfontein.acsa@gmail.com
					</button>
				</a>
			</div>
		</div>
	);
};

const Socials = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center text-center">
			<div className="flex flex-col items-center">
				<Image
					src={`${prefix}/static/logo/logo_small.svg`}
					alt="Small Logo"
					className=""
					width={150}
					height={150}
				/>
				<p>Join us for worship every Sunday at Corpus Christi</p>
				<div className="flex justify-center">
					<Link href="">
						<Image
							src={`${prefix}/static/icons/instagram.svg`}
							alt="Instagram Image"
							width={20}
							height={0}
							className="m-3 transform cursor-pointer object-contain transition duration-200 ease-out hover:scale-110"
						/>
					</Link>
					<Link href="">
						<Image
							src={`${prefix}/static/icons/facebook.svg`}
							alt="Facebook Image"
							width={20}
							height={0}
							className="m-3 transform cursor-pointer object-contain transition duration-200 ease-out hover:scale-110"
						/>
					</Link>
					<Link href="">
						<Image
							src={`${prefix}/static/icons/whatsapp.svg`}
							alt="Whatsapp Image"
							width={20}
							height={0}
							className="m-3 transform cursor-pointer object-contain transition duration-200 ease-out hover:scale-110"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<footer id="Footer" className="bg-[#2B2B2B] p-4 text-center text-white">
			<div className="container flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-evenly">
				<ContactDetails />
				<Socials />
				<Map />
			</div>
			<hr className="my-4" />
			<p className="text-center sm:text-end">&copy; 2024 Corpus Christi Anglican Church </p>
		</footer>
	);
};

export default Footer;
