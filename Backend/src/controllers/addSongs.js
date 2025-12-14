import dotenv from "dotenv";
dotenv.config()
import fs from "fs/promises"
import { Song } from "../models/song.model.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
async function addSongs(req, res, next) {
    try {
        const arr = []
        for (const element of req.files) {
            try {
                const response = await cloudinary.uploader.upload(element.path, { folder: "song-player", resource_type: "video" });
                await fs.unlink(element.path)
                arr.push({ name: element.originalname, url: response.url })
            } catch (error) {
                await fs.unlink(element.path)
                throw error
            }

        }
        await Song.create(arr)
        const songDoc = await Song.find({})
        res.status(200).json({ message: "Successfully added songs",songs:songDoc })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default addSongs