import React from "react";
import TicketCard from "./(components)/TicketCard";
import { Category, TMongoTicket } from "@/types/generalTypes";
import { GetResponse } from "@/libs/utils";

const getTickets = async (): Promise<GetResponse | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Home() {
  const data = await getTickets();

  if (!data?.tickets) {
    return <p>No tickets.</p>;
  }

  const tickets: TMongoTicket[] = data.tickets;
  const uniqueCategories = [
    ...new Set<Category>(
      tickets?.map(({ category }: { category: Category }) => category)
    ),
  ];

  return (
    <div className="p-4 lg:grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {tickets &&
        uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div
            key={categoryIndex}
            className="mb-4 border-yellow-400 border-2 border-dashed"
          >
            <h4 className="pl-2">{uniqueCategory}</h4>
            <div className="lg:grid grid-cols-2">
              {tickets
                .filter(
                  (ticket: TMongoTicket) => ticket.category === uniqueCategory
                )
                .map((filteredTicket: TMongoTicket) => (
                  <TicketCard
                    key={filteredTicket._id}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
