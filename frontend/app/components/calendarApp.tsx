import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";

interface CalendarAppProps {
  onClickAgendaDate?: (date: string) => void;
}

// TODOs:
// MAKE A QUERY TO BRING UP THE EVENT TO THE CALENDAR
// IT MAY NEED A REFRESH TO SHOW UP THE EVENTS ON THE CALENDAR AFTER IT RENDERIZES.

function CalendarApp({ onClickAgendaDate }: CalendarAppProps) {
  // views of Calendar
  const monthGridView = createViewMonthGrid();
  const dayView = createViewDay();
  const weekView = createViewWeek();
  const monthAgendaView = createViewMonthAgenda();

  // Simulatiing events

  // EXPLANATION OF EVENTS:
  // title: On default vision it shows at font bold.
  // description: when opened the event by clickin at it, it shows up.
  // id: SOME NUNBER THAT MAKE SURE THE EVENT ARE UNIQUE
  // start: SOME DATE AND HOUR, LIKE: "2024-09-09 07:45"
  // end: SOME DATE AND HOUR, LIKE: "2024-09-09 09:01"
  // _customContent: {
  // timeGrid: '<div class="custom-content">!Custom Content, DESCRIBE HERE THE TEXT YOU WANT TO APPEAR IN CARD!</div>',
  // monthGrid: '<div class="custom-content">!Custom Content, DESCRIBE HERE THE TEXT YOU WANT TO APPEAR IN CARD!</div>',
  // },
  // calendarId: regularPriority | lowPriority | highPriority

  const events = [
    {
      id: 874574875,
      title: "Meeting with Mr. boss",
      start: "2024-11-06 07:00",
      end: "2024-09-09 09:00",
      // _customContent: {
      //   timeGrid: '<div class="custom-content">Custom Content</div>',
      //   monthGrid: '<div class="custom-content">Custom Content</div>',
      // },
      calendarId: "regularPriority",
      description: "calor muito grande agrora",
    },
    {
      id: 874574875,
      start: "2024-11-06",
      end: "2024-09-09",
      title: "Dia todo - Limpezas nas máquinas",
      // _customContent: {
      //   dateGrid:
      //     '<div class="custom-content">Dia todo - Limpezas nas máquinas</div>',
      //   monthAgenda:
      //     '<div class="custom-content">Dia todo - Limpezas nas máquinas</div>',
      // },
      calendarId: "lowPriority",
      description: "calor muito grande agrora",
    },
    {
      id: 874574875,
      start: "2024-11-06",
      end: "2024-09-09",
      title: "Dia todo - Limpezas nas máquinas",
      _customContent: {
        dateGrid:
          '<div class="custom-content">Dia todo - Limpezas nas máquinas</div>',
        monthAgenda:
          '<div class="custom-content">Dia todo - Limpezas nas máquinas</div>',
      },
      calendarId: "highPriority",
      description: "calor muito grande agrora",
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
      calendarId: "highPriority",
    },
    {
      id: 45678,
      title: "Bi-Weekly Event Monday and Wednesday",
      start: "2024-03-19 14:00",
      end: "2024-03-19 15:00",
      rrule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959",
      calendarId: "work",
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
  const eventModal = createEventModalPlugin();
  eventModal.close(); // close the modal

  const calendar = useNextCalendarApp({
    plugins: [eventModal],
    calendars: {
      regularPriority: {
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
      highPriority: {
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
      lowPriority: {
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
    callbacks: {
      // onEventClick(calendarEvent) {
      //   console.log("onEventClick", calendarEvent);
      // },

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
    isResponsive: true,
    locale: "pt-BR",
    defaultView: monthGridView.name,
    dayBoundaries: {
      start: "06:00",
      end: "18:00",
    },

    // timePointsPerDay: 3,
  });

  return (
    <section className="overflow-y-auto h-fit">
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
}

export default CalendarApp;
