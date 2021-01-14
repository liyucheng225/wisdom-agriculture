<template>
    <div class="equipSwitch">
        <p id="list">
        <span style="font-size: 17px; vertical-align: middle;margin-right: 10px;margin-left: 20px">{{ controlSwitch.propSwitch}}:</span>
        <el-switch
                v-model=" controlSwitch.status"
                inactive-text="关"
                active-text="开"
                :disabled="isSuccess"
                @change="isControl"
                class="switch"
        >
        </el-switch>
        </p>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name:"buttonSwitch",
        props:{
            controlSwitch:Object,
            default: function () {
                return {
                    controlSwitch: {
                    }
                }
            }
        },
        data() {
            return {
                isSuccess:false,
                control:{
                    status:"",
                    propSwitch:""
                }
            }
        },
        watch:{
            'controlSwitch.status':function (val,oldVal) {
                console.log('no=%s')
                console.log('开关按钮变化')
                console.log('status=%s',val)
                console.log(this. controlSwitch.propSwitch)
                this.control.status=val
                console.log(this.control.status)
                this.control.propSwitch=this.controlSwitch.propSwitch
                this.sendControl()
            },
        },
        methods:{
            sendControl(){
                this.isSuccess=true //控制按钮是否可以点击
                this.timer = setTimeout(this.change,60000)
                axios.post(`/control_equip/equip`, this.control).then((response) =>{
                     this.isSuccess = false
                     console.log('请求成功')
                     console.log(response)//请求成功
                     if(response.data.code == "200"){
                         this.$message.success({
                             message:this.control.propSwitch+(this.control.status==true?"打开":"关闭")+"成功!"
                         })
                     }else if(response.data.code == "400"){
                         this.controlSwitch.status=!this.controlSwitch.status
                         this.$message.error({
                             message:this.control.propSwitch+(this.control.status==true?"打开":"关闭")+response.data.msg
                         })
                     }
                 }).catch((response) =>{
                     this.isSuccess = false
                     console.log('请求失败')
                     console.log(response)//请求失败
                 } )
            },
            isControl(){
                if(this.isSuccess == false ){
                    this.$message("请等待"+this.control.propSwitch+"回应!")
                }
            },
            change(){
               if(this.isSuccess == true) {
                   this.$message.error(this.control.propSwitch+"没有回应!")
                   this.isSuccess = false
                   this.controlSwitch.status=!this.controlSwitch.status
               }
            }
        }
    };
</script>

<style>
    .equipSwitch{
        height: 85px;
    }
    .switch{
        float: right;
        padding-right: 50px;
    }
    #list{
        height: 60px;
        width: 97%;
        background: white;
        vertical-align: middle;
        padding-top: 18px;
        margin-left: 20px;
    }
</style>