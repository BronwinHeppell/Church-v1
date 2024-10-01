import Card from '@/shared/components/card';
import { HeaderText, SubHeaderText } from '@/shared/components/headerText';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
const Services = () => {
	return (
		<section className="py-10" id="services">
			<div className="container text-center sm:mx-auto">
				<div className="mb-5 space-y-2">
					<SubHeaderText text="Connecting People to God and Community" />
					<HeaderText text="Sunday Services Schedule" className="text-gray-800" />
					<SubHeaderText text="Join us for worship every Sunday at Corpus Christi" />
				</div>
				<Carousel>
					<CarouselContent className="py-2">
						<CarouselItem className="sm:basis-1/3">
							<Card
								title="Sunday Services 7am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundayS1.jpg"
							/>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/3">
							<Card
								title="Sunday Services 9am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundayS2.jpg"
							/>{' '}
						</CarouselItem>
						<CarouselItem className="sm:basis-1/3">
							<Card
								title="Kids Sunday School"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/assets/SundaySchool.jpg"
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
};

export default Services;
