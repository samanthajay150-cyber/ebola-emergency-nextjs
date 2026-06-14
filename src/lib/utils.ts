import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Pending Review",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
  }
  return statusMap[status] || status
}

export function generateApplicationId(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `EBM-${year}-${random}`
}
