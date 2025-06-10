"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function IcebreakerSection() {
  const { toast } = useToast()
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you call a fake noodle? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "How does a penguin build its house? Igloos it together!",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "I'm on a seafood diet. I see food and I eat it.",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What's orange and sounds like a parrot? A carrot.",
  ]

  const funFacts = [
    "The average person spends 6 months of their lifetime waiting for red lights to turn green.",
    "A group of flamingos is called a 'flamboyance'.",
    "The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
    "The world's oldest known living tree is over 5,000 years old.",
    "Cows have best friends and get stressed when they are separated.",
    "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to go around the sun.",
    "The first oranges weren't orange – they were green.",
    "The Hawaiian alphabet has only 12 letters.",
    "A bolt of lightning is five times hotter than the surface of the sun.",
  ]

  const thoughtQuestions = [
    "If you could have dinner with any historical figure, who would it be and why?",
    "What's one skill you'd like to master in the next year?",
    "If you could instantly become an expert in something, what would it be?",
    "What's the best piece of advice you've ever received?",
    "If you could live in any fictional world, which would you choose?",
    "What's something you believed as a child that you later found out wasn't true?",
    "If you could solve one global problem, what would it be?",
    "What's a small change that made a big difference in your life?",
    "If you could travel anywhere in the world right now, where would you go?",
    "What's something you're looking forward to in the next month?",
  ]

  const getNewJoke = () => {
    let newIndex = Math.floor(Math.random() * jokes.length)
    while (newIndex === currentJokeIndex) {
      newIndex = Math.floor(Math.random() * jokes.length)
    }
    setCurrentJokeIndex(newIndex)
  }

  const getNewFact = () => {
    let newIndex = Math.floor(Math.random() * funFacts.length)
    while (newIndex === currentFactIndex) {
      newIndex = Math.floor(Math.random() * funFacts.length)
    }
    setCurrentFactIndex(newIndex)
  }

  const getNewQuestion = () => {
    let newIndex = Math.floor(Math.random() * thoughtQuestions.length)
    while (newIndex === currentQuestionIndex) {
      newIndex = Math.floor(Math.random() * thoughtQuestions.length)
    }
    setCurrentQuestionIndex(newIndex)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this in your meeting chat or email",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="jokes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jokes">Jokes</TabsTrigger>
          <TabsTrigger value="facts">Fun Facts</TabsTrigger>
          <TabsTrigger value="questions">Thought Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="jokes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Icebreaker Joke</CardTitle>
              <CardDescription>Lighten the mood with a quick joke to start your meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">{jokes[currentJokeIndex]}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={getNewJoke}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Joke
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => copyToClipboard(jokes[currentJokeIndex])}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="facts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fun Fact</CardTitle>
              <CardDescription>Share an interesting fact to spark conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">{funFacts[currentFactIndex]}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={getNewFact}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Fact
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => copyToClipboard(funFacts[currentFactIndex])}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Thought-Provoking Question</CardTitle>
              <CardDescription>Get the conversation flowing with an engaging question</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">{thoughtQuestions[currentQuestionIndex]}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={getNewQuestion}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Question
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => copyToClipboard(thoughtQuestions[currentQuestionIndex])}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Starter Pack</CardTitle>
          <CardDescription>Quick resources to make your meetings more engaging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Virtual Meeting Tips</h3>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Start with a quick round of introductions</li>
                <li>Use the icebreakers above to warm up the conversation</li>
                <li>Encourage video-on participation when possible</li>
                <li>Take short breaks during longer meetings</li>
                <li>End with clear action items and next steps</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Quick Team Activities</h3>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Two Truths and a Lie (2-3 minutes)</li>
                <li>30-Second Show and Tell</li>
                <li>Word Association Chain</li>
                <li>Rapid-Fire Brainstorming</li>
                <li>One-Word Check-In</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
