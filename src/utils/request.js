import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";


const baseURL='http://192.168.120.117:8080'

const instance = axios.create({
    baseURL,
    timeout:5000
 })
// //请求拦截器
// instance.interceptors.request.use(
//     (config)=>{
//         return config
//     },
//     (err)=>Promise.reject(err)
// )
//响应拦截器
instance.interceptors.response.use(
    (res)=>{
        if(res.data.code.slice(6,7)==='1'){
            if((res.data.mes!=='')&&(res.data.mes!==null))
            ElMessage.success(res.data.mes)

            return res
        }
        ElMessage.error(res.data.mes || '服务异常')
        return Promise.reject(res.data)
     },
    // (err)=>{
    //
    //     if (err.response?.status===401){
    //         router.push('/login')
    //     }
    //
    //     ElMessage.error(err.response.data.mes || '服务异常')
    //     return Promise.reject((err))
    //  }
 )
export default instance
export {baseURL}