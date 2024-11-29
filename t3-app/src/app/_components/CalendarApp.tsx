import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

import { createEventModalPlugin } from "@schedule-x/event-modal";

import { api } from "~/trpc/react";
import { useEffect, useMemo } from "react";
import { addHours, format } from "date-fns";

function CalendarApp() {
  const dayView = createViewDay();
  const monthGridView = createViewMonthGrid();
  const monthAgendaView = createViewMonthAgenda();

  const { data: services } = api.service.list.useQuery();

  const formatToCalendar = (date: Date) => format(date, "yyyy-MM-dd HH:mm");

  const events = useMemo(() => {
    return services?.map((service) => ({
      id: service.id,
      title: service.name,
      start: formatToCalendar(service.scheduledAt),
      end: formatToCalendar(addHours(service.scheduledAt, 2)),
      calendarId: service.priority,
      description: service.description ?? "",
    }));
  }, [services]);

  useEffect(() => {
    calendar?.events.set(events ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const eventModal = createEventModalPlugin();
  eventModal.close(); // close the modal

  const calendar = useNextCalendarApp({
    plugins: [eventModal],
    calendars: {
      MEDIUM: {
        colorName: "regular",
        lightColors: {
          main: "#FFC800",
          container: "#FFDC5E",
          onContainer: "#000",
        },
        darkColors: {
          main: "#00649E",
          onContainer: "#FFDC5E",
          container: "#a29742",
        },
      },
      HIGH: {
        colorName: "highPriority",
        lightColors: {
          main: "#FF1944",
          container: "#FF5E7C",
          onContainer: "#000",
        },
        darkColors: {
          main: "#FF1944",
          onContainer: "#FF5E7C",
          container: "#000",
        },
      },
      LOW: {
        colorName: "lowPriority",
        lightColors: {
          main: "#208644",
          container: "#dafff0",
          onContainer: "#0C331A",
        },
        darkColors: {
          main: "#208644",
          onContainer: "#e6fff5",
          container: "#0C331A",
        },
      },
    },
    views: [monthGridView, dayView, monthAgendaView],
    events,
    isResponsive: true,
    locale: "pt-BR",
    defaultView: monthAgendaView.name,
  });

  return (
    <section className="h-fit overflow-y-auto">
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
}

export default CalendarApp;
