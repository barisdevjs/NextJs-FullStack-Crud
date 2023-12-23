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

let updateTicketData = {} as any;

async function SubTicket({ params }: SubTicketProps) {
  const EDITMODE = params.id !== "new";

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm />;
}

export default SubTicket;
