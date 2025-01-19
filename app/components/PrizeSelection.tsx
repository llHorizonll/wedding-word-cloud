'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function PrizeSelection() {
  const [winner, setWinner] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectWinner = async () => {
    try {
      const response = await fetch('/api/select-winner')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setWinner(data.winner)
      setError(null)
    } catch (error) {
      console.error('Error selecting winner:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <div className="text-center">
      <Button onClick={selectWinner}>Select Prize Winner</Button>
      {winner && (
        <div className="mt-4 p-4 bg-pink-100 rounded-lg">
          <h3 className="text-xl font-bold text-pink-600">Congratulations!</h3>
          <p className="text-lg">{winner} has won the prize!</p>
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  )
}

