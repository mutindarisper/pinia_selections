<template>
<!-- <h1>Dashboard</h1> -->
  <h2 class="selected_region">{{storeUserSelections.selected_region}}</h2>
  <br>
  <h3 class="selected_region">{{storeUserSelections.selected_cause}}</h3>
  <br>


  <div ref="loading" class="spinner" v-if="loading">
            <Spinner />
        </div>



        <!-- <div v-else> -->
          <div class="analysis_selections">
   
   <p class="select_country">Select Region</p>
    <select name="" id="country_selection" @click="storeUserSelections.fetchCountriesList"
     @input="storeUserSelections.showSelectedCountry"
      placeholder="Select Region"
     >

     <option>{{ storeUserSelections.placeholder}}</option>
  
     <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
   </select>



<!-- <img id="first_img" src="../assets/img_1.PNG">

<img id="my-img" src="../assets/img_2.PNG"> -->



    <p class="select_cause">Select Cause</p>
    <select name="" id="cause_selection" 
     @click="storeUserSelections.fetchCausesList"
     @input="storeUserSelections.showSelectedCause" 
    >
     <option>{{ storeUserSelections.cause_placeholder}}</option>
     <option v-for="cause in storeUserSelections.causes" :key="cause">{{ cause }}</option>
   </select> 

 </div>

        <!-- </div> -->




  

  <div id="map">
   
  </div>

  <div id="map_" >

  </div>

  <div class="charts" ref="charts"   v-if="charts">
    <img class="close_chart" src="../assets/images/close_small.svg" alt="" @click="close_chart()">
    <div class="chart_title">No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</div>
    <CausesChart 
    :height="250"
    :width="350"
    :chartData="chartData"
    :options="options"

    />
  </div>

  <button type="button" 
  class="stats_button"
  @click="load_stats()">
  Load stats</button>

  <button type="button" class="fetch" @click="storeUserSelections.fetchKwale">Fetch</button>

  <!-- uploading a custom shapefile -->
  <form action='#' @submit="false">
    <input type='file' id='fileinput'>
    <input type='button' id='btnLoad' value='Load' @click="loadFile()" >
</form> 

  <!-- <input type="range" min="0" max="100" value="50" id="slider" @input="slide">   -->

<!-- </div>  :county="county_data"
    :cause="cause_data" -->
</template>


<script setup>
import "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { baselayers } from '../Helpers/baselayers'
import { ref, onMounted, watch,  computed, reactive} from "vue";
import { useCounterStore } from '@/stores/counter';
import axios from 'axios'
import Spinner from "../components/Spinner.vue";

// import $ from "jquery";

// import VueCompareImage from "vue-compare-image";
import "vue-compare-image"
import "shpjs/dist/shp"
import "shpjs/dist/leaflet.shpfile"


import CausesChart from "../components/CausesChart.vue";



var baseurl = 'http://45.63.48.25:8080'

const storeUserSelections = useCounterStore()

// console.log(storeUserSelections.getSelectedCause, 'getSelectedCause')


let map;
let map_;
let places = ref([]);
let charts = ref(false);
let loading = ref(false)
// console.log(county_data, 'reeef county')

const load_stats = () => {
  charts.value = true;
  

} 

const close_chart = () => {
  if (charts.value = true)charts.value = false;
  

} 

var current_geojson = ref(null)
var current_point_geojson = ref(null)
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


     const mapboxSatellite=  L.tileLayer(
       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

         id: "mapbox/satellite-v9",
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

      //  map_ = L.map("map_", {
      //   zoomControl: false,
      //   // layersControl: false,
      //   center: [0.02, 37.8582273],
      //   // minZoom: 6.5,
      //   // maxZoom: 20,
      //   zoom: 6,
      //   // measureControl: true,
      //   // defaultExtentControl: true,
      //   layers: mapboxSatellite
      // }); // add the basemaps to the controls

     
})



      const chartData = storeUserSelections.getChartData
      const options = storeUserSelections.getChartOptions
      


     const loadFile = () => {

var input = document.getElementById('fileinput');
if (!input.files[0]) {
    bodyAppend("p", "Please select a file before clicking 'Load'");
}
else {
    var file = input.files[0];

    var fr = new FileReader();
    fr.onload = receiveBinary;
    fr.readAsArrayBuffer(file);
}
function receiveBinary() {
    var result = fr.result
    var shpfile =  new L.Shapefile(result);
    shpfile.addTo(map);
}
}



     //function to get regions 

