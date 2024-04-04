import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
<<<<<<< HEAD
  const { method } = req;
=======
  const { method, query } = req;
>>>>>>> refs/remotes/origin/Database-configuration
  await dbConnect();

  switch (method) {
    case "GET":
      await getAllEvents(req, res);
<<<<<<< HEAD
      case "POST":
      await newEvent(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Metodo ${method} non accettato!`);
        }
=======
    case "POST":
      await newEvent(req, res);
    case "PUT":
      await updateEvent(req, res, query);
    case "DELETE":
      await deleteEvent(req, res, query);
    default:
      break;
  }
>>>>>>> refs/remotes/origin/Database-configuration
}

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
<<<<<<< HEAD
    return res
    .status(200)
    .json({ success: "OK", data: events });
  } catch (error) {
    res.status(500).json({success: false, error: "Errore durante il recupero degli eventi"});
=======

    return res.status(200).json({ success: "OK", data: events });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Errore durante il recupero degli eventi",
    });
>>>>>>> refs/remotes/origin/Database-configuration
  }
}

async function newEvent(req, res) {
  try {
<<<<<<< HEAD

    const {
      organizer,
=======
    await dbConnect();

    const {
>>>>>>> refs/remotes/origin/Database-configuration
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

<<<<<<< HEAD
    if (!title || !description || !date || !time || !poster || !city || !place || !address || !category || !capacity || !organizer)  {
      return res.status(400).json({success: false, error: "Tutti i campi obbligatori devono essere forniti" });
        }

    const newEvent = new Event({
      organizer,
=======
    if (!title || !date || !time || !city || !place || !category) {
      return res.status(400).json({
        success: false,
        error: "Tutti i campi obbligatori devono essere forniti",
      });
    }
    const newEvent = new Event({
>>>>>>> refs/remotes/origin/Database-configuration
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

<<<<<<< HEAD
    res
    .status(201)
    .json({ newEvent });
  
=======
    res.status(201).json({ newEvent });
>>>>>>> refs/remotes/origin/Database-configuration
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Errore durante la creazione del nuovo evento",
    });
  }
}
<<<<<<< HEAD
=======

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
>>>>>>> refs/remotes/origin/Database-configuration
