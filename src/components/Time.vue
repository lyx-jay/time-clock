<script setup lang="ts">
const props = defineProps<{
  hour: number
  minute: number
  second: number
}>()

/**
 * 格式化时间
 * @param num 时间
 */
const formatTime = (num: number) => {
  const newNum = Math.floor(num)
  if (newNum >= 0 && newNum < 10) return `0${newNum}`
  return newNum.toString()
}
</script>

<template>
  <div class="time-clock">
    <div class="h text">{{ formatTime(hour) }}:</div>
    <div class="m text">{{ formatTime(minute) }}:</div>
    <div class="s text">{{ formatTime(second) }}</div>
  </div>
</template>

<style scoped>
.time-clock {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .text {
  letter-spacing: 4px;
  font-size: 3.5rem;
} */
</style>