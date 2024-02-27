export type TICKETMODE = "new" | string;

export enum Category {
  HardwareProblem = "Hardware Problem",
  SoftwareProblem = "Software Problem",
  ApplicationDevelopment = "Application Development",
  Project = "Project",
}

export type TStatus = "done" | "started" | "todo";

export type TMongoTicket = {
  _id: string;
  title: string;
  description: string;
  category: Category;
  priority: number;
  progress: number;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/************* USER *************/
export interface IUser {
  name: string;
  email: string;
  password: string;
  id: string;
}
