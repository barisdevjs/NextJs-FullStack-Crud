import React from "react";
import TicketCard from "./(components)/TicketCard";
import { Category, TMongoTicket } from "@/types/generalTypes";

const getTickets = async () => {
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
    <div className="m-4">
      {tickets &&
        uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2 className="pl-2">{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
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
