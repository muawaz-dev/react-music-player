// App.jsx
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import PlayBar from "../components/PlayBar";
import { useState, useRef, useEffect } from "react";
import IndexContext from "../context/IndexContext"
import SongContext from "../context/SongContext";
import React from "react";
function Layout() {
    const [paused, setPaused] = useState(true)
    const [songsArr, setSongArr] = useState([])
    const [index, setIndex] = useState(0)
    const [max, setMax] = useState("")
    const audioRef = useRef(new Audio)
    const onendRef=useRef(0)
    useEffect(() => {
        fetch("http://localhost:3000/songs-list")
            .then((response) => response.json())
            .then((data) => {
                setSongArr(data);
                audioRef.current.src = "http://localhost:3000" + data[0].url;
                audioRef.current.onloadedmetadata = () => {
                    setMax(audioRef.current.duration)
                }
                
                audioRef.current.onended = () => {
                    if (data.length - 1 > onendRef.current) {
                        setIndex(onendRef.current + 1)
                        audioRef.current.src = "http://localhost:3000" + data[onendRef.current + 1].url
                        audioRef.current.play()
                        setPaused(false)
                    }
                    else {
                        setIndex(0)
                        audioRef.current.src = "http://localhost:3000" + data[0].url
                        audioRef.current.play()
                        setPaused(false)
                    }
                }

            });

    }, []);

    useEffect(()=>{
        onendRef.current=index
    },[index])


    return (
        <>

            <Nav />
            <SongContext.Provider value={{ songsArr, index, setIndex, audioRef, paused, setPaused, max, setMax }}>
                <Outlet />
                <PlayBar />
            </SongContext.Provider>

        </>
    );
}

export default Layout;
