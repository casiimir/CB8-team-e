import path from "path";
import fs from "fs/promises";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  let options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return path.originalFilename;
    };
  }
  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      const uploadedFile = files.file[0]; // Assuming the file key is "file"

      if (uploadedFile) {
        resolve({ fields, files, filename: uploadedFile.originalFilename });
      } else {
        resolve({ fields, files, filename: null }); // Handle no file case
      }
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }

  const { filename } = await readFile(req, true);
  res.json({ done: "ok", filename }); // Include filename in response

  // const form = formidable({});
  // form.parse(req, (err, fields, files) => {});

  // try {
  //   const uploadedFile = await upload.single("file")(req, res);

  //   if (uploadedFile instanceof multer.MulterError) {
  //     return res.status(400).json({
  //       message: "Errore nel caricamento del file",
  //       error: uploadedFile,
  //     });
  //   }
  //   const { path: tempFilePath, originalname } = uploadedFile;
  //   const fileName = originalname; // Implement validation here if needed

  //   const targetPath = path.join(process.cwd(), "public/uploads", fileName);

  //   await fs.promises.rename(tempFilePath, targetPath);

  //   return res.status(200).json({
  //     message: "File caricato con successo",
  //     path: `/uploads/${fileName}`,
  //   });
  // } catch (error) {
  //   console.error("Errore nel caricamento del file:", error);
  //   return res.status(500).json({ message: "Errore del server", error });
  // }
}
