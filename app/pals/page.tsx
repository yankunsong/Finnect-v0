"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Utensils, Dumbbell, Car, Calendar, MapPin, Users, Filter, Plus } from "lucide-react"
import PalRequestForm from "@/components/pal-request-form"
import { Badge } from "@/components/ui/badge"
import FilterOptions from "@/components/filter-options"
import { useSearchParams } from "next/navigation"

export default function PalsPage() {
  const searchParams = useSearchParams()
  const selectedTypes = searchParams.get("types")?.split(",") || []

  const palRequests = [
    {
      id: 1,
      type: "lunch",
      title: "Lunch at the Cafeteria",
      user: "Sarah Johnson",
      department: "Compliance",
      date: "Today",
      time: "12:30 PM",
      location: "Main Cafeteria",
      interests: ["Regulatory Updates", "Tennis"],
      spots: 3,
    },
    {
      id: 2,
      type: "coffee",
      title: "Coffee Chat about New Projects",
      user: "Michael Chen",
      department: "Technology",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Starbucks (Lobby)",
      interests: ["AI", "Software Development"],
      spots: 2,
    },
    {
      id: 3,
      type: "gym",
      title: "Lunchtime Workout Session",
      user: "Alex Rivera",
      department: "HR",
      date: "Wednesday",
      time: "12:00 PM",
      location: "Company Gym",
      interests: ["Fitness", "Wellness"],
      spots: 4,
    },
    {
      id: 4,
      type: "carpool",
      title: "Carpool to Downtown Office",
      user: "Jessica Lee",
      department: "Finance",
      date: "Friday",
      time: "8:15 AM",
      location: "Parking Garage A",
      interests: ["Sustainability", "Finance"],
      spots: 3,
    },
  ]

  // Filter meetups based on selected types
  const filteredPalRequests =
    selectedTypes.length > 0 ? palRequests.filter((request) => selectedTypes.includes(request.type)) : palRequests

  const getIcon = (type: string) => {
    switch (type) {
      case "coffee":
        return <Coffee className="h-5 w-5" />
      case "lunch":
        return <Utensils className="h-5 w-5" />
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
      case "lunch":
        return "bg-orange-50 border-orange-200"
      case "gym":
        return "bg-green-50 border-green-200"
      case "carpool":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-slate-50 border-slate-200"
    }
  }

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
          <FilterOptions />

          {filteredPalRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPalRequests.map((request) => (
                <Card
                  key={request.id}
                  className={`hover:shadow-md transition-all duration-200 ${getColor(request.type)}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getIcon(request.type)}
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>
                      by {request.user} • {request.department}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {request.date} at {request.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{request.spots} spots available</span>
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
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Meetup</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
