import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Share2, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function PostDetailPage({
  params,
}: {
  params: { id: string; postId: string }
}) {
  // Mock post data - in a real app, this would be fetched based on postId
  const getPostData = (clubId: string, postId: string) => {
    if (clubId === "4") {
      // Running group posts
      const posts: Record<string, any> = {
        "1": {
          id: 1,
          user: {
            name: "Alex Thompson",
            avatar: "/placeholder-user.jpg",
            department: "Technology",
          },
          time: "Yesterday at 6:30 AM",
          title: "Great turnout for yesterday's morning run!",
          content:
            "Great turnout for yesterday's morning run! For those who missed it, we covered 5 miles through Central Park. The weather was perfect and we had 8 people join us.\n\nNext week we're planning to try the Hudson River path - I think it'll be a nice change of scenery. The route is about the same distance but has some great views of the water.\n\nFor anyone interested, we meet every Saturday at 7 AM. All paces are welcome - we usually split into groups based on pace so everyone can run comfortably.\n\nLooking forward to seeing everyone next week!",
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
                "Hudson River path sounds perfect! The views are amazing and it's less crowded than Central Park on weekends. I've run there a few times and really enjoyed it.",
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
              content: "Count me in! I've been wanting to try that route. What time are we thinking? Same 7 AM start?",
              likes: 2,
            },
          ],
        },
        "2": {
          id: 2,
          user: {
            name: "Sarah Kim",
            avatar: "/placeholder-user.jpg",
            department: "Compliance",
          },
          time: "2 days ago",
          title: "Running shoe recommendations?",
          content:
            "Has anyone tried the new running shoes from that store downtown? I'm looking for something with better cushioning for longer runs.\n\nI've been having some issues with my current shoes - they're fine for shorter distances but my feet start hurting after about 6 miles. I'm training for a half marathon so I need something that can handle the longer distances.\n\nAny recommendations would be greatly appreciated!",
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
                "I got a pair last month and they're fantastic! Really helped with my knee pain during long runs. Happy to share the model details - I'll send you a message with the specifics.",
              likes: 4,
            },
          ],
        },
        "3": {
          id: 3,
          user: {
            name: "Maria Rodriguez",
            avatar: "/placeholder-user.jpg",
            department: "Finance",
          },
          time: "3 days ago",
          title: "First 10-mile run completed!",
          content:
            "Training update: Just completed my first 10-mile run preparing for the half marathon! Thanks to everyone for the encouragement and tips.\n\nThe interval training suggestions really helped - I've been doing 1 minute fast, 2 minutes recovery for the past few weeks and I can definitely feel the improvement in my endurance.\n\nThe run felt challenging but manageable, and I'm feeling confident about the half marathon next month. Special thanks to Alex for the pacing advice and James for the hydration tips!\n\nFor anyone else training for longer distances, I'd definitely recommend building up gradually and listening to your body. The group support has been amazing!",
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
                "Congratulations Maria! That's a huge milestone. You're definitely ready for the half marathon now! Your training has been so consistent.",
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
              content:
                "Amazing work! I'm still working up to 5 miles consistently. Any tips for building endurance? I'd love to hear more about your training plan.",
              likes: 2,
            },
          ],
        },
      }
      return posts[postId]
    }

    return null
  }

  const post = getPostData(params.id, params.postId)

  if (!post) {
    return (
      <div className="space-y-6">
        <Link href={`/clubs/${params.id}`} className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Club
        </Link>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Post not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href={`/clubs/${params.id}`} className="flex items-center text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Club
      </Link>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.user.department} • {post.time}
              </p>
            </div>
          </div>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph: string, index: number) =>
              paragraph.trim() ? (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              ),
            )}
          </div>

          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comments ({post.replies?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new comment */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>FU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea placeholder="Write a comment..." className="min-h-[80px]" />
              <div className="flex justify-end">
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Existing comments */}
          {post.replies && post.replies.length > 0 && (
            <div className="space-y-6">
              <div className="h-px bg-slate-200"></div>
              {post.replies.map((reply: any) => (
                <div key={reply.id} className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                    <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-sm">{reply.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {reply.user.department} • {reply.time}
                      </p>
                    </div>
                    <p className="text-sm mb-2">{reply.content}</p>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{reply.likes}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
