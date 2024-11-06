"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importa AnimatePresence
import NavBar from "../components/navBar";
import "@schedule-x/theme-default/dist/index.css";
import CalendarApp from "../components/calendarApp";
import { useCalendarEventDisclosure } from "./_components/hooks/useCalendarEventDisclosure";
import { CalendarEventCard } from "./_components/dialog/CalendarEventDialog";
import { Info } from "@phosphor-icons/react";

export default function CalendarPage() {
  const { setSelectedDate } = useCalendarEventDisclosure();
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfoSection = () => setShowInfo((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !(event.target as HTMLElement).closest(".info-section") &&
      !(event.target as HTMLElement).closest(".info-icon")
    ) {
      setShowInfo(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <main className="bg-main h-screen w-full text-whiteApp relative">
      <CalendarEventCard />
      <article className="h-[92%] w-full space-y-5 pt-16 px-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-xl">Calendário</h1>
          <Info size={32} onClick={toggleInfoSection} className="cursor-pointer info-icon" />
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="info-section text-sm space-y-2 flex flex-col w-full p-2 rounded-md border"
            >
              <div className="flex w-full justify-around items-center">
                <p className="font-semibold text-lg">Informações:</p>
                <div>
                  <div className="flex items-center justify-between">
                    <p>Prioridade alta</p>
                    <div className="w-3 h-3 bg-orangeApp rounded-full"></div>
                  </div>
                  <div className="flex space-x-3 items-center justify-between">
                    <p>Prioridade média</p>
                    <div className="w-3 h-3 bg-greenApp rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3 justify-between">
                    <p>Prioridade baixa</p>
                    <div className="w-3 rounded-full h-3 bg-whiteApp"></div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

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
