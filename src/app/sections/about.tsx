import Image from "next/image";

const AboutUs = () => {
  return (
    <section
      className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center "
      id="AboutUs"
    >
      <div className="rounded-xl">
        <Image
          src="/assets/hero.jpg"
          alt="Background Image"
          className="rounded-lg shadow-md overflow-hidden"
          width={450}
          height={650}
        />
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Join Us for a Life- Changing Experience
        </h2>
        <h3 className="text-1xl font-bold text-gray-800 mb-5 text-center">
          Joining Corpus Christi Church brings a multitude of benefits, both in
          terms of community and spirituality. Our church provides a welcoming
          and inclusive environment where you can connect with like-minded
          individuals and deepen your spiritual journey. Experience the power of
          collective worship, engage in meaningful conversations, and find
          support and guidance from our dedicated clergy and members.
        </h3>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-2"></div>
      </div>
    </section>
  );
};

export default AboutUs;
