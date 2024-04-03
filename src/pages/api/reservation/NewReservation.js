import dbConnect from "../../../../libs/dbConnect"; 
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
         case 'POST':
        await handlePostRequest(req, res);
        break;
      default:
        res.status(405).json({ success: false, error: 'Metodo non consentito' });
        break;
    }
  }
  
  async function handlePostRequest(req, res) {
     try {
    await dbConnect();

    const { userId, eventId, ticketsBooked} = req.body;
     const newReservation = new Reservation({
         userId,
         eventId,
         ticketsBooked,
     });  
     
     await newReservation.save();

     res.status(201).json({ newReservation });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Errore durante la creazione della nuova prenotazione' });
    }}