import { HeaderText, SubHeaderText } from '@/shared/components/headerText';
import Image from 'next/image';

const MissionStatement = () => {
  return (
    <section
      className="grid grid-cols-1 items-center gap-8 py-10 text-left md:grid-cols-2"
      id="MissionStatement"
    >
      <div className="container mx-auto space-y-5 px-4">
        <HeaderText
          text="Sharing God&rsquo;s love and spreading the message"
        />

        <p className="text-md font-semibold">
          At Corpus Christi, we are dedicated to serving our community and nurturing a strong
          relationship with God. Join us in worship and fellowship.
        </p>

        <div className="flex flex-col space-x-0 md:flex-row md:space-x-2">
          <div>
            <Image
              src="/assets/cross.png"
              alt="Cross Image"
              className="p-3"
              width={60}
              height={60}
            ></Image>
            <SubHeaderText text="Our Mission" className="mb-2 font-bold" />
            <p className="text-sm">
              To inspire and empower individuals to live a Christ-centered life and make a positive
              impact.
            </p>
          </div>
          <div>
            <Image
              src="/assets/bible.png"
              alt="Bible Image"
              className="p-3"
              width={60}
              height={60}
            ></Image>
            <SubHeaderText text="Core Values" className="mb-2 font-bold" />
            <p className="text-sm">
              Faith, Love, Compassion, Community and Service are at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl h-full md:flex items-center justify-center hidden">
        <Image
          src="/assets/Mission.jpg"
          alt="Mission Statement Image"
          className="overflow-hidden rounded-lg shadow-md object-cover w-full sm:h-80"
          width={450}
          height={0}
        />
      </div>
    </section>
  );
};

export default MissionStatement;
