<template>
    <div class="wrapper">
        <switch-button  v-for="item in changeSwitch" :control-switch="item" style="width: 50%; margin: 60px 0 60px 0"></switch-button>
    </div>
</template>


<script>
    import SwitchButton from "@/components/button/SwitchButton";
    import axios from "axios";
export default {
    name: "SwitchControl",
    components:{
        SwitchButton,
    },
    data() {
      return {
          changeSwitch:[],
      }
    },
    mounted() {
      this.getControl()
    },
    methods:{
        getControl(){
          axios.get('http://192.168.100.116:8080/control_equip/equips').then((response) =>{
              console.log(response)
              this.changeSwitch=response.data
          }).catch((response)=>{
              console.log(response)
              this.$message.error("服务器繁忙!!")
          })
        },
    }
}
</script>

<style scoped>
    .wrapper{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-left: 200px;
    }
    .wrapper switch-button{
        box-sizing: border-box;
    }
</style>