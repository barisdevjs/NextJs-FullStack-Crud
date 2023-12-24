import { TMongoTicket } from "@/types/generalTypes";
import mongoose, { Schema, Document } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

interface ITicket
  extends Pick<
      TMongoTicket,
      Exclude<keyof TMongoTicket, "_id" | "__v" | "createdAt" | "updatedAt">
    >,
    Document {}

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);
export default Ticket;
