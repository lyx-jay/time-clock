<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { formatTime } from '../utils';
import Time from './Time.vue';

const isActive = ref(true)
let timer: number
let b_timer: number

const h = ref(0)
const m = ref(0)
const s = ref(0)

const hour = computed(() => formatTime(h.value))
const minute = computed(() => formatTime(m.value))
const second = computed(() => formatTime(s.value))

const totalMinutes = ref(0)
const bonusTime = computed(() => {
  const bonusMinutes: number = Math.floor(totalMinutes.value / 2)
  return {
    h: formatTime(Math.floor(bonusMinutes / 6)),
    m: formatTime(bonusMinutes % 6),
    s: formatTime(0)
  }
})

// 计算时间
const computedTime = (hour: Ref<number>, minute: Ref<number>, second: Ref<number>) => {
  second.value += 1
  if (second.value >= 6) {
    minute.value += 1
    second.value = 0
  }
  if (minute.value >= 6) {
    hour.value += 1
    minute.value = 0
  }
  // 计算奖励时间
  totalMinutes.value = h.value * 6 + m.value + (s.value / 6)
}

const resetTime = (hour: Ref<number>, minute: Ref<number>, second: Ref<number>) => {
  hour.value = 0
  minute.value = 0
  second.value = 0
}


const startWork = () => {
  isActive.value = true
  // 暂停b的消耗
  clearInterval(b_timer)
  // 避免重复创建timer
  if (timer) {
    return
  }
  timer = setInterval(() => {
    computedTime(h, m, s)
  }, 1000);
}


const startPlay = () => {
  isActive.value = false
  clearInterval(timer)
  timer = 0
  resetTime(h, m, s)
}
</script>

<template>
  <div class="clock-wrapper">
    <div class="time">
      <Time :hour="hour" :minute="minute" :second="second" />
    </div>
    <div class="time">
      <!-- 这里传的应该是累积的奖励时间 -->
      <Time :hour="bonusTime.h" :minute="bonusTime.m" :second="bonusTime.s" />
    </div>
  </div>
  <button class="btn" @click="startWork">Work</button>
  <button class="btn" @click="startPlay">Play</button>
</template>

<style scoped>
.clock-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  border: 1px solid black;
}

.time {
  width: 100px;
  height: 100px;
  border: 1px solid pink;
  border-radius: 8px;
  margin-right: 10px;
}
</style>
