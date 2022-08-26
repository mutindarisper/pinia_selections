<template>
<!-- <h1>Dashboard</h1> -->
  <h2 class="selected_region">{{storeUserSelections.selected_region}}</h2>
  <br>
  <!-- <p>{{storeUserSelections.current_geojson}}</p> -->
<div class="dashboard">   <img src="../assets/swap.svg" 
   alt=""
   class="swap"
  
   >
    
  

  <div class="analysis_selections">
   
    <p class="select_country">Select Region</p>
     <select name="" id="country_selection" @click="storeUserSelections.fetchCountriesList"
      @input="storeUserSelections.showSelectedCountry"
       placeholder="Select Region"
      >

      <option>{{ storeUserSelections.placeholder}}</option>
   
      <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
    </select>


 <!-- <VueCompareImage leftImage="../assets/img_1.PNG"
 rightImage="../assets/img_2.PNG"  />; -->
<!-- <div class="img-comp-container">
  <div class="img-comp-img">
    <img src="../assets/img_1.PNG" width="300" height="200">
  </div>
  <div class="img-comp-img img-comp-overlay">
    <img src="../assets/img_2.PNG" width="300" height="200">
  </div>
</div> -->

<img src="../assets/img_1.PNG">

<img id="my-img" src="../assets/img_2.PNG">

<div id="blue" ></div>
<div id="red"></div>

<input type="range" min="0" max="100" value="50" id="slider" @input="slide">

   

     <!-- <p class="select_cause">Select Cause</p>
     <select name="" id="cause_selection" @click="storeUserSelections.fetchCountriesList" @change="storeUserSelections.showSelectedCountry" >
   
      <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
    </select>  -->

  </div>

  <div id="map">
    
  
  
    

  </div>

  <div id="map_" >

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
// import axios from 'axios'
// import $ from "jquery";

// import VueCompareImage from "vue-compare-image";
import "vue-compare-image"



var baseurl = 'http://45.63.48.25:8080'

const storeUserSelections = useCounterStore()


let map;
let map_;
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

       map_ = L.map("map_", {
        zoomControl: false,
        // layersControl: false,
        center: [0.02, 37.8582273],
        // minZoom: 6.5,
        // maxZoom: 20,
        zoom: 6,
        // measureControl: true,
        // defaultExtentControl: true,
        layers: mapboxSatellite
      }); // add the basemaps to the controls

})






     //function to get regions 

const getRegion = () => {  
 
  if(current_geojson.value)map.removeLayer(current_geojson.value)

  var selecteRegion = storeUserSelections.getSelectedRegion
  // console.log(region)
  current_geojson.value = L.geoJSON(selecteRegion, {
          style: {
            color: "black",
            opacity: 0.3
          }
           })
  

  // current_geojson.value.addTo(map)

            // map.fitBounds(current_geojson.value.getBounds(), {
            //                 padding: [50, 50],
            //               }); 
  
}



//watch for changes

const setSelectedRegion = computed( () => {
  return storeUserSelections.getSelectedRegion
})

 watch( setSelectedRegion , () => {
  getRegion()
})

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
function slide(){
    let slideValue = document.getElementById("slider").value;

    document.getElementById("my-img").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";

    console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
}
   


</script>

<style scoped>
#map{
  /* height: 30vw;
  width: 60vw; */
   width: 100%;
    height: 100%;
    position: absolute;
    top: 20vh;
 
}
#map_{
  /* height: 30vw;
  width: 60vw; */

    /* width: 100%;
    height: 100%;
    position: absolute; */

  clip-path: polygon(0 0 , 50% 0, 50% 100%, 0 100%);
 
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
.swap{
  position: absolute;
  top: 2vh;
  left: 50vw;
  height: 30px;
  width: 40px;
  z-index: 1000;
  background-color: #fff;
  cursor: pointer;

}
.img-comp-container {
  position: relative;
  height: 200px; /*should be the same height as the images*/
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow:hidden;
}

.img-comp-img img {
  display:block;
  
}

.img-comp-slider {
  position: absolute;
  z-index:9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: #2196F3;
  opacity: 0.7;
  border-radius: 50%;
}

img{
    width: 100%;
    height: 100%;
    position: absolute;
}

#my-img{
    clip-path: polygon(0 0 , 50% 0, 50% 100%, 0 100%);
}
#red{
 width: 100%;
    height: 100%;
    position: absolute;
    top: 10vh;
    background-color: red;
}

#blue{
  background-color: cyan;
    clip-path: polygon(0 0 , 50% 0, 50% 100%, 0 100%);

}

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
/* .selected_region{
  position: absolute;
  top: 20vh;
  left: 15vw;

} */

</style>
