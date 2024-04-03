// GET DINAMICA CITTA'  - MOSTRA TUTTI GLI EVENTI IN ORDINE DI DATA PER CITTA'

import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  const { city } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({ city }).sort({ date: 1 });
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, message: "Metodo non consentito" });
  }
}
