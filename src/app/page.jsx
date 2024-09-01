import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Game Cờ vua</h1>
      <Link href="/chess">Chơi Game</Link>
    </div>
  )
}

