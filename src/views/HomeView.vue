<template>
<!-- <h1>Dashboard</h1> -->
  <h2 class="selected_region">{{storeUserSelections.selected_region}}</h2>
  <br>
  <h3 class="selected_region">{{storeUserSelections.selected_cause}}</h3>
  <br>

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

  <div id="map">
   
  </div>

  <div id="map_" >

  </div>

  <div class="charts" ref="charts">
    <CausesChart 
    :height="250"
    :width="350"
    :chartData="chartData"
    :options="testData.options"

    
    
  
    />
  </div>

  <button type="button" 
  class="stats_button"
  @click="load_stats()">
  Load stats</button>

  <!-- <input type="range" min="0" max="100" value="50" id="slider" @input="slide">    v-if="charts" -->

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
// import $ from "jquery";

// import VueCompareImage from "vue-compare-image";
import "vue-compare-image"


import CausesChart from "../components/CausesChart.vue";



var baseurl = 'http://45.63.48.25:8080'

const storeUserSelections = useCounterStore()

// console.log(storeUserSelections.getSelectedCause, 'getSelectedCause')


let map;
let map_;
let places = ref([]);
let charts = ref(false);
let county_data = ref('')
let cause_data = ref('')

// console.log(county_data, 'reeef county')

const load_stats = () => {
  charts.value = true;
  

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


const testData = {
        // labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        // datasets: [
        //   {
        //     data: [30, 40, 60, 70, 5],
        //     backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        //   },
        // ],

        // color_info_fromServer:{},
        //   names_candidates:[],
        //   chartDataFromServer:[],
        //   chatData_restructure: {
        //      labels:[],
        //      datasets:[]

        //   },

          options: {
            // scales: {
            //    xAxes: [{
            //     //   stacked: true,
                  
                  
            //       ticks: {
            //          beginAtZero: true,
                  
            //          // fontColor: '#2FA036',
            //       },
            //       gridLines: {
            //          display: true
            //       }
            //    }],
            //    yAxes: [{
            //     //   stacked: true,
                  
            //            barPercentage: 0.85,
                     
            //        ticks: {
            //           beginAtZero: true,
                       
            //          // fontColor: '#2FA036',
            //          fontSize: 10,
            //       },
            //       gridLines: {
            //          display: false,
                     
            //       }
            //    }]
            // },
      //        tooltips: {
      //     enabled: true,
      //     callbacks: {
      //       label: ((tooltipItems) => {
      //         console.log(this)
      //         return tooltipItems.yLabel + '£' +   this.chart_data.datasets[0].toString() 
      //       })
      //     }
      //   },
           legend: {
               display: true,
               position: 'right',
               margin: 20,
               labels:{
                  fontColor: '#fff',
                  fontWeight: 'bold',
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: 'circle'
               }
            },
            
            responsive: true,
            maintainAspectRatio: false,
          
         }
      };

      const chartData = storeUserSelections.getChartData



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
  

  current_geojson.value.addTo(map)

            map.fitBounds(current_geojson.value.getBounds(), {
                            padding: [50, 50],
                          }); 
  
}

