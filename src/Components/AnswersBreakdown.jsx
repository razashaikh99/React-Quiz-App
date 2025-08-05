import React from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Data/questions";

export default function AnswerBreakdown() {
  const navigate = useNavigate();
  const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6" data-aos="fade-down">
        Answer Breakdown
      </h2>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.correctAnswer;
          const isAnswered = userAnswer !== null && userAnswer !== undefined && userAnswer !== "";

          return (
            <div key={index} className="p-4 border rounded-lg shadow-md" data-aos="fade-up">
              <p className="font-semibold mb-2">{`${q.question}`}</p>
              <p>
                Your Answer:{" "}
                <span className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isAnswered ? userAnswer : "Not Answered"}
                </span>
              </p>
              <p>
                Correct Answer:{" "}
                <span className="text-green-700 font-medium">{q.correctAnswer}</span>
              </p>
              <p className="mt-1">
                Status:{" "}
                <span className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
