import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method, query } = req;
  await dbConnect();

  if (method != "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Metodo ${method} non accettato!`);
  }

  const events = await Event.find({ $and: [query] });
  return res.status(200).json({ status: "OK", data: events });
}
