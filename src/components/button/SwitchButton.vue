<template>
    <div >
        <span style="font-size: 17px; vertical-align: middle;margin-right: 10px">{{propSwitch}}:</span>
        <el-switch
                v-model="value1"
                inactive-text="关"
                active-text="开"
        >
        </el-switch>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name:"buttonSwitch",
        props:{
            propSwitch:String,
            default: function () {
                return {
                    propSwitch: {}
                }
            }
        },

        data() {
            return {
                value1: true,
                control:{
                    isNO:"",
                    propSwitch:""
                }
            }
        },
        watch:{
            value1:function (val,oldVal) {
                console.log('no=%s')
                console.log('开关按钮变化')
                console.log(this.value1)
                console.log(this.propSwitch)
                this.control.isNO=val
                console.log(this.control.isNO)
                this.control.propSwitch=this.propSwitch
                // this.sendControl()
                this.$message.success({
                    message:this.control.propSwitch+(this.control.isNO==true?"打开":"关闭")+"成功!"
                })
            },
            isSuccess:function (val,oldVal) {

            }
        },
        methods:{
            sendControl(){
                 axios.get('').then((response) =>{
                     console.log('请求成功')
                     console.log(response)//请求成功
                     if(response.data.code == "成功"){
                         this.$message.success({
                             message:this.control.propSwitch+(this.control.isNO==true?"打开":"关闭")+"成功!"
                         })
                     }if(response.data.code == "失败"){
                         this.value1=!this.value1
                         this.$message.error({
                             message:this.control.propSwitch+(this.control.isNO==true?"打开":"关闭")+"失败!"
                         })
                     }
                 }).catch((response) =>{
                     console.log('请求失败')
                     console.log(response)//请求失败
                 } )
            },
        }
    };
</script>

<style>
</style>