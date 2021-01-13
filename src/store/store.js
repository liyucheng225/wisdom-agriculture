import Vue from 'vue'
import Vuex from 'vuex'
import {getItemAlign} from "echarts/lib/component/visualMap/helper";
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        user:{},
        waterFile:{},
        weatherFile:{},
        index:1,
        isLogin:false,
    },
    getters:{
      isLogin:state => state.isLogin
    },
    mutations:{
        userStatus(state, flag) {
            state.isLogin = flag
        },
        changeUser(state,user){
            state.user = user
        },
        changeJson(state,file){
            if(state.index == 3){
                state.waterFile = file
                console.log('state.index:%d',state.index)
                console.log(state.waterFile)
            }
            if(state.index ==5){
                state.weatherFile = file
                console.log('state.index:%d',state.index)
                console.log(state.waterFile)
            }
        },
        changeIndex(state,index){
          state.index = index
        }
    },
})
