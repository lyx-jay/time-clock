<script setup lang="ts">
import { ref } from 'vue';
import TimeVue from '../components/Time.vue';
import useTimer from '../logic/timer';

const scale = ref(4)

const {
  h, m, s,
  b_h, b_m, b_s,
  consume, start, pause,
  isTiming, canConsume
} = useTimer(scale.value)


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