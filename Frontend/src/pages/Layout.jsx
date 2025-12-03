// App.jsx
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import PlayBar from "../components/PlayBar";
import { useState, useRef, useEffect } from "react";
import SongContext from "../context/SongContext";
import React from "react";
import Volume from "../components/Volume";
function Layout() {
    const [paused, setPaused] = useState(true)
    const [songsArr, setSongArr] = useState([])
    const [index, setIndex] = useState(0)
    const [max, setMax] = useState("")
    const audioRef = useRef(new Audio)
    const onendRef = useRef(0)
    const [volumeActive, setVolumeActive] = useState(false)
    const [volume, setVolume] = useState(1)
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




    useEffect(() => {
        const handleKeyUp = (e) => {
            e.preventDefault()
            if (e.key === " ") {
                if (audioRef.current.paused) {
                    audioRef.current.play();
                    setPaused(false)
                } else {
                    audioRef.current.pause();
                    setPaused(true)
                }
            }
        };

        const handleArrowRight = (e) => {
            e.preventDefault();
            if (e.key == "ArrowRight") {
                if (songsArr.length - 1 > index) {
                    setIndex(index + 1)
                    audioRef.current.src = "http://localhost:3000" + songsArr[index + 1].url
                    audioRef.current.play()
                    setPaused(false)
                }
                else {
                    setIndex(0)
                    audioRef.current.src = "http://localhost:3000" + songsArr[0].url
                    audioRef.current.play()
                    setPaused(false)
                }
            }
        }

        const handleArrowLeft = (e) => {
            e.preventDefault()
            if (e.key == "ArrowLeft") {
                if (index == 0) {
                    setIndex(songsArr.length - 1)
                    audioRef.current.src = "http://localhost:3000" + songsArr[songsArr.length - 1].url
                    audioRef.current.play()
                    setPaused(false)
                }
                else {
                    setIndex(index - 1)
                    audioRef.current.src = "http://localhost:3000" + songsArr[index - 1].url
                    audioRef.current.play()
                    setPaused(false)
                }
            }
        }

        const handleVolume = (e) => {
            try {
                if (e.key == "ArrowUp") {
                    audioRef.current.volume += 0.1
                }
                else if (e.key == "ArrowDown") {
                    audioRef.current.volume -= 0.1
                }
            } catch (error) {
                console.log(error)
            }

            setVolumeActive(true)
            setVolume(audioRef.current.volume)
        }

        window.addEventListener("keydown", handleKeyUp);
        window.addEventListener("keyup", handleArrowRight);
        window.addEventListener("keyup", handleArrowLeft);
        window.addEventListener("keyup", handleVolume);

        return () => {
            window.removeEventListener("keydown", handleKeyUp);
            window.removeEventListener("keyup", handleArrowRight);
            window.removeEventListener("keyup", handleArrowLeft);
            window.removeEventListener("keyup", handleArrowLeft);
            window.removeEventListener("keyup", handleVolume);
        };
    });



    useEffect(() => {
        onendRef.current = index
    }, [index])

    return (
        <>

            <Nav />
            <SongContext.Provider value={{ songsArr, index, setIndex, audioRef, paused, setPaused, max, setMax, volumeActive, setVolumeActive, volume }}>
                <Outlet />
                <Volume />
                <PlayBar />
            </SongContext.Provider>

        </>
    );
}

export default Layout;
