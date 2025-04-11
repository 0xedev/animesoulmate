"use client";
/** @jsxImportSource react */

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [step, setStep] = useState<"welcome" | "quiz">("welcome");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleSignIn = async () => {
    try {
      const { message } = await sdk.actions.signIn({
        nonce: crypto.randomUUID(),
      });
      const parsedMessage = JSON.parse(message);
      setFid(parsedMessage.fid);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleStartQuiz = () => setStep("quiz");

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const questions = [
    { q: "His charm is:", opts: ["Witty", "Gentle", "Bold", "Mysterious"] },
    { q: "His hair color:", opts: ["Silver", "Black", "Gold", "Blue"] },
    { q: "His eyes:", opts: ["Blue", "Green", "Amber", "Violet"] },
    { q: "His outfit:", opts: ["Black Suit", "Cape", "Jacket", "Kimono"] },
    { q: "His gift:", opts: ["Rose", "Poem", "Song", "Star Map"] },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-[424px] h-[695px] bg-pink-200 text-center">
      {step === "welcome" ? (
        <>
          <h1 className="text-2xl text-purple-400 mb-4">
            Anime Husband Studio
          </h1>
          <p className="text-gray-700 mb-6 max-w-[80%]">
            Craft your dream anime husband or butler! Sign in to begin.
          </p>
          {fid ? (
            <>
              <p className="text-yellow-500 mb-4">Welcome, FID: {fid}!</p>
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
      ) : (
        <>
          <h1 className="text-2xl text-purple-400 mb-4">Quiz Time!</h1>
          <p className="text-gray-700 mb-4">Shape your anime soulmate.</p>
          <div className="space-y-4">
            {questions.slice(0, 5).map((item, idx) => (
              <div key={idx}>
                <p className="text-gray-700">{item.q}</p>
                <div className="flex gap-2 justify-center">
                  {item.opts.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(item.q, opt)}
                      className={`px-3 py-1 rounded-full text-white ${
                        answers[item.q] === opt
                          ? "bg-purple-500"
                          : "bg-purple-400"
                      } hover:bg-purple-500`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
