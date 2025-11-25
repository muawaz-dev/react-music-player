import React from 'react'
import homeIcon from "../assets/home.svg";

export default function Nav() {
    return (
        <>

            <div className="flex sticky top-0 bg-black px-5 py-2 justify-between gap-8">
                <ul className="flex items-center gap-5 flex-grow list-none">
                    <li>
                        <img src={homeIcon} alt="home" className="invert w-9" />
                    </li>
                    <li className="flex flex-grow">
                        <input
                            type="text"
                            placeholder="What do you want to play?"
                            className="flex-grow border-none rounded-full bg-[#2a2a2a] text-white text-sm px-6 py-3 placeholder:text-[#b3b1aa] placeholder:text-lg"
                        />
                    </li>
                </ul>

                <ul className="flex gap-5 items-center text-[#cfcbcb] text-xl">
                    <ul className="flex gap-2 text-sm">
                        <li>Premium</li>
                        <li>Support</li>
                        <li>Download</li>
                    </ul>
                    <li>|</li>
                    <ul className="flex gap-5 text-sm items-center">
                        <li>Install App</li>
                        <li>Sign up</li>
                        <li>
                            <button className="font-bold text-base px-3 py-2 w-24 rounded-full">
                                Login
                            </button>
                        </li>
                    </ul>
                </ul>
            </div>
        </>
    )
}
