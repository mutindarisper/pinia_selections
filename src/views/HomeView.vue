<template>
<!-- <h1>Dashboard</h1> -->
  <!-- <h2 class="selected_region">{{storeUserSelections.selected_region}}</h2>
  <br>
  <h3 class="selected_region">{{storeUserSelections.selected_cause}}</h3>
  <br> -->


  <div  class="spinner" v-if="loading">
            <img src="../assets/images/loader_white.svg" alt="">
        </div>

        <div  class="spinner" v-if="raster_loader">
            <img src="../assets/loader.svg" alt="">
        </div>




        <!-- <div v-else>    -->
          <div class="analysis_selections">
   
   <p class="select_country">Select Region</p>
    <select name="" id="country_selection" @click="storeUserSelections.fetchCountriesList"
     @input="storeUserSelections.showSelectedCountry"
      placeholder="Select Region"
     >

     <option>{{ storeUserSelections.placeholder}}</option>
  
     <option v-for="country in storeUserSelections.countries" :key="country">{{ country}}</option>
   </select>

   <!-- geoserver layers selections -->
   <p class="select_country2">Select layers</p>
    <select name="" id="country2_selection" @click="storeUserSelections.fetchRegionsList"
     @input="storeUserSelections.showSelectedLayer"
     
     >

     <option>{{ storeUserSelections.placeholder}}</option>
  
     <option v-for="layer in storeUserSelections.layers" :key="layer">{{ layer}}</option>
   </select>


   <!-- fetch geoserver geojsons -->
   <p class="select_country3">Select geoserver region</p>
    <select name="" id="country3_selection" @click="storeUserSelections.fetchGeoserverList"
     @input="storeUserSelections.showSelectedGeoserverLayer"
     
     >

     <option>{{ storeUserSelections.placeholder}}</option>
  
     <option v-for="region in storeUserSelections.geoserver_regions" :key="region">{{ region}}</option>
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


 <select id="select2">
<option>Choose Two</option>
<option value="1">Val 1</option>
<option value="2">Val 2</option>
<option value="3">Val 3</option> 
</select>

        <!-- </div> -->




  

  <div id="map">
  
   
  </div>
  <div id="map_" >

</div>


  <button type="button" 
  class="stats_button"
  @click="createLegend()">
  Load legend</button>


  <!-- <div class="charts" ref="charts"   v-if="charts" >
    <img class="close_chart" src="../assets/images/close_small.svg" alt="" @click="close_chart()">
    <div class="chart_title">No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</div>
    <CausesChart 
    :height="250"
    :width="350"
    :chartData="chartData"
    :options="options"

    />
  </div> -->


 
  <!-- <button type="button" class="fetch" @click="storeUserSelections.fetchKwale">Fetch</button> -->
  <!-- <button type="button" class="fetch1" @click="load_rasters">Fetch raster</button> -->

  <!-- uploading a custom shapefile -->
  <!-- <form action='#' @submit="false">
    <input type='file' id='fileinput'>
    <input type='button' id='btnLoad' value='Load' @click="loadFile()" >
</form>  -->

<img src="../assets/swap.svg" @click="compareLayer" class="compare"/>

  <!-- <input type="range" min="0" max="100" value="50" id="slider" @input="slide">   -->

