'use client'

import { useState } from 'react'
import { ImagePlus, Send } from 'lucide-react'

function ChatInput({ onSubmit }) {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim() || image) {
      onSubmit(prompt, image)
      setPrompt('')
      setImage(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button
          type="button"
          className="w-full flex items-center justify-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-100"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <ImagePlus className="h-5 w-5" />
          <span>Add Image</span>
        </button>
        <div className="mt-2">
          {image && (
            <p className="text-sm text-gray-500 truncate">
              Selected: {image.name}
            </p>
          )}
        </div>
      </div>
      <textarea
        placeholder="Enter your message here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="resize-none w-full border p-2 rounded-md"
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center bg-green-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={!prompt.trim() && !image}
      >
        <Send className="mr-2 h-4 w-4" /> Send
      </button>
    </form>
  )
}

export default ChatInput;