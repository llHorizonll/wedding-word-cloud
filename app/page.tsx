import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Wedding Word Cloud</h1>
      {/* <nav className="flex flex-col items-center space-y-4">
        <Link href="/form" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          Submit Words
        </Link>
        <Link href="/word-cloud" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          View Word Cloud
        </Link>
        <Link href="/prize" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          Prize Selection
        </Link>
      </nav> */}
    </main>
  )
}