<!-- </div>  :county="county_data"
    :cause="cause_data" -->


    <!-- leaflet side bar -->
    <div class="side-bar-view">
      <SideBarView />
    </div>

    <div id="sidenav" class="sidenav bg-white">
      <div id="mySidenav" style="height: 100%">
        <div id="protrusion" class="bg-white protrusion">
          <div @click.stop="toggle_nav">
            <img id="close" src="../assets/open.svg" v-if="!show_sidenav" />
            <img id="open" src="../assets/open.svg" v-if="show_sidenav" />
          </div>
        </div>
        <div class="sidenav_body" v-if="!show_sidenav">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
              <div class="row" v-if="show_search">
                <div class="col-xs-6 offset-3">
                  <input dense outlined v-model="search" label="Search" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap2()"
                      style="cursor: pointer"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'data_analysis'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Data Analysis</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap()"
                      style="cursor: pointer; position: absolute; left: 15vw; top: -3vh;"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'metadata'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Metadata </span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div  v-if="analysis_swap_toggle === 'data_analysis'" >
            <!-- <q-btn flat label="get WMS" @click="getWMS_Layer" />    -->

            <p>
              {{ summary_text }}
            </p>
            <br />
            <label class="text-bold" style="font-family: Montserrat; font-weight: 800;">
              <div class="chart_title_sidebar"  style="font-family: 'Trebuchet MS'; font-weight: 800;">{{storeUserSelections.selected_cause}} blackspots in {{storeUserSelections.selected_region}}  </div>
            </label>
            
            <div class="charts_sidebar"  >
            <!-- <img class="close_chart" src="../assets/images/close_small.svg" alt="" @click="close_chart()"> ref="charts"   v-if="charts" to be added later -->
            <!-- <div class="chart_title">No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</div> -->
            <CausesChart 
            :height="200"
            :width="300"
            :chartData="chartData"
            :options="options"

            />
          </div>

         
            <br />
            <label class="text-bold" style="font-family: Montserrat; font-weight: 800;">
              <div class="chart2_title_sidebar"  style="font-family: 'Trebuchet MS'; font-weight: 800;">No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</div>
            </label>
            
            <div class="charts2_sidebar"  >
            <!-- <img class="close_chart" src="../assets/images/close_small.svg" alt="" @click="close_chart()">  ref="charts"   v-if="charts" to be added later -->
            <!-- <div class="chart_title">No. of blackspots in {{storeUserSelections.selected_region}} that are {{storeUserSelections.selected_cause}}</div> -->
            <CausesBar 
            :height="200"
            :width="300"
            :chartData="chartData"
            :options="barchart_options"

            />
          </div>
           
          </div>
          <div class="meta" v-if="analysis_swap_toggle === 'metadata'">
          


              <table style="width:100%">
                  <tr>
                    <th>Region</th>
                    <td> {{storeUserSelections.selected_region}}</td>
                    
                  </tr>
                  <tr>
                    <th>Cause</th>
      
                    <td>{{storeUserSelections.selected_cause}}</td>
                  </tr>
                  <tr>
                    <th>CRS</th>
                    <td>{{storeUserSelections.crs}}</td>
                    
                  </tr>
                  <tr>
                    <th>Region</th>
                    <td> {{storeUserSelections.selected_region}}</td>
                    
                  </tr>
                  <tr>
                    <th>Cause</th>
      
                    <td>{{storeUserSelections.selected_cause}}</td>
                  </tr>
                  <tr>
                    <th>CRS</th>
                    <td>{{storeUserSelections.crs}}</td>
                    
                  </tr>
                  <tr>
                    <th>Region</th>
                    <td> {{storeUserSelections.selected_region}}</td>
                    
                  </tr>
                  <tr>
                    <th>Cause</th>
      
                    <td>{{storeUserSelections.selected_cause}}</td>
                  </tr>
                  <tr>
                    <th>CRS
                      
                    </th>
                    
                    <td>
                      <table>
                        <tr>
                          <th>Region</th>
                          <td>{{storeUserSelections.selected_region}}</td>
                        </tr>
                        <tr>
                          <th>Cause</th>
                          <td>{{storeUserSelections.selected_cause}}</td>
                        </tr>
                        <tr>
                          <th>CRS</th>
                          <td>{{storeUserSelections.crs}}</td>
                        </tr>
                      </table>
                    </td>
                    
                    
                  </tr>
                </table>
          </div>
          <!-- <LineChart :height="250" :width="250" /> -->
          <div class="logos_container row">
            <SideNavLogos />
          </div>
        </div>
      </div>
    </div>
  

    



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
import SideBarView from "../views/SideBarView.vue"

import $ from "jquery";

// import VueCompareImage from "vue-compare-image";
import "vue-compare-image"
import "shpjs/dist/shp"
import "shpjs/dist/leaflet.shpfile"
import "leaflet.wms"
import sideByside from "leaflet-side-by-side";
// import "leaflet-side-by-side/layout.css"
// import "leaflet-side-by-side/range.css"


import CausesChart from "../components/CausesChart.vue";
import CausesBar from '../components/CausesBar.vue'
// import leafletWms from "leaflet.wms";
import "leaflet-sidebar-v2";
// import "leaflet-sidebar-v2/css/leaflet-sidebar.css";

import { close_nav, open_nav } from "../Helpers/SideNavControls";
import SideNavLogos from "../views/SideNavLogos.vue"

//spinner
import useSpinner from 'use-spinner';

