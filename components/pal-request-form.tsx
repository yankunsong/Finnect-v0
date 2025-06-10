"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, MapPin, Coffee, Utensils, Dumbbell, Car } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function PalRequestForm() {
  const [date, setDate] = useState<Date>()
  const [meetupType, setMeetupType] = useState("coffee")
  const [interests, setInterests] = useState<string[]>([])
  const [interestInput, setInterestInput] = useState("")

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()])
      setInterestInput("")
    }
  }

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addInterest()
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Meetup</CardTitle>
        <CardDescription>Connect with colleagues by creating a new meetup opportunity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Meetup Title</Label>
          <Input id="title" placeholder="E.g., Coffee and Career Chat" />
        </div>

        <div className="space-y-2">
          <Label>Meetup Type</Label>
          <RadioGroup defaultValue="coffee" className="grid grid-cols-2 gap-4" onValueChange={setMeetupType}>
            <Label
              htmlFor="coffee"
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                meetupType === "coffee" && "border-blue-500",
              )}
            >
              <RadioGroupItem value="coffee" id="coffee" className="sr-only" />
              <Coffee className="mb-2 h-6 w-6" />
              Coffee Chat
            </Label>
            <Label
              htmlFor="lunch"
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                meetupType === "lunch" && "border-blue-500",
              )}
            >
              <RadioGroupItem value="lunch" id="lunch" className="sr-only" />
              <Utensils className="mb-2 h-6 w-6" />
              Lunch Meetup
            </Label>
            <Label
              htmlFor="gym"
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                meetupType === "gym" && "border-blue-500",
              )}
            >
              <RadioGroupItem value="gym" id="gym" className="sr-only" />
              <Dumbbell className="mb-2 h-6 w-6" />
              Gym Session
            </Label>
            <Label
              htmlFor="carpool"
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                meetupType === "carpool" && "border-blue-500",
              )}
            >
              <RadioGroupItem value="carpool" id="carpool" className="sr-only" />
              <Car className="mb-2 h-6 w-6" />
              Carpool
            </Label>
          </RadioGroup>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="flex w-full items-center space-x-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>:</span>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {["00", "15", "30", "45"].map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="am">AM</SelectItem>
                  <SelectItem value="pm">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex w-full items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Input id="location" placeholder="E.g., Main Cafeteria, Starbucks in Lobby" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="spots">Available Spots</Label>
          <Select defaultValue="3">
            <SelectTrigger>
              <SelectValue placeholder="Select number of spots" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "person" : "people"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Interests/Topics (optional)</Label>
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Add interests or topics to discuss"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button type="button" onClick={addInterest} variant="outline">
              Add
            </Button>
          </div>
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-slate-200"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Additional Details (optional)</Label>
          <Textarea id="description" placeholder="Share any additional information about this meetup" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create Meetup</Button>
      </CardFooter>
    </Card>
  )
}
