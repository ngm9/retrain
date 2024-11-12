// src/app/page.tsx
"use client";
import { useState } from "react";
import QuestionViewer from "../components/QuestionViewer";
import { Question, RetrainEntry, Feedback } from "../types/types";
import { saveRetrainData } from "../utils/saveRetrainFile";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [retrainData, setRetrainData] = useState<RetrainEntry[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const json = JSON.parse(text);
        setQuestions(json);
      };
      reader.readAsText(file);
    }
  };

  const handleFeedbackSubmit = (feedback: Feedback) => {
    const question = questions[currentIndex];
    const entry: RetrainEntry = { question_blob: question, feedback };
    setRetrainData((prev) => [...prev, entry]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveRetrainData(retrainData);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {questions.length === 0 ? (
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Upload Generated Questions File</h1>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
          />
        </div>
      ) : (
        <QuestionViewer
          question={questions[currentIndex]}
          onSubmitFeedback={handleFeedbackSubmit}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentIndex === 0}
          isLast={currentIndex === questions.length - 1}
        />
      )}
    </div>
  );
}
