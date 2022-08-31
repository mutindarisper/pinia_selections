import { defineStore } from 'pinia'
import axios from 'axios'


var baseurl = 'http://45.63.48.25:8080'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    placeholder: 'select region',
    countries: [],
    selected_region: '',
    current_geojson:{},
    cause_placeholder: 'select cause',
    causes:[],
    selected_cause:'',
    current_point_geojson:{}

  }),
 
  actions: {
    increment() {
      this.counter++
    },

    fetchCountriesList() {
      this.countries = ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri']

    },
    showSelectedCountry($event){
      var selected_country = $event.target.value
      console.log(selected_country, 'selected country')
      // this.countries =  selected_country
      this.selected_region =  selected_country
      console.log(this.selected_region , 'changed selected country')
      // return selected_country
      var data = this.selected_region
      
     
      console.log(data, 'data')


//using async await

      if(data) {
        const sendGetRequest = async () => {
          try {
              const resp = await  axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county='+data
              );

              this.current_geojson = resp.data
              console.log(resp.data, 'await response data');
              return resp.data
          } catch (err) {
              // Handle Error Here
              console.error('an error occured'+err);
          }
      };

      sendGetRequest();

      }

    },

    fetchCausesList() {
      var data = this.selected_region
      
      const getCausesList = async () => {
        try {
            const resp = await  axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?list_causes_per_county='+data
            );

            this.causes = resp.data.Causes
            console.log(resp.data.Causes, 'causes response data');
            return resp.data.Causes
        } catch (err) {
            // Handle Error Here
            console.error('an error occured'+err);
        }
    };

    getCausesList();

    },

    showSelectedCause($event) {
      var selected_causes = $event.target.value
      console.log(selected_causes, 'selected cause')

      this.selected_cause = selected_causes 
      console.log(this.selected_cause , 'changed selected cause')

      var data = this.selected_region
      var cause = this.selected_cause


      const getPointsCause = async () => {

        try {
          const response = await axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_cause='+cause+'&county='+data
          );
          this.current_point_geojson = response.data
          console.log(response.data, 'point data')
          return response.data
          
        } catch (error) {
          console.error('an error occured'+error);
          
        }
      }
      getPointsCause();


    }
  },

  getters: {
    getSelectedRegion:(state) => state.current_geojson, 
    getSelectedPoints:(state) => state.current_point_geojson,
    getSelectedCountyName:(state) => state.selected_region, 
    getSelectedCause:(state) => state.selected_cause, 
  
    
  },
})
