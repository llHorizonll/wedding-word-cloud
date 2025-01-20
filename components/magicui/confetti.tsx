"use client";
import confetti from "canvas-confetti";

export function ConfettiButton({ children }: { children: React.ReactNode }) {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <button onClick={handleConfetti} className="cursor-pointer" type="button">
      {children}
    </button>
  );
}
