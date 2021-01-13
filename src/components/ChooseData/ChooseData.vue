<template>
    <div class="data">
        <span style="font-size:17px;color: black;padding-right: 10px">时间:</span>
        <a-date-picker :size="size" v-model="time"/>
        {{time}}
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name:"ChooseData",
        data() {
            return {
                size: 'default',
                time: "",
                sendData:"",
                show:"",
                file:{}
            };
        },
        watch:{
            time:function (val,oldVal){
                console.log('data改变')
                if(this.time!=null) {
                    // console.log('this.time.data:%s',this.time.toString())
                    this.sendData = String(this.time)
                    if(this.confirmData(this.time) == false){
                        this.getJson()
                    }else {
                        this.$message({
                            message: "时间不能大于当前实际时间！",
                        });
                    }
                }
            }
        },
        methods:{
            confirmData(time){
                    let date=new Date();
                    return time>date?true:false;
            },
            getJson(){
                console.log('JSONAAAAAAA')
                // axios的基本用法，只发送一个请求
                if(this.$store.state.index == 3 ){
                    axios.get('http://192.168.100.116:8080/water_quality/day_msgs?times='+this.sendData).then((response) => {
                        console.log(response);//请求正确时执行代码
                        this.file = response.data;
                        // console.log(this.file);
                        this.$store.commit("changeJson",this.file);
                        console.log('输出state.file3')
                        console.log(this.file)
                        console.log(this.$store.state.waterFile)
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                }
                else if(this.$store.state.index == 5) {
                    axios.get('http://192.168.100.116:8080/weather_station/day_msgs?times='+this.sendData).then((response) => {
                        console.log(response);//请求正确时执行代码
                        this.file = response.data;
                        // console.log(this.file);
                        this.$store.commit("changeJson",this.file);
                        console.log('输出state.file5')
                        console.log(this.$store.state.weatherFile)
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                }
            },
            // getJson(){
            //     axios.get(`http://192.168.100.116:8080/test/testRequest`, this.time).then(res => {
            //         console.log('res=>', res);
            //         this.show = res.data
            //         console.log(this.show)
            //         this.time.data=""
            //     })
            // }
        },
    };
</script>
