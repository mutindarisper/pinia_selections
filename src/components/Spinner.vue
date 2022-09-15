<template>
    <div class="spin">
       <div class="lds-dual-ring"></div>
       <div class="text">{{ text }}</div>
  
    </div>
  </template>
  
  <script>
import { defineComponent } from "vue"

  export default defineComponent( {
    props:{
          text:{
              required: false,
              type: String,
              default: 'Loading'
          }
      }
  
  }) 
     
  
  </script>
  
  <style scoped>
  .text{
    
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color:#030303;
  margin-top: 2px;
  }
  .lds-dual-ring {
     /* position: absolute;
     top:50vh;
     left: 30vw;  */
    display: inline-block;
    width: 480px;
    height: 480px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 30px;
    height: 30px;
    /* margin: 5px; */
    border-radius: 50%;
    border: 6px solid #050505;
    border-color: #0d0e0d transparent #050505 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  
  
  </style>