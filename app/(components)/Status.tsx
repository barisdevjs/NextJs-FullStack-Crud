import { TMongoTicket } from "@/types/generalTypes";
import React from "react";

export default function Status({ status }: { status: TMongoTicket["status"] }) {
  const getColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "bg-green-200";
      case "started":
        return "bg-yellow-200";
      case "todo":
        return "bg-red-200";
      default:
        return "bg-slate-700";
    }
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}
