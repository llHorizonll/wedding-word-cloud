"use client";
import { useState, useEffect } from "react";
import { FaHeart, FaCopy } from "react-icons/fa";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";

export default function ClientForm({ submitWords }: { submitWords: (formData: FormData) => Promise<void> }) {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [celebration, setCelebration] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fallingHearts, setFallingHearts] = useState<JSX.Element[]>([]);
  const [mostFrequent, setMostFrequent] = useState<string[]>([]);
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

  const fetchWords = async () => {
    const { data, error } = await supabase.from("submissions").select("words");
    if (error) {
      console.error("Error fetching words:", error);
      return [];
    }

    const result = Object.entries(
      data.reduce((acc: Record<string, number>, item) => {
        acc[item.words] = (acc[item.words] || 0) + 1;
        return acc;
      }, {})
    );

    // Sort the array by frequency (second element) in descending order
    const sortedData = result.sort((a, b) => b[1] - a[1]);

    // Extract the top two most frequent values
    const mostFrequent = sortedData.slice(0, 2).map((item) => item[0]);
    const mostFrequentCustom = [...mostFrequent, "❤️❤️❤️", "🤵💕👰"];
    setMostFrequent(mostFrequentCustom);
  };

  useEffect(() => {
    fetchWords();
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
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-pink-700 text-center mb-4">Wedding Celebration</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 border-2 border-pink-300 rounded-full focus:ring-2 focus:ring-pink-400 transition-all"
                required
              />
              <textarea
                value={celebration}
                onChange={(e) => setCelebration(e.target.value)}
                placeholder="Share Your Magical Message (Limit 30 charecters)"
                className="w-full p-3 mb-2 border-2 border-pink-300 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-pink-400 transition-all"
                maxLength={30}
                required
              />
            </div>
            <div className="space-y-2 mb-4">
              {mostFrequent.map((word) => (
                <div
                  className="inline-flex flex-start pl-2"
                  onClick={() => {
                    if (celebration === "") {
                      setCelebration(word);
                    } else {
                      setCelebration(celebration + " " + word);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    )}
                  >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                      <span>{word}</span>
                      <FaCopy className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="bg-white/60 p-8 rounded-2xl border-2 border-pink-200">
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
