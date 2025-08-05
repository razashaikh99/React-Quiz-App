// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaClock, FaQuestionCircle, FaPlay, FaBrain } from 'react-icons/fa'
// import AOS from 'aos'
// import 'aos/dist/aos.css'

// export default function MainPage() {
//     const navigate = useNavigate()

//     useEffect(() => {
//         AOS.init({ duration: 800 });
//     }, [])

//     const handleStart = () => {
//         navigate("/quiz")
//     }

//     return (
//         <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">

//             {/* 🧠 Big Icon on Top */}
//             <FaBrain
//                 className="text-blue-600 text-[100px] mb-4"
//                 data-aos="fade-down"
//             />

//             <h1
//                 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
//                 data-aos="fade-up"
//             >
//                 Welcome to the Quiz App
//             </h1>

//             <p
//                 className="text-lg md:text-xl text-gray-700 mb-2 flex items-center gap-2"
//                 data-aos="fade-right"
//             >
//                 <FaQuestionCircle className="text-blue-600" />
//                 Total Questions: <strong>15</strong>
//             </p>

//             <p
//                 className="text-lg md:text-xl text-gray-700 mb-6 flex items-center gap-2"
//                 data-aos="fade-left"
//             >
//                 <FaClock className="text-red-500" />
//                 Time Limit: <strong>5 Minutes</strong>
//             </p>

//             <button
//                 onClick={handleStart}
//                 className="bg-btn text-white px-12 py-3 rounded-lg flex items-center gap-2 hover:hover-bg-btn transition cursor-pointer"
//                 data-aos="zoom-in"
//             >
//                 <FaPlay /> Let’s Start
//             </button>
//         </div>
//     )
// }

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
                    className="mt-10 mx-auto bg-btn text-white px-12 py-3 rounded-full flex items-center gap-2
                                transform transition duration-300 ease-in-out
                                hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    data-aos="zoom-in"
                >
                    <FaPlay /> Let’s Start
                </button>

            </div>
        </div>
    )
}

// transition-all duration-300 shadow-lg hover:scale-105 rounded-full
