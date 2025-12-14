import dotenv from "dotenv";
dotenv.config()
import dbConnection from "./db/index.js";
import app from "./app.js";




dbConnection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("The server is listening at port:",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Database connection failed:",error)
    process.exit(1)
})



