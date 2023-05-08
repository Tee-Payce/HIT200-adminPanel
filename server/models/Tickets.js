 import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketInfo: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
