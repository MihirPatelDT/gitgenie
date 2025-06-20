import { SidebarProvider } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import React from "react"
import { AppSidebar } from "./app-sidebar"

type Props = {
  children: React.ReactNode
}

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full m-2">
        <div className="flex items-center gap-2 border-cyan-400 bg-sidebar border shadow rounded-md p-2 px-4">
          {/* <SearchBar/> */}
          <div className="ml-auto"></div>
          <UserButton />
        </div>
        <div className="h-4"></div>
        {/* main content */}
        <div className="border-gray-400 bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
