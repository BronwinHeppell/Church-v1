'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/accordion';
import { SectionTitle, Lede } from '@/shared/components/heading';
import { Reveal } from '@/shared/components/reveal';
import { PARISH } from '@/shared/core/parish';

export interface EventInterface {
	id?: string;
	title: string;
	shortDescription: string;
	additionalInformation: string;
	location: string;

	date: string;

	day?: string;

	month?: string;

	iso?: string;
	imagePreview: string;
	image?: string;
}

type LoadState = 'loading' | 'ready' | 'error';

const dayFmt = new Intl.DateTimeFormat('en-ZA', { day: '2-digit' });
const monthFmt = new Intl.DateTimeFormat('en-ZA', { month: 'short' });
const fullFmt = new Intl.DateTimeFormat('en-ZA', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

const EventRow = ({ event, index }: { event: EventInterface; index: number }) => {
	return (
		<li className="border-line border-t">
			<Reveal delay={Math.min(index, 4) * 0.06}>
				<article className="grid gap-5 py-10 sm:grid-cols-[4.25rem_minmax(0,1fr)_8rem] sm:gap-6 md:py-12">
					<div className="order-1 flex items-baseline gap-2 md:flex-col md:items-start md:gap-0">
						<time
							dateTime={event.iso}
							className="font-display numerals text-ink text-4xl leading-none md:text-5xl"
						>
							{event.day}
						</time>
						<span className="font-ui text-muted text-sm tracking-wide uppercase md:mt-2">
							{event.month}
						</span>
					</div>

					{event.imagePreview && (
						<div className="rounded-base relative order-2 aspect-3/2 w-full overflow-hidden md:order-3 md:aspect-4/3">
							<Image
								src={event.imagePreview}
								alt={event.title}
								fill
								sizes="(max-width: 768px) 100vw, 13rem"
								className="object-cover"
							/>
						</div>
					)}

					<div className="order-3 md:order-2">
						<h3 className="font-display text-2xl leading-snug md:text-[1.75rem]">{event.title}</h3>
						<p className="font-ui text-muted mt-2 text-[0.9375rem]">
							{event.date}
							{event.location ? `, ${event.location}` : ''}
						</p>
						{event.shortDescription && (
							<p className="prose-body text-muted mt-4 text-base whitespace-pre-wrap">
								{event.shortDescription}
							</p>
						)}
						{event.additionalInformation && (
							<Accordion type="single" collapsible className="mt-3">
								<AccordionItem value={event.id ?? String(index)} className="border-b-0">
									<AccordionTrigger className="text-accent py-2 text-[0.9375rem]">
										More details
									</AccordionTrigger>
									<AccordionContent className="prose-body text-muted text-base whitespace-pre-line">
										{event.additionalInformation}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)}
					</div>
				</article>
			</Reveal>
		</li>
	);
};

const EventSkeleton = () => (
	<li className="border-line border-t" aria-hidden>
		<div className="grid gap-5 py-10 sm:grid-cols-[4.25rem_minmax(0,1fr)_8rem] sm:gap-6 md:py-12">
			<div className="bg-line/60 rounded-base h-12 w-20" />
			<div className="space-y-3">
				<div className="bg-line/60 rounded-base h-7 w-3/5" />
				<div className="bg-line/60 rounded-base h-4 w-2/5" />
				<div className="bg-line/60 rounded-base h-4 w-full" />
				<div className="bg-line/60 rounded-base h-4 w-4/5" />
			</div>
			<div className="bg-line/60 rounded-base relative aspect-3/2 w-full overflow-hidden md:aspect-4/3">
				<div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--scrim)/0.06)] to-transparent"
					style={{ animation: 'cc-shimmer 1.6s cubic-bezier(0.32, 0.72, 0, 1) infinite' }}
				/>
			</div>
		</div>
	</li>
);

