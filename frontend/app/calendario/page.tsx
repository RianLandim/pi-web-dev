"use client";

import NavBar from "../components/navBar";
import "@schedule-x/theme-default/dist/index.css";
import CalendarApp from "../components/calendarApp";
import { useCalendarEventDisclosure } from "./_components/hooks/useCalendarEventDisclosure";
import { CalendarEventCard } from "./_components/dialog/CalendarEventDialog";
import { Info } from "@phosphor-icons/react";

export default function CalendarPage() {
  const { setSelectedDate } = useCalendarEventDisclosure();

  return (
    <main className="bg-main h-screen w-full text-whiteApp relative">
      <CalendarEventCard />
      <article className="h-[92%] w-full space-y-5 pt-16 px-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl">Calendário</h1>
          <Info size={32} />
        </div>

        {/* pririority list for user */}
        <section className="text-sm space-y-2 flex flex-col w-full p-2 rounded-md border">
          <div className="flex w-full justify-around items-center">
            <p className="font-semibold text-lg">Informações:</p>

            <div>
              <div className="flex items-center justify-between">
                <p className="">Prioriade alta</p>
                <div className="w-3 h-3 bg-orangeApp rounded-full"></div>
              </div>
              <div className="flex space-x-3 items-center justify-between">
                <p>Prioriade média</p>
                <div className="w-3 h-3 bg-greenApp rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3 justify-between">
                <p>Prioriade baixa</p>
                <div className="w-3 rounded-full h-3 bg-whiteApp"></div>
              </div>
            </div>
          </div>
        </section>

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
