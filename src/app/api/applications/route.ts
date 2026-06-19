import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { randomBytes } from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const applicationId = `EBM-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`
    
    await sql`
      INSERT INTO applications (
        application_id, ready_to_proceed, first_time_applicant,
        heard_about_funds, other_source, occupation, other_occupation,
        full_name, age, email, phone_number, country, state, town
      ) VALUES (
        ${applicationId},
        ${body.readyToProceed || false},
        ${body.firstTimeApplicant || false},
        ${body.heardAboutFunds || ""},
        ${body.otherSource || null},
        ${body.occupation || ""},
        ${body.otherOccupation || null},
        ${body.fullName || ""},
        ${parseInt(body.age) || 0},
        ${body.email || null},
        ${body.phoneNumber || null},
        ${body.country || ""},
        ${body.state || ""},
        ${body.town || ""}
      )
    `
    
    return NextResponse.json({ success: true, applicationId })
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const applications = await sql`
      SELECT id, application_id, full_name, status, created_at 
      FROM applications 
      ORDER BY created_at DESC 
      LIMIT 10
    `
    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}
