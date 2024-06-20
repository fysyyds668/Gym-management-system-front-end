import request from "@/utils/request.js";

export const signInGetPageCourseService=({page,size})=>
    request.post('/signin/get/signcourse',{page,size})

export const signInInformationService=({coachId,courseId,classTime,period,sign,page,size})=>
    request.post('/signin/get/signinf',{coachId,courseId,classTime,period,sign,page,size})

export const signInAddInformationService=({vipId,courseId,coachId,classTime,signTime,period,sign})=>
    request.post('/signin/sign',{vipId,courseId,coachId,classTime,signTime,period,sign})