/**
 * Simple CSV parser for Google Sheets gviz export.
 * Handles quoted fields with commas, newlines, and escaped quotes.
 */

export function parse(csv: string): Record<string, string>[] {
    const lines = splitCSVLines(csv)
    if (lines.length < 2) return []

    const headers = parseCSVLine(lines[0])
    const rows: Record<string, string>[] = []

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        if (!line.trim()) continue

        const values = parseCSVLine(line)
        const row: Record<string, string> = {}
        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j] || ''
        }
        rows.push(row)
    }

    return rows
}

function splitCSVLines(csv: string): string[] {
    const lines: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < csv.length; i++) {
        const ch = csv[i]

        if (ch === '"') {
            inQuotes = !inQuotes
            current += ch
        }
        else if (ch === '\n' && !inQuotes) {
            lines.push(current)
            current = ''
        }
        else if (ch === '\r' && !inQuotes) {
            // Skip \r, \n will follow
        }
        else {
            current += ch
        }
    }

    if (current.trim()) lines.push(current)
    return lines
}

function parseCSVLine(line: string): string[] {
    const values: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
        const ch = line[i]

        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"'
                i++ // Skip escaped quote
            }
            else {
                inQuotes = !inQuotes
            }
        }
        else if (ch === ',' && !inQuotes) {
            values.push(current)
            current = ''
        }
        else {
            current += ch
        }
    }

    values.push(current)
    return values
}
