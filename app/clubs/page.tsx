import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, ArrowRight, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ClubCreationForm from "@/components/club-creation-form"

export default function ClubsPage() {
  const clubs = [
    {
      id: 1,
      name: "Investment Strategies",
      description:
        "Discuss market trends, investment opportunities, and financial strategies with fellow FINRA colleagues.",
      members: 42,
      category: "Finance",
      upcomingEvent: "Portfolio Diversification Workshop",
      eventDate: "Next Tuesday, 12:00 PM",
    },
    {
      id: 2,
      name: "Tech Innovation",
      description: "Explore emerging technologies, share coding tips, and collaborate on innovative projects.",
      members: 38,
      category: "Technology",
      upcomingEvent: "AI in Financial Regulation",
      eventDate: "This Friday, 3:00 PM",
    },
    {
      id: 3,
      name: "Book Club",
      description:
        "Monthly discussions on both fiction and non-fiction books, with a focus on leadership and industry insights.",
      members: 24,
      category: "Literature",
      upcomingEvent: "Discussion: 'The Psychology of Money'",
      eventDate: "Next Monday, 5:30 PM",
    },
    {
      id: 4,
      name: "Running Group",
      description: "Join fellow runners for weekly runs, training tips, and preparation for local races.",
      members: 18,
      category: "Fitness",
      upcomingEvent: "Central Park Group Run",
      eventDate: "Saturday, 9:00 AM",
    },
    {
      id: 5,
      name: "Regulatory Updates",
      description:
        "Stay informed about the latest regulatory changes and compliance requirements in the financial industry.",
      members: 56,
      category: "Compliance",
      upcomingEvent: "New SEC Guidelines Discussion",
      eventDate: "Wednesday, 11:00 AM",
    },
    {
      id: 6,
      name: "Photography Club",
      description: "Share photography tips, techniques, and showcase your work with other photography enthusiasts.",
      members: 15,
      category: "Arts",
      upcomingEvent: "Urban Photography Walk",
      eventDate: "Sunday, 10:00 AM",
    },
  ]

  const categories = ["All", "Finance", "Technology", "Literature", "Fitness", "Compliance", "Arts"]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Finance: "bg-green-100 text-green-800 border-green-200",
      Technology: "bg-blue-100 text-blue-800 border-blue-200",
      Literature: "bg-purple-100 text-purple-800 border-purple-200",
      Fitness: "bg-orange-100 text-orange-800 border-orange-200",
      Compliance: "bg-red-100 text-red-800 border-red-200",
      Arts: "bg-pink-100 text-pink-800 border-pink-200",
    }
    return colors[category] || "bg-slate-100 text-slate-800 border-slate-200"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-muted-foreground mt-1">
            Join communities around shared interests and connect with colleagues
          </p>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Clubs</TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create Club
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search clubs..." className="pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="whitespace-nowrap">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clubs.map((club) => (
              <Card key={club.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                    <Badge className={getCategoryColor(club.category)}>{club.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{club.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{club.members} members</span>
                  </div>
                  {club.upcomingEvent && (
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="font-medium text-sm mb-1">Next Event:</div>
                      <div className="text-sm">{club.upcomingEvent}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        {club.eventDate}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link href={`/clubs/${club.id}`} className="w-full">
                    <Button className="w-full">
                      View Club <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <ClubCreationForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