const getRegion = () => {  
 
  loading.value = storeUserSelections.getLoadingState
  console.log(loading.value, 'loading')
  if(current_geojson.value)map.removeLayer(current_geojson.value)
  if(current_point_geojson.value)map.removeLayer(current_point_geojson.value)

  var selecteRegion = storeUserSelections.getSelectedRegion
 
  // console.log(region)
  current_geojson.value = L.geoJSON(selecteRegion, {
          style: {
            color: "black",
            opacity: 0.3
          }
           })
  

  current_geojson.value.addTo(map)

            map.fitBounds(current_geojson.value.getBounds(), {
                            padding: [50, 50],
                          }); 
  
}

const getPoints = () => {  
  loading.value = storeUserSelections.getLoadingState
 
 if(current_point_geojson.value)map.removeLayer(current_point_geojson.value)

 var selectedPoints = storeUserSelections.getSelectedPoints
 // console.log(region)
 current_point_geojson.value= L.geoJSON(selectedPoints, {


              pointToLayer: function (feature, latlng){

                var studioicon = L.icon({
                                                iconUrl: "/src/assets/images/marker.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });
            return L.marker(latlng, {icon: studioicon});
              }


        
          })
 

          current_point_geojson.value.addTo(map)

           map.fitBounds(current_point_geojson.value.getBounds(), {
                           padding: [50, 50],
                         }); 
 
}





//watch for changes

const setSelectedRegion = computed( () => {
  return storeUserSelections.getSelectedRegion
})

const setSelectedPoint = computed( () => {
  return  storeUserSelections.getSelectedPoints
})

 watch( setSelectedRegion , () => {
  getRegion()
  
})
watch( setSelectedPoint , () => {
  getPoints()
  
})


const getKwaleRegion = () => {  
 
 
 if(current_geojson.value)map.removeLayer(current_geojson.value)
 if(current_point_geojson.value)map.removeLayer(current_point_geojson.value)

 var kwaleRegion = storeUserSelections.getKwale

 // console.log(region)
 current_geojson.value = L.geoJSON( kwaleRegion, {
         style: {
           color: "black",
           opacity: 0.3
         }
          })
 

 current_geojson.value.addTo(map)

           map.fitBounds(current_geojson.value.getBounds(), {
                           padding: [50, 50],
                         }); 
 
}







// function initComparisons() {
//   var x, i;
//   /*find all elements with an "overlay" class:*/
//   x = document.getElementsByClassName("img-comp-overlay");
//   for (i = 0; i < x.length; i++) {
//     /*once for each "overlay" element:
//     pass the "overlay" element as a parameter when executing the compareImages function:*/
//     compareImages(x[i]);
//   }
//   function compareImages(img) {
//     var slider, img, clicked = 0, w, h;
//     /*get the width and height of the img element*/
//     w = img.offsetWidth;
//     h = img.offsetHeight;
//     /*set the width of the img element to 50%:*/
//     img.style.width = (w / 2) + "px";
//     /*create slider:*/
//     slider = document.createElement("DIV");
//     slider.setAttribute("class", "img-comp-slider");
//     /*insert slider*/
//     img.parentElement.insertBefore(slider, img);
//     /*position the slider in the middle:*/
//     slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
//     slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
//     /*execute a function when the mouse button is pressed:*/
//     slider.addEventListener("mousedown", slideReady);
//     /*and another function when the mouse button is released:*/
//     window.addEventListener("mouseup", slideFinish);
//     /*or touched (for touch screens:*/
//     slider.addEventListener("touchstart", slideReady, { passive:false});
//     /*and released (for touch screens:*/
//     window.addEventListener("touchend", slideFinish);
//     function slideReady(e) {
//       /*prevent any other actions that may occur when moving over the image:*/
//       e.preventDefault();
//       /*the slider is now clicked and ready to move:*/
//       clicked = 1;
//       /*execute a function when the slider is moved:*/
//       window.addEventListener("mousemove", slideMove);
//       window.addEventListener("touchmove", slideMove);
//     }
//     function slideFinish() {
//       /*the slider is no longer clicked:*/
//       clicked = 0;
//     }
//     function slideMove(e) {
//       var pos;
//       /*if the slider is no longer clicked, exit this function:*/
//       if (clicked == 0) return false;
//       /*get the cursor's x position:*/
//       pos = getCursorPos(e)
//       /*prevent the slider from being positioned outside the image:*/
//       if (pos < 0) pos = 0;
//       if (pos > w) pos = w;
//       /*execute a function that will resize the overlay image according to the cursor:*/
//       slide(pos);
//     }
//     function getCursorPos(e) {
//       var a, x = 0;
//       e = (e.changedTouches) ? e.changedTouches[0] : e;
//       /*get the x positions of the image:*/
//       a = img.getBoundingClientRect();
//       /*calculate the cursor's x coordinate, relative to the image:*/
//       x = e.pageX - a.left;
//       /*consider any page scrolling:*/
//       x = x - window.pageXOffset;
//       return x;
//     }
//     function slide(x) {
//       /*resize the image:*/
//       img.style.width = x + "px";
//       /*position the slider:*/
//       slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
//     }
//   }
// }

// function slide(){
//     let slideValue = document.getElementById("slider").value;

//     document.getElementById("map").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";

//     console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
// }
   


</script>

<style scoped>
#map{
  height: 30vw;
  width: 60vw;
   /* width: 100%;
    height: 100%;
    position: absolute; */
    /* top: 20vh; */
 
}

/* img{
    width: 100%;
    height: 100%;
    position: absolute;
}

#my-img{
    clip-path: polygon(0 0 , 50% 0, 50% 100%, 0 100%);
} */
/* #slider{ */
  /* top:30vh; */
  /* background-color: aqua !important; */
/* } */
.analysis_selections{
  height: 5vw;
  width: 60vw;
  left: -60vw;
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
  /* left: 0.5vw; */
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold;
}
.select_cause{ 
  position: absolute;
  top: 1vh;
  left: 15vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold;
}


#cause_selection{
  position: absolute;
  top: 3.5vh;
  left: 15vw;
  width: 10vw;
  height: 3vh;
  border-radius: 15px;
  border: 2px rgb(4, 87, 134) solid ;
}

