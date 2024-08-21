import Card from "@/shared/components/card";

const Services = () => {
  return (
    <section className="py-10" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sunday Services Schedule
        </h2>
        <h3 className="text-1xl font-bold text-gray-800 mb-5 text-center">
          Join us for worship every Sunday at Corpus Christi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Title"
            description="Description"
            imageUrl="/assets/hero.jpg"
          />
          <Card
            title="Title"
            description="Description"
            imageUrl="/assets/hero.jpg"
          />{" "}
          <Card
            title="Title"
            description="Description"
            imageUrl="/assets/hero.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
