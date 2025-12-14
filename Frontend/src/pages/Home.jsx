import React, { useContext } from 'react'
import Nav from '../components/Nav';
import cardImage from "../assets/cardImage.png"
import "./style.css"
import SongContext from '../context/SongContext';
import Volume from '../components/Volume';
import { useRef, useState } from 'react';
export default function Home() {
    const { songsArr,setSongArr, setIndex, audioRef, setPaused, index, paused } = useContext(SongContext)
    const fileRef = useRef();
    function handleCardClick(i) {
        setIndex(i);
        audioRef.current.src = songsArr[i].url
        audioRef.current.play()
        setPaused(false)
    }

    function handleFileChange() {
        const arr= Array.from(fileRef.current.files)
        const form = new FormData();
        const check = songsArr.map((song)=>song.name);
        fileRef.current.value="";
        for (const item of arr) {
            if (item.type.includes("audio")) {
                if(check.includes(item.name)){
                    alert("A song is already uploaded")
                    break
                }
                form.append("songs", item)
            }
            else{
                alert("Only audio files are allowed.")
                console.log("Only audio files are allowed.")
                break
            }
        }

        fetch("http://localhost:4000/add-songs",{
            method:"POST",
            body:form
        })
        .then((response)=>response.json())
        .then((data)=>{setSongArr(data.songs)})
        
    }

    function handleFileClick() {
        fileRef.current.click()
    }

    return (
        <div className="bg-black text-white">
            {/* Container */}
            <div className="bg-black mb-12 flex h-screen flex-col">
                {/* Side */}
                <div className="flex flex-col w-[35%] h-[87vh] bg-[#121212] fixed left-1 rounded-xl">
                    <h2 className="font-franklin m-5">Your Library</h2>
                    <div className="libraryBox grid overflow-y-scroll mt-8 h-72 gap-8 grid-cols-[90%] justify-center">
                        <div className="rounded-lg bg-[#1f1f1f] pt-2 pb-10">
                            <h3 className="font-franklin text-base ml-[6%] mt-5">
                                Create your first playlist
                            </h3>
                            <p className="font-raleway text-sm w-[70%] ml-[6%] mt-5">
                                Its easy we will help you
                            </p>
                            <button className="font-franklin text-base font-bold mt-6 ml-[6%] px-5 py-2 rounded-full">
                                Create Playlist
                            </button>
                        </div>
                        <div className="rounded-lg bg-[#1f1f1f] pt-2 pb-10">
                            <h3 className="font-franklin text-base ml-[6%] mt-5">
                                Lets find some podcasts to follow
                            </h3>
                            <p className="font-raleway text-sm w-[70%] ml-[6%] mt-5">
                                We will keep you updated on new episodes
                            </p>
                            <button className="font-franklin text-base font-bold mt-6 ml-[6%] px-5 py-2 rounded-full">
                                Browse podcasts
                            </button>
                        </div>
                    </div>
                    <div className="font-raleway flex flex-wrap ml-[6%] gap-6 mt-10 mb-20 text-xs">
                        <p>Legal</p>
                        <p>Safety&PrivacyCenter</p>
                        <p>Privacy Policy</p>
                        <p>Cookies</p>
                        <p>About Ads</p>
                        <p>Accessibility</p>
                    </div>
                </div>
                {/* Main */}
                <div className="bg-[#212121] ml-[37%] rounded-xl border-r-[0.25vw] border-black">
                    <div className='flex gap-6'>
                        <p className="font-franklin text-2xl font-bold pt-8 ml-10">Songs</p>
                        <input onChange={handleFileChange} ref={fileRef} type="file" name="songs" multiple className='hidden' />
                        <button onClick={handleFileClick} className='text-xl p-2 m-7 bg-black rounded-xl'>Upload</button>
                    </div>
                    <div className="flex flex-wrap gap-5 pt-8 pb-5 justify-center font-sans">
                        {/* Cards go here */}
                        {songsArr.map(({ name }, i) => {
                            return (
                                <div onClick={() => handleCardClick(i)} id={i} key={i} className='w-[160px]'>
                                    <img className={i == index && !paused ? "invert rounded-lg" : 'rounded-lg hover:invert transition-filter duration-1000 ease-in'} src={cardImage} alt="" />
                                    <button className='border-none mt-3 font-sans'><h4>{name}</h4></button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}



