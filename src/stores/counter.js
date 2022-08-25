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
    causes:[]
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

//       if (data){
//         axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county='+data
//         )
//       .then((response) => {
//         this.current_geojson = response.data
//              console.log( this.current_geojson ,'blackspot data' );
             

         
           
//                     })
//        .catch( (error) => {
//     console.log('an error occured ' + error);
// })

//       }

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

      // sendGetRequest();

    

     
        
// return response.data
//end of county data


  
  // return response.data
     

   




    },

    fetchCausesList() {
      
      

    },
  },

  getters: {
    loadGeojson: (state) => {
      var data =  state.selected_region
      console.log(data, 'data')
      

      if(data){ 

     
        axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county='+data
        )
      .then((response) => {
             console.log( response.data,'blackspot data' );

         
           
                    })
       .catch( (error) => {
    console.log('an error occured ' + error);
})
//end of county data


  }
  return response.data
    }
    
  },
})
