"use client"
import { db, storage } from "@/lib/firebase";
import { HeaderText, SubHeaderText } from "@/shared/components/headerText";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";


const EventItem = (event: Event) => {
  return (
    <>
      <div className="flex gap-4 sm:gap-8 items-center">
        <div className="relative h-[150px] w-[150px]">
          <Image
            src={event.image ?? ''}
            alt="Event Image"
            className="rounded-xl shadow-md overflow-hidden object-cover"
            fill
          />
        </div>
        <div className="text-start">
          <h3 className="font-bold text-base sm:text-lg">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
          <br />
          <p className="text-sm sm:text-base">
            {event.description}
          </p>
        </div>
      </div>
      <hr className="my-10" />
    </>
  )
}

interface Event {
  id?: string;
  image?: string;
  date?: string;
  title?: string;
  location?: string;
  description?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);

        const eventsData = await Promise.all(
          eventSnapshot.docs.map(async (doc) => {
            const url = await getDownloadURL(ref(storage, 'images/CakeSale.jpg'));

            return {
              id: doc.id,
              ...doc.data(),
              date: new Date(doc.data().date * 1000).toDateString(),
              image: url,
            };
          })
        ) as Event[];

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
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
          <SubHeaderText text="   Stay updated with our upcoming church events and join us!" />
        </div>
        <hr className="my-10" />
        {
          (loading) ? (
            <p className="text-center">Loading events...</p>
          ) : (events.length == 0) ? (
            <p className="text-center">No events...</p>
          ) : (
            events.map((event) => <EventItem key={event.id} {...event} />)
          )
        }
      </div>
    </section>
  );
};
export default Events;
