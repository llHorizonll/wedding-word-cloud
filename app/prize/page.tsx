import { supabase } from "@/lib/supabase";
import GiveawayWheel from "../components/GiveawayWheel";

async function getWheelData() {
  try {
    const { data, error } = await supabase.from("submissions").select(`name,words`);

    if (error) {
      console.error("Error fetching words:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const wheelData = data.map((participant) => ({
      option: participant.name,
      words: participant.words,
      style: { backgroundColor: "#FFC0CB", color: "#8B0000" }, // Wedding-themed colors
      optionSize: 1,
    }));

    return wheelData;
  } catch (error) {
    console.error("Error in getWords:", error);
    return [];
  }
}

export default async function PrizePage() {
  const wheelData = await getWheelData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      {wheelData.length > 0 && <GiveawayWheel wheelData={wheelData} />}
    </main>
  );
}
