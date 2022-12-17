<script setup lang="ts">
const props = defineProps<{
  hour: string
  minute: number
  second: string
}>()

</script>

<template>
  <div class="time-clock">
    <div class="h">{{ hour }}:</div>
    <div class="m">{{ minute }}:</div>
    <div class="s">{{ second }}</div>
  </div>
</template>

<style scoped>
.time-clock {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>