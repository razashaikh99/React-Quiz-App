import React from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Data/questions";
import {
    Award,
    ListChecks,
    CheckCircle2,
    XCircle,
    Percent,
    RefreshCw,
    BarChart3,
} from "lucide-react";

export default function ResultPage() {
    const navigate = useNavigate();
    const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];

    if (userAnswers.length !== questions.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 px-4">
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg text-center w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Invalid Quiz Data</h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">Some answers are missing. Please retake the quiz.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 w-full"
                    >
                        <RefreshCw size={18} />
                        Retake Quiz
                    </button>
                </div>
            </div>
        );
    }

    const correctCount = userAnswers.reduce(
        (acc, answer, index) => (answer === questions[index].correctAnswer ? acc + 1 : acc),
        0
    );
    const totalQuestions = questions.length;
    const wrongCount = totalQuestions - correctCount;
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-indigo-100 to-yellow-100 py-12 px-4">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-4xl text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-indigo-800 mb-6 md:mb-8 flex justify-center items-center gap-2" data-aos="fade-down">
                    <Award size={32} />
                    Quiz Summary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-base md:text-lg text-gray-700 mb-10" data-aos="fade-up">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center gap-2 font-semibold mb-2">
                            <ListChecks size={20} />
                            Total Questions
                        </div>
                        <p className="text-xl md:text-2xl text-gray-800 font-bold">{totalQuestions}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center gap-2 font-semibold mb-2">
                            <CheckCircle2 size={20} />
                            Correct Answers
                        </div>
                        <p className="text-xl md:text-2xl text-green-600 font-bold">{correctCount}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center gap-2 font-semibold mb-2">
                            <XCircle size={20} />
                            Wrong Answers
                        </div>
                        <p className="text-xl md:text-2xl text-red-500 font-bold">{wrongCount}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center gap-2 font-semibold mb-2">
                            <Percent size={20} />
                            Score
                        </div>
                        <p className="text-xl md:text-2xl text-blue-700 font-bold">{percentage}%</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 md:mt-8" data-aos="fade-up">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 w-full sm:w-auto cursor-pointer"
                    >
                        <RefreshCw size={18} />
                        Retake Quiz
                    </button>
                    <button
                        onClick={() => navigate("/breakdown")}
                        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition duration-300 w-full sm:w-auto cursor-pointer"
                    >
                        <BarChart3 size={18} />
                        View Breakdown
                    </button>
                </div>
            </div>
        </div>
    );
}
