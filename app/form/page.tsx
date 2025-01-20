import { supabase } from "@/lib/supabase";
import ClientForm from "./components/ClientForm";

async function submitWords(formData: FormData): Promise<void> {
  "use server";

  const name = formData.get("name") as string;
  const words = formData.get("words") as string;

  if (!name || !words) {
    throw new Error("Name and words are required");
  }

  const { error } = await supabase.from("submissions").insert({ name, words });

  if (error) {
    throw new Error("Failed to submit words");
  }
}

export default function FormPage() {
  return <ClientForm submitWords={submitWords} />;
}
