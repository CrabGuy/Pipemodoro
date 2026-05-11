import type { Timer } from "$lib/Types";

export const average = (numbers: number[]) => {
    if (numbers.length === 0) return 0

    const sum = numbers.reduce((acc, num) => acc + num, 0)
    return sum / numbers.length
}

export const most_frequent = <T>(arr: T[]): T | null => {
    if (arr.length === 0) return null

    const map = new Map<T, number>()

    for (const item of arr) {
        map.set(item, (map.get(item) ?? 0) + 1)
    }

    return [...map.entries()].reduce((a, b) => (b[1] >= a[1] ? b : a))[0]
}

export const duration = (timer: Timer) => new Date(timer.ends_at).getTime() - new Date(timer.created_at).getTime()

export const nothing = () => {}

export function format_time(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const hours   = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const parts = []
  if (hours > 0)             parts.push(`${hours}h`)
  if (hours > 0 || minutes > 0) parts.push(`${minutes}m`)
  if (minutes === 0 || seconds > 0) parts.push(`${seconds}s`)

  return parts.join(' ') || '0s'
}