import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router/index.js'
import axios from "axios";

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

axios.defaults.baseURL = 'http://10.246.125.93:8080';
app.config.globalProperties.$http = axios;

app.mount('#app')
