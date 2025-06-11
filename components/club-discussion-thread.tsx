"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Share2, Send } from "lucide-react"
import Link from "next/link"

interface ClubDiscussionThreadProps {
  clubId?: string
}

export default function ClubDiscussionThread({ clubId }: ClubDiscussionThreadProps) {
  const [newComment, setNewComment] = useState("")

  // Different discussions based on club
  const getDiscussions = (clubId?: string) => {
    if (clubId === "4") {
      // Running Group discussions
      return [
        {
          id: 1,
          user: {
            name: "Alex Thompson",
            avatar: "/placeholder-user.jpg",
            department: "Technology",
          },
          time: "Yesterday at 6:30 AM",
          content:
            "Great turnout for yesterday's morning run! For those who missed it, we covered 5 miles through Central Park. Next week we're planning to try the Hudson River path - thoughts?",
          likes: 8,
          comments: 4,
          replies: [
            {
              id: 101,
              user: {
                name: "Maria Rodriguez",
                avatar: "/placeholder-user.jpg",
                department: "Finance",
              },
              time: "Yesterday at 7:15 AM",
              content:
                "Hudson River path sounds perfect! The views are amazing and it's less crowded than Central Park on weekends.",
              likes: 3,
            },
            {
              id: 102,
              user: {
                name: "James Wilson",
                avatar: "/placeholder-user.jpg",
                department: "HR",
              },
              time: "Yesterday at 8:00 AM",
              content: "Count me in! I've been wanting to try that route. What time are we thinking?",
              likes: 2,
            },
          ],
        },
        {
          id: 2,
          user: {
            name: "Sarah Kim",
            avatar: "/placeholder-user.jpg",
            department: "Compliance",
          },
          time: "2 days ago",
          content:
            "Has anyone tried the new running shoes from that store downtown? I'm looking for something with better cushioning for longer runs.",
          likes: 5,
          comments: 3,
          replies: [
            {
              id: 201,
              user: {
                name: "Alex Thompson",
                avatar: "/placeholder-user.jpg",
                department: "Technology",
              },
              time: "2 days ago",
              content:
                "I got a pair last month and they're fantastic! Really helped with my knee pain during long runs. Happy to share the model details.",
              likes: 4,
            },
          ],
        },
        {
          id: 3,
          user: {
            name: "Maria Rodriguez",
            avatar: "/placeholder-user.jpg",
            department: "Finance",
          },
          time: "3 days ago",
          content:
            "Training update: Just completed my first 10-mile run preparing for the half marathon! Thanks to everyone for the encouragement and tips. The interval training suggestions really helped.",
          likes: 12,
          comments: 6,
          replies: [
            {
              id: 301,
              user: {
                name: "James Wilson",
                avatar: "/placeholder-user.jpg",
                department: "HR",
              },
              time: "3 days ago",
              content:
                "Congratulations Maria! That's a huge milestone. You're definitely ready for the half marathon now!",
              likes: 3,
            },
            {
              id: 302,
              user: {
                name: "Sarah Kim",
                avatar: "/placeholder-user.jpg",
                department: "Compliance",
              },
              time: "3 days ago",
              content: "Amazing work! I'm still working up to 5 miles consistently. Any tips for building endurance?",
              likes: 2,
            },
          ],
        },
      ]
    }

    // Default discussions for other clubs
    return [
      {
        id: 1,
        user: {
          name: "Michael Chen",
          avatar: "/placeholder-user.jpg",
          department: "Finance",
        },
        time: "Yesterday at 10:30 AM",
        content:
          "I came across an interesting article about sustainable investing trends. What are your thoughts on ESG factors becoming more prominent in investment decisions?",
        likes: 12,
        comments: 5,
        replies: [
          {
            id: 101,
            user: {
              name: "Sarah Johnson",
              avatar: "/placeholder-user.jpg",
              department: "Compliance",
            },
            time: "Yesterday at 11:45 AM",
            content:
              "Great point, Michael. I've noticed more clients asking about ESG considerations in their portfolios. It's definitely becoming a major factor in investment strategies.",
            likes: 4,
          },
          {
            id: 102,
            user: {
              name: "David Rodriguez",
              avatar: "/placeholder-user.jpg",
              department: "Technology",
            },
            time: "Yesterday at 2:15 PM",
            content:
              "I'd be interested in discussing how we can better quantify ESG impacts. The metrics still seem to vary widely across different rating systems.",
            likes: 3,
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "Emily Wong",
          avatar: "/placeholder-user.jpg",
          department: "HR",
        },
        time: "2 days ago",
        content:
          "Has anyone been following the recent changes in interest rates? I'm curious about how others are adjusting their fixed income strategies in response.",
        likes: 8,
        comments: 3,
        replies: [
          {
            id: 201,
            user: {
              name: "Michael Chen",
              avatar: "/placeholder-user.jpg",
              department: "Finance",
            },
            time: "2 days ago",
            content:
              "I've been shifting toward shorter duration bonds and exploring floating rate securities. Happy to share more details at our next meeting.",
            likes: 5,
          },
        ],
      },
    ]
  }

  const discussions = getDiscussions(clubId)

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would add the comment to the database
      // For now, we'll just clear the input
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your thoughts, questions, or insights with the club..."
            className="min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={discussion.user.avatar || "/placeholder.svg"} alt={discussion.user.name} />
                  <AvatarFallback>{discussion.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{discussion.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {discussion.user.department} • {discussion.time}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <Link
                href={`/clubs/${clubId}/posts/${discussion.id}`}
                className="block hover:text-blue-600 transition-colors"
              >
                <p className="mb-4 cursor-pointer">{discussion.content}</p>
              </Link>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{discussion.comments}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            {discussion.replies && discussion.replies.length > 0 && (
              <div className="px-6 pb-4 space-y-4">
                <div className="h-px bg-slate-200 my-2"></div>
                {discussion.replies.map((reply) => (
                  <div key={reply.id} className="pl-6 border-l-2 border-slate-200">
                    <div className="flex items-center space-x-4 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                        <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{reply.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {reply.user.department} • {reply.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{reply.content}</p>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{reply.likes}</span>
                    </Button>
                  </div>
                ))}
                <div className="flex items-center space-x-4 pt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>FU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Write a reply..." className="min-h-[60px] text-sm" />
                  </div>
                  <Button size="sm">Reply</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
