import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: Ensure you have created the 'submissions' table in your Supabase project
    const { data: submissions, error } = await supabase.from("submissions").select("name");

    if (error) throw error;

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ message: "No participants found" }, { status: 404 });
    }

    const winner = submissions[Math.floor(Math.random() * submissions.length)].name;

    return NextResponse.json({ winner });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
  }
}
