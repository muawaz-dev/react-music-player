import express from "express";
import cors from "cors"
import fs from "fs";
import path from "path";

const server=express()

server.listen(3000)

server.use(cors({origin:"http://localhost:5173"}))

const audioFolder = path.join(process.cwd(), "songs");
server.use('/songs', express.static(audioFolder));
server.get('/songs-list', (req, res) => {
  fs.readdir(audioFolder, (err, files) => {
    if (err) return res.status(500).send('Error reading folder');

    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    // Build an array of objects with name + url
    const songs = mp3Files.map(file => ({
      name: file,              // original filename
      url: `/songs/${file}`    // accessible URL
    }));

    res.json(songs);
  });
});
