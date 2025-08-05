import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Data/questions";

export default function QuizPage() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [timeLeft, setTimeLeft] = useState(150); // 5 minutes = 300 seconds

    const currentQuestion = questions[currentIndex];

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
        <div className="max-w-3xl mx-auto px-4 py-8 relative">
            {/* Timer in top-right corner */}
            <div className="absolute top-6 right-4 text-lg font-semibold text-white bg-red-800 px-4 py-2 rounded-full w-52 shadow">
                ⏳ Time Left: {formatTime(timeLeft)}
            </div>

            <div className="mb-6 pt-18">
                <h2 className="text-3xl font-bold mb-2 text-blue-700">{`Question ${currentIndex + 1} of ${questions.length}`}</h2>
                <p className="text-xl pt-4 font-medium">{currentQuestion.question}</p>
            </div>

            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                    <label
                        key={index}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all duration-300
                        ${answers[currentIndex] === option ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}
                    `}
                    >
                        <input
                            type="radio"
                            name={`question-${currentIndex}`}
                            value={option}
                            checked={answers[currentIndex] === option}
                            onChange={() => handleOptionSelect(option)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ))}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    data-aos="fade-right"
                    className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-12 font-medium rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                    <button
                        onClick={finishQuiz}
                        disabled={answers[currentIndex] === null}
                        // data-aos="fade-left"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-12 font-medium rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                        Finish Quiz
                    </button>
                ) : (
                    <button
                        onClick={goToNext}
                        disabled={answers[currentIndex] === null}
                        data-aos="fade-left"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 font-medium rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
