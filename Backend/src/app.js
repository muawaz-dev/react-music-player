import express from "express";
import cors from "cors"
import getAllSongs from "./controllers/allSongs.js";
import addSongs from "./controllers/addSongs.js";
import upload from "./middlewares/multer.js";
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))



app.get("/songs-list", getAllSongs)
app.post("/add-songs", upload.array("songs"), addSongs)

export default app