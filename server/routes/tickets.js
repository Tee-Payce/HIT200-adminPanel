import express from 'express';
const router = express.Router();
import Ticket from '../models/Tickets.js';

import { getTickets,   deleteTicket, getTicketCountsByDay } from '../controllers/tickets.js';

router.get('/tickets', getTickets);

router.delete('/tickets/:id', deleteTicket);
router.get('/tickets/daily', getTicketCountsByDay);

// GET /api/tickets
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// GET /api/tickets/:id
router.get('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// DELETE /api/tickets/:id
router.delete('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.remove();
    res.json({ message: 'Ticket removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;