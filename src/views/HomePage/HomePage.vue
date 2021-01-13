<template>
    <div class="dataPage">
      <div class="first">
          <div style="text-align: center">
          <span style="font-size: 30px;">{{title[0]}}</span>
          </div>
          <ul style="padding: 50px 0 0 120px;font-size: 20px ">
              <li style="list-style: none; margin-bottom: 10px" v-for="item in file.waterQuality">{{item.title}}:{{item.data}}</li>
          </ul>
      </div>

      <div class="second">
          <div style="text-align: center">
              <span style="font-size: 30px;">{{title[1]}}</span>
          </div>
          <ul style="padding: 50px 0 0 120px;font-size: 20px ">
              <li style="list-style: none; margin-bottom: 20px" v-for="item in file.weatherStations">{{item.title}}:{{item.data}}</li>
          </ul>
      </div>

       <div class="third">
           <div style="text-align: center">
               <span style="font-size: 30px;">{{title[2]}}</span>
           </div>
           <div class="wrapper">
               <ul style="padding: 50px 0 0 60px;font-size: 20px ">
                   <li style="list-style: none; margin-bottom: 20px" v-for="item in file.weatherStations">{{item.title}}:{{item.data}}</li>
               </ul>
               <ul style="padding: 50px 0 0 60px;font-size: 20px ">
                   <li style="list-style: none; margin-bottom: 20px" v-for="item in file.weatherStations">{{item.title}}:{{item.data}}</li>
               </ul>
           </div>
       </div>
    </div>
</template>
<script>
    // import buttonSwitch from "@/components/button/button";
    import axios from "axios";
    export default {
        name:"HomePage",
        components: {
            // buttonSwitch,
        },
        data() {
            return {
                title:["生产单元一","生产单元二","生产单元三"],
                lowTitle:[
                    "水质终端","气象站"
                ],
                file:{
                    waterQuality:[
                        {
                            title:"时间",
                            data:""
                        },
                        {
                            title:"电池电压",
                            data:""
                        },
                        {
                            title:"DO",
                            data:""
                        },
                        {
                            title:"orp",
                            data:""
                        },
                        {
                            title:"PH",
                            data:""
                        },
                        {
                            title:"电导率",
                            data:""
                        },
                        {
                            title:"固体溶解物",
                            data:""
                        },
                        {
                            title:"盐度",
                            data:""
                        },
                        {
                            title:"溶解氧电压",
                            data:""
                        },
                        {
                            title:"溶解氧饱和度",
                            data:""
                        },
                        {
                            title:"温度",
                            data:""
                        },
                    ],//水质终端
                    weatherStations:[
                        {
                            title:'时间',
                            data:""
                        },
                        {
                            title:'湿度',
                            data:""
                        },
                        {
                            title:'光照',
                            data:""
                        },
                        {
                            title:'24小时降雨量',
                            data:""
                        },
                        {
                            title:'温度',
                            data:""
                        },
                        {
                            title:'风速',
                            data:""
                        },
                        {
                            title:'风向',
                            data:""
                        },
                    ]//气象站
                }
            };
        },
        mounted() {
            console.log('mounted')
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            this.getJson()
        },
        methods:{
            getJson(){
                axios.get('http://192.168.100.116:8080/weather_station/msgs?num='+"1").then((response) => {
                    console.log(response);//请求正确时执行代码
                    console.log(this.file.weatherStations)
                    this.getWeatherStations(response.data)
                }).catch(function (response) {
                    console.log(response);//发生错误时报错
                })
                axios.get('http://192.168.100.116:8080/water_quality/msgs?num='+"1").then((response) => {
                    console.log(response);//请求正确时执行代码
                    this.getWaterQuality(response.data)
                    console.log(this.file.waterQuality)
                }).catch(function (response) {
                    console.log(response);//发生错误时报错
                })
            },
            getWaterQuality (response){
                this.file.waterQuality[0].data = response.data[0].minutesandseconds;
                this.file.waterQuality[1].data = response.data[0].bat_volt
                this.file.waterQuality[2].data= response.data[0].ec_do;
                this.file.waterQuality[3].data = response.data[0].ec_orp;
                this.file.waterQuality[4].data = response.data[0].ec_ph;
                this.file.waterQuality[5].data = response.data[0].ec_us;
                this.file.waterQuality[6].data = response.data[0].tds;
                this.file.waterQuality[7].data = response.data[0].salt;
                this.file.waterQuality[8].data = response.data[0].tdov;
                this.file.waterQuality[9].data = response.data[0].tdos;
                this.file.waterQuality[10].data = response.data[0].temp;
            },
            getWeatherStations(response){
                this.file.weatherStations[0].data = response.data[0].minutesandseconds;
                this.file.weatherStations[1].data = response.data[0].temp
                this.file.weatherStations[2].data= response.data[0].illu;
                this.file.weatherStations[4].data = response.data[0].humi;
                this.file.weatherStations[3].data = response.data[0]. rain_24hr;
                this.file.weatherStations[5].data = response.data[0].wind_Drct;
                this.file.weatherStations[6].data = response.data[0].wind_spd;
            }
        }
    };
</script>

<style>
    .dataPage{
        display: flex;
        justify-content: space-around;
        background-color: #ffffff;
        margin-top: 50px;
        height: 580px;
        width: 100%;
    }
    .dataPage .first{
        width: 30%;
        height: 600px;
        background-color: #409EFF;
        /*text-align: center*/
    }
    .dataPage .second{
        width: 30%;
        height: 600px;
        background-color: #999999;
    }
    .dataPage .third{
        width: 40%;
        height: 600px;
        background-color: green;
    }
    .dataPage .third .wrapper{
        display: flex;
        justify-content: space-around;
    }
</style>
