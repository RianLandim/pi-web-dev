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
      id: 874574875,
      start: "2024-09-09 07:45",
      end: "2024-09-09 09:01",
      _customContent: {
        timeGrid: '<div class="custom-content">Custom Content</div>',
        monthGrid: '<div class="custom-content">Custom Content</div>',
      },
      calendarId: 'work',

    },
    {
      id: 874574875,
      start: "2024-09-09",
      end: "2024-09-09",
      title: "All Day Event",
      _customContent: {
        dateGrid: '<div class="custom-content">Custom Content</div>',
        monthAgenda: '<div class="custom-content">Custom Content</div>',
      },
      calendarId: 'work',
    },
    {
      id: 45678,
      title: "Bi-Weekly Event Monday and Wednesday",
      start: "2024-03-19 14:00",
      end: "2024-03-19 15:00",
      rrule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959",
      calendarId: 'work',
    },
    {
      id: 18547854,
      title: "Bi-Weekly Event Monday and Wednesday",
      start: "2024-02-05 14:00",
      end: "2024-02-05 15:00",
      rrule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959",
    },
    {
      id: 18547855,
      title: "Weekly Event",
      start: "2024-02-03",
      end: "2024-02-03",
      rrule: "FREQ=WEEKLY;COUNT=4",
    },
    {
      id: 789,
      title: "Daily event",
      start: "2024-02-05 12:00",
      end: "2024-02-05 13:55",
      rrule: "FREQ=DAILY;COUNT=5",
      calendarId: "personal",
    },
    {
      id: 9834876578,
      title: "Daily event 2",
      start: "2024-02-05 12:00",
      end: "2024-02-05 13:55",
      rrule: "FREQ=DAILY;UNTIL=20240209T235900",
      calendarId: "work",
    },
    {
      id: 7845684678465874,
      title: "Monthly event",
      start: "2024-02-07 16:00",
      end: "2024-02-07 17:55",
      rrule: "FREQ=MONTHLY;COUNT=5",
    },
    {
      rrule: "FREQ=YEARLY;COUNT=5",
      title: "Yearly event",
      start: "2024-02-08 16:00",
      end: "2024-02-08 17:55",
      id: 874367853,
    },
  ];

  const calendar = useNextCalendarApp({
    calendars: {
      personal: {
        colorName: "personal",
        lightColors: {
          main: "#f9d71c",
          container: "#fff5aa",
          onContainer: "#594800",
        },
        darkColors: {
          main: "#fff5c0",
          onContainer: "#fff5de",
          container: "#a29742",
        },
      },
      work: {
        colorName: "work",
        lightColors: {
          main: "#f91c45",
          container: "#ffd2dc",
          onContainer: "#59000d",
        },
        darkColors: {
          main: "#ffc0cc",
          onContainer: "#ffdee6",
          container: "#a24258",
        },
      },
      leisure: {
        colorName: "leisure",
        lightColors: {
          main: "#1cf9b0",
          container: "#dafff0",
          onContainer: "#004d3d",
        },
        darkColors: {
          main: "#c0fff5",
          onContainer: "#e6fff5",
          container: "#42a297",
        },
      },
      school: {
        colorName: "school",
        lightColors: {
          main: "#1c7df9",
          container: "#d2e7ff",
          onContainer: "#002859",
        },
        darkColors: {
          main: "#c0dfff",
          onContainer: "#dee6ff",
          container: "#426aa2",
        },
      },
    },
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
