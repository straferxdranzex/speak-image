import React, { createContext, useContext, useState, useCallback } from 'react'

interface ChatEntry {
  prompt: string
  response: string
  loading: boolean
  image: string | null
  imagex: string | null
  video: string | null
}

interface ChatHistory {
  _id: string
  user_id: string
  title: string
  conversation: Array<{
    query: string
    response: {
      text: string
      dalle_image: string | null
      pixabay_img: string | null
      pixabay_video: string | null
    }
    timestamp: string
  }>
  create_timestamp: string
}

interface ChatContextType {
  allChats: ChatHistory[]
  setAllChats: React.Dispatch<React.SetStateAction<ChatHistory[]>>
  activeChatId: string
  setActiveChatId: React.Dispatch<React.SetStateAction<string>>
  loadChatHistory: (chatId: string) => void
  chatHistory: ChatEntry[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatEntry[]>>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allChats, setAllChats] = useState<ChatHistory[]>([])
  const [activeChatId, setActiveChatId] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([])

  const loadChatHistory = useCallback((chatId: string) => {
    setActiveChatId(chatId)
    const selectedChat = allChats.find((chat) => chat._id === chatId)
    if (selectedChat) {
      const formattedEntries = selectedChat.conversation.map((entry) => ({
        prompt: entry.query,
        response: entry.response.text,
        loading: false,
        image: entry.response.dalle_image,
        imagex: entry.response.pixabay_img,
        video: entry.response.pixabay_video,
      }))
      setChatHistory(formattedEntries)
    }
  }, [allChats])

  return (
    <ChatContext.Provider
      value={{
        allChats,
        setAllChats,
        activeChatId,
        setActiveChatId,
        loadChatHistory,
        chatHistory,
        setChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}