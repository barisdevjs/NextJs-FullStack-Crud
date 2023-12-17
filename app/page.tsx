import Image from "next/image";
import React from "react";
import TicketCard from "./(components)/TicketCard";

export default function Home() {
  return (
    <React.Fragment>
      <p>Home</p>
      <TicketCard />
    </React.Fragment>
  );
}
