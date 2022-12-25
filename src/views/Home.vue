<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import TimeVue from '../components/Time.vue'

const ONE_MINUTE_SECONDS = 6

// 默认奖励时间的比例为4
const scale = ref(4)
// 是否正在计时
const isTiming = ref(false)
// 是否可以消耗奖励时间
const canConsume = ref(false)
const timer: Ref<number> = ref(0)
const consumeTimer: Ref<number> = ref(0)

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
    b_s.value += (1 / scale.value)
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


</script>

<template>
  <div class="clock-wrapper">
    <div class="scale">
      <span class="scale-text">scale</span>
      <input type="text" class="input" v-model="scale">
    </div>
    <div class="time-box regular-time-box">
      <TimeVue :hour="h" :minute="m" :second="s" />
    </div>
    <div class="time-box bouns-time-box">
      <TimeVue :hour="b_h" :minute="b_m" :second="b_s" />
    </div>
  </div>
  <button class='btn start' @click="start" :disabled="isTiming ? true : false">start</button>
  <button class='btn pause' @click="pause" :disabled="!isTiming ? true : false">pause</button>
  <button class='btn consume' @click="consume" :disabled="canConsume ? false : true">consume</button>
</template>

<style scoped>
.clock-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 230px;
  border: 1px unset transparent;
  border-radius: 10px;
  margin-bottom: 50px;
  color: #FFFFFF;
  background-color: #84a98c;
  box-shadow: -1px 2px 64px 9px rgba(108, 184, 115, 0.44);
}

.scale {
  position: absolute;
  top: 0.8rem;
  left: 0.5rem;
}

.scale-text {
  color: #dee2e6;
}

.input {
  width: 2rem;
  height: 1rem;
  margin-left: .2rem;
  outline: none;
  background-color: #98c9a3;
  border: none;
  border-radius: 5px;
  text-align: center;
  color: #dee2e6;
}

.time-box {
  border-radius: 8px;
  margin-right: 10px;
}

.regular-time-box {
  letter-spacing: 4px;
  font-size: 3.5rem;
}

.btn {
  margin-right: 10px;
}

.bouns-time-box {
  position: absolute;
  top: 0.8rem;
  right: 0.5rem;
  padding: 0.2rem;
  letter-spacing: 2px;
  border: 2px inset #98c9a3;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #98c9a3;
  box-shadow: inset;
  color: #dee2e6;
}
</style>