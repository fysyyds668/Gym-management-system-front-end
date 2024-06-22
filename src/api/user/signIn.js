import request from "@/utils/request.js";

export const userSignInService=({account,password,phone,code})=>
    request.post('/register/account',{account,password,phone,code})
//获取验证码
export const userGetCodeService=(phone)=>
    request.get('/login/user/account/code', {params:{phone}})
//账号登录
export const userLoginService=({account,password})=>
    request.post('/login/user/account',{account,password})
//手机号登录
export const userLoginPhoneService=(phone,code)=>
    request.get('/login/user/phone', {params:{phone:phone,code:code}})

//登录获取验证码
export const userLoginCodeService=(phone)=>
    request.get('/login/user/phone/code', {params:{phone}})