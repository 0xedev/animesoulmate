"use client";
/** @jsxImportSource react */

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const [fid, setFid] = useState<number | null>(null);
  const router = useRouter();

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
      router.push("/teaser");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[424px] h-[695px] bg-pink-200 text-center">
      <h1 className="text-2xl text-purple-400 mb-4">Anime Husband Studio</h1>
      <p className="text-gray-700 mb-6 max-w-[80%]">
        Craft your dream anime husband or butler! Sign in to begin.
      </p>
      {fid ? (
        <p className="text-yellow-500">Welcome, FID: {fid}!</p>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-purple-500"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
