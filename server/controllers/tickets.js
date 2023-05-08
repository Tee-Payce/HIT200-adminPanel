
// controllers/tickets.js
import Ticket from '../models/Tickets.js';

export async function getTickets(req, res) {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  };
};



export async function deleteTicket(req, res) {
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
  };
};

export async function getTicketCountsByDay(req, res) {
  try {
    const ticketCounts = await Ticket.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$purchasedAt' },
            month: { $month: '$purchasedAt' },
            day: { $dayOfMonth: '$purchasedAt' },
          },
          count: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
            },
          },
          count: 1,
        },
      },
    ]);

    res.json(ticketCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  };
};
