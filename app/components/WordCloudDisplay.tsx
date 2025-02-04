"use client";
import { createClient } from "@/lib/client";
import { useEffect, useState, useRef } from "react";
import WordCloud from "wordcloud";
import ShineBorder from "@/components/ui/shine-border";
import confetti from "canvas-confetti";

interface WordCloudDisplayProps {
  words: [string, number][];
}

export default function WordCloudDisplay({ words }: WordCloudDisplayProps) {
  const [rtWords, setRtWords] = useState(words);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime words")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "submissions",
        },
        async (payload: { new: { words: string } }) => {
          const { data: submissions, error } = await supabase.from("submissions").select("words");

          if (error) {
            console.error("Error fetching words:", error);
            return [];
          }

          if (!submissions || submissions.length === 0) {
            return [];
          }

          const result = Object.entries(
            submissions.reduce((acc: Record<string, number>, item) => {
              acc[item.words] = (acc[item.words] || 0) + 1;
              return acc;
            }, {})
          );


          const end = Date.now() + 3 * 1000; // 3 seconds
          const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
       
          const frame = () => {
            if (Date.now() > end) return;
       
            confetti({
              particleCount: 2,
              angle: 60,
              spread: 55,
              startVelocity: 60,
              origin: { x: 0, y: 0.5 },
              colors: colors,
            });
            confetti({
              particleCount: 2,
              angle: 120,
              spread: 55,
              startVelocity: 60,
              origin: { x: 1, y: 0.5 },
              colors: colors,
            });
       
            requestAnimationFrame(frame);
          };
       
          frame();


          setRtWords(result);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (rtWords.length > 0 && canvasRef.current) {
      WordCloud(canvasRef.current, {
        list: rtWords,
        weightFactor: (Math.pow(4, 2.3) * 2200) / 1024,
        fontFamily: "Leelawadee",
        color: "random-dark",
        rotateRatio: 1,
        rotationSteps: 12,
        backgroundColor: "white",
        minSize: 18,
      });
    }
  }, [rtWords]);

  if (words.length === 0) {
    return <div className="text-center">No words available. Be the first to add some!</div>;
  }

  return (
    <ShineBorder
      className="bg-white p-4 rounded-lg shadow-md w-full mx-auto"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      borderWidth={2}
    >
     
        <canvas ref={canvasRef} width="1024" height="840" className="mx-auto"></canvas>
     
    </ShineBorder>
  );
}
