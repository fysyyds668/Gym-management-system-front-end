import {defineStore} from "pinia";
import {ref} from "vue";
import {userRegisterService} from "@/api/user.js";

//用户模块
export const vipUserStore=defineStore(
    'vip-user',
    ()=>{
        const vipId=ref('')
        const token =ref('')
        const userAccount=ref('')
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
        const vipJoinDate=ref('')
        const expirationDate=ref('')
        const setToken = (newToken)=>{
            token.value=newToken
        }
        const setUser=(newUserAccount,newUserPwd)=>{
            userAccount.value=newUserAccount
            userPwd.value=newUserPwd
        }
        const setUserInf=(newUserAge,newUserSex,newUserPhone,newUserID,newScreenName,newUserName)=>{
            userPhone.value=newUserPhone
            userSex.value=newUserSex
            userAge.value=newUserAge
            userID.value=newUserID
            screenName.value=newScreenName
            userName.value=newUserName
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
        const setDate=(newVipJoinDate,newExpirationDate)=>{
            vipJoinDate.value=newVipJoinDate;
            expirationDate.value=newExpirationDate
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
            userAccount.value=''
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
        const removeDate=()=>{
            vipJoinDate.value='',
            expirationDate.value=''
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
            removeFitness,
            vipJoinDate,
            expirationDate,
            setDate,
            removeDate,
            userAccount
        }
    },{
        persist:true
    })