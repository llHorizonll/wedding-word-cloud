import PrizeSelection from '../components/PrizeSelection'
import Link from 'next/link'

export default function PrizePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Prize Selection</h1>
      <PrizeSelection />
      <div className="mt-8 text-center">
        <Link href="/" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          Back to Home
        </Link>
      </div>
    </main>
  )
}

