import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export default function RecentAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "New Hybrid Work Policy Updates",
      time: "2 hours ago",
      category: "Policy",
    },
    {
      id: 2,
      title: "Q3 Town Hall Meeting Next Week",
      time: "Yesterday",
      category: "Event",
    },
    {
      id: 3,
      title: "Technology Club Hosting AI Workshop",
      time: "2 days ago",
      category: "Club",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Policy":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "Event":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Club":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Announcements</CardTitle>
        <CardDescription>Latest updates from FINRA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-slate-100">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm text-muted-foreground">{announcement.time}</p>
                </div>
              </div>
              <Badge variant="secondary" className={getCategoryColor(announcement.category)}>
                {announcement.category}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
