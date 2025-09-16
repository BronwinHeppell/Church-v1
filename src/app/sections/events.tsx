'use client';
import { db, storage } from '@/lib/firebase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/accordion';
import { HeaderText, SubHeaderText } from '@/shared/components/headerText';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface EventInterface {
	id?: string;
	title: string;
	shortDescription: string;
	additionalInformation: string;
	location: string;
	date: string;
	imagePreview: string;
	image?: string;
}

const EventItem = (event: EventInterface) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
				<div className="relative h-36 w-36 min-w-36">
					<Image
						src={event.imagePreview || '/placeholder.png'}
						alt={event.title}
						className="overflow-hidden rounded-xl object-cover shadow-md"
						fill
					/>
				</div>
				<div className="text-start flex-1">
					<h3 className="text-base font-bold sm:text-lg">{event.title}</h3>
					<p className="text-sm text-gray-600">
						{event.date} • {event.location}
					</p>
					<br />
					<p className="text-sm sm:text-base whitespace-pre-wrap">{event.shortDescription}</p>
					{event.additionalInformation && (
						<Accordion type="single" collapsible>
							<AccordionItem value={event.id ?? ''}>
								<AccordionTrigger className="text-center text-sm w-100">View more</AccordionTrigger>
								<AccordionContent className="text-start whitespace-pre-line">
									{event.additionalInformation}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					)}
				</div>
			</div>
			<hr className="my-10" />
		</>
	);
};

const Events = () => {
	const [events, setEvents] = useState<EventInterface[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const eventsCollection = collection(db, 'events');
				const eventSnapshot = await getDocs(eventsCollection);

				const eventsData = (await Promise.all(
					eventSnapshot.docs.map(async (doc) => {
						const data = doc.data();

						// Handle optional image
						let imageUrl = '';
						if (data?.image) {
							try {
								imageUrl = await getDownloadURL(ref(storage, `images/${data.image}`));
							} catch (err) {
								console.error(`Image not found for doc ${doc.id}:`, err);
							}
						}

						// Handle date
						let formattedDate = '';
						let eventDate: Date | null = null;

						if (data?.date) {
							if (typeof data.date === 'string') {
								eventDate = new Date(data.date);
							} else if (data.date.toDate) {
								eventDate = data.date.toDate();
							}
							if (eventDate instanceof Date && !isNaN(eventDate.getTime())) {
								formattedDate = eventDate.toDateString();
							}
						}

						return {
							id: doc.id,
							title: data?.title ?? 'Untitled Event',
							shortDescription: data?.shortDescription?.replace(/\\n/g, '\n') ?? '',
							additionalInformation: data?.additionalInformation?.replace(/\\n/g, '\n') ?? '',
							location: data?.location ?? 'TBA',
							date: formattedDate,
							imagePreview: imageUrl,
							image: imageUrl, // optional full image
							_eventDate: eventDate, // keep internally for filtering
						};
					})
				)) as (EventInterface & { _eventDate: Date | null })[];

				// Filter out past events
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				const futureEvents = eventsData.filter((event) => {
					if (!event._eventDate) return false;
					const evDate = new Date(event._eventDate);
					evDate.setHours(0, 0, 0, 0);
					return evDate >= today;
				});

				// Remove internal helper field before storing in state
				setEvents(futureEvents.map(({ _eventDate, ...rest }) => rest));
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
				) : events.length === 0 ? (
					<p className="text-center">No events...</p>
				) : (
					events.map((event) => <EventItem key={event.id} {...event} />)
				)}
			</div>
		</section>
	);
};

export default Events;
