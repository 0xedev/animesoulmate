"use client";
/** @jsxImportSource react */

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const [step, setStep] = useState<"welcome" | "quiz" | "result">("welcome");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session status:", status, "Session:", session);
  }, [session, status]);

  const handleSignIn = async () => {
    try {
      console.log("Starting sign-in...");
      await signIn("farcaster"); // Trigger Farcaster sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleStartQuiz = () => setStep("quiz");

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("result");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const questions = [
    { q: "His charm is:", opts: ["Witty", "Gentle", "Bold", "Mysterious"] },
    { q: "His hair color:", opts: ["Silver", "Black", "Gold", "Blue"] },
    { q: "His eyes:", opts: ["Blue", "Green", "Amber", "Violet"] },
    { q: "His outfit:", opts: ["Black Suit", "Cape", "Jacket", "Kimono"] },
    { q: "His gift:", opts: ["Rose", "Poem", "Song", "Star Map"] },
    { q: "His vibe:", opts: ["Playful", "Serious", "Romantic", "Cool"] },
    { q: "His weapon:", opts: ["Sword", "Magic", "Bow", "None"] },
    { q: "His role:", opts: ["Hero", "Butler", "Rogue", "Prince"] },
    { q: "His height:", opts: ["Tall", "Medium", "Short", "Giant"] },
    { q: "His smile:", opts: ["Warm", "Smirky", "Shy", "Confident"] },
    { q: "His hobby:", opts: ["Cooking", "Reading", "Fighting", "Music"] },
    { q: "His pet:", opts: ["Cat", "Dragon", "None", "Bird"] },
    { q: "His voice:", opts: ["Deep", "Soft", "Cheerful", "Gruff"] },
    { q: "His loyalty:", opts: ["Fierce", "Relaxed", "Wavering", "Absolute"] },
    { q: "His world:", opts: ["Fantasy", "Sci-Fi", "Modern", "Historical"] },
  ];

  const getResult = () => {
    const traits = Object.values(answers).join(", ");
    return `Your anime soulmate is a ${traits} dream!`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-[424px] h-[695px] bg-pink-200 text-center">
      {step === "welcome" ? (
        <>
          <h1 className="text-2xl text-purple-400 mb-4">Anime Studio</h1>
          <p className="text-gray-700 mb-6 max-w-[80%]">
            Craft your dream anime husband or butler! Sign in to begin.
          </p>
          {session?.user?.fid || status === "authenticated" ? (
            <>
              <p className="text-yellow-500 mb-4">
                Welcome, FID: {session?.user?.fid || "Guest"}!
              </p>
              <button
                onClick={handleStartQuiz}
                className="bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-purple-500"
              >
                Start Quiz
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-purple-500"
            >
              Sign In
            </button>
          )}
        </>
      ) : step === "quiz" ? (
        <>
          <h1 className="text-2xl text-purple-400 mb-4">Quiz Time!</h1>
          <p className="text-gray-700 mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700">{questions[currentQuestion].q}</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {questions[currentQuestion].opts.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      handleAnswer(questions[currentQuestion].q, opt)
                    }
                    className={`px-3 py-1 rounded-full text-white ${
                      answers[questions[currentQuestion].q] === opt
                        ? "bg-purple-500"
                        : "bg-purple-400"
                    } hover:bg-purple-500`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-400 text-white px-4 py-1 rounded-full hover:bg-gray-500"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="bg-purple-400 text-white px-4 py-1 rounded-full hover:bg-purple-500"
                disabled={!answers[questions[currentQuestion].q]}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl text-purple-400 mb-4">Your Soulmate!</h1>
          <p className="text-gray-700 mb-6 max-w-[80%]">{getResult()}</p>
          <button
            onClick={() => setStep("welcome")}
            className="bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-purple-500"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}
