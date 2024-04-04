import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
    const { method, query } = req;
    await dbConnect();
    
    switch (method) {
        case "GET":
        await getAllReservation(req, res);
        break;
        case "POST":
        await newReservation(req, res);
        break;
        default:
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).end(`Metodo ${method} non accettato!`);
          break;
    }
    }

    async function getAllReservation(req, res) {
        try {
          const reservation = await Reservation.find();
      
          return res.status(200).json({ success: "OK", data: reservation });
        } catch (error) {
          res.status(500).json({ success: false, error: "Errore durante il recupero degli eventi" });
        }
      }
      
    async function newReservation(req, res) {
        try {
            const { userId, eventId, ticketsBooked } = req.body;

            if (!ticketsBooked) {
                return res.status(400).json({ success: false, error: "Inserisci il numero di prenotazioni" });
            }
        
            const newReservation = new Reservation({ userId, eventId, ticketsBooked });
        
            await newReservation.save();
        
            res.status(201).json({ newReservation });
          
          } catch (error) {
            res.status(500).json({
              success: false,
              error: "Errore durante la creazione della nuova prenotazione",
            });
          }
        }
        
