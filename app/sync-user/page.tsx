import { db } from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"

// This is for sync user with clerk into neondb
const SyncUser = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("User not Found.")
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  if (!user.emailAddresses[0]?.emailAddress) {
    return notFound()
  }

  // upsert for check if user exists update or create new user
  await db.user.upsert({
    where: {
      emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })
  console.log("In dashboard")
  redirect("/dashboard")
}

export default SyncUser
