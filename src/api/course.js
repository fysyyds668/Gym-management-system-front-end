import request from "@/utils/request.js";

export const courseGetPageService=({courseName,page,size})=>
    request.post("/course/get/page",{courseName,page,size})

export const courseAddService=({type,name})=>
    request.post("/course/add",{type,name})

export const courseDeleteService=(id)=>
    request.delete("/course/delete/one",{params:{id}})

export const courseUpdateService=({id,courseId,type,name})=>
    request.put("/course/update",{id,courseId,type,name})
