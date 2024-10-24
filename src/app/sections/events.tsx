'use client';
import { db, storage } from '@/lib/firebase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/accordion';
import { HeaderText, SubHeaderText } from '@/shared/components/headerText';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const EventItem = (event: Event) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
				<div className="relative h-36 w-36 min-w-36 ">
					<Image
						src={event.image ?? ''}
						alt="Event Image"
						className="overflow-hidden rounded-xl object-cover shadow-md"
						fill
					/>
				</div>
				<div className="text-start">
					<h3 className="text-base font-bold sm:text-lg">{event.title}</h3>
					<p className="text-sm text-gray-600">
						{event.date} • {event.location}
					</p>
					<br />
					<p className="text-sm sm:text-base whitespace-pre-wrap">{`${event.shortDescription}`}</p>
					<Accordion type="single" collapsible>
						<AccordionItem value={event.id ?? ''}>
							<AccordionTrigger className="text-center text-sm">View more</AccordionTrigger>
							<AccordionContent className="text-start whitespace-pre-line">{event.longDescription}</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
			<hr className="my-10" />
		</>
	);
};

interface Event {
	id?: string;
	image?: string;
	date?: string;
	title?: string;
	location?: string;
	shortDescription?: string;
	longDescription?: string;
}

const Events = () => {
	const [events, setEvents] = useState<Event[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const eventsCollection = collection(db, 'events');
				const eventSnapshot = await getDocs(eventsCollection);

				const eventsData = (await Promise.all(
					eventSnapshot.docs.map(async (doc) => {
						const url = await getDownloadURL(ref(storage, `images/${doc.data().image}`));

						return {
							id: doc.id,
							...doc.data(),
							date: doc.data().date.toDate().toDateString(),
							image: url,
							shortDescription: doc.data().shortDescription.replace(/\\n/g, "\n"),
							longDescription: doc.data().longDescription.replace(/\\n/g, "\n"),
						};
					}),
				)) as Event[];

				setEvents(eventsData);
			} catch (error) {
				console.error('Error fetching events: ', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	return (
		<section id="Events">
			<div className="container mx-auto px-4">
				<div className="mb-5 space-y-2 text-center">
					<SubHeaderText text="Discover" />
					<HeaderText text="Upcoming Events" />
					<SubHeaderText text="Stay updated with our upcoming church events and join us!" />
				</div>
				<hr className="my-10" />
				{loading ? (
					<p className="text-center">Loading events...</p>
				) : events.length == 0 ? (
					<p className="text-center">No events...</p>
				) : (
					events.map((event) => <EventItem key={event.id} {...event} />)
				)}
			</div>
		</section>
	);
};
export default Events;
