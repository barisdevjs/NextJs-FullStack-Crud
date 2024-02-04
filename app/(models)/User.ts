import { IUser } from "@/types/generalTypes";
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

// interface ITicket
//   extends Pick<
//       TMongoTicket,
//       Exclude<keyof TMongoTicket, "_id" | "__v" | "createdAt" | "updatedAt">
//     >,
//     Document {}

// const ticketSchema = new Schema(
//   {
//     title: String,
//     description: String,
//     category: String,
//     priority: Number,
//     progress: String,
//     status: String,
//   },
//   {
//     timestamps: true,
//   }
// );
