import request from "@/utils/request.js";

//注册
export const userRegisterService=( {account,password} )=>
    request.post("/register/account",{account,password})

//登陆
export const userLoginService=({account,password})=>
    request.post("/login/account",{account,password})

//查询
export const vipPageService=({vipName,page, size})=>
    request.post("/vip/get/page", {vipName,page,size})

export const vipDeleteService=(vipId)=>
    request.delete("/vip/delete/one",{params:{vipId}})
export const updateUserService=({vipId,name, age, sex, phone, type})=>
    request.put("/vip/updete/user",{vipId,name, age, sex, phone, type})

export const updateFitnessService=({vipId,name,height,weight,bloodPressure,heartRate,numberClass})=>
    request.put("/vip/updete/fitness",{vipId,name,height,weight,bloodPressure,heartRate,numberClass})

export const updateInfService=({vipId,name, age, sex, phone, type, identityCard})=>
    request.put("/vip/updete/inf",{vipId,name, age, sex, phone, type, identityCard})

export const addUserService=({vipId,name, age, sex, phone, type, identityCard,height,weight,bloodPressure,heartRate,numberClass})=>{
    return  request.post("/vip/add",{vipId,name, age, sex, phone, type, identityCard,height,weight,bloodPressure,heartRate,numberClass})
}



