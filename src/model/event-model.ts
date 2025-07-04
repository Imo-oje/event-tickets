import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface EventDocument extends mongoose.Document {
  eventId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  tickets?: mongoose.Schema.Types.ObjectId[]; // Optional reference to tickets
}

const eventSchema = new mongoose.Schema<EventDocument>(
  {
    eventId: { type: String, required: true, unique: true, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
