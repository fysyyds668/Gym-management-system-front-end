import request from "@/utils/request.js";

export const teachCourseUpdateService=({id,courseId,coachId,time,period,number})=>
    request.put('/givelessons/update',{id,courseId,coachId,time,period,number})

export const teachCourseDeleteService=(id)=>
    request.delete('/givelessons/delete',{params:{id}})

export const teachCourseAddService=({courseId,coachId,time,period,number})=>
    request.post('/givelessons/add',{courseId,coachId,time,period,number})

export const teachCourseGetPageService=({coachName,courseName,page,size})=>
    request.post('/givelessons/get/page',{coachName,courseName,page,size})