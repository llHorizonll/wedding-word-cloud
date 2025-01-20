import { supabase } from "@/lib/supabase";
import WordCloudDisplay from "../components/WordCloudDisplay";
import { ConfettiButton } from "@/components/magicui/confetti";

async function getWords() {
  try {
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

    return result;
  } catch (error) {
    console.error("Error in getWords:", error);
    return [];
  }
}

export const revalidate = 0; // This ensures the page is always up-to-date

export default async function WordCloudPage() {
  const words = await getWords();

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8 flex flex-col items-center">
      <ConfettiButton>
        <h1 className="text-4xl font-bold text-center mb-12 text-pink-600">Welcome Home Party 🎉</h1>{" "}
      </ConfettiButton>
      <WordCloudDisplay words={words} />
      {/* <div className="mt-12 text-center">
        <Link href="/" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          Back to Home
        </Link>
      </div> */}
    </main>
  );
}
