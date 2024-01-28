import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function uploadImg(req, res){
  try {
    if (req.file.size / 1024 / 1024 > 50) {
      const folder = path.join(__dirname, "..", "uploads", req.file.filename);
      fs.rmSync(folder, { recursive: true });
      throw new Error("slishkom bolshoy ves, poxudey")
    }
    res.send(`http://localhost:3006/create-carousel-images/${req.file.filename}`)
  } catch (error) {
    res.status(error.status || 500).json({error: error.message})
  }
}

export function getImg(req, res){
  try {
    const { filename } = req.params
    const file = path.join(__dirname, "..", "uploads", filename)
    res.sendFile(file)
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message })
  }
}

