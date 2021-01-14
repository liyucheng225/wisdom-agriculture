<template>
<!--    style="width: 50%; margin: 60px 0 60px 0"-->
    <div class="wrapper">
        <switch-button v-for="item in changeSwitch" :control-switch="item" ></switch-button>
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
          axios.get('/control_equip/equips').then((response) =>{
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
        margin-top: 30px;
    }
    .wrapper switch-button{
        box-sizing: border-box;
        border: black 2px solid;
    }

</style>