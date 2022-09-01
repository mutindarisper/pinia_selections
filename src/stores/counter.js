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
    current_point_geojson:{},
      //chart
      testData:{
        // labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        // datasets: [
        //   {
        //     data: [30, 40, 60, 70, 5],
        //     backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        //   },
        // ],
        color_info_fromServer:{},
          names_candidates:[],
          chartDataFromServer:[],
          chatData_restructure: {
             labels:[],
             datasets:[]

          },

          options: {
          
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
      }





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



      const getCountyStats =  async () =>  {
        
        var data = this.selected_region
        var cause = this.selected_cause

        if ( data && cause) {

          const outPut = await axios.get(baseurl+'/HotSpots/get_statics/?county='+data+'&cause='+cause)
     
             .then((response) => {
                  const responseData = response.data.statistics

                 this.testData.chartDataFromServer = responseData 
                 // console.log(responseData , 'causes statistics')   
                 
                  var stats_data = {'labels':[], 'values':[]}

                   responseData.map( item => {
                      const key =  Object.keys( item)
                      stats_data[key] = item[key]

                      
              //  console.log(item[key] , 'value')
              // only add data that is greater than 0 to the data structure.
                    if (item[key]> 0){
                       stats_data['labels'].push(key[0])
                          
                          stats_data['values'].push(item[key])
                    }

                    })

                    console.log(stats_data, 'labels and data')
                     var Labels = stats_data.labels
                     
                     var Data = stats_data.values
                
                  setTimeout(() => {


                 // test for chart dynamically
                 var chartDataNew = this.testData.chartDataFromServer

                 var mychart_data = []   //no. of blackspots per road

                 // generate names for road labels 
                 var names_labels = []

                 // const places_names = Object.keys(chartDataNew[0]).slice(1)
                 
                 // chartDataNew.map((name =>{

                 //    var majina = Object.values(name).slice(0,1)
                    
                    
                 //    names_labels.push(majina[0])

                  
                    

                 // }))

                 var Doughnut_data = {}

                 var colors_a = ['#ffbb33', '#99cc00', '#ffc7c8', '#33b5e5',  '#ABCDC6', '#ffc7c8', '#9a5fb8', '#32a6b5',  '#ABEBC6']


                 chartDataNew.map((item =>{

                    var data_values = Data //Object.values(item).slice(1)
                          
                    
                 }))

                 this.testData.chatData_restructure.labels = Labels 
                 this.testData.chatData_restructure.datasets= Data

                
                 var datasetStructure =  [{
                       data: Data,
                          label: Labels,
                          backgroundColor:colors_a,
                          fill:true
                    }]
                  
                    this.testData.chatData_restructure.labels = Labels

                 console.log(this.testData.chatData_restructure.labels, 'labels only')
                 this.testData.chatData_restructure.datasets= datasetStructure
                  console.log(this.testData.chatData_restructure.datasets, 'data only')

                //  this.renderChart(testData.chatData_restructure, testData.options)
                 console.log( this.testData.chatData_restructure, 'DATA TYPE OF CHART' )
         
                     }, 1000)

             })
            .catch( (error) => {
         console.log('an error occured ' + error);
     })

     return  outPut

        }
      
 }
 getCountyStats()



    }
  },

  getters: {
    getSelectedRegion:(state) => state.current_geojson, 
    getSelectedPoints:(state) => state.current_point_geojson,
    getSelectedCountyName:(state) => state.selected_region, 
    getSelectedCause:(state) => state.selected_cause, 
    getChartData:(state)=>state.testData.chatData_restructure,
    getChartOptions:(state)=>state.testData.options
  
    
  },
})
