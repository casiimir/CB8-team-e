import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      await getAllEvents(req, res);
    case "POST":
      await newEvent(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    return res.status(200).json({ status: "OK", data: events });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero degli eventi!",
    });
  }
}

async function newEvent(req, res) {
  try {
    const {
      organizer,
      title,
      description,
      date,
      time,
      poster,
      city,
      place,
      address,
      category,
      capacity,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !poster ||
      !city ||
      !place ||
      !address ||
      !category ||
      !capacity ||
      !organizer
    ) {
      return res.status(400).json({
        status: "ERROR",
        error: "Tutti i campi obbligatori devono essere forniti!",
      });
    }

    const newEvent = new Event({
      organizer,
      title,
      description,
      date,
      time,
      poster,
      city,
      place,
      address,
      category,
      capacity,
    });

    await newEvent.save();

    return res.status(201).json({ status: "OK", data: newEvent });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante la creazione del nuovo evento!",
    });
  }
}
