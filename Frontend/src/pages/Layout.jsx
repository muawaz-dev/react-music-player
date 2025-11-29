// App.jsx
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import PlayBar from "../components/PlayBar";
import { useState, useRef, useEffect } from "react";
import IndexContext from "../context/IndexContext"
import SongContext from "../context/SongContext";
import React from "react";
function Layout() {
    const [paused,setPaused] = useState(true)
    const [songsArr, setSongArr] = useState([])
    const [index, setIndex] = useState(0)
    const audioRef = useRef(new Audio)
    useEffect(() => {
        fetch("http://localhost:3000/songs-list")
            .then((response) => response.json())
            .then((data) => {
                setSongArr(data);
                audioRef.current.src="http://localhost:3000"+data[0].url
            })
    }, [])
    return (
        <>

            <Nav />
            <SongContext.Provider value={{songsArr,index,setIndex,audioRef,paused,setPaused}}>
                <Outlet />
                <PlayBar />
            </SongContext.Provider>

        </>
    );
}

export default Layout;
