import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format money for display
 */
export function formatMoney(amount: string, currencyCode: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(parseFloat(amount));
}

/**
 * Check if a path is local (not external)
 */
export function isLocalPath(path: string): boolean {
  return !path.startsWith('http://') && !path.startsWith('https://');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Get excerpt from HTML content
 */
export function getExcerpt(html: string, maxLength = 155): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  return truncate(decoded.trim(), maxLength);
}
