"use client";

import NavBar from "../components/navBar";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import CalendarApp from "../components/calendarApp";
import SchedulingCard from "./_components/schedulingCard";
import { useCalendarEventDisclosure } from "./_components/hooks/useCalendarEventDisclosure";
import { CalendarEventCard } from "./_components/dialog/CalendarEventDialog";

export default function CalendarPage() {
  const { setSelectedDate } = useCalendarEventDisclosure();

  return (
    <main className="bg-main h-screen w-full  relative">
      <CalendarEventCard />
      <article className="h-[92%] w-full space-y-5  pt-16 px-6 flex flex-col overflow-y-scroll">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl">Calendário</h1>
          {/* <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" /> */}
        </div>
        <section>
          <CalendarApp
            onClickAgendaDate={(date) => {
              setSelectedDate(date);
            }}
          />
        </section>
      </article>
      <NavBar />
    </main>
  );
}
