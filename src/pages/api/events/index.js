import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      await getAllEvents(req, res);
    case "POST":
      await newEvent(req, res);
    case "PUT":
      await updateEvent(req, res, query);
    case "DELETE":
      await deleteEvent(req, res, query);
    default:
      break;
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();

    return res.status(200).json({ success: "OK", data: events });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Errore durante il recupero degli eventi",
    });
  }
}

async function newEvent(req, res) {
  try {
    await dbConnect();

    const {
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

    if (!title || !date || !time || !city || !place || !category) {
      return res.status(400).json({
        success: false,
        error: "Tutti i campi obbligatori devono essere forniti",
      });
    }
    const newEvent = new Event({
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

    res.status(201).json({ newEvent });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Errore durante la creazione del nuovo evento",
    });
  }
}

async function updateEvent(req, res, query) {
  try {
    const event = await Event.findById(query.id);

    if (!event) {
      res.status(404).json({ message: "Evento non trovato" });
    } else {
      const {
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
      } = body;

      if (
        title &&
        description &&
        date &&
        time &&
        poster &&
        city &&
        place &&
        address &&
        category &&
        capacity
      ) {
        event.title = title;
        event.description = description;
        event.date = date;
        event.time = time;
        event.poster = poster;
        event.city = city;
        event.place = place;
        event.address = address;
        event.category = category;
        event.capacity = capacity;

        await event.save();
        res.status(201).json({ message: "Evento modificato!" });
      } else {
        res
          .status(400)
          .json({ message: "Devi fornire tutti i campi richiesti" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteEvent(req, res, query) {
  try {
    const event = await Event.findById(query.id);
    if (!event) {
      res.status(404).json({ message: "Evento non trovato" });
    } else {
      await event.delete();
      res.status(201).json({ message: "Evento cancellato!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
