import Card from '@/shared/components/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/components/carousel';
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
					<CarouselContent className="h-full py-2">
						<CarouselItem className="w-full sm:max-w-64 sm:basis-1/3">
							<Card
								title="Sunday Services 7am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/static/SundayS1.jpg"
							/>
						</CarouselItem>
						<CarouselItem className="w-full sm:max-w-64 sm:basis-1/3">
							<Card
								title="Sunday Services 9am"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/static/SundayS2.jpg"
							/>{' '}
						</CarouselItem>
						<CarouselItem className="w-full sm:max-w-64 sm:basis-1/3">
							<Card
								title="Kids Sunday School"
								description="Join us for worship every Sunday at Corpus Christ"
								imageUrl="/static/SundaySchool.jpg"
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className="sm:hidden" />
					<CarouselNext className="sm:hidden" />
				</Carousel>
			</div>
		</section>
	);
};

export default Services;
