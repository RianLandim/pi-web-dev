"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";
import magnifier from "../../public/magnifier.svg";
import { useState } from "react";
import NavBar from "../components/navBar";
import NotificationOfPaymentCard from "./components/NotificationOfPaymentCard";
import NotificationOfSchedulingDoneCard from "./components/NotificationOfSchedulingDoneCard";
import NotificationForRemeberScheduling from "./components/NotificationForRemeberScheduling";

type NotificationType
 =
  | "all"
  | "payment"
  | "schedulingDone"
  | "rememberScheduling";

export default function PaymentsPage() {
  const [notificationType, setNotificationType] =
    useState<NotificationType>("all");

  const notificationOfPayment = [
    { data: "12/12/1221", name: "Wesley", isPayed: true, type: "payment" },
    { data: "12/12/1221", name: "Maria", isPayed: false, type: "payment" },
  ];

  const notificationOfSchedulingDone = [
    {
      data: "12/12/1221",
      name: "Wesley",
      isPayed: true,
      type: "schedulingDone",
    },
    {
      data: "12/12/1221",
      name: "Maria",
      isPayed: false,
      type: "schedulingDone",
    },
  ];

  const notificationForRememberScheduling = [
    {
      data: "12/12/1221",
      name: "Wesley",
      isPayed: true,
      type: "rememberScheduling",
    },
    {
      data: "12/12/1221",
      name: "Maria",
      isPayed: false,
      type: "rememberScheduling",
    },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredNotifications = {
    payment: notificationOfPayment.filter(
      (notification) => notification.type === notificationType
    ),
    schedulingDone: notificationOfSchedulingDone.filter(
      (notification) => notification.type === notificationType
    ),
    rememberScheduling: notificationForRememberScheduling.filter(
      (notification) => notification.type === notificationType
    ),
    all: [
      ...notificationOfPayment,
      ...notificationOfSchedulingDone,
      ...notificationForRememberScheduling,
    ],
  };

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="pb-6 h-[92%] w-full space-y-5 px-6 flex flex-col ">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl">Notificações</h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>

        <section className="flex space-x-2 items-center h-fit">
          <div className="flex w-full rounded-md bg-whiteApp">
            <Image
              className="bg-grayApp w-[15%] p-2 rounded-md"
              src={magnifier}
              width={25}
              height={25}
              alt="maginifierIcon"
            />
            <select
              className="p-2 w-[85%] bg-whiteApp rounded-md text-black"
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value as NotificationType)}
            >
              <option value="all">Todos</option>
              <option value="payment">Pagamentos</option>
              <option value="schedulingDone">Agendamentos Concluídos</option>
              <option value="rememberScheduling">
                Lembretes de Agendamento
              </option>
            </select>
          </div>
        </section>

        {/* Lista de notificações filtradas */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col">
          {filteredNotifications[notificationType].map(
            (notification, index) => {
              if (notification.type === "payment") {
                return (
                  <NotificationOfPaymentCard
                    key={`payment-${index}`}
                    data={notification.data}
                    name={notification.name}
                    isPayed={notification.isPayed}
                  />
                );
              } else if (notification.type === "schedulingDone") {
                return (
                  <NotificationOfSchedulingDoneCard
                    key={`schedulingDone-${index}`}
                    data={notification.data}
                    name={notification.name}
                  />
                );
              } else if (notification.type === "rememberScheduling") {
                return (
                  <NotificationForRemeberScheduling
                    key={`rememberScheduling-${index}`}
                    data={notification.data}
                    name={notification.name}
                  />
                );
              }
            }
          )}
        </section>

        <NavBar />
      </article>
    </main>
  );
}
