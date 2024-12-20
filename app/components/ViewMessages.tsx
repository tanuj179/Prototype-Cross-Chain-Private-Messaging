import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ViewMessagesProps {
  messages: Array<{ recipient: string; encryptedMessage: string }>
}

export default function ViewMessages({ messages }: ViewMessagesProps) {
  const [privateKey, setPrivateKey] = useState('')
  const [decryptedMessages, setDecryptedMessages] = useState<Array<{ recipient: string; message: string }>>([])

  const handleDecrypt = () => {
    if (privateKey) {
      const decrypted = messages.map(({ recipient, encryptedMessage }) => {
        try {
          const decoded = atob(encryptedMessage)
          const [msgPrivateKey, message] = decoded.split(':')
          if (msgPrivateKey === privateKey) {
            return { recipient, message }
          }
          return { recipient, message: 'Unable to decrypt (wrong private key)' }
        } catch {
          return { recipient, message: 'Unable to decrypt' }
        }
      })
      setDecryptedMessages(decrypted)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">View Messages</h2>
      <div className="flex space-x-2">
        <div className="flex-grow">
          <Label htmlFor="privateKey">Private Key</Label>
          <Input
            id="privateKey"
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter your private key"
          />
        </div>
        <Button onClick={handleDecrypt} className="mt-auto">Decrypt</Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Encrypted Messages</h3>
        {messages.map((msg, index) => (
          <div key={`encrypted-${index}`} className="border p-2 rounded">
            <p><strong>To:</strong> {msg.recipient}</p>
            <p><strong>Encrypted Message:</strong> {msg.encryptedMessage}</p>
          </div>
        ))}
      </div>
      {decryptedMessages.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Decrypted Messages</h3>
          {decryptedMessages.map((msg, index) => (
            <div key={`decrypted-${index}`} className="border p-2 rounded">
              <p><strong>To:</strong> {msg.recipient}</p>
              <p><strong>Message:</strong> {msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

