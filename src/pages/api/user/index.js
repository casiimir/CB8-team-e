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
    // case "PUT":
    //   await updateUser(req, res, query);
    // case "DELETE":
    //   await deleteUser(req, res, query);
    // default:
      break;
      default:
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).end(`Metodo ${method} non accettato!`);
          break;
  }
}


async function getAllUsers(req, res) {
  try {
    const user = await User.find();
    return res
    .status(200)
    .json({ success: "OK", data: user });
  } catch (error) {
    res.status(500).json({success: false, error: "Errore durante il recupero degli utenti"});
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
      password } = req.body;

if (!name || !surname || !type || !businessName || !imageProfile || !city || !address || !phoneNumber || !username || !email || !password) {
  return res.status(400).json({ success: false, error: "Tutti i campi obbligatori devono essere forniti" });
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
      password
    });

    await newUser.save();

    res
    .status(201)
    .json({ newUser });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Errore durante la creazione del nuovo User",
    });
  }
}

// async function updateUser(req, res, query) {
//   try {
//     const user = await User.findById(query.id);

//     if (!user) {
//       res.status(404).json({ message: "Utente non trovato" });
//     } else {

//       const {
//        name,
//       surname,
//       type,
//       businessName,
//       imageProfile,
//       city,
//       address,
//       phoneNumber,
//       username,
//       email,
//       password
//       } = body;

//       if (
//         name &&
//         surname &&
//         type &&
//         businessName &&
//         imageProfile &&
//         city &&
//         address &&
//         phoneNumber &&
//         username &&
//         email &&
//         password
//       ) {
//         user.name = name;
//         user.surname = surname;
//         user.type = type;
//         user.businessName = businessName;
//         user.imageProfile = imageProfile;
//         user.city = city;
//         user.address = address;
//         user.phoneNumber = phoneNumber;
//         user.username = username;
//         user.email = email;
//         user.password = password;
       
//       await user.save();
//         res.status(201).json({ message: "Utente modificato!" });
//       } else {
//         res
//           .status(400)
//           .json({ message: "Devi fornire tutti i campi richiesti" });
//       }
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

// async function deleteUser(req, res, query) {
//   try {
//     const user = await User.findById(query.id);
//     if (!user) {
//       res.status(404).json({ message: "Utente non trovato" });
//     } else {
//       await user.delete();
//       res.status(201).json({ message: "Utente cancellato!" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }
