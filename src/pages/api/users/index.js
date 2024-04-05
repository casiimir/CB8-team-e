import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {
  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      await getAllUsers(req, res);
    case "POST":
      await newUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllUsers(req, res) {
  try {
    const user = await User.find();
    return res.status(200).json({ success: "OK", data: user });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero degli utenti!",
    });
  }
}

async function newUser(req, res) {
  try {
    await dbConnect();

    const {
      name,
      surname,
      type,
      businessName,
      imageProfile,
      city,
      address,
      phoneNumber,
      username,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !surname ||
      !type ||
      !businessName ||
      !imageProfile ||
      !city ||
      !address ||
      !phoneNumber ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        status: "ERROR",
        error: "Tutti i campi obbligatori devono essere forniti!",
      });
    }

    const newUser = new User({
      name,
      surname,
      type,
      businessName,
      imageProfile,
      city,
      address,
      phoneNumber,
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: "Errore durante la creazione del nuovo User!",
    });
  }
}
