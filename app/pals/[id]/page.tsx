import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Coffee, Dumbbell, Car, ArrowLeft, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function MeetupDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const meetupData = {
    1: {
      id: 1,
      type: "coffee",
      title: "Coffee Chat about New Projects",
      user: "Michael Chen",
      department: "Technology",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Starbucks (Lobby)",
      office: "New York",
      interests: ["AI", "Software Development"],
      spots: 2,
      description:
        "Join me for a casual coffee chat to discuss the latest AI projects we're working on. I'd love to share insights about machine learning implementations and hear about what you're building. Perfect for anyone interested in tech innovation or looking to collaborate on future projects.",
      duration: "1 hour",
      attendees: [{ name: "Jennifer Liu", department: "Product", avatar: "/placeholder-user.jpg" }],
    },
    2: {
      id: 2,
      type: "gym",
      title: "Lunchtime Workout Session",
      user: "Alex Rivera",
      department: "HR",
      date: "Wednesday",
      time: "12:00 PM",
      location: "Company Gym",
      office: "Chicago",
      interests: ["Fitness", "Wellness"],
      spots: 4,
      description:
        "Looking for workout buddies for a high-energy lunchtime session! We'll focus on strength training and cardio. All fitness levels welcome - I can provide guidance for beginners or we can push each other if you're more advanced. Bring your workout clothes and water bottle!",
      duration: "45 minutes",
      attendees: [
        { name: "Carlos Martinez", department: "Operations", avatar: "/placeholder-user.jpg" },
        { name: "Lisa Wang", department: "Finance", avatar: "/placeholder-user.jpg" },
      ],
    },
    3: {
      id: 3,
      type: "carpool",
      title: "Carpool to Downtown Office",
      user: "Jessica Lee",
      department: "Finance",
      date: "Friday",
      time: "8:15 AM",
      location: "Parking Garage A",
      office: "Rockville",
      interests: ["Sustainability", "Finance"],
      spots: 3,
      description:
        "Carpooling to the downtown office for the quarterly meeting. Great opportunity to reduce our carbon footprint while having good conversations about work and life. I'll be playing some light music and have coffee for the ride. Looking for punctual colleagues who don't mind leaving right on time.",
      duration: "30 minutes",
      attendees: [{ name: "Robert Kim", department: "Legal", avatar: "/placeholder-user.jpg" }],
    },
    4: {
      id: 4,
      type: "coffee",
      title: "Morning Coffee & Career Chat",
      user: "Sarah Johnson",
      department: "Compliance",
      date: "Today",
      time: "9:30 AM",
      location: "Main Cafeteria",
      office: "New York",
      interests: ["Regulatory Updates", "Career Development"],
      spots: 3,
      description:
        "Start your day with great coffee and even better conversation! I'm looking to connect with colleagues across different departments to discuss career paths, industry trends, and share experiences. Whether you're new to FINRA or a seasoned professional, all perspectives are welcome.",
      duration: "45 minutes",
      attendees: [
        { name: "Mark Thompson", department: "Technology", avatar: "/placeholder-user.jpg" },
        { name: "Amy Chen", department: "Marketing", avatar: "/placeholder-user.jpg" },
      ],
    },
    5: {
      id: 5,
      type: "gym",
      title: "Evening Yoga Session",
      user: "David Park",
      department: "Operations",
      date: "Thursday",
      time: "6:00 PM",
      location: "Wellness Center",
      office: "Chicago",
      interests: ["Yoga", "Mindfulness"],
      spots: 6,
      description:
        "Unwind after a busy day with a relaxing yoga session. I'm a certified instructor and will guide us through gentle flows perfect for stress relief and flexibility. Bring a yoga mat if you have one, but we have extras available. Great for beginners and experienced practitioners alike.",
      duration: "1 hour",
      attendees: [
        { name: "Rachel Green", department: "HR", avatar: "/placeholder-user.jpg" },
        { name: "Tom Wilson", department: "Finance", avatar: "/placeholder-user.jpg" },
        { name: "Nina Patel", department: "Compliance", avatar: "/placeholder-user.jpg" },
      ],
    },
    6: {
      id: 6,
      type: "carpool",
      title: "Carpool to Team Building Event",
      user: "Maria Rodriguez",
      department: "Marketing",
      date: "Saturday",
      time: "10:00 AM",
      location: "Main Entrance",
      office: "Rockville",
      interests: ["Team Building", "Networking"],
      spots: 4,
      description:
        "Join me for a carpool to the company team building event at the adventure park! It's going to be a fun day of outdoor activities and team bonding. I'll have snacks and good music for the drive. Perfect opportunity to get to know colleagues from other departments in a relaxed setting.",
      duration: "45 minutes",
      attendees: [
        { name: "Kevin Lee", department: "Technology", avatar: "/placeholder-user.jpg" },
        { name: "Sophie Turner", department: "Operations", avatar: "/placeholder-user.jpg" },
      ],
    },
  }

  const meetup = meetupData[params.id as keyof typeof meetupData]

  if (!meetup) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Meetup Not Found</h1>
        <p className="text-muted-foreground mb-4">The meetup you're looking for doesn't exist.</p>
        <Link href="/pals">
          <Button>Back to Meetups</Button>
        </Link>
      </div>
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "coffee":
        return <Coffee className="h-6 w-6" />
      case "gym":
        return <Dumbbell className="h-6 w-6" />
      case "carpool":
        return <Car className="h-6 w-6" />
      default:
        return <Users className="h-6 w-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "coffee":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "gym":
        return "bg-green-100 text-green-800 border-green-200"
      case "carpool":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "coffee":
        return "Coffee Chat"
      case "gym":
        return "Gym Session"
      case "carpool":
        return "Carpool"
      default:
        return "Meetup"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/pals" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Meetups
        </Link>

        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 rounded-full bg-slate-100">{getIcon(meetup.type)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{meetup.title}</h1>
              <Badge className={getTypeColor(meetup.type)}>{getTypeLabel(meetup.type)}</Badge>
            </div>
            <p className="text-muted-foreground">
              Organized by {meetup.user} from {meetup.department}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Meetup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{meetup.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendees ({meetup.attendees.length + 1})</CardTitle>
              <CardDescription>People who have joined this meetup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Organizer */}
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt={meetup.user} />
                    <AvatarFallback>
                      {meetup.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{meetup.user}</p>
                    <p className="text-sm text-muted-foreground">{meetup.department} • Organizer</p>
                  </div>
                </div>

                {/* Other Attendees */}
                {meetup.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                      <AvatarFallback>
                        {attendee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{attendee.name}</p>
                      <p className="text-sm text-muted-foreground">{attendee.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{meetup.date}</p>
                  <p className="text-sm text-muted-foreground">{meetup.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{meetup.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{meetup.location}</p>
                  <p className="text-sm text-muted-foreground">{meetup.office} Office</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Available Spots</p>
                  <p className="text-sm text-muted-foreground">{meetup.spots} spots remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {meetup.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Topics & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {meetup.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Join Meetup
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Organizer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
