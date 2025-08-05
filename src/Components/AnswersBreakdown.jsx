import React from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Data/questions";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Undo2,
  ChevronRightCircle,
} from "lucide-react";

export default function AnswerBreakdown() {
  const navigate = useNavigate();
  const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 flex justify-center items-center gap-2" data-aos="fade-down">
        <AlertCircle className="text-blue-600" />
        Answer Breakdown
      </h2>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.correctAnswer;
          const isAnswered = userAnswer !== null && userAnswer !== undefined && userAnswer !== "";

          return (
            <div
              key={index}
              className={`p-4 border rounded-lg shadow-sm text-sm md:text-base ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                }`}
              data-aos="fade-up"
            >
              <p className="font-semibold mb-2 flex items-center gap-2">
                <ChevronRightCircle className="text-blue-600" size={18} />
                {q.question}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="flex items-center gap-2">
                  Your Answer:
                  {isAnswered ? (
                    <span className={`${isCorrect ? "text-green-600" : "text-red-600"} flex items-center gap-1`}>
                      {userAnswer}
                      {isCorrect ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <XCircle className="text-red-600" size={16} />
                      )}
                    </span>
                  ) : (
                    <span className="text-gray-500 italic">Not Answered</span>
                  )}
                </p>

                <p className="flex items-center gap-2">
                  Status:
                  <span className={`${isCorrect ? "text-green-600" : "text-red-600"} font-semibold`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </p>
              </div>

              <p className="mt-1">
                Correct Answer:
                <span className="text-green-700 font-medium ml-2">{q.correctAnswer}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 cursor-pointer"
        >
          <Undo2 size={18} />
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
