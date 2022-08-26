<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br>
    <br>
    <h2>{{storeUserSelections.selected_region}}</h2>
  </div>
</template>

<script setup>

import { useCounterStore } from '@/stores/counter';
const storeUserSelections = useCounterStore()
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
