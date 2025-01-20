import { supabase } from "@/lib/supabase";
import GiveawayWheel from "../components/GiveawayWheel";
import PrizeSelection from "../components/PrizeSelection";

async function getNames() {
  try {
    const { data, error } = await supabase.from("submissions").select(`name,words`);

    if (error) {
      console.error("Error fetching words:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // const winner = data[Math.floor(Math.random() * data.length)];

    // console.log(winner,'www');

    return data;
  } catch (error) {
    console.error("Error in getWords:", error);
    return [];
  }
}

export default async function PrizePage() {
  const nameList = await getNames();

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
     
      {/* <PrizeSelection /> */}
      <GiveawayWheel nameList={nameList} />
    </main>
  );
}
