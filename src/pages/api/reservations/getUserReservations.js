import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method != "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Metodo ${method} non accettato!`);
  }

  const reservations = await Reservation.find({ userId: req.query.userId });

  if (!reservations) {
    return res.status(401).json({
      status: "ERROR",
      error: `Nessuna prenotazione trovata con userID ${userId}`,
    });
  }

  return res.status(200).json({ status: "OK", data: reservations });
}
