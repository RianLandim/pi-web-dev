"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";
import magnifier from "../../public/magnifier.svg";
import { useState } from "react";
import NavBar from "../components/navBar";
import CardNotification from "../pagamentos/components/PaymentCard";

export default function PaymentsPage() {
  const [name, setName] = useState("");

  const notifications = [
    { data: "12/12/1221", name: "Wesley", isPayed: true },
    { data: "12/12/1221", name: "Maria", isPayed: false },
    { data: "12/12/1221", name: "João", isPayed: true },
    { data: "12/12/1221", name: "Carlos", isPayed: false },
    { data: "12/12/1221", name: "Ana", isPayed: true },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
    { data: "12/12/1221", name: "Wesley", isPayed: false },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredNotifications = notifications.filter((notifications) =>
    notifications.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col ">
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
            <input
              className="placeholder:pl-2 w-full text-black p-2 rounded-xl"
              placeholder="Pesquise pelo nome..."
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </section>

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col pb-6">
          {notifications.length > 0 ? (
            notifications.map((notifications, index) => (
              <CardNotification
                key={index}
                data={notifications.data}
                name={notifications.name}
                isPayed={notifications.isPayed}
              />
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </section>
        <NavBar />
      </article>
    </main>
  );
}