import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { z, ZodSchema } from "zod"

export async function authValidator<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ userId: string; data: T } | NextResponse> {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 })
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    // console.log(data)

    return NextResponse.json({ success: true, userId, ...data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
