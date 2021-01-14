<template>
    <div class="wrapper">
        <switch-button  v-for="item in changeSwitch" :prop-switch="item" style="width: 50%; margin: 60px 0 60px 0"></switch-button>
    </div>
</template>


<script>
    import SwitchButton from "@/components/button/SwitchButton";
export default {
    name: "SwitchControl",
    components:{
        SwitchButton,
    },
    data() {
      return {
          // chooseSwitch:"1号终端",
          changeSwitch:["1号终端","2号终端","3号终端","4号终端","5号终端","6号终端","7号终端","8号终端"],
      }
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