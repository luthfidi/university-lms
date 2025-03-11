// src/utils/formatters/numberFormatters.ts

/**
 * Format number as currency (e.g., "$1,234.56")
 */
export function formatCurrency(
  value: number,
  locale = "en-US",
  currency = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format as Indonesian currency (e.g., "Rp 1.234.567")
 */
export function formatIDRCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format as number with commas (e.g., "1,234,567")
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

/**
 * Format as percent (e.g., "12.34%")
 */
export function formatPercent(value: number, fractionDigits = 1): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

/**
 * Format a score (e.g., "85/100")
 */
export function formatScore(earned: number, total: number): string {
  return `${earned}/${total}`;
}
