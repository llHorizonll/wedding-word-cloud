"use client"
import { useEffect, useRef } from 'react'
import WordCloud from 'wordcloud'

interface WordCloudDisplayProps {
  words: [string]
}

export default function WordCloudDisplay({ words }: WordCloudDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (words.length > 0 && canvasRef.current) {
      console.log('Rendering word cloud with words:', words) // Add this line for debugging
      WordCloud(canvasRef.current, {
        list: words,
        weightFactor: 15,
        fontFamily: 'Impact',
        color: 'random-dark',
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: 'white',
        minSize: 10,
      })
    }
  }, [words])

  if (words.length === 0) {
    return <div className="text-center">No words available. Be the first to add some!</div>
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} width="800" height="600" className="mx-auto"></canvas>
    </div>
  )
}

