import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function submitWords(formData: FormData) {
  'use server'

  const name = formData.get('name') as string
  const words = formData.get('words') as string

  if (!name || !words) {
    return { error: 'Name and words are required' }
  }

  const { error } = await supabase
    .from('submissions')
    .insert({ name, words })

  if (error) {
    console.error('Error submitting words:', error)
    return { error: 'Failed to submit words' }
  }

  revalidatePath('/word-cloud')
  redirect('/word-cloud')
}

export default function FormPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Submit Your Words</h1>
      <form action={submitWords} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="words"
          placeholder="Enter your celebratory words..."
          required
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors"
        >
          Submit
        </button>
      </form>
      <div className="mt-8 text-center">
        <Link href="/" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          Back to Home
        </Link>
      </div>
    </main>
  )
}

