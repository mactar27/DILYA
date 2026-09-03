'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function ChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [localInput, setLocalInput] = useState('')
  const { messages, status, error, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const isLoading = status === 'streaming' || status === 'submitted'

  // Ne pas afficher sur le dashboard admin
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* Bouton d'ouverture */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-label="Ouvrir l'assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Fenêtre de chat */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[calc(100vh-100px)] w-[350px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <div>
              <h3 className="font-semibold text-sm">Assistante DILYA</h3>
              <p className="text-[10px] opacity-80">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-center text-muted-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm">Bonjour ! 👋 <br/>Je suis l'assistante virtuelle de DILYA. Comment puis-je vous aider aujourd'hui ?</p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === 'user' ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                  )}
                >
                  {m.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 text-sm",
                    m.role === 'user'
                      ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                      : "bg-white border text-foreground rounded-tl-sm shadow-sm"
                  )}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {/* On remplace les marqueurs markdown de base (**) par des spans gras */}
                  {m.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="mr-auto flex gap-2 max-w-[85%]">
               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white border px-4 py-2 text-sm shadow-sm">
                  <span className="flex space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
            </div>
          )}
          {error && (
            <div className="mx-auto my-2 rounded-lg bg-red-50 p-3 text-center text-xs text-red-500 border border-red-100 max-w-[85%]">
              {error.message || "Oups ! L'assistante n'a pas pu répondre. (Avez-vous bien ajouté la clé API sur Vercel ?)"}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white p-3">
          <div className="flex gap-2 relative">
            <input
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const text = localInput.trim();
                  if (!text || isLoading) return;
                  sendMessage({ role: 'user', content: text });
                  setLocalInput('');
                }
              }}
              placeholder="Posez votre question..."
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
            <Button 
              type="button" 
              onClick={(e) => {
                e.preventDefault();
                const text = localInput.trim();
                if (!text || isLoading) return;
                sendMessage({ role: 'user', content: text });
                setLocalInput('');
              }}
              size="icon"
              className="shrink-0 rounded-full h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
