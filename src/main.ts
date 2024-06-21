import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router/index.js'
import axios from "axios";

import * as echarts from 'echarts'


const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$http = axios;
app.config.globalProperties.$echatrs=echarts;

app.mount('#app')
