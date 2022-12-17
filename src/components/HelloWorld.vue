<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue'
import Time from './Time.vue'

const isActive = ref(true)
let timer: Ref<number> = ref(0)
let bonus_timer: Ref<number> = ref(0)

const h = ref(0)
const m = ref(0)
const s = ref(0)

const hour = computed(() => h.value.toString())
const minute = computed(() => m.value)
const second = computed(() => s.value.toString())


const bonus_h = ref(0)
const bonus_m = ref(0)
const bonus_s = ref(0)

const bonus_hour = computed(() => bonus_h.value.toString())
const bonus_minute = computed(() => bonus_m.value)
const bonus_second = computed(() => bonus_s.value.toString())


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
}

const resetTime = (hour: Ref<number>, minute: Ref<number>, second: Ref<number>, timer: Ref<number>) => {
  hour.value = 0
  minute.value = 0
  second.value = 0
  clearInterval(timer.value)
}

const startWork = () => {
  isActive.value = true
  // 暂停bonus的消耗
  clearInterval(bonus_timer.value)
  // 避免重复创建timer
  if (timer.value) return
  timer.value = setInterval(() => {
    computedTime(h, m, s)
  }, 1000);
}

const startPlay = () => {
  isActive.value = false
  resetTime(h, m, s, timer)
}



</script>

<template>
  <div class="clock-wrapper">
    <div :class="{ actived: isActive }" class="time">
      <Time :hour="hour" :minute="minute" :second="second" />
    </div>
    <div :class="{ actived: !isActive }" class="time">
      <!-- 这里传的应该是累积的奖励时间 -->
      <Time :hour="bonus_hour" :minute="bonus_minute" :second="bonus_second" />
    </div>
  </div>
  <button class="btn" @click="startWork">Work</button>
  <button class="btn" @click="startPlay">Play</button>
</template>

<style scoped>
.clock-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  border: 1px solid black;
}


.actived.time {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -100px;
  border-radius: 50%;
  background-color: pink;
  transition: all 0.8s ease-in-out;
  z-index: 2;
}

.time {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  right: 50px;
  bottom: 50px;
  background-color: lightsalmon;
  transition: all ease-in-out .8s;
  z-index: 1;
}

.btn {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
