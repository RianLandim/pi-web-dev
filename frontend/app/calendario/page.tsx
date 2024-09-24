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

export default function CalendarPage() {
  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
    ],
  });

  return (
    <main className="bg-main h-screen w-full  relative">
      <article className="h-[92%] w-full space-y-5  pt-16 px-6 flex flex-col overflow-y-scroll">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl">Calendário</h1>
          {/* <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" /> */}
        </div>
        <section>
          {/* <CalendarApp /> */}
        </section>

        <section className="flex pb-2 space-x-2 items-center h-fit">
          <SchedulingCard />
        </section>

        {/* <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6"></section> */}
      </article>
      <NavBar />
    </main>
  );
}
