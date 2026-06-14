import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const result = await sql`
      SELECT * FROM applications WHERE id = ${id}
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ application: result[0] })
  } catch (error) {
    console.error("Fetch application error:", error)
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, notes, reviewedBy } = body
    
    const result = await sql`
      UPDATE applications 
      SET 
        status = ${status},
        notes = ${notes || null},
        reviewed_at = ${new Date().toISOString()},
        reviewed_by = ${reviewedBy || "admin"}
      WHERE id = ${id}
      RETURNING *
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, application: result[0] })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    )
  }
}
