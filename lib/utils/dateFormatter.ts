/**
 * Utility function to format dates consistently between server and client
 * to prevent hydration mismatches
 */

export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
    const date = new Date(dateString)

    if (format === 'short') {
        // Format: "Dec 12, 2025"
        const month = date.toLocaleDateString('en-US', { month: 'short' })
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month} ${day}, ${year}`
    } else {
        // Format: "12/12/2025" (GB format)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }
}

export function formatDateRange(startDate: Date, endDate?: Date | null): string {
    if (!endDate) {
        return formatDate(startDate.toISOString(), 'long')
    }
    return `${formatDate(startDate.toISOString(), 'long')} - ${formatDate(endDate.toISOString(), 'long')}`
}
