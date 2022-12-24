import { ref } from 'vue'
import type { Ref } from 'vue'

const ONE_MINUTE_SECONDS = 6

export default function useTimer(scale: number = 2) {
  let timer: Ref<number> = ref(0)
  let consumeTimer: Ref<number> = ref(0)

  const h = ref(0)
  const m = ref(0)
  const s = ref(0)
  const b_h = ref(0)
  const b_m = ref(0)
  const b_s = ref(0)

  // 开始计时
  const start = () => {
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
  // 暂停计时
  const pause = () => {
    clearInterval(timer.value)
  }

  const consume = () => {
    consumeTimer.value = setInterval(() => {
      console.log(1)
      if (b_s.value <= 0) {
        // debugger
        clearInterval(consumeTimer.value)
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
    consume
  }
}