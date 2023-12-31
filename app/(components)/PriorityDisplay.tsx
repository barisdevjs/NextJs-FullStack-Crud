import { TMongoTicket } from "@/types/generalTypes";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function PriorityDisplay({
  priority,
}: {
  priority: TMongoTicket["priority"];
}) {
  return (
    <div className="flex justify-start align-baseline">
      <FontAwesomeIcon
        icon={faFire}
        className={` pr-1 ${
          priority > 0 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={` pr-1 ${
          priority > 1 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={`  pr-1 ${
          priority > 2 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={` pr-1 ${
          priority > 3 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={` ${priority > 4 ? " text-red-400" : " text-slate-400"}`}
      />
    </div>
  );
}
