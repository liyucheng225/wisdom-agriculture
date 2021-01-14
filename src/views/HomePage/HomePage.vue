<template>
    <div class="dataPage">
      <div class="first">
          <div style="text-align: center">
              <span style="font-size: 25px;">{{title[0]}}</span>
          </div>
          <ul style="padding: 10px 0 0 50px;font-size: 20px ">
              <li style="font-size: 20px;list-style: none;">{{lowTitle[0]}}:</li>
              <br>
              <li style="list-style: none; margin-bottom: 10px;" v-for="item in file.waterQuality">
                  {{item.title}}
                  <span class="data">{{item.data}}{{item.unit}}</span>
              </li>
          </ul>
      </div>

      <div class="second">
          <div style="text-align: center">
              <span style="font-size: 30px;">{{title[1]}}</span>
          </div>
          <ul style="padding: 10px 0 0 50px;font-size: 20px">
              <li style="font-size: 20px;list-style: none;">{{lowTitle[1]}}:</li>
              <br>
              <li style="list-style: none; margin-bottom: 20px;" v-for="item in file.weatherStations">
                  {{item.title}}
                  <span class="data">{{item.data}}{{item.unit}}</span>
              </li>
          </ul>
      </div>

       <div class="third">
           <div style="text-align: center">
               <span style="font-size: 30px;">{{title[2]}}</span>
           </div>
           <div class="wrapper">
               <ul style="padding: 10px 0 0 50px;font-size: 20px ">
                   <li style="font-size: 20px;list-style: none;">{{lowTitle[2]}}:</li>
                   <br>
                   <li style="list-style: none; margin-bottom: 20px;" v-for="item in file.Temperature">{{item.title}}
                       <span class="data">{{item.data}}{{item.unit}}</span>
                   </li>
               </ul>
               <ul style="padding: 10px 0 0 50px;font-size: 20px ">
                   <li style="font-size: 20px;list-style: none;">{{lowTitle[3]}}:</li>
                   <br>
                   <li style="list-style: none; margin-bottom: 20px;" v-for="item in file.Light">{{item.title}}
                       <span class="data">{{item.data}}{{item.unit}}</span>
                   </li>
               </ul>
           </div>
       </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        name:"HomePage",
        data() {
            return {
                i:1,
                title:["生产单元一","生产单元二","生产单元三"],
                lowTitle:[
                    "水质终端","气象站","温湿度传感器","光照传感器",
                ],
                file:{
                    waterQuality:[
                        {
                            title:"时间",
                            data:"",
                            unit:""
                        },
                        {
                            title:"电池电压",
                            data:"",
                            unit:"V"
                        },
                        {
                            title:"DO",
                            data:"",
                            unit:"1μmol/L"
                        },
                        {
                            title:"orp",
                            data:"",
                            unit:"mv"
                        },
                        {
                            title:"PH",
                            data:"",
                            unit:""
                        },
                        {
                            title:"电导率",
                            data:"",
                            unit:"S/m"
                        },
                        {
                            title:"固体溶解物",
                            data:"",
                            unit:"g"
                        },
                        {
                            title:"盐度",
                            data:"",
                            unit:"%"
                        },
                        {
                            title:"溶解氧电压",
                            data:"",
                            unit:"v"
                        },
                        {
                            title:"溶解氧饱和度",
                            data:"",
                            unit:"%"
                        },
                        {
                            title:"温度",
                            data:"",
                            unit:"°C"
                        },
                    ],//水质终端
                    weatherStations:[
                        {
                            title:'时间',
                            data:"",
                            unit:""
                        },
                        {
                            title:'湿度',
                            data:"",
                            unit:"%rh"
                        },
                        {
                            title:'光照',
                            data:"",
                            unit:"lx"
                        },
                        {
                            title:'24小时降雨量',
                            data:"",
                            unit:"mm"
                        },
                        {
                            title:'温度',
                            data:"",
                            unit:"°C"
                        },
                        {
                            title:'风速',
                            data:"",
                            unit:"m/s "
                        },
                        {
                            title:'风向',
                            data:"",
                            unit:""
                        },
                    ],//气象站
                    Temperature:[
                        {
                            title:'时间',
                            data:"",
                            unit:""
                        },
                        {
                            title:'温度',
                            data:"",
                            unit:"°C"
                        },
                        {
                            title:'湿度',
                            data:"",
                            unit:"%rh"
                        },
                    ],//实验室温湿度传感器
                    Light:[
                        {
                            title:'时间',
                            data:"",
                            unit:""
                        },
                        {
                            title:'光照',
                            data:"",
                            unit:"lx"
                        },
                    ],//光照传感器
                }
            };
        },
        mounted() {
            console.log('mounted')
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            this.timer = setInterval(this.getJson,60000)
            this.getJson()
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods:{
            getJson(){
                this.i=this.i+1
                console.log('i=%d',this.i)
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
                axios.get('http://192.168.100.116:8080/illu/msgs?num='+"1").then((response) => {
                    console.log(response);//请求正确时执行代码
                    this.getLight(response.data)
                    console.log(this.file.Light)
                }).catch(function (response) {
                    console.log(response);//发生错误时报错
                })
                axios.get('http://192.168.100.116:8080/temp_hum/msgs?num='+"1").then((response) => {
                    console.log(response);//请求正确时执行代码
                    this.getTemperature(response.data)
                    console.log(this.file.Temperature)
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
            },
            getLight(response){
                this.file.Light[0].data = response.data[0].minutesandseconds
                this.file.Light[1].data = response.data[0].illu
            },
            getTemperature(response){
                this.file.Temperature[0].data=response.data[0].minutesandseconds
                this.file.Temperature[1].data=response.data[0].th_temp
                this.file.Temperature[2].data=response.data[0].th_hum
            }
        }
    };
</script>

<style>
    .dataPage{
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
        height: 0px;
        width: 95%;
        padding-left: 50px;
        margin-bottom: 50px;
    }
    .dataPage .first{
        background-color: #fff;
        border: black 1px solid;
        width: 34%;
        height: 600px;
        margin-right: 30px;
    }
    .dataPage .second{
        border: black 1px solid;
        width: 33%;
        height: 600px;
        margin-right: 30px;
    }
    .dataPage .third{
        border: black 1px solid;
        width: 33%;
        height: 600px;
    }
    .data{
        float: right;
        margin-right: 50px;
    }
</style>
