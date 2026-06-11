type CompactOptions = {
  /** ISO currency code; when set, prefixes the symbol (e.g. USD -> "$1.2M"). */
  currency?: string;
  maximumFractionDigits?: number;
};

/** Compact display value: 1500 -> "1.5K", 1_200_000 -> "1.2M". */
export function formatCompact(
  value: number,
  options: CompactOptions = {}
): string {
  const { currency, maximumFractionDigits = 1 } = options;
  const format: Intl.NumberFormatOptions = {
    notation: 'compact',
    maximumFractionDigits,
  };
  if (currency) {
    format.style = 'currency';
    format.currency = currency;
  }
  return new Intl.NumberFormat('en-US', format).format(value);
}

/** Full grouped value for tooltips and detail views: "$1,200,000.00". */
export function formatNumber(
  value: number,
  options: { currency?: string } = {}
): string {
  const format: Intl.NumberFormatOptions = {};
  if (options.currency) {
    format.style = 'currency';
    format.currency = options.currency;
  }
  return new Intl.NumberFormat('en-US', format).format(value);
}
