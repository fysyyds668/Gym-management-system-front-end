import {defineStore} from "pinia";
import {ref} from "vue";

//用户模块
export const userUserStore=defineStore(
    'big-user',
    ()=>{
    const token =ref('')
    const setToken = (newTonken)=>{
        token.value=newTonken
    }
    const removeToken=()=>{
        token.value=''
    }
    return{
        token,
        setToken,
        removeToken
    }
},{
    persist:true
})