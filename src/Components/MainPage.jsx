import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClock, FaQuestionCircle, FaPlay } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MainPage() {
    const navigate = useNavigate()

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, [])

    const handleStart = () => {
        navigate("/quiz")
    }

    return (
        <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">
            <h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                data-aos="fade-up"
            >
                Welcome to the Quiz App
            </h1>

            <p
                className="text-lg md:text-xl text-gray-700 mb-2 flex items-center gap-2"
                data-aos="fade-right"
            >
                <FaQuestionCircle className="text-blue-600" />
                Total Questions: <strong>15</strong>
            </p>

            <p
                className="text-lg md:text-xl text-gray-700 mb-6 flex items-center gap-2"
                data-aos="fade-left"
            >
                <FaClock className="text-red-500" />
                Time Limit: <strong>5 Minutes</strong>
            </p>

            <button
                onClick={handleStart}
                className="bg-blue-600 text-white px-12 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer"
                data-aos="zoom-in"
            >
                <FaPlay /> Let’s Start
            </button>
        </div>
    )
}
