
import Reservation from "../../../../models/Reservation";
import dbConnect from "../../../libs/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { eventId } = req.query;

  switch (method) {
    case 'GET':
      await handleGetRequest(eventId, res);
      break;
    default:
      res.status(405).json({ success: false, error: 'Metodo non consentito' });
      break;
  }
}

async function handleGetRequest(eventId, res) {
  try {
    await dbConnect();

    const reservation = await Reservation.findById(eventId);

    if (!reservation) {
      return res.status(404).json({ success: false, error: 'Prenotazione non trovata' });
    }

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Errore durante il recupero dell\'evento' });
  }
}