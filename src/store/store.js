import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        user:{},
        waterFile:{},
        weatherFile:{},
        Temperature:{},
        LightSensor:{},
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
            if(state.index ==7){
                state.Temperature = file
                console.log('state.index:%d',state.index)
                console.log(state.Temperature)
            }
            if(state.index ==8){
                state.LightSensor= file
                console.log('state.index:%d',state.index)
                console.log(state.LightSensor)
            }
        },
        changeIndex(state,index){
          state.index = index
        },
        changeLogin(state,flag){
            state.isLogin=flag
        }
    },
})
