import { Category, TMongoTicket } from "@/types/generalTypes";

/////////////////////////      DATE_TIME FORMATTER    /////////////////////////
const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "numeric",
};

export function dateFormatTr(date: string): string {
  return new Intl.DateTimeFormat("tr", options).format(new Date(date));
}

/////////////////////////      CATEGORIES    /////////////////////////

export const categories: Category[] = [
  Category.HardwareProblem,
  Category.SoftwareProblem,
  Category.ApplicationDevelopment,
  Category.Project,
];

export interface GetResponse {
  tickets: TMongoTicket[];
}

export interface ErrorResponse {
  message: string;
  err: Error;
}

export interface GetSingleTicketResponse {
  ticket: TMongoTicket;
}
