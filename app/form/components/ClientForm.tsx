"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export default function ClientForm({ submitWords }: { submitWords: (formData: FormData) => Promise<void> }) {
  const [name, setName] = useState("");
  const [celebration, setCelebration] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fallingHearts, setFallingHearts] = useState<JSX.Element[]>([]);

  const createFallingHearts = () => {
    const heartElements = Array(50)
      .fill(null)
      .map((_, index) => {
        const colors = ["#FFC0CB", "#FF69B4", "#FFB6C1", "#FF1493"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const style = {
          position: "fixed",
          left: `${Math.random() * 100}%`,
          top: `-50px`,
          color: randomColor,
          fontSize: `${Math.random() * 30 + 10}px`,
          animation: `fall 3s linear ${Math.random() * 2}s infinite`,
          zIndex: 1000,
          transform: `rotate(${Math.random() * 360}deg)`,
        };

        return <FaHeart key={index} style={style as React.CSSProperties} />;
      });

    setFallingHearts(heartElements);

    setTimeout(() => {
      setFallingHearts([]);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("words", celebration);

    try {
      await submitWords(formData);
      setSubmitted(true);
      createFallingHearts();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setName("");
    setCelebration("");
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fall {
            0% { transform: translateY(-50px) rotate(${Math.random() * 360}deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
      {fallingHearts}
      <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-pink-200">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-serif text-pink-700 text-center mb-4">Wedding Celebration</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Beautiful Name"
              className="w-full p-3 border-2 border-pink-300 rounded-full focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
            <textarea
              value={celebration}
              onChange={(e) => setCelebration(e.target.value)}
              placeholder="Share Your Magical Message"
              className="w-full p-3 border-2 border-pink-300 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
            >
              <FaHeart className="inline-block mr-2" /> Celebrate Love
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <FaHeart className="text-7xl text-pink-500 mx-auto animate-pulse" />
            <h2 className="text-4xl font-serif text-pink-700">Thank you !</h2>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-pink-200">
              <p className="text-gray-800 font-medium break-words">{celebration}</p>
            </div>
            <button
              onClick={reset}
              type="button"
              className="w-full bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
            >
              Celebrate Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
