<script setup lang="ts">
import TimeVue from '../components/Time.vue'
import useTimer from '../logic/timer'

const { h, m, s, start, pause, b_h, b_m, b_s, consume } = useTimer()
</script>

<template>
  <div class="clock-wrapper">
    <div class="time">
      <TimeVue :hour="h" :minute="m" :second="s" />
    </div>
    <div class="time">
      <TimeVue :hour="b_h" :minute="b_m" :second="b_s" />
    </div>
  </div>
  <button @click="start">start</button>
  <button @click="pause">pause</button>
  <button @click="consume">consume</button>
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