import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

interface SubTicketProps {
  params: {
    id: string;
  };
}

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

let updatedTicketData = {} as any;

async function SubTicket({ params }: SubTicketProps) {
  const EDITMODE = params.id !== "new";

  if (EDITMODE) {
    updatedTicketData = await getTicketById(params.id);
    console.log(updatedTicketData);
  } else {
    updatedTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updatedTicketData} />;
}

export default SubTicket;
