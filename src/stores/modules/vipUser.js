import {defineStore} from "pinia";
import {ref} from "vue";
import {userRegisterService} from "@/api/user.js";

//用户模块
export const vipUserStore=defineStore(
    'vip-user',
    ()=>{
        const vipId=ref('')
        const token =ref('')
        const userName=ref('')
        const userPwd=ref('')
        const userPhone=ref('')
        const userSex=ref('')
        const userAge=ref('')
        const userID=ref('')
        const screenName=ref('')
        const height=ref('')
        const weight=ref('')
        const blood=ref('')
        const heart=ref('')
        const classNum=ref('')
        const setToken = (newToken)=>{
            token.value=newToken
        }
        const setUser=(newUserName,newUserPwd)=>{
            userName.value=newUserName
            userPwd.value=newUserPwd

        }
        const setUserInf=(newUserAge,newUserSex,newUserPhone,newUserID,newScreenName)=>{
            userPhone.value=newUserPhone
            userSex.value=newUserSex
            userAge.value=newUserAge
            userID.value=newUserID
            screenName.value=newScreenName
        }
        const setVipId=(newVipId)=>{
            vipId.value=newVipId
        }

        const setFitness=(newHeight,newWight,newBlood,newHeart,newClassNum)=>{
            height.value=newHeight
            weight.value=newWight
            heart.value=newHeart
            blood.value=newBlood
            classNum.value=newClassNum
        }

        const removeToken=()=>{
            token.value=''
        }
        const removeUser=()=>{
            userName.value=''
            userPwd.value=''
            userPhone.value=''
            userSex.value=''
            userAge.value=''
            userID.value=''
            screenName.value=''
        }
        const removeVipId=()=>{
            vipId.value=''
        }
        const removeFitness=()=>{
            height.value='',
            weight.value='',
            heart.value='',
            blood.value='',
            classNum.value=''
        }
        return{
            token,
            setToken,
            removeToken,
            setUser,
            removeUser,
            userName,
            userPwd,
            vipId,
            setVipId,
            removeVipId,
            userPhone,
            userAge,
            userID,
            userSex,
            screenName,
            setUserInf,
            setFitness,
            weight,
            heart,
            blood,
            height,
            classNum,
            removeFitness
        }
    },{
        persist:true
    })