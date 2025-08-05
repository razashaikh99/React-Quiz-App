import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Data/questions";
import {
    Timer,
    ArrowLeft,
    ArrowRight,
    CheckCircle
} from "lucide-react";

export default function QuizPage() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [timeLeft, setTimeLeft] = useState(300); // 2.5 minutes // 2700 - 45 Mint

    const currentQuestion = questions[currentIndex];
    const hasCheatedRef = useRef(false); // 🔒 cheating flag

    // Cheating Logic ....
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden" && !hasCheatedRef.current) {
                resetQuizDueToCheating();
            }
        };

        const handleBlur = () => {
            if (!hasCheatedRef.current) {
                resetQuizDueToCheating();
            }
        };

        window.addEventListener("blur", handleBlur);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const resetQuizDueToCheating = () => {
        hasCheatedRef.current = true; // ✅ Prevent multiple resets
        localStorage.removeItem("quiz-answers");
        alert("Quiz has been reset because you switched tabs or minimized the window.");
        navigate("/");
    };

    // ⏱️ Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            finishQuiz(); // auto-submit
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = option;
        setAnswers(newAnswers);
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const finishQuiz = () => {
        localStorage.setItem("quiz-answers", JSON.stringify(answers));
        navigate("/result");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10">
            {/* Timer */}
            <div className="animate-pulse absolute top-4 right-4 flex items-center gap-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-full shadow-md w-fit">
                <Timer size={18} />
                <span>Time Left: {formatTime(timeLeft)}</span>
            </div>

            {/* Question */}
            <div className="mb-8 mt-10 sm:mt-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900 mb-2">
                    Question {currentIndex + 1} of {questions.length}
                </h2>
                <p className="pt-3 font-medium sm:text-lg md:text-xl text-gray-900">{currentQuestion.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                    <label
                        key={index}
                        className={`block w-full p-4 sm:p-5 border-2 rounded-xl text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-300 shadow-sm 
                            ${answers[currentIndex] === option
                                ? "bg-blue-100 border-blue-500 text-blue-800"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                    >
                        <input
                            type="radio"
                            name={`question-${currentIndex}`}
                            value={option}
                            checked={answers[currentIndex] === option}
                            onChange={() => handleOptionSelect(option)}
                            className="mr-2 accent-blue-600"
                        />
                        {option}
                    </label>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 hover:bg-gradient-to-l text-white font-medium py-2 px-6 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base cursor-pointer"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                    <button
                        onClick={finishQuiz}
                        disabled={answers[currentIndex] === null}
                        className="flex items-center justify-center bg-gradient-to-l from-green-700 to-green-600 hover:bg-gradient-to-r text-white font-medium py-2 px-6 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base cursor-pointer"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Finish Quiz
                    </button>
                ) : (
                    <button
                        onClick={goToNext}
                        disabled={answers[currentIndex] === null}
                        className="flex items-center justify-center bg-gradient-to-l from-blue-800 to-blue-700 hover:bg-gradient-to-r text-white font-medium py-2 px-6 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base cursor-pointer"
                    >
                        Next
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
}
