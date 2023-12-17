import React from "react";

interface SubTicketProps {
  params: {
    id: string;
  };
}

function SubTicket({ params }: SubTicketProps) {
  return <div>SubTicket {params.id}</div>;
}

export default SubTicket;
