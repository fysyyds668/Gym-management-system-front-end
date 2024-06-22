import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import {userUserStore, vipUserStore} from "@/stores/index.js";


const baseURL='/api'

const instance = axios.create({
    baseURL,
    timeout:5000
 })

instance.interceptors.request.use(
    (config) => {

        const token=userUserStore().token
        if(token){
            config.headers['Authorization']=token
        }

        const viptoken=vipUserStore().token
        if(viptoken){
            config.headers['Authorization']=viptoken
        }

        return config;
    },

);

instance.interceptors.response.use(
    (res)=>{
        if(res.status!==999){
            if(res.data.code.slice(6,7)==='1'){
                if((res.data.mes!=='')&&(res.data.mes!==null))
                    ElMessage.success(res.data.mes)

                return res
            }
            ElMessage.error(res.data.mes || '服务异常')
            return Promise.reject(res.data)
        }else {
            ElMessage.error('账号凭证不存在')
        }

     }
 )
export default instance
export {baseURL}