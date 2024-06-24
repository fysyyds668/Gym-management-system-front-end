import request from "@/utils/request.js";
import {config} from "@vue/test-utils";
import {userUserStore} from "@/stores/index.js";

//注册
export const userRegisterService=( {account,password} )=>
    request.post("/register/account",{account,password})

//登陆
export const userLoginService=({account,password})=>
    request.post("/login/user/account",{account,password})

export const adminLoginService=({account,password})=>
    request.post("/login/manager/account",{account,password})

//查询
export const vipPageService=({vipName,page, size})=>
    request.post("/vip/get/page", {vipName,page,size})

export const vipDeleteService=(vipId)=>
    request.delete("/vip/delete/one",{params:{vipId}})
export const updateUserService=({vipId,name, age, sex, phone, type})=>
    request.put("/vip/updete/user",{vipId,name, age, sex, phone, type})

export const updateFitnessService=({vipId,name,height,weight,bloodPressure,heartRate,numberClass})=>
    request.put("/vip/updete/fitness",{vipId,name,height,weight,bloodPressure,heartRate,numberClass})

export const updateInfService=({vipId,name, age, sex, phone, type, identityCard,joinDate,expirationDate})=>
    request.put("/vip/updete/inf",{vipId,name, age, sex, phone, type, identityCard,joinDate,expirationDate})

export const addUserService=({vipId,name, age, sex, phone, type, identityCard,height,weight,bloodPressure,heartRate,numberClass})=>{
    return  request.post("/vip/add",{vipId,name, age, sex, phone, type, identityCard,height,weight,bloodPressure,heartRate,numberClass})
}
export const userFindService=(vipId)=>
    request.get('/user/get/userinf',{params:{vipId}})

export const userUpdateService=({screenName,name, age, sex, phone,identityCard})=>
    request.post('/user/update/introduce',{screenName,name, age, sex, phone,identityCard})
//用户预约课程
export const userBookService=({vipId,courseId,coachId,time,period})=>{
    request.post('/user/booked/course',{vipId,courseId,coachId,time,period})
}
//用户查看预约课程
export const userLookBook=({vipId,courseName,coachName,page,size})=>{
    request.post('/user/get/yibooked',{vipId,courseName,coachName,page,size})
}

//用户注册会员
export const userSignInVip=({vipId,courseName,coachName,page,size})=>{
    request.post('',{vipId,courseName,coachName,page,size})
}



