import { Router } from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { getImg, uploadImg } from "../controller/create_carousel_images_controller.js";

const CarouselImagesRouter = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

CarouselImagesRouter.post('/', upload.single('file'), uploadImg);
CarouselImagesRouter.get('/:filename', getImg)

export default CarouselImagesRouter;