import 'use-spinner/assets/use-spinner.css';

import "leaflet-geoserver-request";
import "leaflet-geoserver-request/src/L.Geoserver.js"



var baseurl = 'http://45.63.48.25:8080'

const storeUserSelections = useCounterStore()

console.log(storeUserSelections.getLoadingState, 'getLoadingState')



let map;
let map_;
let places = ref([]);
let charts = ref(false);
let loading = ref(false)
let raster_loader = ref(false)
let wmsLayer= ref(null);
let kiambu;
var kiambu_points = ref(null)
let sidebar = ref(null)
let show_sidenav = ref(false)
let current_geoserver_geojson = ref(null)
let show_search = ref(false)
let search = ref("")
let analysis_swap_toggle = ref("data_analysis") 
let summary_text =  ` Land use land cover maps monitor the land use in a specific year. The
      integration of the biophysical and human factors plays a leading role in
      causing land-use changes, and is used to explain the dynamics of land use
      that occur within a river basin or a wetland. The study of land cover may
      also be used to predict future trends of an ecosystem while understanding
      its sustainability.`
let chart_title = "title"
let line_chart_title = "Vegatation Cover (Histogram)"

let legend = ref(null)
let legend_url = "http://localhost:8005/geoserver/rasters/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rasters:kiambu_clip1&legend_options=border:true;dx:10;fontSize:11"
// console.log(county_data, 'reeef county')

const load_stats = () => {
  charts.value = true;
  

} 

const close_chart = () => {
  if (charts.value = true)charts.value = false;
  

} 

var current_geojson = ref(null)
var current_point_geojson = ref(null)
var current_shapefile = ref(null)
let left_pane;
let  right_pane;

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



     //sidebar functionality
     const toggle_nav = (e)  => {
      console.log(" toggle_nav ", e.target.id);
      const cmd = e.target.id;
      if (cmd === "close") return closeNav();
      return openNav();
    }

   const openNav = () => {
      sidebar.value.open("home");
      show_sidenav.value = false;
      open_nav();
    }

    const closeNav = () => {
      sidebar.value.close("home");
      close_nav();
      show_sidenav.value= true;
    }
    const handleAnalysisMetaSwap = () => {
      analysis_swap_toggle.value = 'metadata';
    }
    const handleAnalysisMetaSwap2 = () => {
      analysis_swap_toggle.value = 'data_analysis';
    }


    const AddSideLeafletSideBar = () => {
      sidebar.value = L.control.sidebar({
        container: "sidebar",
        position: "right",
      });
      map.addControl(sidebar.value);
    }


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
        layers: mapboxSatellite
      }); // add the basemaps to the controls

      //add sidebar
      AddSideLeafletSideBar();

      closeNav();



      map.createPane('left');
      map.createPane('right');

      var selecteRegion = storeUserSelections.fetchKiambuCounty
      console.log(selecteRegion, 'kiambu')




      const sendGetRequest = async () => {
        try {
          // this.loading = true 
            const resp = await  axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county=Kiambu'
            );
            

            // this.current_geojson = resp.data
            console.log(resp.data, 'await kiambu response data');
            var selecteRegion = resp.data
            // console.log(region)
 kiambu = L.geoJSON(selecteRegion, {
          style: {
            color: "black",
            opacity: 0.8
          },
          pane: 'left'
           })//.addTo(map)


          //  map.fitBounds(kiambu.getBounds(), {
          //                   padding: [50, 50],
          //                 }); 
  
           
        } catch (err) {
            // Handle Error Here
            console.error('an error occured'+err);
        }
        // finally  { if (this.current_geojson)this.loading = false
      
        // }
        // return resp.data
    };
    sendGetRequest();


    const getPointsCause = async () => {

try {
  const response = await axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_cause=Infrastructural&county=Kiambu'
  );
  var kiambuPoints= response.data
kiambu_points.value = L.geoJSON(kiambuPoints, {
  // pane: 'right',


              pointToLayer: function (feature, latlng){

                var studioicon = L.icon({
                                                iconUrl: "/src/assets/images/marker.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });
            return L.marker(latlng, {icon: studioicon});
              }


        
          })
 

          // kiambu_points.value.addTo(map)
      //  right_pane = selectedPoints 

          //  map.fitBounds(kiambu_points.value.getBounds(), {
          //                  padding: [50, 50],
          //                }); 
 
  console.log(response.data, 'point data')
  return response.data
  
} catch (error) {
  console.error('an error occured'+error);
  
}
}
getPointsCause();

     

//       var layer1 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// var layer2 = L.tileLayer(
//   "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
//   {
//     attribution:
//       'Map tiles by <a href="https://stamen.com">Stamen Design</a>, ' +
//       '<a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — ' +
//       "Map data {attribution.OpenStreetMap}",
//     ext: "jpg"
//   }
// ).addTo(map);





// L.control.sideBySide( overlay1, overlay2).addTo(map);



 
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

      // L.control.sideBySide( left_pane, wmsLayer).addTo(map);
})

      const chartData = storeUserSelections.getChartData
      const options = storeUserSelections.getChartOptions
      const barchart_options = storeUserSelections.getBarChartOptions

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
 
  // loading = true
  // console.log(loading.value, 'loading')
  if(kiambu)map.removeLayer(kiambu)
  if(kiambu_points.value)map.removeLayer(kiambu_points.value)
  if(current_geojson.value)map.removeLayer(current_geojson.value)
  if(current_point_geojson.value)map.removeLayer(current_point_geojson.value)

  var selecteRegion = storeUserSelections.getSelectedRegion
  // loading = storeUserSelections.getLoadingState
 
  // console.log(region)
  current_geojson.value = L.geoJSON(selecteRegion, {
          style: {
            color: "black",
            opacity: 0.3
          },
          pane: 'right'
           })
  

  current_geojson.value.addTo(map)
