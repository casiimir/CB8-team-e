// GET DINAMICA EVENTO - MOSTRA IL SINGOLO EVENTO TRAMITE ID

import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  const { eventId } = req.query;

  switch (method) {
    case "GET":
      await handleGetRequest(eventId, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Metodo non consentito" });
      break;
  }
}

async function handleGetRequest(eventId, res) {
  try {
    await dbConnect();

    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, error: "Evento non trovato" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Errore durante il recupero dell'evento",
      });
  }
}
