'use client'

import { useState, useEffect } from 'react'
import SendMessage from './components/SendMessage'
import ViewMessages from './components/ViewMessages'

export default function Home() {
  const [messages, setMessages] = useState<Array<{ recipient: string; encryptedMessage: string }>>([])

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  const addMessage = (recipient: string, encryptedMessage: string) => {
    const newMessages = [...messages, { recipient, encryptedMessage }]
    setMessages(newMessages)
    localStorage.setItem('messages', JSON.stringify(newMessages))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Cross-Chain Private Messaging Protocol</h1>
      <div className="w-full max-w-2xl space-y-8">
        <SendMessage addMessage={addMessage} />
        <ViewMessages messages={messages} />
      </div>
    </main>
  )
}

