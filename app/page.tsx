import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Share2, ThumbsUp, MessageSquare, Newspaper, Smile } from "lucide-react"
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
      category: "Company",
      readTime: "5 min read",
      likes: 42,
      comments: 15,
    },
    {
      id: 3,
      title: "New Compliance Training Modules Released",
      summary: "Updated training materials now available on the learning portal for all employees.",
      date: "2 days ago",
      category: "Company",
      readTime: "2 min read",
      likes: 18,
      comments: 3,
    },
    {
      id: 4,
      title: "Fed Raises Interest Rates by 0.25%",
      summary:
        "Federal Reserve announces quarter-point rate increase amid ongoing inflation concerns and economic uncertainty.",
      date: "3 hours ago",
      category: "US News",
      readTime: "4 min read",
      likes: 89,
      comments: 23,
    },
    {
      id: 5,
      title: "SEC Proposes New Cryptocurrency Regulations",
      summary:
        "Securities and Exchange Commission unveils comprehensive framework for digital asset oversight and investor protection.",
      date: "6 hours ago",
      category: "US News",
      readTime: "6 min read",
      likes: 156,
      comments: 34,
    },
    {
      id: 6,
      title: "Industry Spotlight: Cryptocurrency Regulation Trends",
      summary:
        "Analysis of emerging regulatory frameworks for digital assets and implications for market participants.",
      date: "1 day ago",
      category: "Industry",
      readTime: "7 min read",
      likes: 56,
      comments: 12,
    },
    {
      id: 7,
      title: "Banking Sector Shows Resilience Amid Market Volatility",
      summary:
        "Major financial institutions report stable earnings despite challenging economic conditions and regulatory changes.",
      date: "1 day ago",
      category: "US News",
      readTime: "5 min read",
      likes: 73,
      comments: 18,
    },
    {
      id: 8,
      title: "Consumer Protection Bureau Issues New Guidelines",
      summary:
        "CFPB releases updated rules for financial service providers to enhance consumer rights and transparency.",
      date: "2 days ago",
      category: "US News",
      readTime: "4 min read",
      likes: 45,
      comments: 9,
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Company: "bg-blue-100 text-blue-800 border-blue-200",
      "US News": "bg-red-100 text-red-800 border-red-200",
      Finance: "bg-green-100 text-green-800 border-green-200",
      Training: "bg-amber-100 text-amber-800 border-amber-200",
      Industry: "bg-purple-100 text-purple-800 border-purple-200",
      Technology: "bg-indigo-100 text-indigo-800 border-indigo-200",
    }
    return colors[category] || "bg-slate-100 text-slate-800 border-slate-200"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News & Icebreakers</h1>
        <p className="text-muted-foreground mt-1">
          Stay informed with the latest updates and find conversation starters
        </p>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-2" />
            News
          </TabsTrigger>
          <TabsTrigger value="icebreakers">
            <Smile className="h-4 w-4 mr-2" />
            Icebreakers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-6">
          {/* Filter buttons for news categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Company
            </Button>
            <Button variant="outline" size="sm">
              US News
            </Button>
            <Button variant="outline" size="sm">
              Industry
            </Button>
          </div>

          <div className="space-y-4">
            {newsItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-base">{item.summary}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center pt-3 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{item.comments}</span>
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
