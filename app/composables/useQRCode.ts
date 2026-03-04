/**
 * Lightweight QR Code SVG generator composable.
 * Uses the qrcode API via a CDN image URL (goqr.me)
 * for maximum compatibility without npm dependencies.
 */
export function useQRCode() {
    /**
     * Generate a QR code data URL using an inline SVG approach.
     * For simplicity and zero-dependency, returns a URL to a free QR API.
     */
    function qrUrl(value: string, size = 80): string {
        if (!value) return ''
        return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=${size}x${size}&bgcolor=transparent&format=svg`
    }

    return { qrUrl }
}
