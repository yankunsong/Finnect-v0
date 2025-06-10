import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Coffee, Users, Car } from "lucide-react"

export default function UpcomingActivities() {
  const activities = [
    {
      id: 1,
      title: "Coffee Chat with Marketing Team",
      time: "Today, 10:30 AM",
      type: "coffee",
      participants: 3,
    },
    {
      id: 2,
      title: "Investment Club Monthly Meeting",
      time: "Tomorrow, 12:00 PM",
      type: "club",
      participants: 12,
    },
    {
      id: 3,
      title: "Carpool to Downtown Office",
      time: "Friday, 8:15 AM",
      type: "carpool",
      participants: 4,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "coffee":
        return <Coffee className="h-4 w-4" />
      case "club":
        return <Users className="h-4 w-4" />
      case "carpool":
        return <Car className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "coffee":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "club":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "carpool":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Activities</CardTitle>
        <CardDescription>Your scheduled meetups and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-slate-100">{getIcon(activity.type)}</div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <Badge variant="secondary" className={getColor(activity.type)}>
                {activity.participants} {activity.participants === 1 ? "person" : "people"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
