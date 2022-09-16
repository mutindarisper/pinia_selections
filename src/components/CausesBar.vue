<template>
    <BarChart 
    :chartData="chartData"
     :cause="cause"
     :county="county"
    />

    
  </template>
  
  <script >
  import { defineComponent, ref, computed, watch, toRef, onMounted } from 'vue';
  import { BarChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";

  import { useCounterStore } from '@/stores/counter';
  import axios from 'axios';

  var baseurl = 'http://45.63.48.25:8080'
  
//   Chart.register(...registerables);
  
  export default defineComponent({
    name: 'Home',
    components: { BarChart },
    props: {

      label: {
         type: String
      },
      // chartData:{
      //    type: Array
      // },
      // options:{
      //    type: Object
      // },
      cause:{
         type:String
      },
      county:{
         type: String
      }

  },
 
    setup() {
  
  

     
      

}
})



 

  
  
  </script>