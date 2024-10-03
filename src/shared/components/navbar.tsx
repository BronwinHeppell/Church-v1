'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MouseEventHandler, useState } from 'react';

type drawerProps = {
	isOpen: boolean;
	onClose: MouseEventHandler;
};

type NavProps = {
	onClick?: MouseEventHandler;
};

function MobileDrawer({ isOpen, onClose }: drawerProps) {
	return (
		<>
			<div className="cursor-pointer rounded-full p-3 hover:bg-gray-100" onClick={onClose}>
				<Image src="/static/icons/menu.svg" alt="Menu Image" className="" width={20} height={20} />
			</div>
			<main
				className={
					'fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out ' +
					(isOpen
						? ' translate-x-0 opacity-100 transition-opacity duration-500'
						: ' translate-x-full opacity-0 transition-all delay-500')
				}
			>
				<section
					className={
						'delay-400 absolute right-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out ' +
						(isOpen ? ' translate-x-0' : ' translate-x-full')
					}
				>
					<article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll pb-10">
						<Image
							src="/static/icons/close.svg"
							alt="Background Image"
							width={20}
							height={0}
							className="m-5 cursor-pointer object-contain"
							onClick={onClose}
						/>
						<NavItems onClick={onClose} />
					</article>
				</section>
			</main>
		</>
	);
}

function NavItems({ onClick }: NavProps) {
	const linkStyle = `cursor-pointer rounded-lg px-3 py-2 text-slate-800  hover:scale-[110%] hover:text-slate-900 transition transform duration-200 ease-out uppercase`;

	return (
		<div className="flex flex-col items-center justify-center space-y-2 text-sm uppercase sm:space-x-1 md:flex-row md:space-y-0">
			<Link href={'#services'}>
				<button className={linkStyle} onClick={onClick}>
					Services
				</button>
			</Link>
			<Link href={'#AboutUs'}>
				<button className={linkStyle} onClick={onClick}>
					About us
				</button>
			</Link>
			<Link href={'#Events'}>
				<button className={linkStyle} onClick={onClick}>
					Events
				</button>
			</Link>
			<Link href={'#faq'}>
				<button className={linkStyle} onClick={onClick}>
					FAQ
				</button>
			</Link>
			<Link href={'#Footer'}>
				<button className={linkStyle} onClick={onClick}>
					Contact us
				</button>
			</Link>
			<Link href={'/static/pdf/Banking_Details.pdf'} target="_blank">
				<p className={linkStyle} onClick={onClick}>
					Donate
				</p>
			</Link>
		</div>
	);
}
const Navbar = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-white px-4">
			<Image
				src="/static/logo/nav_logo.svg"
				alt="Background Image"
				width={160}
				height={0}
				className="cursor-pointer object-contain"
				onClick={() => window.scrollTo(0, 0)}
			/>
			<div className="hidden md:block">
				<NavItems />
			</div>

			<div className="md:hidden">
				<MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
			</div>
		</nav>
	);
};

export default Navbar;
