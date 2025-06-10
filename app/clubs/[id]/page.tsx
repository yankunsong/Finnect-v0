import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ClubDiscussionThread from "@/components/club-discussion-thread"

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const club = {
    id: params.id,
    name: "Investment Strategies",
    description:
      "Discuss market trends, investment opportunities, and financial strategies with fellow FINRA colleagues. Our club meets monthly to share insights, analyze market developments, and explore various investment approaches.",
    members: 42,
    category: "Finance",
    upcomingEvents: [
      {
        id: 1,
        title: "Portfolio Diversification Workshop",
        date: "Next Tuesday, 12:00 PM",
        location: "Conference Room A",
        description: "Learn strategies for diversifying your investment portfolio to manage risk and maximize returns.",
        attendees: 18,
      },
      {
        id: 2,
        title: "Market Outlook Discussion",
        date: "June 25, 3:00 PM",
        location: "Virtual Meeting",
        description: "Join us for a roundtable discussion on current market trends and future outlook.",
        attendees: 24,
      },
    ],
    announcements: [
      {
        id: 1,
        title: "New Club Leadership",
        date: "2 days ago",
        content:
          "We're excited to announce that Sarah Johnson from Compliance will be joining our leadership team as co-chair.",
      },
      {
        id: 2,
        title: "Monthly Meeting Format Change",
        date: "1 week ago",
        content:
          "Based on member feedback, we'll be restructuring our monthly meetings to include more interactive discussions and less presentation time.",
      },
    ],
    members: [
      {
        id: 1,
        name: "Michael Chen",
        role: "Club Leader",
        department: "Finance",
        avatar: "/placeholder-user.jpg",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        role: "Co-chair",
        department: "Compliance",
        avatar: "/placeholder-user.jpg",
      },
      {
        id: 3,
        name: "David Rodriguez",
        role: "Member",
        department: "Technology",
        avatar: "/placeholder-user.jpg",
      },
      {
        id: 4,
        name: "Emily Wong",
        role: "Member",
        department: "HR",
        avatar: "/placeholder-user.jpg",
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/clubs" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clubs
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{club.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <Badge className="bg-green-100 text-green-800">{club.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>{club.members} members</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Follow
            </Button>
            <Button>Join Club</Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 max-w-3xl">{club.description}</p>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions">
          <ClubDiscussionThread />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {club.upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.date} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button size="sm">RSVP</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="grid gap-6">
            {club.announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="pb-3">
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>{announcement.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {club.members.map((member) => (
              <div key={member.id} className="flex items-center p-4 border rounded-lg">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name.charAt(0)}
                    {member.name.split(" ")[1].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.role} • {member.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