// loading = false

            map.fitBounds(current_geojson.value.getBounds(), {
                            padding: [50, 50],
                          }); 
  
}



const getPoints = () => {  
  // loading.value = storeUserSelections.getLoadingState
  if(kiambu_points.value)map.removeLayer(kiambu_points.value)
 if(current_point_geojson.value)map.removeLayer(current_point_geojson.value)

 var selectedPoints = storeUserSelections.getSelectedPoints
 // console.log(region)
 current_point_geojson.value= L.geoJSON(selectedPoints, {
  // pane: 'right',


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
       right_pane = selectedPoints 

           map.fitBounds(current_point_geojson.value.getBounds(), {
                           padding: [50, 50],
                         }); 
 
}

//watch for changes

const setSelectedRegion = computed( () => {
  console.log(storeUserSelections.selected_region, 'selected_country homeviiew')
  if(storeUserSelections.selected_region === 'Nyeri'){
      $("#select2").show();
    }else{
      $("#select2").hide();
    }
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
left_pane = L.geoJSON( kwaleRegion, {
         style: {
           color: "black",
           opacity: 0.3
         },
        //  pane: 'left'
          })
 

 left_pane.addTo(map)

           map.fitBounds(left_pane.getBounds(), {
                           padding: [50, 50],
                         }); 

                        
                         return left_pane
 
}

const setSelectedRegion_ = computed( () => {
  return storeUserSelections.getKwale
})
watch( setSelectedRegion_ , () => {
  getKwaleRegion()
  
})

const getKwaleRaster = () => {

  if(wmsLayer.value)map.removeLayer(wmsLayer.value)

var selectedLayer= storeUserSelections.getSelectedLayerName
console.log(selectedLayer, 'selected geoserver layer home')
                
  // var kwaleRaster = storeUserSelections.getSelectRaster
  wmsLayer.value = L.tileLayer.wms("http://localhost:8005/geoserver/rasters/wms", {
        // pane: 'rasters',
        layers: `rasters:${selectedLayer}`,
        format: 'image/png',
        transparent: true,  
        opacity:1
});
wmsLayer.value.addTo(map);








// var layerLegend = L.Geoserver.legend("http://localhost:8005/geoserver/rasters/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=rasters:kiambu_clip1&legend_options=border:true;dx:10;fontSize:11;&width=20&height=20&format=image/png");
// console.log(layerLegend, 'layer legend')
// layerLegend.addTo(map);


}
const createLegend = () => {
  // if (legend.value) {
  //       map.removeControl(legend.value); //destroy legend everytime new data come in
  //     }
  var legend  = L.control({
        position: "bottomright",
        name: storeUserSelections.selected_region,
      });
      legend.onAdd = (map) => {
        //create legend based on data, translatios have been included
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<div > 
        <img src="http://localhost:8005/geoserver/rasters/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=rasters:kiambu_clip1&legend_options=border:true;dx:10;fontSize:11;&width=20&height=20&format=image/png" />
       
        </div >`;

        // let draggable = new L.Draggable(div); //the legend can be dragged around the div
        // draggable.enable();
        return div;
      };
      console.log(legend, 'LEGEND')
      legend.addTo(map);

//   var legend_ = L.control({position: 'bottomright'});
// legend_.onAdd = function (map) {
//   let div = L.DomUtil.create("div", "legend");
//         div.innerHTML +=
//         '<img src="http://localhost:8005/geoserver/rasters/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rasters:kiambu_clip1&legend_options=border:true;dx:10;fontSize:11">';
//     return div;
    
//     };
//     // http://localhost:8005/geoserver/rasters/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=rasters:kiambu_clip1&legend_options=border:true;dx:10;fontSize:11;&width=20&height=20&format=image/png/

//     legend_.addTo(map);
//     console.log('legend loaded')

}
// createLegend();



const setSelectedRaster = computed( () => {
  return storeUserSelections.getSelectRaster
})
watch( setSelectedRaster , () => {
  getKwaleRaster()
  
})


//fetch geoserver kiambu and machakos geojsons
const getGeoserverGeojsons = () => {
  if(current_geoserver_geojson.value)map.removeLayer(current_geoserver_geojson.value)
  if(wmsLayer.value)map.removeLayer(wmsLayer.value)
  var regions = storeUserSelections.getSelectedGeoserverRegion

 // console.log(region)
 current_geoserver_geojson.value = L.geoJSON( regions, {
         style: {
           color: "black",
           opacity: 0.8
         },
        //  pane: 'left'
          })
 

          current_geoserver_geojson.value.addTo(map)

           map.fitBounds(current_geoserver_geojson.value.getBounds(), {
                           padding: [50, 50],
                         }); 

}



const setSelectedGeoserverRegion = computed( () => {
  return storeUserSelections.getSelectedGeoserverRegion
})

 watch( setSelectedGeoserverRegion , () => {
  getGeoserverGeojsons()
  
})

//watch state for loading

const setLoadingState= computed( () => {
  return storeUserSelections.getLoadingState
})

 watch( setLoadingState , () => {
  console.log(storeUserSelections.getLoadingState, 'getLoadingState')
  loading.value = storeUserSelections.getLoadingState
  
})


const load_rasters = () => {
//            console.log("loading raster!")
//           //  map.createPane('rasters');
//           //  map.getPane('rasters').style.zIndex = 3000;

//       wmsLayer = L.tileLayer.wms("http://localhost:8005/geoserver/rasters/wms", {
//         // pane: 'right',
//         layers: 'rasters:kiambu_clip1',
//         format: 'image/png',
//         transparent: true,  
//         opacity:1
//         // tiles: true,  
// });
// console.log(wmsLayer, 'wms layer')
// wmsLayer.addTo(map);

// return wmsLayer
// wmsLayer.value.bringToFront();



const wmsURL = "http://78.141.234.158/geoserver/kenyadata/wms";
raster_loader.value = true

        wmsLayer.value = L.tileLayer
          .wms(wmsURL, {
            layers:"kenyadata:suitabilityClassified,geoBoundaries-KEN-ADM0", //layerSelected, //"kenyadata:suitabilityClassified,geoBoundaries-KEN-ADM0",
            format: "image/png",
            transparent: "true",
            opacity: 1,
          })
          .addTo(map);
          raster_loader.value = false
          console.log(raster_loader.value, 'get raster LoadingState')


      }

      const compareLayer = () => {

  
var overlay1 =  L.tileLayer.wms("http://localhost:8005/geoserver/rasters/wms", {
        pane: 'right',
        layers: 'rasters:kwale_tif',
        format: 'image/png',
        transparent: true,  
        opacity:1
        // tiles: true,  
}).addTo(map);


var overlay2 = L.tileLayer.wms("http://localhost:8005/geoserver/rasters/wms", {
        pane: 'right',
        layers: 'rasters:kwale',
        format: 'image/png',
        transparent: true,  
        opacity:1
        // tiles: true,  
}).addTo(map);
// var overlay1 = kiambu
// var overlay2 = current_geojson.value
// console.log(overlay1, 'overlay1')
// console.log(overlay2, 'overlay2')

    L.control.sideBySide(overlay1, overlay2).addTo(map);
   
   

  }
//   const show_legend = ()  =>{

// var layerLegend = L.Geoserver.legend("http://localhost:8005/geoserver/wms", {
// layers: "air_quality_rasters:NO2-2019-NAI_test",
// request: 'GetLegendGraphic',
//  version: 1.0,
//      //pane: 'rasters',
// transparent: true,  
//    format: 'image/png',
//    width: 20,
//    height: 20,
// style: `Raster_Legend`,

// });

// layerLegend.addTo(this.map);

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

#country2_selection{
  position: absolute;
  top: 3.5vh;
  left: 52vw;
  width: 7vw;
  height: 3vh;
  border-radius: 15px;
  border: 2px rgb(4, 87, 134) solid ;
}
#country3_selection{
  position: absolute;
  top: 3.5vh;
  left: 42vw;
  width: 7vw;
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

.select_country2{ 
  position: absolute;
  top: 1vh;
  left: 52vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold;
}

.select_country3{ 
  position: absolute;
  top: 1vh;
  left: 42vw;
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
  top: 3.5vh;
  left: 30vw;
  width: 7vw;
  height: 3vh;
  border-radius: 15px;
  z-index: 3000;

}

.fetch{
  position: absolute;
  top: 10.5vh;
  left: 40vw;
  width: 7vw;
  height: 3vh;
  border-radius: 15px;

}

.fetch1{
  position: absolute;
  top: 10.5vh;
  left: 47vw;
  width: 7vw;
  height: 3vh;
  border-radius: 15px;

}

.compare{
  position: absolute;
  top: 12.5vh;
  left: 60vw;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  z-index: 3000;
  background-color: #fff;
  cursor: pointer;

}



.chart_title{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bold; 
  color: #fff;
}

/* 
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
    border: 4px solid rgb(175, 23, 23);
    border-radius: 50%;
    background-size: contain;
    cursor: pointer;
} */
.charts{
  position:absolute;
  top: 45vh;
  left: 42vw;
  z-index: 1000;
  background-color: black;
  width: 500px;
  height: 300px;
  
}

.charts_sidebar{
  position:absolute;
  top: 20vh;
  /* left: 2vw; */
  z-index: 1000;
  background-color: #ddd;
  width: 500px;
  height: 240px;
  padding: 20px;
  
}
.charts2_sidebar{
  position:absolute;
  top: 50vh;
  /* left: 2vw; */
  z-index: 1000;
  background-color: #ddd;
  width: 500px;
  height: 240px;
  padding: 20px;
  
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
  top: 37vh;
  left: 27vw;
  z-index: 1500;
  /* background-color: black; */
  width: 500px;
  height: 150px;
  

}

/* side nav */
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 3000;
  top: 90px;
  right: 0;
  caret-color: transparent;
  background-color:transparent;
}
#mySidenav {
  transition: width 0.3s;
}
.sidenav_body {
  height: 90%;

  margin-left: 20px;
  overflow-y: scroll;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: steelblue white;
}
.sidenav_body::-webkit-scrollbar {
  width: 5px;
}
.sidenav_body::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}

.sidenav_body::-webkit-scrollbar-thumb {
  background-color: steelblue; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid rgb(224, 213, 193); /* creates padding around scroll thumb */
}
.protrusion {
  top: 110px;
  position: absolute;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
}
#close {
  margin-top: 9px;
  margin-left: 8px;
}
#open {
  margin-top: 9px;
  margin-left: 8px;
  transform: rotate(180deg);
}
@media screen and (max-height: 800px) {
  .logos_container {
    margin-bottom: 25px;
    margin-top: 10px;
  }
}
@media screen and (min-height: 901px) {
  .logos_container {
    position: absolute;
    bottom: 0;
    margin-left: 25%;
  }
}
#mapContainer >>> .base_layer_list {
  list-style: none;
  font-size: 15px;
  padding: 5px;
}
.side_nav_swap {
  color: #1481c3;
  border-bottom: solid 3px #1481c3;
  padding-bottom: 6px;
  font-weight: bolder;
  font-size: 18px;
}


table, th, td {
  border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
    margin-top: 20px;
}


th{
  font-weight: bolder;
}

tr:nth-child(even) {
  background-color: #ddd;
}
table {
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
}

#select2{
    display: none;
}




</style>
