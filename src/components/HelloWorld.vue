<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue'

const h = ref(0)
const m = ref(0)
const s = ref(0)

let timer: Ref<number> = ref(0)
const hour = computed(() => {
  return h.value
})
const minute = computed(() => {
  return m.value
})
const second = computed(() => {
  return s.value
})



const startWork = () => {
  timer.value = setInterval(() => {
    console.log(1)
    s.value += 1
    if (s.value >= 6) {
      m.value += 1
      s.value = 0
    }
    if (m.value >= 6) {
      h.value += 1
      m.value = 0
    }
  }, 1000);
}

const startPlay = () => {
  clearInterval(timer.value)
}


</script>

<template>
  <button @click="startWork">Work</button>
  <div class="clock-wrapper">
    <div class="time" id="time">
      <span class="hour">{{ hour }}</span>
      <a class="split">:</a>
      <span class="minitus">{{ minute }}</span>
      <a class="split">:</a>
      <span class="seconds">{{ second }}</span>
    </div>
  </div>
  <button @click="startPlay">Play</button>
</template>

<style scoped>
.clock-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
