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
      .select('words')

    if (error) throw error

    if (!submissions || submissions.length === 0) {
      return NextResponse.json([])
    }

    const allWords = submissions.flatMap(submission => submission.words.split(/\s+/))

    const wordCount = allWords.reduce((acc, word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w\s]/gi, '')
      if (cleanWord) {
        acc[cleanWord] = (acc[cleanWord] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const wordList = Object.entries(wordCount)
      .filter(([word, count]) => word.length > 1 && count > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)

    return NextResponse.json(wordList)
  } catch (error) {
    console.error('Error in get-words:', error)
    return NextResponse.json({ message: 'Internal server error', error: String(error) }, { status: 500 })
  }
}

