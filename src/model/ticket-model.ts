import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface TicketDocument extends mongoose.Document {
  ticketId: string;
  title: string;
  description: string;
  price: number;
  eventDate: Date;
  eventId: mongoose.Schema.Types.ObjectId; // Reference to the user who created the ticket
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new mongoose.Schema<TicketDocument>(
  {
    ticketId: { type: String, required: true, unique: true, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    eventDate: { type: Date, required: true },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model<TicketDocument>("Ticket", ticketSchema);
