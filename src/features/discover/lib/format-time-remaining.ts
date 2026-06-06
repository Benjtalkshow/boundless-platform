/**
 * Format a future ISO timestamp as a compact countdown string used in the
 * opportunity card footer.
 *
 *   - More than a day out: `4D:22H:49M`
 *   - Same day: `22H:49M:12S`
 *   - Past or null deadline: empty string (caller hides the row)
 *
 * Pure function: takes the current time explicitly so the caller can pass a
 * deterministic clock from tests.
 */
export function formatTimeRemaining(
  endsAtIso: string | null,
  now: Date = new Date()
): string {
  if (!endsAtIso) return '';

  const endsAt = new Date(endsAtIso).getTime();
  if (Number.isNaN(endsAt)) return '';

  const deltaMs = endsAt - now.getTime();
  if (deltaMs <= 0) return '';

  const totalSeconds = Math.floor(deltaMs / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (days > 0) {
    return `${days}D:${pad(hours)}H:${pad(minutes)}M`;
  }
  return `${pad(hours)}H:${pad(minutes)}M:${pad(seconds)}S`;
}
