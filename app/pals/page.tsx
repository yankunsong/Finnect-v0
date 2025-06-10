"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Utensils, Dumbbell, Car, Calendar, MapPin, Clock, Users, Filter } from "lucide-react"
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
        return "bg-amber-100 text-amber-800"
      case "lunch":
        return "bg-orange-100 text-orange-800"
      case "gym":
        return "bg-green-100 text-green-800"
      case "carpool":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Looking for Pals</h1>
        <p className="text-muted-foreground mt-2">
          Connect with colleagues for lunch, coffee, gym sessions, or carpooling
        </p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Meetups</TabsTrigger>
          <TabsTrigger value="create">Create Meetup</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <FilterOptions />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPalRequests.length > 0 ? (
              filteredPalRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className={`${getColor(request.type)} pb-2`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-lg">
                        {getIcon(request.type)}
                        <span className="ml-2">{request.title}</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-slate-700">
                      Hosted by {request.user} • {request.department}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {request.date} at {request.time}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{request.spots} spots available</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {request.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-slate-50 px-6 py-3">
                    <Button className="w-full">Join Meetup</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium">No meetups match your filters</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filter criteria or create a new meetup</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <PalRequestForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
