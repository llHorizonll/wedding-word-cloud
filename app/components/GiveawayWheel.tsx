"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Participant {
  name: string;
  words: string;
}

interface GiveawayWheelProps {
  nameList: Participant[];
}

const GiveawayWheel: React.FC<GiveawayWheelProps> = ({ nameList }) => {
  const [winner, setWinner] = useState<Participant | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);

  const wheelData = nameList.map((participant) => ({
    option: participant.name,
    style: { backgroundColor: "#FFC0CB", color: "#8B0000" },
    optionSize: 1, // Wedding-themed colors
  }));

  const handleSpin = () => {
    if (spinning) return;
    setShowConfetti(false);
    setWinner(null);
    setSpinning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-indigo-200 p-6">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Wedding Giveaway</h1>
      <div className="parent-container">
        <Wheel
          mustStartSpinning={spinning}
          prizeNumber={prizeIndex}
          data={wheelData}
          onStopSpinning={() => {
            const randomIndex = Math.floor(Math.random() * nameList.length);
            setPrizeIndex(randomIndex);
            setWinner(nameList[randomIndex]);
            setShowConfetti(true);
            setIsDialogOpen(true);
            setSpinning(false);
          }}
          outerBorderColor="#FFD700"
          radiusLineColor="#FF69B4"
          textDistance={70} // เพิ่มระยะห่างของข้อความ
          fontSize={20} // เพิ่มขนาดตัวอักษร
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
        <DialogContent className="bg-white rounded-lg shadow-xl text-center max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-pink-600">
              🎉 Congratulations {winner?.name}! 🎉
            </DialogTitle>
          </DialogHeader>
          <p className="mt-4 text-lg italic text-gray-700">"{winner?.words}"</p>
          <Button onClick={() => setIsDialogOpen(false)} className="mt-4 bg-gray-500 hover:bg-gray-700">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GiveawayWheel;
