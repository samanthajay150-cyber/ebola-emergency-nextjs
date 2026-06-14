import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const total = await sql`SELECT COUNT(*) as total FROM applications`
    const pending = await sql`SELECT COUNT(*) as pending FROM applications WHERE status = 'pending'`
    const underReview = await sql`SELECT COUNT(*) as under_review FROM applications WHERE status = 'under_review'`
    const approved = await sql`SELECT COUNT(*) as approved FROM applications WHERE status = 'approved'`
    const rejected = await sql`SELECT COUNT(*) as rejected FROM applications WHERE status = 'rejected'`
    
    const recent = await sql`
      SELECT application_id, full_name, status, created_at 
      FROM applications 
      ORDER BY created_at DESC 
      LIMIT 5
    `
    
    return NextResponse.json({
      total: total[0]?.total || 0,
      pending: pending[0]?.pending || 0,
      underReview: underReview[0]?.under_review || 0,
      approved: approved[0]?.approved || 0,
      rejected: rejected[0]?.rejected || 0,
      recent
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