const getPoints = () => {  
 
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



//for chart


const getCountyStats = () =>  {
        
        // const storeUserSelections = useCounterStore()
     
     var county= storeUserSelections.getSelectedCountyName
      console.log(county, 'STATS COUNTY')
      // county_data.value = county
      // console.log(county_data.value, 'REFS County')

      var cause = storeUserSelections.getSelectedCause
        console.log(cause, 'STATS CAUSE')
        // cause_data.value = cause
        // console.log(cause_data.value, 'REFS CAUSE')

    //     if ( county && cause) {

    //       const outPut = axios.get(baseurl+'/HotSpots/get_statics/?county='+county+'&cause='+cause)
     
    //          .then((response) => {
    //               const responseData = response.data.statistics

    //              testData.chartDataFromServer = responseData 
    //              // console.log(responseData , 'causes statistics')   
                 
    //               var stats_data = {'labels':[], 'values':[]}

    //                responseData.map( item => {
    //                   const key =  Object.keys( item)
    //                   stats_data[key] = item[key]

                      
    //           //  console.log(item[key] , 'value')
    //           // only add data that is greater than 0 to the data structure.
    //                 if (item[key]> 0){
    //                    stats_data['labels'].push(key[0])
                          
    //                       stats_data['values'].push(item[key])
    //                 }

                   

    //                 })

    //                 console.log(stats_data, 'labels and data')
    //                  var Labels = stats_data.labels
                     
    //                  var Data = stats_data.values
                
    //               setTimeout(() => {


    //              // test for chart dynamically
    //              var chartDataNew = testData.chartDataFromServer

    //              var mychart_data = []   //no. of blackspots per road

    //              // generate names for road labels 
    //              var names_labels = []

    //              // const places_names = Object.keys(chartDataNew[0]).slice(1)
                 
    //              // chartDataNew.map((name =>{

    //              //    var majina = Object.values(name).slice(0,1)
                    
                    
    //              //    names_labels.push(majina[0])

                  
                    

    //              // }))

    //              var Doughnut_data = {}

    //              var colors_a = ['#ffbb33', '#99cc00', '#ffc7c8', '#33b5e5',  '#ABCDC6', '#ffc7c8', '#9a5fb8', '#32a6b5',  '#ABEBC6']


    //              chartDataNew.map((item =>{

    //                 var data_values = Data //Object.values(item).slice(1)
                 
                  


    //              //   Doughnut_data[item.candidate] = data_values

    //              //    colors_a.push(this.color_info_fromServer[item.candidate]['color'])
                
                    
    //              }))

                

                
    //              testData.chatData_restructure.labels = Labels 
    //              testData.chatData_restructure.datasets= Data

    //              // this.names_candidates = names_labels
    //              // var Datavalues_out = []

                 
    //              // names_labels.map((name=>{

    //              //     var sum_per_candidate = Doughnut_data[name].reduce((a, b) => a + b, 0)

    //              //     Datavalues_out.push(sum_per_candidate)
                     


                  


    //              // }))

              

    //              var datasetStructure =  [{
    //                    data: Data,
    //                       label: Labels,
    //                       backgroundColor:colors_a,
    //                       fill:true
    //                 }]
                     

              


    //                 testData.chatData_restructure.labels = Labels

    //              console.log(testData.chatData_restructure.labels, 'labels only')
    //              testData.chatData_restructure.datasets= datasetStructure
    //               console.log(testData.chatData_restructure.datasets, 'data only')

    //             //  this.renderChart(testData.chatData_restructure, testData.options)
    //              console.log( testData.chatData_restructure, 'DATA TYPE OF CHART' )
         
    //                  }, 1000)



             

         
    //          })
    //         .catch( (error) => {
    //      console.log('an error occured ' + error);
    //  })

 
 
    //  return  outPut

    //     }
      
   

         
 }



 const setSelectedCountyName = computed( () => {
        // console.log(storeUserSelections.getSelectedCountyName, 'county name')
        county_data.value = storeUserSelections.getSelectedCountyName
      console.log(county_data.value, 'computed chart REFS County')

  return county_data.value

})

const setSelectedRegion_ = computed( () => {
  return storeUserSelections.getSelectedRegion
})

const setSelectedCause = computed( () => {
        // console.log(storeUserSelections.getSelectedCause, 'cause')
        cause_data.value = storeUserSelections.getSelectedCause
        console.log(cause_data.value, 'computed chart REFS CAUSE')
  return cause_data.value 

})

//watch
watch( setSelectedCountyName  , () => {
  // setCountyCause() 
    getCountyStats()
  
})
watch( setSelectedRegion_ , () => {
    getCountyStats()
  
})


watch( setSelectedCause , () => {
    getCountyStats()
  
})

watch( county_data , () => {
    county_data
  
})
watch(cause_data,  () => {
    cause_data
  
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
  
}
/* .selected_region{
  position: absolute;
  left: -55vw;
} */

</style>
