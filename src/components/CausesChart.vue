<template>
    <DoughnutChart :chartData="testData.chatData_restructure" 
    :options=testData.options
     :height=250 :width="350"
    />

    
  </template>
  
  <script >
  import { defineComponent, ref, computed, watch } from 'vue';
  import { DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";

  import { useCounterStore } from '@/stores/counter';
  import axios from 'axios';

  var baseurl = 'http://45.63.48.25:8080'
  
//   Chart.register(...registerables);
  
  export default defineComponent({
    name: 'Home',
    components: { DoughnutChart },
    props: {
      label: {
         type: String
      },
      chartData:{
         type: Array
      },
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

        const storeUserSelections = useCounterStore()
        const data = ref([30, 40, 60, 70, 5]);

        // const labels = ref([]);
        // const datasets = ref([]);

    //     var county= storeUserSelections.getSelectedCountyName
    //   console.log(county, 'STATS COUNTY')

      const testData = {
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

      





    //   const chartData = computed(() => ({
    //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    //   datasets: [
    //     {
    //       data: data.value,
    //       backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    //     },
    //   ],
    // }));
     


    const setSelectedCountyName = computed( () => {
        // console.log(storeUserSelections.getSelectedCountyName, 'county name')
  return storeUserSelections.getSelectedCountyName

})

const setSelectedCause = computed( () => {
        // console.log(storeUserSelections.getSelectedCause, 'cause')
  return storeUserSelections.getSelectedCause

})




watch( setSelectedCountyName , () => {
    getCountyStats()
  
})

watch( setSelectedCause , () => {
    getCountyStats()
  
})

// watch(chartData, () => {
//     chartData()
  
// })



      const getCountyStats = () =>  {
        
        // const storeUserSelections = useCounterStore()
     
     var county= storeUserSelections.getSelectedCountyName
      console.log(county, 'STATS COUNTY')

      var cause = storeUserSelections.getSelectedCause
        console.log(cause, 'STATS CAUSE')

        if ( county && cause) {

          const outPut = axios.get(baseurl+'/HotSpots/get_statics/?county='+county+'&cause='+cause)
     
             .then((response) => {
                  const responseData = response.data.statistics

                 testData.chartDataFromServer = responseData 
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
                 var chartDataNew = testData.chartDataFromServer

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
                 
                  


                 //   Doughnut_data[item.candidate] = data_values

                 //    colors_a.push(this.color_info_fromServer[item.candidate]['color'])
                
                    
                 }))

                

                
                 testData.chatData_restructure.labels = Labels 
                 testData.chatData_restructure.datasets= Data

                 // this.names_candidates = names_labels
                 // var Datavalues_out = []

                 
                 // names_labels.map((name=>{

                 //     var sum_per_candidate = Doughnut_data[name].reduce((a, b) => a + b, 0)

                 //     Datavalues_out.push(sum_per_candidate)
                     


                  


                 // }))

              

                 var datasetStructure =  [{
                       data: Data,
                          label: Labels,
                          backgroundColor:colors_a,
                          fill:true
                    }]
                     

              


                    testData.chatData_restructure.labels = Labels

                 console.log(testData.chatData_restructure.labels, 'labels only')
                 testData.chatData_restructure.datasets= datasetStructure
                  console.log(testData.chatData_restructure.datasets, 'data only')

                //  this.renderChart(testData.chatData_restructure, testData.options)
                 console.log( testData.chatData_restructure, 'DATA TYPE OF CHART' )
         
                     }, 1000)



             

         
             })
            .catch( (error) => {
         console.log('an error occured ' + error);
     })

 
 
     return  outPut

        }
      
   

         
 }

//  getCountyStats()

// console.log(   testData.chatData_restructure  , 'test data object')

return { testData };

}
})



 

  
    //   return { testData };
  
  </script>