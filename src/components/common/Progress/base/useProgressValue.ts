/** value를 0~100 범위로 clamp */
export function useProgressValue(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
