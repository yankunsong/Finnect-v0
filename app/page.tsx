import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Users, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import UpcomingActivities from "@/components/upcoming-activities"
import RecentAnnouncements from "@/components/recent-announcements"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Finnect</h1>
        <p className="text-muted-foreground mt-2">
          Your hub for connecting with colleagues in FINRA's hybrid work environment
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Coffee className="mr-2 h-5 w-5 text-blue-600" />
              Looking for Pals
            </CardTitle>
            <CardDescription>Connect for lunch, coffee, or carpooling</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Find colleagues to meet up with based on shared interests and availability.</p>
            <Link href="/pals">
              <Button variant="outline" className="w-full">
                Find Pals <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Clubs
            </CardTitle>
            <CardDescription>Join communities around shared interests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Discover and participate in clubs focused on sports, investments, technology, and more.
            </p>
            <Link href="/clubs">
              <Button variant="outline" className="w-full">
                Explore Clubs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              News & Icebreakers
            </CardTitle>
            <CardDescription>Stay informed and break the ice</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Get the latest company news and fun conversation starters for your meetings.</p>
            <Link href="/news">
              <Button variant="outline" className="w-full">
                View Updates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingActivities />
        <RecentAnnouncements />
      </div>
    </div>
  )
}
