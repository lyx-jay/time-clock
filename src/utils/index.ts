import type { Ref } from 'vue'

/**
 * 格式化时间
 * @param num s数字
 * @returns 
 */
export function formatTime(num: number) {
  if (num >= 0 && num < 10) return `0${num}`
  return num.toString()
}