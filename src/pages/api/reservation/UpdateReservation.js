
import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";


export default async function handler(req, res) {
    const { method, query, body } = req;
  
    await dbConnect();
  
    switch (method) {
      case "PUT":
        try {
          const reservation = await Reservation.findById(query.id);
  
          if (!reservation) {
            res.status(404).json({ message: "Prenotazione non trovata" });
          } else {
            const { title, description, date, time, poster, city, place, address, category, capacity } = body;
  
            if (title && description && date && time && poster && city && place && address && category && capacity) {
                reservation.title = title;
                reservation.description = description;
                reservation.date = date;
                reservation.time = time;
                reservation.poster = poster;
                reservation.city = city;
                reservation.place = place;
                reservation.address = address;
                reservation.category = category;
                reservation.capacity = capacity;
                
              await reservation.save();
              res.status(201).json({ message: "Prenotazione modificata!" });
            } else {
              res.status(400).json({ message: "Devi fornire tutti i campi richiesti" });
            }
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
        break;
      default:
        res.status(405).json({ message: "Metodo non consentito" });
        break;
    }
  }