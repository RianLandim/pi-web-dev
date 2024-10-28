"use client";
import Image from "next/image";
import arrowBack from "@/public/arrowBack.svg";
import NavBar from "../../components/navBar";
import EspecificPaymentCard from "../components/EspecificPaymentCard";
import { useState } from "react";
import { fetchClientById } from "../components/hooks/ClientService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../components/loadingPage";
import ErrorPage from "../../../components/ErrorPage";

export default function ClientPaymentsPage({
  params,
}: {
  params: { clientId: string };
}) {
  // Ordenation
  const [isAscending, setIsAscending] = useState(true);

  // Requisição para buscar o cliente usando TanStack Query
  const { clientId } = params;
  const {
    data: clientData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClientById(clientId),
  });

  // Lidar com estado de carregamento e erro
  if (isLoading) return <LoadingPage />;
  // if (error) return <ErrorPage />;

  const clients = [
    {
      data: "12/12/1200",
      name: "Wesley",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2010",
    },
    {
      data: "12/12/1221",
      name: "Maria",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2009",
    },
    {
      data: "12/12/2000",
      name: "João",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2007",
    },
    {
      data: "12/12/2020",
      name: "Carlos",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/206",
    },
    {
      data: "12/12/2021",
      name: "Ana",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2004",
    },
    {
      data: "12/12/2022",
      name: "Wesley",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2003",
    },
    {
      data: "12/12/2024",
      name: "Wesley",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2000",
    },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
  ];

  const sortedClients = clients.sort((a, b) => {
    // Converte a data para formato YYYY-MM-DD
    const dateA = new Date(a.paymentDeadline.split("/").reverse().join("-"));
    const dateB = new Date(b.paymentDeadline.split("/").reverse().join("-"));

    // Alterna entre crescente e decrescente baseado no estado isAscending
    return isAscending
      ? dateA.getTime() - dateB.getTime() // Crescente
      : dateB.getTime() - dateA.getTime(); // Decrescente
  });

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col pb-6">
        <div className="flex justify-between w-full items-center">
          {/*  I want to write the name of the cliente below */}
          <h1 className="text-xl">Pagamento(s) do {clientData?.name}</h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>

        {/* Botão para alternar a ordem de ordenação */}
        <div className="flex space-x-3 items-center w-full">
          <p>Ordenar por data: </p>
          <button
            onClick={toggleSortOrder}
            className="border text-white px-2 py-1 rounded-md w-fit text-xs"
          >
            {isAscending ? "Crescente" : "Decrescente"}
          </button>
        </div>

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col">
          {sortedClients.map((client, index) => (
            <EspecificPaymentCard
              key={index}
              serviceType="Conserto Geladeira"
              paymentDeadline={client.paymentDeadline}
              value={client.value}
              data={client.data}
              name={client.name}
              isPayed={client.isPayed}
            />
          ))}
        </section>
        <NavBar />
      </article>
    </main>
  );
}
