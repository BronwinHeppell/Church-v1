'use client';
import Image from 'next/image';
import Map from '@/shared/components/map';
import { merriweather } from '@/shared/core/fonts';
import Link from 'next/link';

const ContactDetails = () => {
  const showInMapClicked = () => {
    window.open(
      'https://www.google.com/maps/place/Corpus+Christi+Anglican+Church/@-25.7961862,28.2931054,17z/data=!3m1!4b1!4m6!3m5!1s0x1e955ffb3657c89b:0x84e228c1cd662421!8m2!3d-25.7961862!4d28.2956857!16s%2Fg%2F11cs18f00p?entry=ttu',
    );
  };

  return (
    <div className="w-full p-4 flex flex-col space-y-2">
      <div>
        <p className={`${merriweather.className}`}>Address:</p>
        <p onClick={() => showInMapClicked()} className="cursor-pointer rounded-lg hover:scale-[110%] transition transform duration-200 ease-out">
          482 De Bron Rd, Garsfontein, Pretoria, 0042
        </p>
      </div>
      <div>
        <p className={`${merriweather.className}`}>Phone: </p>
        <p onClick={() => window.open('tel:0129935161')} className="cursor-pointer rounded-lg hover:scale-[110%] transition transform duration-200 ease-out">
          (012) 993 5161</p>
      </div>
      <div>
        <p className={`${merriweather.className}`}>Email:</p>
        <a href='mailto:garsfontein.acsa@gmail.com' target="_blank"
        >
          <button className="cursor-pointer rounded-lg hover:scale-[110%] transition transform duration-200 ease-out">
            garsfontein.acsa@gmail.com
          </button>
        </a>
      </div >
    </div >
  )
}

const Socials = () => {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <Image
          src="assets/logo/logo_small.svg"
          alt="Small Logo"
          className=""
          width={150}
          height={150}
        />
        <p>Join us for worship every Sunday at Corpus Christi</p>
        <div className='flex justify-center'>
          <Link href="">
            <Image
              src="/assets/icons/instagram.svg"
              alt="Instagram Image"
              width={20}
              height={0}
              className='cursor-pointer m-3 object-contain hover:scale-110 transition transform duration-200 ease-out'
            /></Link>
          <Link href="">
            <Image
              src="/assets/icons/facebook.svg"
              alt="Facebook Image"
              width={20}
              height={0}
              className='cursor-pointer m-3 object-contain hover:scale-110 transition transform duration-200 ease-out'
            /></Link>
          <Link href="">
            <Image
              src="/assets/icons/whatsapp.svg"
              alt="Whatsapp Image"
              width={20}
              height={0}
              className='cursor-pointer m-3 object-contain hover:scale-110 transition transform duration-200 ease-out'
            /></Link>
        </div>
      </div>
    </div>
  );
}



const Footer = () => {
  return (
    <footer id="Footer" className="bg-[#2B2B2B] p-4 text-center text-white">
      <div className="container flex flex-col gap-4 items-center justify-center sm:flex-row sm:justify-evenly">
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
