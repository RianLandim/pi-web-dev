import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

import { api } from "~/trpc/react";
import { useMemo } from "react";
import { addDays, format } from "date-fns";

interface CalendarAppProps {
  onClickAgendaDate?: (date: string) => void;
}

// TODOs:
// MAKE A QUERY TO BRING UP THE EVENT TO THE CALENDAR
// IT MAY NEED A REFRESH TO SHOW UP THE EVENTS ON THE CALENDAR AFTER IT RENDERIZES.

function CalendarApp({ onClickAgendaDate }: CalendarAppProps) {
  const monthGridView = createViewMonthGrid();
  const dayView = createViewDay();
  const weekView = createViewWeek();
  const monthAgendaView = createViewMonthAgenda();

  const { data: services } = api.service.list.useQuery();

  const formatToCalendar = (date: Date) => format(date, "yyyy-MM-dd HH:mm");

  const events = useMemo(() => {
    return services?.map((service) => ({
      id: service.id,
      title: service.name,
      start: formatToCalendar(service.scheduledAt),
      end: formatToCalendar(addDays(service.scheduledAt, 1)),
      calendarId: service.priority,
      description: service.description ?? "",
    }));
  }, [services]);

  console.log({ events });

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
    callbacks: {},
    views: [monthGridView, dayView, weekView, monthAgendaView],
    events,
    isResponsive: true,
    locale: "pt-BR",
    defaultView: monthGridView.label,
    dayBoundaries: {
      start: "06:00",
      end: "18:00",
    },
  });

  return (
    <section className="h-fit overflow-y-auto">
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
}

export default CalendarApp;
