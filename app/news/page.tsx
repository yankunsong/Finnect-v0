import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Share2, ThumbsUp, MessageSquare, Bookmark } from "lucide-react"
import IcebreakerSection from "@/components/icebreaker-section"

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "FINRA Announces New Hybrid Work Policy Updates",
      summary: "New guidelines for flexible work arrangements to be implemented starting next month.",
      date: "2 hours ago",
      category: "Company",
      readTime: "3 min read",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Q3 Financial Results Exceed Expectations",
      summary: "FINRA reports strong performance in regulatory oversight and member engagement for the third quarter.",
      date: "Yesterday",
      category: "Finance",
      readTime: "5 min read",
      likes: 42,
      comments: 15,
    },
    {
      id: 3,
      title: "New Compliance Training Modules Released",
      summary: "Updated training materials now available on the learning portal for all employees.",
      date: "2 days ago",
      category: "Training",
      readTime: "2 min read",
      likes: 18,
      comments: 3,
    },
    {
      id: 4,
      title: "Industry Spotlight: Cryptocurrency Regulation Trends",
      summary:
        "Analysis of emerging regulatory frameworks for digital assets and implications for market participants.",
      date: "3 days ago",
      category: "Industry",
      readTime: "7 min read",
      likes: 56,
      comments: 12,
    },
    {
      id: 5,
      title: "Technology Department Launches AI Initiative",
      summary: "New project aims to enhance regulatory oversight through machine learning and artificial intelligence.",
      date: "4 days ago",
      category: "Technology",
      readTime: "4 min read",
      likes: 37,
      comments: 9,
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Company: "bg-blue-100 text-blue-800",
      Finance: "bg-green-100 text-green-800",
      Training: "bg-amber-100 text-amber-800",
      Industry: "bg-purple-100 text-purple-800",
      Technology: "bg-indigo-100 text-indigo-800",
    }
    return colors[category] || "bg-slate-100 text-slate-800"
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News & Icebreakers</h1>
        <p className="text-muted-foreground mt-2">
          Stay informed with the latest updates and find conversation starters
        </p>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="news">Company News</TabsTrigger>
          <TabsTrigger value="icebreakers">Icebreakers</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-6">
          <div className="grid gap-6">
            {newsItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.summary}</CardDescription>
                    </div>
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{item.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.readTime}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{item.comments}</span>
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="icebreakers">
          <IcebreakerSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
