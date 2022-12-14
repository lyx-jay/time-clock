import { isRuntimeOnly, ref } from 'vue'
import type { Ref } from 'vue'

const ONE_MINUTE_SECONDS = 6

export default function useTimer(scale: number = 2) {

  // 是否正在计时
  let isTiming = ref(false)
  // 是否可以消耗奖励时间
  let canConsume = ref(false)
  let timer: Ref<number> = ref(0)
  let consumeTimer: Ref<number> = ref(0)

  // 正常时间h、m、s
  const h = ref(0)
  const m = ref(0)
  const s = ref(0)

  // 奖励时间h、m、s
  const b_h = ref(0)
  const b_m = ref(0)
  const b_s = ref(0)

  /**
   * 开始计时
   */
  const start = () => {
    isTiming.value = true
    timer.value = setInterval(() => {
      s.value += 1
      b_s.value += (1 / scale)
      if (s.value >= ONE_MINUTE_SECONDS) {
        s.value = 0
        m.value += 1
      }
      if (b_s.value >= ONE_MINUTE_SECONDS) {
        b_s.value = 0
        b_m.value += 1
      }
      if (m.value >= ONE_MINUTE_SECONDS) {
        m.value = 0
        h.value += 1
      }
      if (b_m.value >= ONE_MINUTE_SECONDS) {
        b_m.value = 0
        b_h.value += 1
      }
    }, 1000)
  }
  /**
   * 暂停计时
   */
  const pause = () => {
    isTiming.value = false
    canConsume.value = true
    clearInterval(timer.value)
  }

  /**
   * 消耗时间
   */
  const consume = () => {
    consumeTimer.value = setInterval(() => {
      if (b_s.value <= 0) {
        clearInterval(consumeTimer.value)
        canConsume.value = false
        return
      }
      b_s.value -= 1
      if (b_s.value === 0 && b_m.value > 0) {
        b_m.value -= 1
        b_s.value = ONE_MINUTE_SECONDS - 1
      }
      if (b_m.value === 0 && b_h.value > 0) {
        b_h.value -= 1
      }
    }, 1000)
  }

  return {
    h,
    m,
    s,
    b_h,
    b_m,
    b_s,
    start,
    pause,
    consume,
    isTiming,
    canConsume
  }
}