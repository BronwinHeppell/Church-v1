import { HeaderText } from '@/shared/components/headerText';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className="grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-2" id="AboutUs">
      <div className="rounded-xl">
        <Image
          src="/assets/hero.jpg"
          alt="About Us Image"
          className="overflow-hidden rounded-lg shadow-md"
          width={450}
          height={650}
        />
      </div>
      <div className="container mx-auto px-4">
        <HeaderText
          text=" Join Us for a Life- Changing Experience"
          className="mb-5 text-gray-800"
        />

        <p className="text-md mb-5 font-semibold text-gray-800">
          Joining Corpus Christi Church brings a multitude of benefits, both in terms of community
          and spirituality. Our church provides a welcoming and inclusive environment where you can
          connect with like-minded individuals and deepen your spiritual journey. Experience the
          power of collective worship, engage in meaningful conversations, and find support and
          guidance from our dedicated clergy and members.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
