"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User, ExternalLink, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  suggestions?: string[]
  links?: Array<{
    text: string
    url: string
    type: "meetup" | "club"
  }>
}

// Version identifier - update this when you want to clear chat history
const CHAT_VERSION = "1.0.0"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your Finnect assistant. I can help you find meetups, clubs, and events. Try asking me something like 'Are there any coffee chats this week?' or 'Show me tech clubs'.",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Coffee chats in New York office",
        "Investment club meetings",
        "Gym sessions this week",
        "Upcoming events",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Clear chat history function
  const clearChatHistory = () => {
    const defaultMessage: Message = {
      id: "1",
      content:
        "Hi! I'm your Finnect assistant. I can help you find meetups, clubs, and events. Try asking me something like 'Are there any coffee chats this week?' or 'Show me tech clubs'.",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Coffee chats in New York office",
        "Investment club meetings",
        "Gym sessions this week",
        "Upcoming events",
      ],
    }

    setMessages([defaultMessage])
    localStorage.removeItem("finnect-chat-messages")
    localStorage.setItem("finnect-chat-version", CHAT_VERSION)
  }

  // Load chatbot state from localStorage on initial render
  useEffect(() => {
    // Check version and clear if different
    const savedVersion = localStorage.getItem("finnect-chat-version")
    if (savedVersion !== CHAT_VERSION) {
      console.log("Chat version mismatch, clearing history")
      clearChatHistory()
      return
    }

    const savedChatState = localStorage.getItem("finnect-chat-open")
    if (savedChatState === "true") {
      setIsOpen(true)
    }

    // Load saved messages if they exist
    const savedMessages = localStorage.getItem("finnect-chat-messages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (e) {
        console.error("Error loading saved messages:", e)
        clearChatHistory()
      }
    }
  }, [])

  // Save chatbot state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("finnect-chat-open", isOpen.toString())
  }, [isOpen])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("finnect-chat-messages", JSON.stringify(messages))
    localStorage.setItem("finnect-chat-version", CHAT_VERSION)
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock data for searching
  const mockData = {
    meetups: [
      {
        id: 1,
        title: "Coffee Chat with Marketing Team",
        location: "New York Office",
        type: "coffee",
        date: "Today, 10:30 AM",
      },
      {
        id: 2,
        title: "Morning Coffee & Networking",
        location: "Chicago Office",
        type: "coffee",
        date: "Tomorrow, 9:00 AM",
      },
      {
        id: 3,
        title: "Coffee and Career Discussion",
        location: "New York Office",
        type: "coffee",
        date: "Tomorrow, 2:00 PM",
      },
      {
        id: 4,
        title: "Lunchtime Workout Session",
        location: "Company Gym",
        type: "gym",
        date: "Wednesday, 12:00 PM",
      },
      {
        id: 5,
        title: "Seeking Mentor - Coffee Chat",
        location: "Rockville Office",
        type: "coffee",
        date: "Monday, 3:00 PM",
      },
      {
        id: 6,
        title: "Downtown Carpool Group",
        location: "New York Office",
        type: "carpool",
        date: "Daily, 8:00 AM",
      },
    ],
    clubs: [
      {
        id: 1,
        name: "Investment Strategies",
        category: "Finance",
        members: 42,
        nextEvent: "Portfolio Workshop - Tuesday",
      },
      { id: 2, name: "Tech Innovation", category: "Technology", members: 38, nextEvent: "AI Discussion - Friday" },
      { id: 3, name: "Book Club", category: "Literature", members: 25, nextEvent: "Monthly Discussion - Thursday" },
      { id: 4, name: "Running Group", category: "Fitness", members: 18, nextEvent: "Central Park Run - Saturday" },
      { id: 5, name: "Photography Club", category: "Arts", members: 15, nextEvent: "Photo Walk - Sunday" },
    ],
    news: [
      { id: 1, title: "New Hybrid Work Policy Updates", category: "Company", date: "2 hours ago" },
      { id: 2, title: "Q3 Financial Results", category: "Finance", date: "Yesterday" },
    ],
  }

  // Format responses to ensure they fit within chat bubbles
  const formatResponse = (response: string): string => {
    // Break long lines
    const maxLineLength = 30
    const lines = response.split("\n")
    const formattedLines = []

    for (const line of lines) {
      // If line is shorter than max, keep it as is
      if (line.length <= maxLineLength) {
        formattedLines.push(line)
        continue
      }

      // Break longer lines at spaces
      let currentLine = ""
      const words = line.split(" ")

      for (const word of words) {
        if ((currentLine + " " + word).length <= maxLineLength) {
          currentLine = currentLine ? currentLine + " " + word : word
        } else {
          formattedLines.push(currentLine)
          currentLine = word
        }
      }

      if (currentLine) {
        formattedLines.push(currentLine)
      }
    }

    return formattedLines.join("\n")
  }

  const generateBotResponse = (
    userMessage: string,
  ): { content: string; links: Array<{ text: string; url: string; type: "meetup" | "club" }> } => {
    const message = userMessage.toLowerCase()
    let response = ""
    const links: Array<{ text: string; url: string; type: "meetup" | "club" }> = []

    // Coffee chat queries
    if (message.includes("coffee") && (message.includes("new york") || message.includes("ny"))) {
      const coffeeChats = mockData.meetups.filter(
        (m) => m.type === "coffee" && m.location.toLowerCase().includes("new york"),
      )
      if (coffeeChats.length > 0) {
        response = `I found ${coffeeChats.length} coffee chat(s) in the New York office:\n\n`
        coffeeChats.forEach((chat, i) => {
          response += `• ${chat.title}\n  ${chat.date}\n  ${chat.location}`
          links.push({
            text: chat.title,
            url: `/pals/${chat.id}`,
            type: "meetup",
          })
          if (i < coffeeChats.length - 1) response += "\n\n"
        })
      } else {
        response =
          "I don't see any coffee chats scheduled for the New York office right now. Would you like to create one?"
      }
    }
    // General coffee queries
    else if (message.includes("coffee")) {
      const coffeeChats = mockData.meetups.filter((m) => m.type === "coffee")
      response = `I found ${coffeeChats.length} coffee chat(s):\n\n`
      coffeeChats.forEach((chat, i) => {
        response += `• ${chat.title}\n  ${chat.date}\n  ${chat.location}`
        links.push({
          text: chat.title,
          url: `/pals/${chat.id}`,
          type: "meetup",
        })
        if (i < coffeeChats.length - 1) response += "\n\n"
      })
    }
    // Gym/workout queries
    else if (message.includes("gym") || message.includes("workout") || message.includes("fitness")) {
      const gymSessions = mockData.meetups.filter((m) => m.type === "gym")
      const fitnessClubs = mockData.clubs.filter((c) => c.category === "Fitness")

      if (gymSessions.length > 0) {
        response += "Gym sessions:\n"
        gymSessions.forEach((gym, i) => {
          response += `• ${gym.title}\n  ${gym.date}`
          links.push({
            text: gym.title,
            url: `/pals/${gym.id}`,
            type: "meetup",
          })
          if (i < gymSessions.length - 1) response += "\n"
        })
        response += "\n\n"
      }

      if (fitnessClubs.length > 0) {
        response += "Fitness clubs:\n"
        fitnessClubs.forEach((club, i) => {
          response += `• ${club.name}\n  ${club.members} members\n  ${club.nextEvent}`
          links.push({
            text: club.name,
            url: `/clubs/${club.id}`,
            type: "club",
          })
          if (i < fitnessClubs.length - 1) response += "\n\n"
        })
      }

      if (!response) {
        response = "I don't see any gym sessions or fitness activities right now."
      }
    }
    // Club queries
    else if (message.includes("club") || message.includes("investment") || message.includes("tech")) {
      let relevantClubs = mockData.clubs

      if (message.includes("investment") || message.includes("finance")) {
        relevantClubs = mockData.clubs.filter((c) => c.category === "Finance")
      } else if (message.includes("tech")) {
        relevantClubs = mockData.clubs.filter((c) => c.category === "Technology")
      }

      response = "Here are the clubs I found:\n\n"
      relevantClubs.forEach((club, i) => {
        response += `• ${club.name}\n  ${club.members} members\n  Next: ${club.nextEvent}`
        links.push({
          text: club.name,
          url: `/clubs/${club.id}`,
          type: "club",
        })
        if (i < relevantClubs.length - 1) response += "\n\n"
      })
    }
    // Event queries
    else if (message.includes("event") || message.includes("this week") || message.includes("upcoming")) {
      const upcomingMeetups = mockData.meetups.slice(0, 4)
      const upcomingClubs = mockData.clubs.slice(0, 2)

      response = "Here are the upcoming events:\n\n"

      response += "Meetups:\n"
      upcomingMeetups.forEach((meetup, i) => {
        response += `• ${meetup.title}\n  ${meetup.date}`
        links.push({
          text: meetup.title,
          url: `/pals/${meetup.id}`,
          type: "meetup",
        })
        if (i < upcomingMeetups.length - 1) response += "\n"
      })

      response += "\n\nClub Events:\n"
      upcomingClubs.forEach((club, i) => {
        response += `• ${club.name}\n  ${club.nextEvent}`
        links.push({
          text: club.name,
          url: `/clubs/${club.id}`,
          type: "club",
        })
        if (i < upcomingClubs.length - 1) response += "\n"
      })
    }
    // News queries
    else if (message.includes("news") || message.includes("announcement")) {
      response = "Latest news and announcements:\n\n"
      mockData.news.forEach((news, i) => {
        response += `• ${news.title}\n  ${news.date}`
        if (i < mockData.news.length - 1) response += "\n\n"
      })
    }
    // Default response
    else {
      response =
        "I can help you find meetups, clubs, events, and news on Finnect. Try asking me about:\n\n• Coffee chats or gym sessions\n• Clubs by category (tech, finance, fitness)\n• Upcoming events this week\n• Recent news and announcements"
    }

    return {
      content: formatResponse(response),
      links,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const { content, links } = generateBotResponse(inputValue)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content,
        isBot: true,
        timestamp: new Date(),
        links: links.length > 0 ? links : undefined,
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-200",
          isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700",
        )}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[600px] max-h-[80vh] shadow-xl z-40 flex flex-col overflow-hidden">
          <CardHeader className="pb-3 border-b flex-shrink-0">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-blue-600" />
                Finnect Assistant
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChatHistory}
                className="h-8 w-8 p-0 hover:bg-slate-100"
                title="Clear chat history"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            {/* Messages Container */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4"
              style={{
                scrollBehavior: "smooth",
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex", message.isBot ? "justify-start" : "justify-end")}>
                    <div
                      className={cn(
                        "flex items-start space-x-2 max-w-[85%]",
                        message.isBot ? "" : "flex-row-reverse space-x-reverse",
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          message.isBot ? "bg-blue-100" : "bg-slate-100",
                        )}
                      >
                        {message.isBot ? (
                          <Bot className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4 text-slate-600" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-lg p-3 text-sm",
                          message.isBot ? "bg-slate-100" : "bg-blue-600 text-white",
                        )}
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          hyphens: "auto",
                        }}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

                        {/* Quick Links */}
                        {message.links && message.links.length > 0 && (
                          <div className="mt-3">
                            <div className="text-xs text-slate-600 mb-2">Quick links:</div>
                            <div className="flex flex-wrap gap-1">
                              {message.links.map((link, index) => (
                                <Link key={index} href={link.url} onClick={(e) => e.stopPropagation()}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 px-2 py-1 whitespace-nowrap text-ellipsis overflow-hidden hover:bg-blue-50"
                                    title={link.text}
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    {link.text.length > 15 ? `${link.text.substring(0, 15)}...` : link.text}
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-3">
                            <div className="text-xs text-slate-600 mb-2">Try asking:</div>
                            <div className="flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7 px-2 py-1 whitespace-nowrap text-ellipsis overflow-hidden"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  title={suggestion}
                                >
                                  {suggestion.length > 20 ? `${suggestion.substring(0, 20)}...` : suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-slate-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4 flex-shrink-0">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about meetups, clubs, events..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
