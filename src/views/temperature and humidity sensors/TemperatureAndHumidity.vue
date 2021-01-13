<template>
        <div id="chartLine" class="line-wrap"></div>
<!--    <h1>aaa</h1>-->
</template>
<script>
    import * as echarts from 'echarts';
    require('echarts/theme/shine');//引入主题
    import axios from "axios";
    export default {
        name:"TemperatureAndHumidity",
        data() {
            return {
                chartLine: null,
                th_ctime:[],
                cTime:[],
                th_temp:[],
                th_hum:[],
            }
        },
        mounted() {
            console.log('mountedTe')
            console.log(this.$store.state.Temperature)
            this.file = this.$store.state.Temperature
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            console.log(this.file)
            if(JSON.stringify(this.$store.state.Temperature)!='{}'){
                this.splintData()
                this.$nextTick(() => {
                    this.drawLineChart();
                })
            }
            else{
               this.getJson()
            }
        },
        watch: {
            '$store.state.Temperature':function(val,oldVal) {
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
                axios.get('http://192.168.100.116:8080/temp_hum/msgs?').then((response) => {
                    console.log("aaaaa")
                    console.log(response);//请求正确时执行代码
                    this.file = response.data;
                    // console.log(this.file);
                    this.$store.commit("changeJson",this.file);
                    console.log('输出state.file7')
                    console.log(this.$store.state.Temperature)
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
                    this.th_hum[i]=this.file.data[i].th_hum
                    this.th_ctime[i]=this.file.data[i].th_ctime
                    this.cTime[i]=this.file.data[i].minutesandseconds
                    this.th_temp[i]=this.file.data[i].th_temp
                }
                console.log('拆分数据成功')
                console.log(this.th_temp)
                console.log(this.th_hum)
                console.log(this.th_ctime)
                console.log(this.cTime)
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
                        trigger: 'axis'
                    },
                    legend: {
                        data:['温度','湿度']
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
                            // data:[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,]
                            // data:["1:22","2:22","3:22","1:22","1:22","1:22","1:22","5:22","1:22","1:22","7:22","6:22","1:22","2:22","3:22","1:22","1:22","1:22","1:22","5:22","1:22","1:22","7:22","6:22","1:22","5:22","1:22","1:22","7:22","6:22"]
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
                            data:this.th_temp,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'湿度',
                            type:'line',
                            stack: '总量',
                            data:this.th_hum,
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
    width:100%;
    height:100%;
  }
</style>