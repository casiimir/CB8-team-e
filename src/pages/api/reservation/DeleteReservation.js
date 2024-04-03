import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
    const { method, query } = req;

    await dbConnect();

    switch (method) {
        case "DELETE":
            try {
                const reservation = await Reservation.findById(query.id);
                if (!reservation) {
                    res.status(404).json({ message: "Prenotazione non trovata" });
                } else {
                    await reservation.delete();
                    res.status(201).json({ message: "Prenotazione cancellata!" });
                }
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
                break;
            } }