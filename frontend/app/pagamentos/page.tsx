// "use client";
// import { cardClientProperties } from "./components/test";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from "@tanstack/react-query";
// import CardClient from "./components/test";
// import { useState } from "react";
// import AppMainBar from "../components/AppMainBar";

// // Fetch function that returns the client cards
// const fetchClientCards = async (): Promise<cardClientProperties[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { name: "Wesley", paymentStatus: true, date: "30/08/24" },
//         { name: "Alice", paymentStatus: false, date: "29/08/24" },
//         { name: "Bob", paymentStatus: true, date: "28/08/24" },
//         { name: "Charlie", date: "27/08/24" }, // No paymentStatus, defaults to undefined
//         { name: "Diana", paymentStatus: false, date: "26/08/24" },
//       ]);
//     }, 1000); // Simulate network delay
//   });
// };

// // Component that renders the payment page
// function PaymentPageContent() {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["clientCards"],
//     queryFn: fetchClientCards,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading client cards</div>;

//   return (
//     <div className="flex items-center border-red-500 justify-center h-screen w-full">
//       <div className="w-fit border border-red-500 flex flex-col space-y-5 ">
//         <h1>Status de Pagamento:</h1>
//         {data?.map((card, index) => (
//           <CardClient
//             key={index}
//             date={card.date}
//             name={card.name}
//             paymentStatus={card.paymentStatus}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function PaymentPage() {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <PaymentPageContent />
//       <AppMainBar />
//     </QueryClientProvider>
//   );
// }
