import Image from "next/image";

const Events = () => {
  return (
    <section id="Events">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Upcoming Events
        </h2>
        <h3 className="text-1xl font-bold text-gray-800 mb-5 text-center">
          Stay updated with our upcoming church events and join us!
        </h3>

        <hr className="my-10" />
        <div className="flex gap-8 items-center">
          <div className="relative h-[150px] w-[150px]">
            <Image
              src="/assets/CakeSale.jpg"
              alt="Background Image"
              className="rounded-xl shadow-md overflow-hidden object-cover"
              fill
            />
          </div>
          <div className="text-left">
            <h3 className="font-bold">Cake Sale Day</h3>
            <p>Sun, Feb 09, 2024 • Corpus Christi Church</p>
            <br />
            <p>
              Join us for our Sunday worship service at Corpus Christi Church.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex gap-8 items-center">
          <div className="relative h-[150px] w-[150px]">
            <Image
              src="/assets/biblestudy.jpg"
              alt="Background Image"
              className="rounded-xl shadow-md overflow-hidden object-cover"
              fill
            />
          </div>
          <div className="text-left">
            <h3 className="font-bold">Bible Study Group</h3>
            <p>Sun, Feb 09, 2024 • Corpus Christi Church</p>
            <br />
            <p>
              Join us for our Sunday worship service at Corpus Christi Church.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex gap-8 items-center">
          <div className="relative h-[150px] w-[150px]">
            <Image
              src="/assets/Youthfel.jpg"
              alt="Background Image"
              className="rounded-xl shadow-md overflow-hidden object-cover"
              fill
            />
          </div>
          <div className="text-left ">
            <h3 className="font-bold">Youth Fellowship</h3>
            <p>Sun, Feb 09, 2024 • Corpus Christi Church</p>
            <br />
            <p>
              Join us for our Sunday worship service at Corpus Christi Church.
            </p>
          </div>
        </div>
        <hr className="my-10" />
      </div>
    </section>
  );
};
export default Events;
