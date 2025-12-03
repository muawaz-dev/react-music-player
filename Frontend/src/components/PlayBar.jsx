import React, { useState, useRef, useContext } from 'react'
import prevIcon from "../assets/previous-Stroke-Rounded.png";
import playIcon from "../assets/play-Stroke-Rounded.png";
import pauseIcon from "../assets/pause-Stroke-Rounded.png";
import nextIcon from "../assets/next-Stroke-Rounded.png";
import SongContext from '../context/SongContext';


export default function PlayBar() {
    const { songsArr, index, setIndex, audioRef, paused, setPaused, max } = useContext(SongContext)
    const rangeRef = useRef()

    audioRef.current.ontimeupdate = () => {
    rangeRef.current.value = (audioRef.current.currentTime)

}
    function handleRangeChange(e) {
        rangeRef.current.value = (e.target.value);
        audioRef.current.currentTime = e.target.value
    }
    function handlePlay() {
        if (!paused) {
            audioRef.current.pause()
            setPaused(true)
        }
        else {
            audioRef.current.play()
            setPaused(false)
        }
    }

    function handleNext() {
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


    function handlePrev() {
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
    return (
        <div className="fixed flex flex-col items-center justify-center bottom-0 left-1 right-[0.25vw] h-12 bg-black">
            <input ref={rangeRef} onChange={handleRangeChange} type="range" min="0" max={max} defaultValue={0}  step="0.01" className="w-full" />
            <div className="flex gap-2">
                <button onClick={handlePrev} className="bg-transparent border-none invert">
                    <img src={prevIcon} alt="" className="w-6" />
                </button>
                <button onClick={handlePlay} className="bg-transparent border-none invert">
                    <img src={paused ? playIcon : pauseIcon} alt="" className="w-6" />
                </button>

                <button onClick={handleNext} className="bg-transparent border-none invert">
                    <img src={nextIcon} alt="" className="w-6" />
                </button>
            </div>
            
        </div>
    )
}
