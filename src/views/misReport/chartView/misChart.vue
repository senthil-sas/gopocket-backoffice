<template>
  <div class="w-1/2">
    <v-frappe-chart
      type="pie"
      :labels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :data="[{ values: [18, 40, 30, 35, 8, 52, 17, -4] }]"
    />
  </div>
  <div class="w-1/2">
    <v-frappe-chart
  type="bar"
  :labels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
  :data="[
    { name: 'Dataset 1', values: [18, 40, 30, 35, 8, 52, 17, -4] },
    { name: 'Dataset 2', values: [30, 50, -10, 15, 18, 32, 27, 14] },
  ]"
  :bar-options="{
    stacked: 1, // default 0, i.e. adjacent
  }"
/>
  </div>
</template>

<script setup>
import { VFrappeChart } from "vue-frappe-chart";
</script>

<style>
</style>