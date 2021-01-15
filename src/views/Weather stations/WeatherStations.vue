<template>
        <div id="chartLine" class="line-wrap"></div>
<!--    <h1>aaa</h1>-->
</template>
<script>
    import * as echarts from 'echarts';
    require('echarts/theme/shine');//引入主题
    import ChooseData from "@/components/ChooseData/ChooseData";
    import axios from "axios";
    export default {
        components:{
          ChooseData,
        },
        data() {
            return {
                num:100,
                i:1,
                chartLine: null,
                cTime:[],
                temp:[],
                humi:[],
                illu:[],
                windSpd:[],
                windDrct: [],
                rain: [],
                newTime:[]
            }
        },
        mounted() {
            console.log('mounted')
            console.log(this.$store.state.weatherFile)
            this.file = this.$store.state.weatherFile
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            console.log(this.file)
            this.timer = setInterval(this.getJson,60000)
            if(JSON.stringify(this.$store.state.weatherFile)!='{}'){
                this.splintData()
                this.$nextTick(() => {
                    this.drawLineChart();
                })
            }
            else{
               this.getJson()
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        watch: {
            '$store.state.weatherFile':function(val,oldVal) {
                console.log('vuex变化')
                this.file = val
                console.log(this.file)
                this.splintData();
                this.$nextTick(() => {
                    this.drawLineChart();
                })
            },
            deep:true
        },
        methods: {
            getJson(){
                this.i=this.i+1
                console.log('i=%d',this.i)
                axios.get('/weather_station/msgs?num='+this.num).then((response) => {
                    console.log(response);//请求正确时执行代码
                    this.file = response.data;
                    // console.log(this.file);
                    this.$store.commit("changeJson",this.file);
                    console.log('输出state.file5')
                    console.log(this.$store.state.weatherFile)
                    this.splintData()
                    this.$nextTick(() => {
                        this.drawLineChart();
                    })
                }).catch(function (response) {
                    console.log(response);//发生错误时报错
                })
            },
            splintData(){
                console.log('正在拆分数据')
                console.log(this.file)
                for (let i=0;i<this.file.data.length;i++){
                    console.log('chai')
                    this.newTime[i]=this.file.data[i].we_ctime
                    this.cTime[i]=this.file.data[i].minutesandseconds
                    this.temp[i]=this.file.data[i].temp
                    this.humi[i]=this.file.data[i].humi
                    this.illu[i]=this.file.data[i].illu
                    this.windSpd[i]=this.file.data[i].wind_spd
                    this.windDrct[i]=this.file.data[i].wind_Drct
                    this.rain[i] =this.file.data[i].rain_24hr
                }
                console.log('拆分数据成功')
                console.log(this.newTime)
                console.log('ctime',this.cTime)
                console.log('temp',this.temp)
                console.log('humi',this.humi)
                console.log('illu',this.illu)
                console.log(this.windDrct)
                console.log(this.windSpd)
                console.log(this.rain)
            },
            drawLineChart() {
                if (this.chartLine != null && this.chartLine != "" && this.chartLine != undefined) {
                    console.log('准备销毁')
                    this.chartLine.dispose();//销毁
                    console.log('销毁成功')
                };
                console.log('准备画图')
                this.chartLine = echarts.init(this.$el,'shine');// 基于准备好的dom，初始化echarts实例
                let option = {
                    tooltip : {
                        backgroundColor:'rgba(255,255,255,0.7)',
                        textStyle:{
                            color:'red'
                        },
                        trigger: 'axis',
                    },
                    legend: {
                        data:['温度','湿度','光照','温度','风向','风速','24小时降雨量']
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                //  如果这个字段不设置，echarts会根据屏宽及横坐标数据自动给出间隔
                                interval: 20,
                                // 间隔长度，可自定义（如果是时间格式，echarts会自动处理）
                                rotate: 40 // 横坐标上label的倾斜度
                            },
                            data :this.cTime
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                show: false
                            },
                            name: '（数值）'

                        }
                    ],
                    series : [
                        {
                            name:'温度',
                            type:'line',
                            stack: '总量',
                            data:this.temp,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'湿度',
                            type:'line',
                            stack: '总量',
                            data:this.humi,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'光照',
                            type:'line',
                            stack: '总量',
                            data:this.illu,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'风向',
                            type:'line',
                            stack: '总量',
                            data:this.windSpd,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'风速',
                            type:'line',
                            stack: '总量',
                            data:this.windDrct,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'24小时降雨量',
                            type:'line',
                            stack: '总量',
                            data:this.rain,
                            showSymbol: false,
                            smooth:true
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表
                this.chartLine.setOption(option);
                console.log('画图成功')
            }
        }
    }
</script>

<style lang='less' scope>
  .line-wrap{
    padding-top: 100px;
    width:1300px;
    height:620px;
  }
</style>