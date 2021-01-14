<template>
    <div id="chartLine" class="line-wrap">
    </div>
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
                i:1,
                num:10,
                chartLine: null,
                cTime:[],
                salt:[],
                batVolt:[],
                ecDo:[],
                ecPh:[],
                temp: [],
                eCorp: [],
                ecus: [],
                tds: [],
                tDov:[] ,
                tDos: [],
                newTime:[],
            }
        },
        mounted() {
            console.log('mounted')
            console.log(this.$store.state.waterFile)
            this.file = this.$store.state.waterFile
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            console.log(this.file)
            if(JSON.stringify(this.$store.state.waterFile)!='{}'){
                this.splintData()
                this.$nextTick(() => {
                    this.drawLineChart();
                })
            }
            else{
                this.getJson()
            }
            this.timer = setInterval(this.getJson,60000)

        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        watch: {
            deep:true,
            '$store.state.waterFile':function(val,oldVal) {
                console.log('vuex变化')
                this.file =val
                console.log(this.file)
                this.splintData();
                this.$nextTick(() => {
                    this.drawLineChart();
                })
            },
            cTime:function (val,oldVal) {
                let index
                for(let i=0;i<val.length;i++){
                    if(val[i]!=""&&val[i]!=undefined){
                        index=i
                    }
                }
            },
        },
        methods: {
            getJson(){
                this.i=this.i+1
                console.log('i=%d',this.i)
                axios.get('/water_quality/msgs?num='+this.num).then((response) => {
                    console.log(response);//请求正确时执行代码
                    this.file = response.data;
                    // console.log(this.file);
                    this.$store.commit("changeJson",this.file);
                    console.log('输出state.file3')
                    console.log(this.$store.state.waterFile)
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
                let dataLength=this.file.data.length
                for (let i=0;i<dataLength;i++){
                    console.log('chai')
                    console.log(i)
                    this.newTime[i]=this.file.data[i].wq_ctime
                    this.cTime[i]=this.file.data[i].minutesandseconds
                    this.batVolt[i]=this.file.data[i].bat_volt
                    this.ecDo[i]=this.file.data[i].ec_do
                    this.ecPh[i]=this.file.data[i].ec_ph
                    this.temp[i]=this.file.data[i].temp
                    this.eCorp[i]=this.file.data[i].ec_orp
                    this.ecus[i]=this.file.data[i].ec_us
                    this.tds[i]=this.file.data[i].tds
                    this.salt[i] =this.file.data[i].salt
                    this.tDov[i] =this.file.data[i].tdov
                    this.tDos[i]=this.file.data[i].tdos
                }
                console.log('拆分数据成功')
                console.log(this.newTime)
                console.log(this.cTime)
                console.log(this.batVolt)
                console.log(this.ecDo)
                console.log(this.ecPh)
                console.log(this.temp)
                console.log(this.eCorp)
                console.log(this.ecus)
                console.log(this.tds)
                console.log(this.salt)
                console.log(this.tDov)
                console.log(this.tDos)

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
                        trigger: 'axis',
                        backgroundColor:'rgba(255,255,255,0.7)',
                        textStyle:{
                            color:'red'
                        },
                    },
                    legend: {
                        data:['电池电压','DO','PH','温度','orp','电导率','固体溶解物','盐度','溶解氧电压','溶解氧饱和度']
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
                                interval: 2,
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
                            name:'电池电压',
                            type:'line',
                            stack: '总量',
                            data:this.batVolt,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'DO',
                            type:'line',
                            stack: '总量',
                            data:this.ecDo,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'PH',
                            type:'line',
                            stack: '总量',
                            data:this.ecPh,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'温度',
                            type:'line',
                            stack: '总量',
                            data:this.temp,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'orp',
                            type:'line',
                            stack: '总量',
                            data:this.eCorp,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'电导率',
                            type:'line',
                            stack: '总量',
                            data:this.ecus,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'固体溶解物',
                            type:'line',
                            stack: '总量',
                            data:this.tds,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'盐度',
                            type:'line',
                            stack: '总量',
                            data:this.salt,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'溶解氧电压',
                            type:'line',
                            stack: '总量',
                            data:this.tDov,
                            showSymbol: false,
                            smooth:true
                        },
                        {
                            name:'溶解氧饱和度',
                            type:'line',
                            stack: '总量',
                            data:this.tDos,
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