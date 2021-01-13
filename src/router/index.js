import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login/Login";
import WeatherStations from "@/views/Weather stations/WeatherStations";
import WaterQuality from "@/views/Water quality of the terminal/WaterQuality";
import Register from "@/views/Login/Register";
import HomePage from "@/views/HomePage/HomePage";
import TemperatureAndHumidity from "@/views/temperature and humidity sensors/TemperatureAndHumidity";

Vue.use(VueRouter)

const routes = [

  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta:{
      title:"注册"
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      title:"登录"
    }
  },

  {
    path:'/Home',
    name:'Home',
    component: Home,
    meta: {
      title: "home"
    },
    children:[
      {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage,
        meta:{
          title:"首页"
        }
      },
      {
        path: '/WeatherStations',
        name: 'WeatherStations',
        component: WeatherStations,
        meta:{
          title:"气象站"
        }
      },
      {
        path: '/WaterQuality',
        name: 'WaterQuality',
        component: WaterQuality,
        meta:{
          title:"水质终端"
        }
      },
      {
        path: '/TemperatureAndHumidity',
        name: 'TemperatureAndHumidity',
        component: TemperatureAndHumidity,
        meta:{
          title:"实验室温湿度传感器"
        }
      },
    ]

  },
]

const router = new VueRouter({
  routes
})

export default router