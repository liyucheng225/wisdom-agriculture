<template>
    <div class="data">
        <a-date-picker :size="size" v-model="time"/>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name:"ChooseData",
        data() {
            return {
                reverse: true,
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
                        this.$message.error({
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
                        if(response.data.code=="B001"){
                            this.$message.error(this.sendData+"的数据为空")
                        }else {
                            this.file = response.data;
                            // console.log(this.file);
                            this.$store.commit("changeJson", this.file);
                            console.log('输出state.file3')
                            console.log(this.file)
                            console.log(this.$store.state.waterFile)
                        }
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                } else if(this.$store.state.index == 5) {
                    axios.get('http://192.168.100.116:8080/weather_station/day_msgs?times='+this.sendData).then((response) => {
                        console.log(response);//请求正确时执行代码
                        if(response.data.code=="B001"){
                            this.$message.error(this.sendData+"的数据为空")
                        }else {
                            this.file = response.data;
                            this.$store.commit("changeJson", this.file);
                            console.log('输出state.file5')
                            console.log(this.$store.state.weatherFile)
                        }
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                } else if(this.$store.state.index == 7) {
                    axios.get('http://192.168.100.116:8080/temp_hum/day_msgs?times='+this.sendData).then((response) => {
                        console.log(response);//请求正确时执行代码
                        if(response.data.code=="B001"){
                            this.$message.error(this.sendData+"的数据为空")
                        }else {
                            this.file = response.data;
                            this.$store.commit("changeJson", this.file);
                            console.log('输出state.file7')
                            console.log(this.$store.state.Temperature)
                        }
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                } else if(this.$store.state.index == 8) {
                    axios.get('http://192.168.100.116:8080/illu/day_msgs?times='+this.sendData).then((response) => {
                        console.log(response);//请求正确时执行代码
                        if(response.data.code=="B001"){
                            this.$message.error(this.sendData+"的数据为空")
                        }else {
                            this.file = response.data;
                            this.$store.commit("changeJson", this.file);
                            console.log('输出state.file8')
                            console.log(this.$store.state.LightSensor)
                        }
                    }).catch(function (response) {
                        console.log(response);//发生错误时报错
                    })
                }
            },
        },
    };
</script>
