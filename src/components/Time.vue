<script setup lang="ts">
const props = defineProps<{
  hour: number
  minute: number
  second: number
}>()

const formatTime = (num: number) => {
  return Math.floor(num)
}
</script>

<template>
  <div class="time-clock">
    <div class="h">{{ formatTime(hour) }}:</div>
    <div class="m">{{ formatTime(minute) }}:</div>
    <div class="s">{{ formatTime(second) }}</div>
  </div>
</template>

<style scoped>
.time-clock {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>