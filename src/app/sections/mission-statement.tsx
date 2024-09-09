import Image from "next/image";

const MissionStatement = () => {
  return (
    <section
      className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      id="MissionStatement"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sharing God&rsquo;s love and spreading the message
        </h2>
        <h3 className="text-1xl font-bold text-gray-800 mb-5 text-center">
          At Corpus Christi, we are dedicated to serving our community and
          nurturing a strong relationship with God. Join us in worship and
          fellowship.
        </h3>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
          <div>
            <Image
              src="/assets/cross.png"
              alt="Background Image"
              className="p-3"
              width={60}
              height={60}
            ></Image>
            <p className="font-bold mb-2">Our Mission</p>
            <p className="text-sm ">
              To inspire and empower individuals to live a Christ-centered life
              and make a positive impact.
            </p>
          </div>
          <div>
            <Image
              src="/assets/bible.png"
              alt="Background Image"
              className="p-3"
              width={60}
              height={60}
            ></Image>
            <p className="font-bold mb-2">Core Values</p>
            <p className="text-sm">
              Faith, Love, Compassion, Community and Service are at the heart of
              everything we do.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl">
        <Image
          src="/assets/Mission.jpg"
          alt="Background Image"
          className="rounded-lg shadow-md overflow-hidden"
          width={450}
          height={650}
        />
      </div>
    </section>
  );
};

export default MissionStatement;
