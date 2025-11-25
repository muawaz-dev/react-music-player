import React from 'react'
import Nav from '../components/Nav';
import prevIcon from "../assets/previous-Stroke-Rounded.png";
import playIcon from "../assets/play-Stroke-Rounded.png";
import pauseIcon from "../assets/pause-Stroke-Rounded.png";
import nextIcon from "../assets/next-Stroke-Rounded.png";
import "./style.css"

export default function Home() {
    return (
        <div className="bg-black text-white">
            {/* Nav */}
            <Nav />
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

                {/* Bottom */}
                <div className="fixed flex flex-col items-center justify-center bottom-0 left-1 right-[0.25vw] h-12 bg-black">
                    <input type="range" min="0" value="0" step="0.01" className="w-full" />
                    <div className="flex gap-2">
                        <button className="bg-transparent border-none invert">
                            <img src={prevIcon} alt="" className="w-6" />
                        </button>
                        <button className="bg-transparent border-none invert">
                            <img src={playIcon} alt="" className="w-6" />
                        </button>
                        <button className="bg-transparent border-none invert hidden">
                            <img src={pauseIcon} alt="" className="w-6" />
                        </button>
                        <button className="bg-transparent border-none invert">
                            <img src={nextIcon} alt="" className="w-6" />
                        </button>
                    </div>
                </div>

                {/* Main */}
                <div className="bg-[#212121] ml-[37%] rounded-xl border-r-[0.25vw] border-black">
                    <p className="font-franklin text-2xl font-bold pt-8 ml-10">Songs</p>
                    <div className="flex flex-wrap gap-5 pt-8 pb-5 justify-center font-sans">
                        {/* Cards go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}



