import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {

  const { method, query: { id }, body} = req;

  await dbConnect();

      switch (method) {
      case "GET":
      return await  getEvent(id, res);
      break;
      case "PUT":
        return await updateEvent(id, req, res);
      break;
      case "DELETE":
        return  await deleteEvent(id, req, res);
      break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getEvent(id, res) {
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404).json({ success: false, error: "Evento non trovato" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        error: "Errore durante il recupero dell'evento",
      });
  }
}

async function updateEvent(id, req, res) {
const  {body} = req;
  try {
    const event = await Event.findByIdAndUpdate(id, body, {new : true});

    if (!event) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    return res.status(400).json({ success: false });
  } }

 async function deleteEvent(id, req, res) {

  try {
    const deletedEvent = await Event.deleteOne({ _id: id });

    if (!deletedEvent) {      
      return res.status(404).json({ success: false });
    }

    res.status(204).json({ success: true, data: {} });
    } catch (error) {
    res.status(400).json({ success: false });}}

