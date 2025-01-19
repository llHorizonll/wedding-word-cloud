import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// TODO: Replace with your Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  try {
    const { name, words } = await req.json()

    if (!name || !words) {
      return NextResponse.json({ message: 'Name and words are required' }, { status: 400 })
    }

    // TODO: Create a 'submissions' table in your Supabase project with columns: id (auto-incrementing), name (text), words (text), created_at (timestamp with time zone)
    const { data, error } = await supabase
      .from('submissions')
      .insert({ name, words })

    if (error) throw error

    return NextResponse.json({ message: 'Submission successful', data }, { status: 200 })
  } catch (error) {
    console.error('Error in submit-words:', error)
    return NextResponse.json({ message: 'Internal server error', error: String(error) }, { status: 500 })
  }
}

