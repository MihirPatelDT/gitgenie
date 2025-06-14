import { authValidator } from "@/lib/auth-middleware"
import { userGithubData } from "@/schema/schema"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
//   console.log("Hello")

  const result = await authValidator(req, userGithubData)

  if (result instanceof NextResponse) {
    return result
  }

  const { userId, data } = result

  return NextResponse.json({ userId, data })
}
