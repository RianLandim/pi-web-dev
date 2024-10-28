// services/clientService.ts

export async function fetchClientById(clientId: string) {
  const response = await fetch(`/api/clients/${clientId}`);
  // console.log("qury")
  if (!response.ok) {
    throw new Error("Failed to fetch client data");
  }
  return response.json();
}