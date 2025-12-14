import React from 'react'
import { useContext, useEffect } from 'react'
import SongContext from '../context/SongContext'
import volumeImg from "../assets/volume.png"
import volumeMute from "../assets/volume-mute.png"
export default function Volume() {
  const { volumeActive, setVolumeActive, volume } = useContext(SongContext)
  useEffect(() => {
    if (volumeActive) {
      const timer = setTimeout(() => {
        setVolumeActive(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [volumeActive]);
  return (
    <>
      <div className={`${volumeActive ? "bg-[#121212]" : "bg-transparent invisible"} flex items-center gap-3 h-[20%] w-[40%] sm:h-[25%] sm:w-[40%] lg:h-[30%] lg:w-[30%] justify-center transition-all duration-1000 rounded-lg text-center p-4 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}>
        {volumeActive &&  (volume.toFixed(1) !=0 ? <img src={volumeImg} className='w-10 invert' alt="" />:<img src={volumeMute} className='w-10 invert' alt="" />)}
        <span>
          {volumeActive && `Volume : ${volume.toFixed(1) * 100}`}
        </span>
      </div>
    </>
  )
}