.stats_button{
  position: absolute;
  top: 10.5vh;
  left: 30vw;
  width: 10vw;
  height: 3vh;
  border-radius: 15px;

}

.fetch{
  position: absolute;
  top: 10.5vh;
  left: 40vw;
  width: 10vw;
  height: 3vh;
  border-radius: 15px;

}


.chart_title{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold; 
  color: #fff;
}


/* #red{
 width: 100%;
    height: 100%;
    position: absolute;
    top: 10vh;
    background-color: red;
} */

/* #blue{ */
  /* background-color: cyan; */
    /* clip-path: polygon(0 0 , 50% 0, 50% 100%, 0 100%); */

/* } */

#slider{
    position: relative;
    -webkit-appearance: none;
    width: calc( 100% + 40px);
    height: 100%;
    margin-left: -20px;
    background-color: transparent;
    outline: none;
}
#slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    height: 45px;
    width: 45px;
    background: url("../assets/swap.svg"),
    rgba(255,255,255,0.3);
    border: 4px solid white;
    border-radius: 50%;
    background-size: contain;
    cursor: pointer;
}
.charts{
  position:absolute;
  top: 45vh;
  left: 42vw;
  z-index: 1000;
  background-color: black;
  width: 500px;
  height: 300px;
  
}
.close_chart{
  position:absolute;
  top: 1vh;
  left: 24vw;
  cursor: pointer;
  z-index: 1500;
}
.spinner{
  position:absolute;
  top: 45vh;
  left: 72vw;
  z-index: 1500;
  /* background-color: black; */
  width: 500px;
  height: 150px;
  

}


</style>
