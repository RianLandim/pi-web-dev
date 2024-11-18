import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewDay, createViewMonthAgenda } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

import { api } from "~/trpc/react";
import { useEffect, useMemo } from "react";
import { addHours, format } from "date-fns";

function CalendarApp() {
  const dayView = createViewDay();

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

  const calendar = useNextCalendarApp({
    calendars: {
      MEDIUM: {
        colorName: "regular",
        lightColors: {
          main: "#00649E",
          container: "#D9D9D9",
          onContainer: "#594800",
        },
        darkColors: {
          main: "#00649E",
          onContainer: "#D9D9D9",
          container: "#a29742",
        },
      },
      HIGH: {
        colorName: "highPriority",
        lightColors: {
          main: "#f91c45",
          container: "#ffd2dc",
          onContainer: "#59000d",
        },
        darkColors: {
          main: "#f91c45",
          onContainer: "#ffdee6",
          container: "#a24258",
        },
      },
      LOW: {
        colorName: "lowPriority",
        lightColors: {
          main: "#44AF69",
          container: "#dafff0",
          onContainer: "#004d3d",
        },
        darkColors: {
          main: "#44AF69",
          onContainer: "#e6fff5",
          container: "#42a297",
        },
      },
    },
    views: [dayView, monthAgendaView],
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
