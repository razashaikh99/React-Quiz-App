import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClock, FaQuestionCircle, FaPlay, FaBrain } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MainPage() {
    const navigate = useNavigate()

    useEffect(() => {
        AOS.init({ duration: 800 })
    }, [])

    const handleStart = () => {
        navigate("/quiz")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
            <div
                data-aos="fade-up"
            >
                <FaBrain className="text-blue-600 text-[100px] mb-6 motion-safe:animate-bounce mx-auto" />

                <h1 className="mx-auto text-center text-4xl md:text-5xl font-extrabold text-gray-800 mb-10">
                    Welcome to the Quiz App
                </h1>

                <div className="space-y-3 text-lg md:text-xl text-gray-700">
                    <p className="flex items-center justify-center gap-2">
                        <FaQuestionCircle className="text-blue-600" />
                        Total Questions: <strong>15</strong>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                        <FaClock className="text-red-500" />
                        Time Limit: <strong>5 Minutes</strong>
                    </p>
                </div>

                <button
                    onClick={handleStart}
                    className="mt-10 mx-auto bg-btn text-white px-12 py-3 rounded-full flex items-center gap-2 transform transition duration-800 ease-in-out hover:scale-100 hover:-translate-y-1 cursor-pointer"
                    data-aos="zoom-in"
                >
                    <FaPlay /> Let’s Start
                </button>

            </div>
        </div>
    )
}
