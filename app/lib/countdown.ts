// Midnight in Europe/Rome on October 15, 2026 (UTC+02:00).
export const COUNTDOWN_TARGET = "2026-10-15T00:00:00+02:00";
const targetTime = Date.parse(COUNTDOWN_TARGET);

export function getCountdown(now: number) {
  const totalSeconds = Math.max(0, Math.ceil((targetTime - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ended: totalSeconds === 0,
  };
}
