<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" >
        <a-layout-sider v-model="collapsed" collapsible >
            <div class="logo" >
                <span style="font-size: 20px;color: dodgerblue"></span>
            </div>
            <a-menu router theme="dark" :default-selected-keys="[index]" mode="inline">
                <a-menu-item key="1" @click="changeIndex(1)">
                    <router-link :to="{path: '/HomePage'}">
                        <a-icon type="desktop" />
                        <span >首页</span>
                    </router-link>
                </a-menu-item>
                <a-sub-menu key="2">
                    <span slot="title"><a-icon type="line-chart" />
                        <span @click="changeIndex(2)">生产单元一</span>
                    </span>
                    <a-menu-item key="3" @click.native="changeIndex(3)">
                        <router-link to="/WaterQuality" >
                            <span >水质终端</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="4">
                    <span slot="title"><a-icon type="line-chart" /><span @click="changeIndex(4)">生产单元二</span></span>
                    <a-menu-item key="5" @click.native="changeIndex(5)">
                        <router-link to="/WeatherStations">
                            <span>气象站</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="6">
                    <span slot="title"><a-icon type="line-chart" /><span @click="changeIndex(6)">生产单元三</span></span>
                    <a-menu-item key="7" @click.native="changeIndex(7)">
                        <router-link to="/TemperatureAndHumidity">
                            <span>实验室温湿度传感器</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="8" @click.native="changeIndex(8)">
                        <router-link to="/WeatherStations">
                            <span>气象站</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="9">
                    <span slot="title"><a-icon type="line-chart" /><span @click="changeIndex(9)">终端控制</span></span>
                    <a-menu-item key="10" @click.native="changeIndex(10)">
                        <router-link to="/SwitchControl">
                            <span>开关控制</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header id="header">
                <span class="title">南京智慧农业</span>
                <div  class="body" >
                    <img src="../assets/img.png" class="src">
                    <span class="name">{{username}}</span>
                    <router-link :to="{path:'/'}">
                        <span class="about">关于</span>
                    </router-link>
                    <span>|</span>
                    <router-link :to="{path:'/'}">
                        <span class="exit">退出</span>
                    </router-link>
                </div>
            </a-layout-header>
            <a-layout-content id="body" >
                <div style="padding-top: 7px;float: right;">
                    <choose-data style="padding-right: 200px" v-if="isShowData"></choose-data>
                    {{time}}
                </div>
                <router-view ></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2020 Created by
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import ChooseData from "@/components/ChooseData/ChooseData";
    export default {
        components:{
            ChooseData,
        },
        name:"name",
        data() {
            return {
                isShowData:false,
                file:{},
                collapsed: false,
                username:this.$store.state.user.msg,
                time:"",
                index:this.$store.state.index
            };
        },
        watch: {
            '$store.state.index': function (val, oldVal) {
                console.log('index变化')
                this.index = this.$store.state.index
            },
        },
        methods:{
            changeIndex(index){
                console.log('index= %d',index)
                console.log(this.isShowData)
                if(index == 1 || index ==10 || index ==9 || index ==6 || index ==4 || index ==2){
                    this.isShowData=false
                    console.log(this.isShowData)
                }
                else {
                    this.isShowData = true
                    console.log(this.isShowData)
                    console.log('index:%d', index)
                    this.$store.commit("changeIndex", index);
                }
            }
        }
    };
</script>

<style scoped>
    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    #header{
        background-color: #ffffff;
        height: 60px;
    }
    .title{
        width:300px;
        text-align:left;
        color:#008000;
        position: absolute;
        top: 0px;
        left: 210px;
        font-size: 30px
    }

    .body{
        position: absolute;
        top: 0px;
        right: 50px;
        float: right;
    }

    .about{
        text-align: right;
        color: #000000
    }
    .exit{
        text-align:right;
        color: #000000;
        padding-right: 30px
    }
    .name{
        text-align: right;
        color: #000000;
        padding-right:10px
    }
    .src{
        width:30px;
        height:40px;
        padding-right: 5px;
        padding-button: 4px
    }
    #body{
        margin: 0 10px;
    }
</style>