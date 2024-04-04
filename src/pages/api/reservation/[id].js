import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {

    const { method, query: { id } } = req;
  
    await dbConnect();
  
        switch (method) {
        case "GET":
        await getReservation(id, res);
        break;
        case "PUT":
        await updateReservation(id, req, res);
        break;
        case "DELETE":
        await deleteReservation(id, req, res);
        break;
        default:
          res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
          res.status(405).end(`Metodo ${method} non accettato!`);
    }
  }
  
async function getReservation(id, res) {
    try {
      const reservation = await Reservation.findById(id);
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: "Prenotazione non trovata" });
      }
  
      res.status(200).json({ success: true, data: reservation });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          error: "Errore durante il recupero della prenotazione",
        });
    }
  }
  
  async function updateReservation(id, req, res) {
    const  {body} = req;

    try {
      const reservation = await Reservation.findByIdAndUpdate(id, body, {new : true});
  
      if (!removeEventListenereservation) {
        return res.status(404).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: reservation });
    } catch (error) {
      return res.status(400).json({ success: false }); }
     }
  
   async function deleteReservation(id, req, res) {
  
    try {
      const deleteReservation = await Reservation.deleteOne({ _id: id });
  
      if (!deleteReservation) {      
        return res.status(404).json({ success: false });
      }
  
      res.status(204).json({ success: true, data: {} });
      } catch (error) {
      res.status(400).json({ success: false });}
    }
  
  