'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/accordion';
import { Lines, Rail } from '@/shared/components/editorial';
import { Reveal } from '@/shared/components/reveal';
import { downloadIcs } from '@/shared/core/ics';
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
				{/*
				 * The grid and the reordering now switch at the same breakpoint. They
				 * used to disagree (grid at sm, order at md), which squeezed the title
				 * and description into the 8rem image column on tablet portrait.
				 */}
				<article className="grid gap-6 py-12 lg:grid-cols-[5rem_minmax(0,1fr)_14rem] lg:gap-8 lg:py-14">
					<div className="order-1 flex items-baseline gap-2 lg:flex-col lg:items-start lg:gap-0">
						<time
							dateTime={event.iso}
							className="font-display numerals text-ink text-[2.75rem] leading-none lg:text-[3.25rem]"
						>
							{event.day}
						</time>
						<span className="font-ui text-muted text-xs tracking-[0.14em] uppercase lg:mt-3">
							{event.month}
						</span>
					</div>

					{event.imagePreview && (
						<div className="photo rounded-frame order-2 aspect-3/2 w-full lg:order-3 lg:aspect-4/3">
							<Image
								src={event.imagePreview}
								alt={event.title}
								fill
								sizes="(max-width: 1024px) 100vw, 14rem"
								className="object-cover"
							/>
						</div>
					)}

					<div className="order-3 lg:order-2">
						<h3 className="font-display text-subtitle">{event.title}</h3>
						<p className="font-ui text-muted numerals mt-3 text-[0.9375rem]">
							{event.date}
							{event.location ? `, ${event.location}` : ''}
						</p>
						{event.shortDescription && (
							<p className="prose-body text-muted mt-4 text-base whitespace-pre-wrap">
								{event.shortDescription}
							</p>
						)}

						<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
							{event.iso && (
								<button
									type="button"
									onClick={() =>
										downloadIcs({
											id: event.id,
											title: event.title,
											iso: event.iso,
											location: event.location,
											description: event.shortDescription,
										})
									}
									className="font-ui text-accent rule-link inline-flex items-center gap-1.5 text-[0.8125rem] tracking-[0.04em]"
								>
									<CalendarPlus strokeWidth={1.5} className="size-3.5" aria-hidden />
									Add to calendar
								</button>
							)}
						</div>

						{event.additionalInformation && (
							<Accordion type="single" collapsible className="mt-2">
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
		<div className="grid gap-6 py-12 lg:grid-cols-[5rem_minmax(0,1fr)_14rem] lg:gap-8 lg:py-14">
			<div className="bg-line/70 rounded-frame h-12 w-20" />
			<div className="space-y-3">
				<div className="bg-line/70 rounded-frame h-8 w-3/5" />
				<div className="bg-line/70 rounded-frame h-4 w-2/5" />
				<div className="bg-line/70 rounded-frame h-4 w-full" />
				<div className="bg-line/70 rounded-frame h-4 w-4/5" />
			</div>
			<div className="bg-line/70 rounded-frame relative aspect-3/2 w-full overflow-hidden lg:aspect-4/3">
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
		<section id="diary">
			<div className="shell px-5 py-28 md:px-10 md:py-40">
				<div className="grid gap-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-16">
					<Rail number="04" label="Diary" />

					<div>
						<Lines
							className="font-display max-w-[24ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em]"
							lines={[
								'What is coming up',
								<Fragment key="parish">
									in the life of the <em className="font-display italic">parish</em>
								</Fragment>,
							]}
						/>

						<ul className="border-line mt-16 border-b">
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
								<div className="border-line rounded-frame -mt-px border p-10 text-center md:p-14">
									<h3 className="font-display text-subtitle">Nothing on the calendar just yet</h3>
									<p className="prose-body text-muted mx-auto mt-4 text-base">
										There are no events listed at the moment. Sunday services carry on as usual, and
										anything new will appear here first.
									</p>
									<Link
										href="#worship"
										className="font-ui text-accent rule-link mt-7 inline-block text-[0.9375rem]"
									>
										See Sunday service times
									</Link>
								</div>
							</Reveal>
						)}

						{state === 'error' && (
							<div
								role="alert"
								className="border-line rounded-frame -mt-px border p-10 text-center md:p-14"
							>
								<h3 className="font-display text-subtitle">We could not load the events list</h3>
								<p className="prose-body text-muted mx-auto mt-4 text-base">
									Something went wrong fetching the calendar. Please try again shortly, or contact
									the parish office and we will gladly tell you what is coming up.
								</p>
								<div className="font-ui mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9375rem]">
									<a href={PARISH.phoneHref} className="text-accent rule-link numerals">
										{PARISH.phone}
									</a>
									<a href={`mailto:${PARISH.email}`} className="text-accent rule-link">
										{PARISH.email}
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Events;