const Events = () => {
	const [events, setEvents] = useState<EventInterface[]>([]);
	const [state, setState] = useState<LoadState>('loading');

	useEffect(() => {
		let cancelled = false;

		const fetchEvents = async () => {
			try {
				const [{ collection, getDocs }, { getDownloadURL, ref }, { db, storage }] =
					await Promise.all([
						import('firebase/firestore'),
						import('firebase/storage'),
						import('@/lib/firebase'),
					]);

				const snapshot = await getDocs(collection(db, 'events'));

				const rows = await Promise.all(
					snapshot.docs.map(async (doc) => {
						const data = doc.data();

						let imageUrl = '';
						if (data?.image) {
							try {
								imageUrl = await getDownloadURL(ref(storage, `images/${data.image}`));
							} catch {}
						}

						let eventDate: Date | null = null;
						if (typeof data?.date === 'string') {
							eventDate = new Date(data.date);
						} else if (data?.date?.toDate) {
							eventDate = data.date.toDate();
						}
						if (!(eventDate instanceof Date) || Number.isNaN(eventDate.getTime())) {
							eventDate = null;
						}

						return {
							id: doc.id,
							title: data?.title ?? 'Untitled Event',
							shortDescription: data?.shortDescription?.replace(/\\n/g, '\n') ?? '',
							additionalInformation: data?.additionalInformation?.replace(/\\n/g, '\n') ?? '',
							location: data?.location ?? 'TBA',
							date: eventDate ? fullFmt.format(eventDate) : '',
							day: eventDate ? dayFmt.format(eventDate) : '',
							month: eventDate ? monthFmt.format(eventDate) : '',
							iso: eventDate ? eventDate.toISOString().slice(0, 10) : undefined,
							imagePreview: imageUrl,
							image: imageUrl,
							_eventDate: eventDate,
						};
					}),
				);

				const today = new Date();
				today.setHours(0, 0, 0, 0);

				const upcoming = rows
					.filter((e) => e._eventDate !== null && e._eventDate >= today)
					.sort((a, b) => a._eventDate!.getTime() - b._eventDate!.getTime())
					.map(({ _eventDate, ...rest }) => rest);

				if (!cancelled) {
					setEvents(upcoming);
					setState('ready');
				}
			} catch (error) {
				console.error('Error fetching events: ', error);
				if (!cancelled) setState('error');
			}
		};

		fetchEvents();
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<section id="Events" className="border-line border-b">
			<div className="shell px-5 py-20 md:py-24">
				<Reveal className="max-w-2xl">
					<SectionTitle>Upcoming events</SectionTitle>
					<Lede className="mt-5">
						What is coming up in the life of the parish. Everyone is welcome to join us.
					</Lede>
				</Reveal>

				<ul className="border-line mt-14 border-b">
					{state === 'loading' && (
						<>
							<EventSkeleton />
							<EventSkeleton />
							<EventSkeleton />
						</>
					)}

					{state === 'ready' &&
						events.map((event, i) => <EventRow key={event.id} event={event} index={i} />)}
				</ul>

				{state === 'loading' && (
					<p className="sr-only" role="status">
						Loading events
					</p>
				)}

				{state === 'ready' && events.length === 0 && (
					<Reveal>
						<div className="border-line rounded-base -mt-px border p-8 md:p-12">
							<h3 className="font-display text-2xl">Nothing on the calendar just yet</h3>
							<p className="prose-body text-muted mt-3 text-base">
								There are no events listed at the moment. Sunday services carry on as usual, and
								anything new will appear here first.
							</p>
							<Link
								href="#services"
								className="font-ui text-accent mt-6 inline-block text-[0.9375rem] hover:underline"
							>
								See Sunday service times
							</Link>
						</div>
					</Reveal>
				)}

				{state === 'error' && (
					<div role="alert" className="border-line rounded-base -mt-px border p-8 md:p-12">
						<h3 className="font-display text-2xl">We could not load the events list</h3>
						<p className="prose-body text-muted mt-3 text-base">
							Something went wrong fetching the calendar. Please try again shortly, or contact the
							parish office and we will gladly tell you what is coming up.
						</p>
						<div className="font-ui mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
							<a href={PARISH.phoneHref} className="text-accent hover:underline">
								{PARISH.phone}
							</a>
							<a href={`mailto:${PARISH.email}`} className="text-accent hover:underline">
								{PARISH.email}
							</a>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Events;
