import React, { useContext } from 'react'
import Nav from '../components/Nav';
import cardImage from "../assets/cardImage.png"
import "./style.css"
import IndexContext from "../context/IndexContext"
import SongContext from '../context/SongContext';
export default function Home() {
    const {songsArr,setIndex,audioRef,setPaused} = useContext(SongContext)
    function handleCardClick(i){    
        setIndex(i);
        audioRef.current.src="http://localhost:3000"+songsArr[i].url
        audioRef.current.play()
        setPaused(false)
    

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
                    <p className="font-franklin text-2xl font-bold pt-8 ml-10">Songs</p>
                    <div className="flex flex-wrap gap-5 pt-8 pb-5 justify-center font-sans">
                        {/* Cards go here */}
                        {songsArr.map(({name},index)=>{
                            return (
                                <div onClick={()=>handleCardClick(index)} id={index} key={index} className='w-[160px]'>
                                    <img className='rounded-lg' src={cardImage} alt="" />
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



