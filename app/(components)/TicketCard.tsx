import { dateFormatTr } from "@/libs/utils";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import Status from "./Status";
import Link from "next/link";
import { TMongoTicket } from "@/types/generalTypes";

function TicketCard({ ticket }: { ticket: TMongoTicket }) {
  console.log({ ticket });
  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock _id={ticket._id} />
        </div>
      </div>
      <Link href={`/Ticket/${ticket._id}`} style={{ display: "contents" }}>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{dateFormatTr(ticket.createdAt)}</p>
            <ProgressBar progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <Status status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TicketCard;
