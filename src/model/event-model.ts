import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface EventDocument extends mongoose.Document {
  eventId: string;
  hostId: mongoose.Schema.Types.ObjectId; // Reference to the host user
  title: string;
  description?: string;
  date: Date;
  location: string;
  startTime: String;
  endTime: String;
  isActive?: boolean; // Optional field to indicate if the event is active
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  attendees?: mongoose.Schema.Types.ObjectId[]; // Optional reference to attendees
  tickets?: mongoose.Schema.Types.ObjectId[]; // Optional reference to tickets
}

const eventSchema = new mongoose.Schema<EventDocument>(
  {
    eventId: { type: String, required: true, unique: true, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    link: { type: String, required: false },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
