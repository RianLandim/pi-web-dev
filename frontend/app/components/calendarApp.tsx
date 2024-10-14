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

  const events = [
    {
      id: "1",
      title: "Maquineta",
      start: "2024-10-12",
      end: "2024-10-12",
      priority: "high",
    },
    {
      id: "2",
      title: "Fusqueta",
      start: "2024-10-12",
      end: "2024-10-12",
      priority: "low",
    },
    {
      id: "3",
      title: "Fusqueta",
      start: "2024-10-12",
      end: "2024-10-12",
    },
    {
      id: "4",
      title: "Fusqueta",
      start: "2024-10-12",
      end: "2024-10-12",
    },
  ];

  const calendar = useNextCalendarApp({
    callbacks: {
      onEventClick(calendarEvent) {
        console.log("onEventClick", calendarEvent);
      },

      // onRender($app) {
      //   const eventElements = document.querySelectorAll(".sx-event");
      //   eventElements.forEach((eventElement) => {
      //     const eventId = eventElement.dataset.id;
      //     const event = events.find((e) => e.id === eventId);

      //     if (event && event.priority) {
      //       if (event.priority === "high") {
      //         eventElement.classList.add("event-dot-high");
      //       } else if (event.priority === "medium") {
      //         eventElement.classList.add("event-dot-medium");
      //       } else if (event.priority === "low") {
      //         eventElement.classList.add("event-dot-low");
      //       }
      //     }
      //   });
      // },
      onClickAgendaDate: (date: string) => {
        // Check if there is at least one event on the clicked date
        const hasEventOnDate = events.some(
          (event) => event.start === date || event.end === date
        );

        // If no events exist on the date, open the dialog
        if (!hasEventOnDate && onClickAgendaDate) {
          onClickAgendaDate(date);
        }
      },
    },
    views: [monthGridView, dayView, weekView, monthAgendaView],
    events,
    // timePointsPerDay: 3,
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
