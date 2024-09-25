import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

interface CalendarAppProps {
  onClickAgendaDate?: (date: string) => void;
}

function CalendarApp({ onClickAgendaDate }: CalendarAppProps) {
  const monthGridView = createViewMonthGrid();
  const dayView = createViewDay();
  const weekView = createViewWeek();
  const monthAgendaView = createViewMonthAgenda();

  const calendar = useNextCalendarApp({
    callbacks: {
      onClickAgendaDate,
    },
    views: [monthGridView, dayView, weekView, monthAgendaView],
    events: [
      {
        id: "1",
        title: "Maquineta",
        start: "2024-09-23",
        end: "2024-09-24",
      },
      {
        id: "2",
        title: "Fusqueta",
        start: "2024-09-23",
        end: "2024-09-24",
      },
    ],
    isResponsive: true,
    locale: "pt-BR",
    defaultView: monthGridView.name,
    dayBoundaries: {
      start: "06:00",
      end: "18:00",
    },
  });

  return (
    <section className="overflow-y-auto h-fit">
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
}

export default CalendarApp;
