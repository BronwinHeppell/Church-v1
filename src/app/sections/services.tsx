import Card from '@/shared/components/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/components/carousel';
import { HeaderText, SubHeaderText } from '@/shared/components/headerText';

const Services = () => {
	return (
		<section className="py-10" id="services">
			<div className="container text-center sm:mx-auto">
				<div className="mb-5 space-y-2">
					<SubHeaderText text="Connecting People to God and Community" />
					<HeaderText text="Sunday Services Schedule" />
					<SubHeaderText text="Join us for worship every Sunday at Corpus Christi" />
				</div>
				<Carousel>
					<CarouselContent className="py-2 h-full">
						<CarouselItem className="sm:basis-1/3 w-full sm:max-w-64">
							<Card
								title="Sunday Services 7am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundayS1.jpg"
							/>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/3 w-full sm:max-w-64">
							<Card
								title="Sunday Services 9am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundayS2.jpg"
							/>{' '}
						</CarouselItem>
						<CarouselItem className="sm:basis-1/3 w-full sm:max-w-64">
							<Card
								title="Kids Sunday School"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundaySchool.jpg"
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className=' sm:hidden' />
					<CarouselNext className='sm:hidden' />
				</Carousel>
			</div>
		</section>
	);
};

export default Services;
