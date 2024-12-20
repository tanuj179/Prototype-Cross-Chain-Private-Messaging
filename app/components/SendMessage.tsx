import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface SendMessageProps {
  addMessage: (recipient: string, encryptedMessage: string) => void
}

export default function SendMessage({ addMessage }: SendMessageProps) {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (recipient && message && privateKey) {
      // In a real implementation, we would encrypt the message here using the private key
      const encryptedMessage = btoa(`${privateKey}:${message}`) // Simple encoding for demonstration
      addMessage(recipient, encryptedMessage)
      setRecipient('')
      setMessage('')
      setPrivateKey('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <Label htmlFor="privateKey">Private Key</Label>
        <Input
          id="privateKey"
          type="password"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter your private key"
          required
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          required
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  )
}

