import { Song } from "../models/song.model.js";
async function getAllSongs(req, res, next) {
    try {
        const songDoc = await Song.find({}) 
        res.status(200).json(songDoc)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export default getAllSongs