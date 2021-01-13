<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" >
        <a-layout-sider v-model="collapsed" collapsible >
            <div class="logo" >
                <span style="font-size: 20px;color: dodgerblue"></span>
            </div>
            <a-menu router theme="dark" :default-selected-keys="[index]" mode="inline">
                <a-menu-item key="1">
                    <router-link :to="{path: '/HomePage'}">
                        <a-icon type="desktop" />
                        <span @click="changeIndex(1)">首页</span>
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
                    <choose-data style="padding-right: 200px" ></choose-data>
                    {{time}} {{index}}
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
                console.log('index:%d',index)
                this.$store.commit("changeIndex",index);
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