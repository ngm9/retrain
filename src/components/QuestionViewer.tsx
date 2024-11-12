// src/components/QuestionViewer.tsx
"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Question, Feedback } from "../types/types";
import { HandThumbUpIcon, HandThumbDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface QuestionViewerProps {
  question: Question;
  onSubmitFeedback: (feedback: Feedback) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionViewer({
  question,
  onSubmitFeedback,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionViewerProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleApprove = () => {
    setIsApproved(true);
    setError(null); // Clear error when making a selection
  };

  const handleDisapprove = () => {
    setIsApproved(false);
    setError(null); // Clear error when making a selection
  };

  const handleSubmit = () => {
    if (isApproved === null || reasoning.trim() === "") {
      setError("Please select Approve/Disapprove and provide reasoning before submitting.");
      return;
    }

    onSubmitFeedback({ isApproved, reasoning });
    setIsApproved(null);
    setReasoning("");
    setError(null); // Clear error on successful submission
  };

  const handleNext = () => {
    setError(null); // Clear error when navigating to the next question
    onNext();
  };

  const handlePrevious = () => {
    setError(null); // Clear error when navigating to the previous question
    onPrevious();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg p-4 md:p-6 w-full max-w-6xl flex flex-col space-y-4">
        {/* Question text rendered with Markdown support */}
        <div className="mt-4 p-4 rounded-md overflow-x-auto text-gray-800">
          <ReactMarkdown className="text-sm md:text-base">{question.question}</ReactMarkdown>
        </div>

        {/* Display details about the question */}
        <div className="text-sm md:text-base text-gray-600 mt-2 space-y-1">
          <p><span className="font-semibold">Type:</span> {question.type}</p>
          <p><span className="font-semibold">Kind:</span> {question.kind}</p>
          <p><span className="font-semibold">Answer:</span> {question.answer}</p>
          <p className="mt-2"><span className="font-semibold">Competencies:</span> {question.competencies.join(", ")}</p>
        </div>

        {/* Approval buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
          <button
            onClick={handleApprove}
            className={`flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto ${isApproved === true ? "opacity-70" : ""}`}
          >
            <HandThumbUpIcon className="h-5 w-5 mr-2" /> Approve
          </button>
          <button
            onClick={handleDisapprove}
            className={`flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto ${isApproved === false ? "opacity-70" : ""}`}
          >
            <HandThumbDownIcon className="h-5 w-5 mr-2" /> Disapprove
          </button>
        </div>

        {/* Error message in red */}
        {error && <p className="text-red text-sm mt-2">{error}</p>}

        {/* Feedback input and submit button */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Enter reasoning here"
            value={reasoning}
            onChange={(e) => {
              setReasoning(e.target.value);
              setError(null); // Clear error when typing in the reasoning
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Submit
          </button>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirst}
            className={`flex items-center text-gray-600 hover:text-blue-500 ${isFirst ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`flex items-center text-gray-600 hover:text-blue-500 ${isLast ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next <ChevronRightIcon className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
