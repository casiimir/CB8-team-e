import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {

    const { method, query: { id } } = req;
  
    await dbConnect();
  
        switch (method) {
        case "GET":
        await getUser(id, res);
        break;
        case "PUT":
        await updateUser(id, req, res);
        break;
        case "DELETE":
        await deleteUser(id, req, res);
        break;
        default:
          res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
          res.status(405).end(`Metodo ${method} non accettato!`);
    }
  }
  
async function getUser(id, res) {
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "Utente non trovato" });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          error: "Errore durante il recupero dell'utente",
        });
    }
  }
  
  async function updateUser(id, req, res) {
    const  {body} = req;

    try {
      const user = await User.findByIdAndUpdate(id, body, {new : true});
  
      if (!user) {
        return res.status(404).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(400).json({ success: false }); }
     }
  
   async function deleteUser(id, req, res) {
  
    try {
      const deleteUser = await User.deleteOne({ _id: id });
  
      if (!deleteUser) {      
        return res.status(404).json({ success: false });
      }
  
      res.status(204).json({ success: true, data: {} });
      } catch (error) {
      res.status(400).json({ success: false });}
    }
  
  