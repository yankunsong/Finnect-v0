"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, Utensils, Dumbbell, Car, X } from "lucide-react"
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
    { id: "coffee", label: "Coffee", icon: Coffee },
    { id: "lunch", label: "Lunch", icon: Utensils },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "carpool", label: "Carpool", icon: Car },
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
      {filterOptions.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          size="sm"
          onClick={() => toggleFilter(option.id)}
          className={cn(
            "flex items-center gap-2",
            selectedFilters.includes(option.id) && "bg-blue-50 border-blue-200 text-blue-700",
          )}
        >
          <option.icon className="h-4 w-4" />
          {option.label}
        </Button>
      ))}
      {selectedFilters.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
