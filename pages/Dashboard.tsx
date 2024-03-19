"use client"
import React, { useState } from "react";
import axios from "axios";

interface ShortenResponse {
  shortCode: string;
  message?: string; // Optional for error handling
}

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!originalUrl) {
      setErrorMessage("Please enter a URL to shorten.");
      return;
    }

    try {
      const { data } = await axios.post("/api/short", {
        url: originalUrl,
      });

      setShortCode(data.shortCode);
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setErrorMessage("Error shortening URL. Please try again." + error);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-black text-8xl font-bold animate-pulse">SHORT.LY</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-96 text-black active:border-none"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
      {shortCode && <p className="text-black">Shortened URL: <a href={`${process.env.NEXT_PUBLIC_HOST_NAME}/${shortCode}`}>{`${process.env.NEXT_PUBLIC_HOST_NAME}/${shortCode}`}</a></p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}