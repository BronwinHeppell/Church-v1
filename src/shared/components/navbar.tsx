"use client";
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
}

function MobileDrawer({ isOpen, onClose }: drawerProps) {
  return (
    <>
      <div className="cursor-pointer p-3 rounded-full hover:bg-gray-100" onClick={onClose}>
        <Image
          src="/assets/icons/menu.svg"
          alt="Menu Image"
          className=""
          width={20}
          height={20}
        />
      </div>
      <main
        className={
          " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <Image
              src="/assets/icons/close.svg"
              alt="Background Image"
              width={20}
              height={0}
              className='cursor-pointer m-5 object-contain'
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

  return (<div className="flex flex-col justify-center items-center space-y-2 md:space-y-0 md:flex-row sm:space-x-1  text-sm uppercase">
    <Link href={'#services'}>
      <button className={linkStyle} onClick={onClick}>Services</button>
    </Link>
    <Link href={'#AboutUs'}>
      <button className={linkStyle} onClick={onClick}>About us</button>
    </Link>
    <Link href={'#Events'}>
      <button className={linkStyle} onClick={onClick}>Events</button>
    </Link>
    <Link href={'#faq'}>
      <button className={linkStyle} onClick={onClick}>FAQ</button>
    </Link>
    <Link href={'#Footer'}>
      <button className={linkStyle} onClick={onClick}>Contact us</button>
    </Link>
    <Link href={'/assets/pdf/Banking_Details.pdf'} target='_blank'>
      <p className={linkStyle} onClick={onClick}>Donate</p>
    </Link>
  </div>)
}
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (
    <nav className="flex h-20 w-full items-center justify-between bg-white px-4 sticky top-0 z-50">
      <Image
        src="/assets/logo/nav_logo.svg"
        alt="Background Image"
        width={160}
        height={0}
        className='cursor-pointer object-contain'
        onClick={() => window.scrollTo(0, 0)}
      />
      <div className='hidden md:block'>
        <NavItems />
      </div>

      <div className='md:hidden'>
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
      </div>
    </nav>
  );
};

export default Navbar;
