import mongoose from "mongoose"
const DB_NAME="music-player"

export default async function dbConnection() {
    const dbConnection = await mongoose.connect(process.env.DB_URI + `/${DB_NAME}`)
    console.log("DB connected, Host:", dbConnection.connection.host)
}