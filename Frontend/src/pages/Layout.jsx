// App.jsx
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import PlayBar from "../components/PlayBar";
import { useState, useRef, useEffect } from "react";
import SongContext from "../context/SongContext";
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
        fetch("http://localhost:4000/songs-list")
            .then((response) => response.json())
            .then((data) => {
                setSongArr(data);
                audioRef.current.src = data[0].url;
                audioRef.current.onloadedmetadata = () => {
                    console.log(audioRef.current.duration)
                    setMax(audioRef.current.duration)
                }
                
                audioRef.current.onended = () => {
                    if (data.length - 1 > onendRef.current) {
                        setIndex(onendRef.current + 1)
                        audioRef.current.src = data[onendRef.current+1].url
                        audioRef.current.play()
                        setPaused(false)
                    }
                    else {
                        setIndex(0)
                        audioRef.current.src = data[0].url
                        audioRef.current.play()
                        setPaused(false)
                    }
                }

            })
            .catch((err)=>{console.log(err.message)});

    }, []);




    useEffect(() => {
        const handleKeys = (e) => {
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

            else if (e.key == "ArrowRight") {
                    const nextIndex= (index+1) % songsArr.length
                    setIndex(nextIndex)
                    audioRef.current.src = songsArr[nextIndex].url
                    audioRef.current.play()
                    setPaused(false)
                }
            else if (e.key == "ArrowLeft") {
                if (index == 0) {
                    setIndex(songsArr.length - 1)
                    audioRef.current.src = songsArr[songsArr.length - 1].url
                    audioRef.current.play()
                    setPaused(false)
                }
                else {
                    setIndex(index - 1)
                    audioRef.current.src = songsArr[index - 1].url
                    audioRef.current.play()
                    setPaused(false)
                }
            }

            else if (e.key == "ArrowUp") {
                audioRef.current.volume += 0.1
                setVolumeActive(true)
                setVolume(audioRef.current.volume)
            }
            else if (e.key == "ArrowDown") {
                audioRef.current.volume -= 0.1
                setVolumeActive(true)
                setVolume(audioRef.current.volume)
            }
        };


        window.addEventListener("keydown", handleKeys);
        return () => {
        window.removeEventListener("keydown", handleKeys);
        };
    },[index,volume,songsArr]);



    useEffect(() => {
        onendRef.current = index;
        
    }, [index])

    return (
        <>

            <Nav />
            <SongContext.Provider value={
                {
                    songsArr,
                    setSongArr,
                    index,
                    setIndex,
                    audioRef,
                    paused,
                    setPaused,
                    max,
                    setMax,
                    volumeActive,
                    setVolumeActive,
                    volume
                }}>
                <Outlet />
                <Volume />
                <PlayBar />
            </SongContext.Provider>

        </>
    );
}

export default Layout;
