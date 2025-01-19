import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// TODO: Replace with your Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // TODO: Ensure you have created the 'submissions' table in your Supabase project
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('name')

    if (error) throw error

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ message: 'No participants found' }, { status: 404 })
    }

    const winner = submissions[Math.floor(Math.random() * submissions.length)].name

    return NextResponse.json({ winner })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Internal server error', error: String(error) }, { status: 500 })
  }
}

