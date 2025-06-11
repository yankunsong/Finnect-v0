"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Dumbbell, Car, Calendar, MapPin, Users, Filter, Plus } from "lucide-react"
import PalRequestForm from "@/components/pal-request-form"
import { Badge } from "@/components/ui/badge"
import FilterOptions from "@/components/filter-options"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PalsPage() {
  const searchParams = useSearchParams()
  const selectedTypes = searchParams.get("types")?.split(",") || []

  // Get office filters from URL
  const selectedOffices = searchParams.get("offices")?.split(",") || []

  const palRequests = [
    {
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
    },
    {
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
    },
    {
      id: 7,
      type: "coffee",
      title: "Seeking Career Mentor - Coffee Chat",
      user: "Emily Zhang",
      department: "Junior Analyst - Risk Management",
      date: "Next Monday",
      time: "3:00 PM",
      location: "Quiet Corner Café",
      office: "New York",
      interests: ["Career Development", "Risk Management", "Professional Growth"],
      spots: 1,
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ]

  // Filter meetups based on selected types and offices
  const filteredPalRequests = palRequests.filter((request) => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(request.type)
    const officeMatch =
      selectedOffices.length === 0 || selectedOffices.includes(request.office.toLowerCase().replace(" ", "-"))
    return typeMatch && officeMatch
  })

  const getIcon = (type: string) => {
    switch (type) {
      case "coffee":
        return <Coffee className="h-5 w-5" />
      case "gym":
        return <Dumbbell className="h-5 w-5" />
      case "carpool":
        return <Car className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "coffee":
        return "bg-amber-50 border-amber-200"
      case "gym":
        return "bg-green-50 border-green-200"
      case "carpool":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-slate-50 border-slate-200"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "coffee":
        return "text-amber-600"
      case "gym":
        return "text-green-600"
      case "carpool":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  const renderListView = () => (
    <div className="space-y-3">
      {filteredPalRequests.map((request) => (
        <Card key={request.id} className={`hover:shadow-md transition-all duration-200 ${getColor(request.type)}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-2 rounded-full bg-white ${getIconColor(request.type)}`}>{getIcon(request.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{request.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-3 w-3" />
                      <span>{request.spots} spots</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {request.user} • {request.department}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>
                        {request.date} at {request.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>
                        {request.location} • {request.office}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>Office: {request.office}</span>
                    </div>
                  </div>
                  {request.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {request.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <Link href={`/pals/${request.id}`}>
                  <Button>Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Looking for Pals</h1>
          <p className="text-muted-foreground mt-1">
            Connect with colleagues for lunch, coffee, gym sessions, or carpooling
          </p>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Meetups</TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create Meetup
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <FilterOptions />
          </div>

          {filteredPalRequests.length > 0 ? (
            renderListView()
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Filter className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No meetups match your filters</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filter criteria or create a new meetup</p>
              <Button variant="outline">Clear Filters</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <PalRequestForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
