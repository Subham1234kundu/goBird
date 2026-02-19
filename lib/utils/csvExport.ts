import type { Lead } from '@/lib/types/lead';

/**
 * Converts an array of leads to CSV format
 */
export function convertLeadsToCSV(leads: Lead[]): string {
    if (leads.length === 0) {
        return '';
    }

    // Define CSV headers
    const headers = ['Lead Name', 'Email', 'Phone', 'Message', 'Status', 'Remark', 'Date Created'];

    // Create CSV rows
    const rows = leads.map(lead => {
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        return [
            lead.name || '',
            lead.email || '',
            lead.phone || '',
            (lead.message || '').replace(/"/g, '""'), // Escape quotes in message
            lead.status || '',
            (lead.remark || '').replace(/"/g, '""'), // Escape quotes in remark
            formatDate(lead.created_at)
        ];
    });

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
}

/**
 * Downloads a CSV file with the given content
 */
export function downloadCSV(content: string, filename: string = 'leads_export.csv'): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

/**
 * Exports leads to a CSV file
 */
export function exportLeadsToCSV(leads: Lead[], filename?: string): void {
    const csvContent = convertLeadsToCSV(leads);

    if (!csvContent) {
        console.warn('No leads to export');
        return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = `leads_export_${timestamp}.csv`;

    downloadCSV(csvContent, filename || defaultFilename);
}
