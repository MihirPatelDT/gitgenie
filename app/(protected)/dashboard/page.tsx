'use client'

import { useUser } from "@clerk/nextjs"
import React from "react"

const Dashboard = () => {
  // To get LoggedIn User
  const { user } = useUser()
  return <div>{user?.firstName}</div>
}

export default Dashboard
