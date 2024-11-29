"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@schedule-x/theme-default/dist/index.css";
import { Info } from "@phosphor-icons/react";

import { CalendarEventCard } from "./_components/dialog/CalendarEvent";
import CalendarApp from "~/app/_components/CalendarApp";
import NavBar from "~/app/_components/navBar";

import { Button } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();

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
    <main className="h-screen w-full bg-main text-whiteApp">
      <CalendarEventCard />
      <article className="flex h-[92%] w-full flex-col space-y-5 overflow-y-auto px-6 pt-16 pb-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl">Calendário</h1>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="transparent"
              title="Criar Agendamento"
              onClick={() => router.push("/calendario/registro")}
            >
              <IconCirclePlus size={32} className="text-white" />
            </Button>
            <Info
              size={32}
              onClick={toggleInfoSection}
              className="info-icon cursor-pointer"
            />
          </div>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="info-section flex w-full flex-col space-y-2 rounded-md border p-2 text-sm"
            >
              <div className="flex w-full items-center justify-around">
                <p className="text-lg font-semibold">Informações:</p>
                <div>
                  <div className="flex items-center justify-between">
                    <p>Prioridade alta</p>
                    <div className="h-3 w-3 rounded-full bg-[#f91c45]"></div>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <p>Prioridade média</p>
                    <div className="h-3 w-3 rounded-full bg-[#FFFF00]"></div>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <p>Prioridade baixa</p>
                    <div className="h-3 w-3 rounded-full bg-[#44AF69]"></div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="overflow-y-auto rounded-md">
          <CalendarApp />
        </section>
      </article>
      <NavBar />
    </main>
  );
}
