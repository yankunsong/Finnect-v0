"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, Utensils, Dumbbell, Car, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function FilterOptions() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Get filter from URL or default to empty array
  const currentFilters = searchParams.get("types")?.split(",") || []
  const [selectedFilters, setSelectedFilters] = useState<string[]>(currentFilters)

  const filterOptions = [
    { id: "coffee", label: "Coffee Chats", icon: Coffee },
    { id: "lunch", label: "Lunch Meetups", icon: Utensils },
    { id: "gym", label: "Gym Sessions", icon: Dumbbell },
    { id: "carpool", label: "Carpooling", icon: Car },
  ]

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (selectedFilters.length > 0) {
      params.set("types", selectedFilters.join(","))
    } else {
      params.delete("types")
    }

    router.replace(`${pathname}?${params.toString()}`)
  }, [selectedFilters, router, pathname, searchParams])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter by Type
        </h3>
        {selectedFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            onClick={() => toggleFilter(option.id)}
            className={cn(
              "flex items-center gap-1 h-9",
              selectedFilters.includes(option.id) && "bg-blue-50 border-blue-200 text-blue-700",
            )}
          >
            <option.icon className="h-4 w-4" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
