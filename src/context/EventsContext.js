import React, { createContext, useState, useEffect } from "react";
import { loadAll, saveAll } from "../services/storageService";
import { defaultEvents } from "../data/defaultEvents";

export const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [interested, setInterested] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const data = await loadAll();
      let eventsData = data.events || [];

      // Always ensure we have the default events
      const defaultEvents = [
        {
          id: "1",
          title: "Tekron 2026",
          date: "2026-02-24",
          time: "5-6 days",
          venue: "Newton School of Technology (Adypu)",
          description: "Tekron is an exciting college fest featuring a variety of events including academic competitions, sports tournaments, cultural performances, workshops, and seminars. Join us for an unforgettable experience filled with fun, learning, and networking opportunities.",
          capacity: 300,
          remainingSeats: 300,
          type: "cultural",
          status: "active",
        },
        {
          id: "2",
          title: "AI & Machine Learning Workshop",
          date: "2024-12-15",
          time: "10:00 AM - 4:00 PM",
          venue: "Computer Science Lab",
          description: "Hands-on workshop covering the fundamentals of AI and Machine Learning. Learn about neural networks, data preprocessing, and build your first ML model. Perfect for students interested in cutting-edge technology.",
          capacity: 50,
          remainingSeats: 50,
          type: "workshop",
          status: "active",
        },
        {
          id: "3",
          title: "Annual Sports Meet",
          date: "2024-12-20",
          time: "9:00 AM - 6:00 PM",
          venue: "College Sports Ground",
          description: "Annual inter-department sports competition featuring football, basketball, volleyball, and track events. Show your athletic skills and cheer for your department!",
          capacity: 200,
          remainingSeats: 200,
          type: "sports",
          status: "active",
        },
        {
          id: "4",
          title: "Entrepreneurship Seminar",
          date: "2024-12-18",
          time: "2:00 PM - 5:00 PM",
          venue: "Auditorium",
          description: "Learn from successful entrepreneurs about starting and scaling businesses. Topics include business planning, funding, marketing, and overcoming challenges in the startup world.",
          capacity: 150,
          remainingSeats: 150,
          type: "seminar",
          status: "active",
        },
        {
          id: "5",
          title: "Cultural Dance Competition",
          date: "2024-12-22",
          time: "6:00 PM - 9:00 PM",
          venue: "Main Auditorium",
          description: "Showcase your dance talents in this exciting competition. Categories include solo, group, and fusion dances. Prizes for best performance, creativity, and audience choice!",
          capacity: 100,
          remainingSeats: 100,
          type: "cultural",
          status: "active",
        },
      ];

      // Merge default events with stored events, ensuring defaults are always present
      const defaultEventIds = defaultEvents.map(e => e.id);
      const storedEvents = eventsData.filter(e => !defaultEventIds.includes(e.id));
      eventsData = [...defaultEvents, ...storedEvents];

      // Save the merged events
      await saveAll({ events: eventsData, registrations: data.registrations || [], interested: data.interested || [], favorites: data.favorites || [] });
      setEvents(eventsData);
      setRegistrations(data.registrations || []);
      setInterested(data.interested || []);
      setFavorites(data.favorites || []);
      setLoading(false);
    })();
  }, []);

  const createEvent = async (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      status: "active",
      remainingSeats: eventData.capacity,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    await saveAll({ events: updatedEvents, registrations, interested, favorites });
    return { success: true };
  };

  const editEvent = async (eventId, updatedData) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, ...updatedData } : e
    );
    setEvents(updatedEvents);
    await saveAll({ events: updatedEvents, registrations, interested, favorites });
    return { success: true };
  };

  const postponeEvent = async (eventId, newDate) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, date: newDate } : e
    );
    setEvents(updatedEvents);
    await saveAll({ events: updatedEvents, registrations, interested, favorites });
    return { success: true };
  };

  const cancelEvent = async (eventId) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, status: "cancelled" } : e
    );
    setEvents(updatedEvents);
    await saveAll({ events: updatedEvents, registrations, interested, favorites });
    return { success: true };
  };

  const registerForEvent = async (eventId, student) => {
    const event = events.find((e) => e.id === eventId);
    if (!event || event.remainingSeats <= 0) {
      return { success: false, message: "Event full or not found" };
    }

    const updatedEvents = events.map((e) =>
      e.id === eventId
        ? { ...e, remainingSeats: e.remainingSeats - 1 }
        : e
    );

    const registration = {
      eventId,
      student,
      registeredAt: Date.now(),
    };

    const updatedRegistrations = [...registrations, registration];

    setEvents(updatedEvents);
    setRegistrations(updatedRegistrations);

    await saveAll({
      events: updatedEvents,
      registrations: updatedRegistrations,
      interested,
      favorites,
    });

    return { success: true };
  };

  const unregisterFromEvent = async (eventId, studentId) => {
    const updatedRegistrations = registrations.filter(
      (r) =>
        r.eventId !== eventId || r.student.id !== studentId
    );

    const updatedEvents = events.map((e) =>
      e.id === eventId
        ? { ...e, remainingSeats: e.remainingSeats + 1 }
        : e
    );

    setRegistrations(updatedRegistrations);
    setEvents(updatedEvents);

    await saveAll({
      events: updatedEvents,
      registrations: updatedRegistrations,
      interested,
      favorites,
    });

    return { success: true };
  };

  const markInterested = async (eventId, student) => {
    const updated = [...interested, { eventId, student }];
    setInterested(updated);
    await saveAll({ events, registrations, interested: updated });
    return { success: true };
  };

  const removeInterest = async (eventId, studentId) => {
    const updated = interested.filter(
      (i) => i.eventId !== eventId || i.student.id !== studentId
    );
    setInterested(updated);
    await saveAll({ events, registrations, interested: updated, favorites });
    return { success: true };
  };

  const toggleFavorite = async (eventId, studentId) => {
    const isFavorite = favorites.some(f => f.eventId === eventId && f.studentId === studentId);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(f => !(f.eventId === eventId && f.studentId === studentId));
    } else {
      updatedFavorites = [...favorites, { eventId, studentId }];
    }
    setFavorites(updatedFavorites);
    await saveAll({ events, registrations, interested, favorites: updatedFavorites });
    return { success: true };
  };

  const isFavorite = (eventId, studentId) => {
    return favorites.some(f => f.eventId === eventId && f.studentId === studentId);
  };

  const getParticipants = (eventId) =>
    registrations.filter((r) => r.eventId === eventId);

  const getEventById = (eventId) =>
    events.find((e) => e.id === eventId);

  const getMyRegisteredEvents = (studentId) =>
    registrations.filter((r) => r.student.id === studentId);

  const getMyInterestedEvents = (studentId) =>
    interested.filter((i) => i.student.id === studentId);

  const refreshFromStorage = async () => {
    setLoading(true);
    const data = await loadAll();
    setEvents(data.events || []);
    setRegistrations(data.registrations || []);
    setInterested(data.interested || []);
    setLoading(false);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        registrations,
        interested,
        favorites,
        loading,
        createEvent,
        editEvent,
        postponeEvent,
        cancelEvent,
        registerForEvent,
        unregisterFromEvent,
        markInterested,
        removeInterest,
        toggleFavorite,
        isFavorite,
        getParticipants,
        getEventById,
        getMyRegisteredEvents,
        getMyInterestedEvents,
        refreshFromStorage,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => {
  const context = React.useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};