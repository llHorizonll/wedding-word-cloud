"use client";
import { createClient } from "@/lib/client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaSync } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

const Wheel = dynamic(() => import("react-custom-roulette").then((mod) => mod.Wheel), {
  ssr: false,
});

interface Participant {
  name: string;
  words: string;
}

interface WheelData {
  option: string;
  words: string;
  style: { backgroundColor: string; color: string };
  optionSize: number;
}

interface GiveawayWheelProps {
  wheelData: WheelData[];
}

const GiveawayWheel: React.FC<GiveawayWheelProps> = ({ wheelData }) => {
  const [wheelDataList, setWheelDataList] = useState<WheelData[]>(wheelData);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);

  const supabase = createClient();

  const fetchNames = async () => {
    const { data, error } = await supabase.from("submissions").select("name,words");
    if (error) {
      console.error("Error fetching words:", error);
      return [];
    }
    const wheelData = data.map((participant) => ({
      option: participant.name,
      words: participant.words,
      style: { backgroundColor: "#FFC0CB", color: "#8B0000" }, // Wedding-themed colors
      optionSize: 1,
    }));
    setWheelDataList(wheelData);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const handleSpin = () => {
    if (spinning) return;
    setShowConfetti(false);
    setWinner(null);
    setSpinning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-indigo-200 p-6">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Giveaway Prize <FaSync style={{ cursor: "pointer", display: "inline-block" }} onClick={fetchNames} />
      </h1>
      <div className="parent-container">
        <Wheel
          mustStartSpinning={spinning}
          prizeNumber={prizeIndex}
          data={wheelDataList}
          onStopSpinning={() => {
            const randomIndex = Math.floor(Math.random() * wheelDataList.length);
            setPrizeIndex(randomIndex);
            setWinner({ name: wheelDataList[randomIndex].option, words: wheelDataList[randomIndex].words });
            setShowConfetti(true);
            setIsDialogOpen(true);
            setSpinning(false);
          }}
          outerBorderColor="#BFECFF"
          radiusLineColor="#FF69B4"
          textDistance={80} // เพิ่มระยะห่างของข้อความ
          fontFamily={"Kanit"}
          fontSize={18} // เพิ่มขนาดตัวอักษร
          outerBorderWidth={6} // เพิ่มความหนาของขอบนอก
          radiusLineWidth={2} // เพิ่มความหนาของเส้นรัศมี
          innerRadius={0} // ปรับขนาดวงในของวงล้อ
          innerBorderWidth={0} // ปรับความหนาของขอบด้านใน
        />
      </div>

      <Button onClick={handleSpin} className="mt-6 bg-pink-500 hover:bg-pink-700">
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-xl text-center max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold text-pink-600 mb-8">
              🎉 Congratulations {winner?.name}! 🎉
            </DialogTitle>
          </DialogHeader>
          <p className="mt-8 text-2xl text-gray-700 px-8">"{winner?.words}"</p>
          <Button onClick={() => setIsDialogOpen(false)} className="mt-8 bg-gray-500 hover:bg-gray-700 text-lg px-8">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GiveawayWheel;
