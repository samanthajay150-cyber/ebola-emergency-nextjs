import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { randomBytes } from "crypto"

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "ebola2026admin"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body
    
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
      const token = randomBytes(32).toString("hex")
      return NextResponse.json({
        success: true,
        token,
        user: { username: ADMIN_CREDENTIALS.username }
      })
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
