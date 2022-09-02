<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br>
    <h2>{{storeUserSelections.selected_region}}</h2>
    <br>
    <br>
    <h2>{{storeUserSelections.selected_cause}}</h2>
    <p>No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</p>
  </div>
</template>

<script setup>

import { useCounterStore } from '@/stores/counter';
const storeUserSelections = useCounterStore()
</script>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
