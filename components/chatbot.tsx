"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  suggestions?: string[]
}

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
      { id: 2, title: "Lunch at the Cafeteria", location: "Main Office", type: "lunch", date: "Today, 12:30 PM" },
      {
        id: 3,
        title: "Coffee and Career Discussion",
        location: "New York Office",
        type: "coffee",
        date: "Tomorrow, 2:00 PM",
      },
      { id: 4, title: "Lunchtime Workout Session", location: "Company Gym", type: "gym", date: "Wednesday, 12:00 PM" },
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
      { id: 3, name: "Running Group", category: "Fitness", members: 18, nextEvent: "Central Park Run - Saturday" },
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

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    let response = ""

    // Coffee chat queries
    if (message.includes("coffee") && (message.includes("new york") || message.includes("ny"))) {
      const coffeeChats = mockData.meetups.filter(
        (m) => m.type === "coffee" && m.location.toLowerCase().includes("new york"),
      )
      if (coffeeChats.length > 0) {
        response = `I found ${coffeeChats.length} coffee chat(s) in the New York office:\n\n`
        coffeeChats.forEach((chat, i) => {
          response += `• ${chat.title}\n  ${chat.date}`
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
        if (i < coffeeChats.length - 1) response += "\n\n"
      })
    }
    // Lunch queries
    else if (message.includes("lunch")) {
      const lunchMeetups = mockData.meetups.filter((m) => m.type === "lunch")
      response = `Here are the lunch meetups:\n\n`
      lunchMeetups.forEach((lunch, i) => {
        response += `• ${lunch.title}\n  ${lunch.date}\n  ${lunch.location}`
        if (i < lunchMeetups.length - 1) response += "\n\n"
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
          if (i < gymSessions.length - 1) response += "\n"
        })
        response += "\n\n"
      }

      if (fitnessClubs.length > 0) {
        response += "Fitness clubs:\n"
        fitnessClubs.forEach((club, i) => {
          response += `• ${club.name}\n  ${club.members} members\n  ${club.nextEvent}`
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
        if (i < relevantClubs.length - 1) response += "\n\n"
      })
    }
    // Event queries
    else if (message.includes("event") || message.includes("this week") || message.includes("upcoming")) {
      const upcomingEvents = [
        "Coffee Chat with Marketing\n  Today, 10:30 AM",
        "Portfolio Workshop\n  Tuesday, 12:00 PM",
        "AI Discussion\n  Friday, 3:00 PM",
        "Central Park Run\n  Saturday, 9:00 AM",
      ]

      response = "Here are the upcoming events:\n\n"
      upcomingEvents.forEach((event, i) => {
        response += `• ${event}`
        if (i < upcomingEvents.length - 1) response += "\n\n"
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
        "I can help you find meetups, clubs, events, and news on Finnect. Try asking me about:\n\n• Coffee chats or lunch meetups\n• Clubs by category (tech, finance, fitness)\n• Upcoming events this week\n• Recent news and announcements"
    }

    return formatResponse(response)
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
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
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
        <Card className="fixed bottom-24 right-6 w-72 sm:w-80 h-[500px] shadow-xl z-40 flex flex-col">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5 text-blue-600" />
              Finnect Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex", message.isBot ? "justify-start" : "justify-end")}>
                    <div
                      className={cn(
                        "flex items-start space-x-2",
                        message.isBot ? "" : "flex-row-reverse space-x-reverse",
                      )}
                      style={{ maxWidth: "65%" }}
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
                          "rounded-lg p-3 text-sm overflow-hidden",
                          message.isBot ? "bg-slate-100" : "bg-blue-600 text-white",
                        )}
                        style={{
                          width: "100%",
                          maxWidth: "calc(100% - 40px)",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            width: "100%",
                          }}
                        >
                          {message.content}
                        </div>
                        {message.suggestions && (
                          <div className="mt-3">
                            <div className="text-xs text-slate-600 mb-2">Try asking:</div>
                            <div className="flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7 mb-1 flex-shrink-0"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
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
                    <div className="flex items-start space-x-2" style={{ maxWidth: "65%" }}>
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
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
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
