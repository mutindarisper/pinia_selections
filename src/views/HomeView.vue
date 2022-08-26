<template>
<!-- <h1>Dashboard</h1> -->
  <h2 class="selected_region">{{storeUserSelections.selected_region}}</h2>
  <br>
  <!-- <p>{{storeUserSelections.current_geojson}}</p> -->
<div class="dashboard">
  

  <div class="analysis_selections">
   
    <p class="select_country">Select Region</p>
     <select name="" id="country_selection" @click="storeUserSelections.fetchCountriesList"
      @input="storeUserSelections.showSelectedCountry"
       placeholder="Select Region"
      >

      <option>{{ storeUserSelections.placeholder}}</option>
   
      <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
    </select>

    <!-- <button @click="getRegion">load</button> -->

   
   

     <!-- <p class="select_cause">Select Cause</p>
     <select name="" id="cause_selection" @click="storeUserSelections.fetchCountriesList" @change="storeUserSelections.showSelectedCountry" >
   
      <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
    </select>  -->

  </div>

  <div id="map" ref="map">
    

  </div>


</div>
</template>


<script setup>
import "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { baselayers } from '../Helpers/baselayers'
import { ref, onMounted, watch,  computed} from "vue";
import { useCounterStore } from '@/stores/counter';
import axios from 'axios'
import $ from "jquery";


var baseurl = 'http://45.63.48.25:8080'

const storeUserSelections = useCounterStore()

let map;
let places = ref([]);
 

var current_geojson = ref(null)
let loaded_geojson = ref()
const mapbox =  L.tileLayer(
       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
         // maxZoom: 18,
         id: "mapbox/streets-v11",
         accessToken:
           "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
       }
     );



onMounted(() => {
  
   map = L.map("map", {
        zoomControl: false,
        // layersControl: false,
        center: [0.02, 37.8582273],
        // minZoom: 6.5,
        // maxZoom: 20,
        zoom: 6,
        // measureControl: true,
        // defaultExtentControl: true,
        layers: mapbox
      }); // add the basemaps to the controls

})


     //function to get regions 

const getRegion = () => {  
  // var region = storeUserSelections.current_geojson
  //     console.log(region , 'region')
  if(current_geojson.value)map.removeLayer(current_geojson.value)

  // var region  = storeUserSelections.showSelectedCountry
  var selecteRegion = storeUserSelections.getSelectedRegion
  // console.log(region)
  current_geojson.value = L.geoJSON(selecteRegion, {
          style: {
            color: "black",
            opacity: 0.3
          }
           })
  // console.log(current_geojson.value, 'store region')

  current_geojson.value.addTo(map)

//  console.log(current_geojson.value.features[0].properties, 'features')

  // console.log(map.value, 'map')
      
   

              

            // map.fitBounds(region.getBounds(), {
            //                 padding: [50, 50],
            //               });

     
  
}

// setTimeout(getRegion, 7000);

//  setTimeout(getRegion, 5000);
// const delay = () => {

//              // Bind the current `this` to a local variable, so we can access
//              // it in the anonymous function below. Then, use
//              // `timeout_trigger.call` to bind `element` to its `this` value.
             

//              if(current_geojson.value !== null){map.removeLayer(current_geojson.value)}


//              var element = this;
//              setTimeout(function () { getRegion.call(element)
           
//              }, 3000);


         

// }

//watch for changes

const setSelectedRegion = computed( () => {
  return storeUserSelections.getSelectedRegion
})

 watch( setSelectedRegion , () => {
  getRegion()
})
// const clearMap = () => {
//    loaded_geojson = current_geojson.value
//            console.log(loaded_geojson, 'loaded_geojson ')
//             if (loaded_geojson !== null) map.removeLayer(loaded_geojson );
             
//   //  if (current_geojson.value !== null) map.value.removeLayer(current_geojson.value);
// }




// const clear = () => {
//    if(loaded_geojson.value.length > 2 )map.removeLayer(loaded_geojson.value );
//   //  if (current_geojson.value) map.removeLayer(current_geojson.value);
// }

   









  



</script>

<style scoped>
#map{
  height: 30vw;
  width: 60vw;
 
}
.analysis_selections{
  height: 5vw;
  width: 60vw;
  background-color: rgb(253, 235, 213);
}
#country_selection{
  position: absolute;
  top: 3.5vh;
  width: 10vw;
  height: 3vh;
  border-radius: 15px;
  border: 2px rgb(4, 87, 134) solid ;
}
.select_country{
  position: absolute;
  top: 1vh;
  left: 0.5vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold;
}
/* .selected_region{
  position: absolute;
  top: 20vh;
  left: 15vw;

} */

</style>
