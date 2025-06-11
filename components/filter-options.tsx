"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, Dumbbell, Car, X } from "lucide-react"
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
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "carpool", label: "Carpool", icon: Car },
  ]

  const officeOptions = [
    { id: "new-york", label: "New York" },
    { id: "chicago", label: "Chicago" },
    { id: "rockville", label: "Rockville" },
  ]

  const currentOfficeFilters = searchParams.get("offices")?.split(",") || []
  const [selectedOfficeFilters, setSelectedOfficeFilters] = useState<string[]>(currentOfficeFilters)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (selectedFilters.length > 0) {
      params.set("types", selectedFilters.join(","))
    } else {
      params.delete("types")
    }

    if (selectedOfficeFilters.length > 0) {
      params.set("offices", selectedOfficeFilters.join(","))
    } else {
      params.delete("offices")
    }

    router.replace(`${pathname}?${params.toString()}`)
  }, [selectedFilters, selectedOfficeFilters, router, pathname, searchParams])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  const toggleOfficeFilter = (officeId: string) => {
    setSelectedOfficeFilters((prev) => {
      if (prev.includes(officeId)) {
        return prev.filter((id) => id !== officeId)
      } else {
        return [...prev, officeId]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters([])
    setSelectedOfficeFilters([])
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Filter by type:</span>
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
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Filter by office:</span>
        {officeOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            onClick={() => toggleOfficeFilter(option.id)}
            className={cn(
              "flex items-center gap-2",
              selectedOfficeFilters.includes(option.id) && "bg-green-50 border-green-200 text-green-700",
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {(selectedFilters.length > 0 || selectedOfficeFilters.length > 0) && (
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="h-3 w-3 mr-1" />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
