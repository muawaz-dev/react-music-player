import mongoose from "mongoose";

const songSchema  = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true
    }
})



export const Song = mongoose.model("Song",songSchema)