import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import router from "./routes/tickets.js"
//DATA IMPORTS
import User from "./models/User.js"
import Meal from "./models/Meal.js";
import MealStat from "./models/MealStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js"
import { meals } from "./data/meals.js";
import { mealsStat,dataOverallStat } from "./data/index.js";
import {users} from "./data/users.js"
import {dataTransaction} from "./data/dataTransaction.js"
import Ticket from "./models/Tickets.js"

/*configurations*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/tickets", router);

/*ticket get , post and other functions*/

const slots = ["12PM-2PM", "4PM-6PM"];
const assignedSlots = new Set();

app.post("/tickets", async (req, res) => {
  const { tickets } = req.body;

  // Create an array to store the created tickets
  const createdTickets = [];

  // Loop through each ticket object in the tickets array
  for (let i = 0; i < tickets.length; i++) {
    const { ticketInfo, quantity, user } = tickets[i];

    // Create a new ticket object with the assigned slot
    const ticketId = generateTicketId();
    const ticket = new Ticket({
      ticketInfo,
      ticketId,
      quantity,
      user,
    });

    // Save the ticket to the database and push it to the createdTickets array
    try {
      const createdTicket = await ticket.save();
      createdTickets.push(createdTicket);
    } catch (error) {
      res.status(500).send({ error: "Failed to create ticket" });
      return;
    }
  }

  res.send({ message: "Tickets created", tickets: createdTickets });
});
// make route to get all tickets
app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find({ used: false });
    res.send({ tickets });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to retrieve tickets" });
  }
});

app.put("/tickets/:ticketId/verify", async (req, res) => {
  console.log("verify");
  const { ticketId } = req.params;

  try {
    // Find the ticket with the specified ID
    const ticket = await Ticket.findOne({ ticketId });

    // If the ticket does not exist, return an error
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    // If the ticket has already been used, return an error
    if (ticket.used) {
      return res.status(400).send({ error: "Ticket has already been used" });
    }

    // Mark the ticket as used and save it to the database
    ticket.used = true;
    await ticket.save();

    res.send({ message: "Ticket verified", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to verify ticket" });
  }
});

// make a route for acquiring multiple tickets and saving them to the database each eith an uniqu id

function generateTickets(numTickets, mealType) {
  const tickets = [];
  for (let i = 0; i < numTickets; i++) {
    const ticketId = generateTicketId();
    const ticketInfo = {
      mealType,
      // Add any other ticket info properties as needed
    };
    const ticket = new Ticket({ ticketInfo, ticketId });
    tickets.push(ticket);
  }
  return tickets;
}

function generateTicketId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketId = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    ticketId += chars[randomIndex];
  }
  return ticketId;
}
const lunchTimeSlots = [
  "12:00 PM - 12:30 PM",
  "12:30 PM - 1:00 PM",
  "1:00 PM - 1:30 PM",
  "1:30 PM - 2:00 PM",
];

const dinnerTimeSlots = [
  "4:00 PM - 4:30 PM",
  "4:30 PM - 5:00 PM",
  "5:00 PM - 5:30 PM",
  "5:30 PM - 6:00 PM",
];

let assignedLunchTimeSlots = [];
let assignedDinnerTimeSlots = [];

const resetAssignedTimeSlots = () => {
  assignedLunchTimeSlots = [];
  assignedDinnerTimeSlots = [];
};

const getCurrentLunchTimeSlot = () => {
  const availableTimeSlots = lunchTimeSlots.filter(
    (slot) => assignedLunchTimeSlots.filter((s) => s === slot).length < 3
  );

  if (availableTimeSlots.length === 0) {
    resetAssignedTimeSlots();
    throw new Error("No available lunch time slots");
  }

  const randomIndex = Math.floor(Math.random() * availableTimeSlots.length);
  const timeSlot = availableTimeSlots[randomIndex];
  assignedLunchTimeSlots.push(timeSlot);
  return timeSlot;
};

const getCurrentDinnerTimeSlot = () => {
  const availableTimeSlots = dinnerTimeSlots.filter(
    (slot) => assignedDinnerTimeSlots.filter((s) => s === slot).length < 3
  );

  if (availableTimeSlots.length === 0) {
    resetAssignedTimeSlots();
    throw new Error("No available dinner time slots");
  }

  const randomIndex = Math.floor(Math.random() * availableTimeSlots.length);
  const timeSlot = availableTimeSlots[randomIndex];
  assignedDinnerTimeSlots.push(timeSlot);
  return timeSlot;
};

app.get("/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const { slotType } = req.query; // Use req.query instead of req.body

  try {
    // Find the ticket with the specified ID
    const ticket = await Ticket.findOne({ ticketId });

    // If the ticket does not exist, return an error
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    // If the ticket has already been used, return an error
    if (ticket.used) {
      return res.status(400).send({ error: "Ticket has already been used" });
    }

    // Assign a time slot based on the slotType selected
    let timeSlot = null;
    if (slotType === "Lunch") {
      timeSlot = getCurrentLunchTimeSlot();
    } else {
      timeSlot = getCurrentDinnerTimeSlot();
    }

    // Update the ticket object with the assigned time slot and mark it as used
    ticket.slot = timeSlot;
    ticket.used = true;

    // Save the updated ticket object to the database
    await ticket.save();

    res.send({
      message: "Ticket verified",
      ticket: { ticketId: ticket.ticketId, slot: ticket.slot },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to verify ticket" });
  }
});


    
 

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server working on Port: ${PORT}`));
        /* ONLY ADD DATA ONE TIME */
       // User.insertMany(users);
        // AffiliateStat.insertMany(dataAffiliateStat);
         OverallStat.insertMany(dataOverallStat); 
       // Meals.insertMany(meals);
       //MealStat.insertMany(mealsStat);
        //Transaction.insertMany(dataTransaction);
        // User.insertMany(dataUser);
    })
    .catch((error) => console.log(`${error} did not connect`));
