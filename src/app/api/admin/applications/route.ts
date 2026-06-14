import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")
    
    let whereClause = "WHERE 1=1"
    const params: any[] = []
    
    if (status) {
      whereClause += ` AND status = $${params.length + 1}`
      params.push(status)
    }
    
    if (search) {
      whereClause += ` AND (full_name ILIKE $${params.length + 1} OR application_id ILIKE $${params.length + 1})`
      params.push(`%${search}%`)
    }
    
    const applications = await sql.unsafe(`
      SELECT * FROM applications 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `)
    
    const totalResult = await sql.unsafe(`
      SELECT COUNT(*) as total FROM applications ${whereClause}
    `)
    
    return NextResponse.json({
      applications,
      total: totalResult[0]?.total || 0,
      limit,
      offset
    })
  } catch (error) {
    console.error("Fetch applications error:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}
