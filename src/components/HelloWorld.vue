<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { formatTime } from '../utils';
import Time from './Time.vue';

let timer: number
let b_timer: number

const h = ref(0)
const m = ref(0)
const s = ref(0)

const hour = computed(() => formatTime(h.value))
const minute = computed(() => formatTime(m.value))
const second = computed(() => formatTime(s.value))

const totalSeconds = ref(0)
const bonusTime = computed(() => {
  const bonusSeconds: number = Math.floor(totalSeconds.value / 2)
  const hour = Math.floor(bonusSeconds / 3600)
  const minute = Math.floor((bonusSeconds % 3600) / 60)
  const seconds = (bonusSeconds % 3600) % 60
  return {
    h: hour,
    m: minute,
    s: seconds
  }
})

// 计算时间
const computedTime = (hour: Ref<number>, minute: Ref<number>, second: Ref<number>) => {
  second.value += 1
  if (second.value >= 60) {
    minute.value += 1
    second.value = 0
  }
  if (minute.value >= 60) {
    hour.value += 1
    minute.value = 0
  }
  // 计算奖励时间,总秒数
  totalSeconds.value = h.value * 3600 + m.value * 60 + s.value
}

const resetTime = (hour: Ref<number>, minute: Ref<number>, second: Ref<number>) => {
  hour.value = 0
  minute.value = 0
  second.value = 0
}

const startWork = () => {
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
  clearInterval(timer)
  timer = 0
  resetTime(h, m, s)
  // 倒计时计算
  if (totalSeconds.value === 0) return
  setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value -= 1
    }
  }, 1000)
}

</script>

<template>
  <div class="clock-wrapper">
    <div class="time">
      <Time :hour="hour" :minute="minute" :second="second" />
    </div>
    <div class="time">
      <Time :hour="formatTime(bonusTime.h)" :minute="formatTime(bonusTime.m)" :second="formatTime(bonusTime.s)" />
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
