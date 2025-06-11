"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Coffee, BookOpen, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navigation = [
    { name: "News & Icebreakers", href: "/", icon: BookOpen },
    { name: "Looking for Pals", href: "/pals", icon: Coffee },
    { name: "Clubs", href: "/clubs", icon: Users },
  ]

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      <div
        className={cn(
          "bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen fixed z-40",
          isMobile ? (isOpen ? "w-64" : "w-0") : "w-64",
          "transition-all duration-300 ease-in-out",
          "overflow-y-auto",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Finnect</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">FINRA Engagement Portal</p>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-blue-700 dark:text-blue-100" : "text-slate-500 dark:text-slate-400",
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                FU
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">FINRA User</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">user@finra.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
