import multer from "multer"

import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

export const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
      params: {
        folder: "linkedIn-images",
      },
    }),
    limits: { fileSize: 1024 * 1024 },
  }).single("avatar")