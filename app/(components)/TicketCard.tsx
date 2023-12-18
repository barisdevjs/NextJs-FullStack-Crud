import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import Status from "./Status";

function TicketCard() {
  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={2} />
        <div className="ml-auto">
          <DeleteBlock id="33" />
        </div>
      </div>
      <h4>Ticket Title</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">This is the ticket description</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">08/23/23 10:44PM</p>
          <ProgressBar progress={70} />
        </div>
        <div className="ml-auto flex items-end">
          <Status status={"done"} />
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
