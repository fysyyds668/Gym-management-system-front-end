import request from "@/utils/request.js";

export const coachGetPageService=({page,size})=>
    request.post("/coach/get/page",{page,size})

export const coachAddService=({name,age,sex,salary,identityCard})=>
    request.post("/coach/add",{name,age,sex,salary,identityCard})

export const coachDeleteService=(id)=>
    request.delete("/coach/delete/one",{params:{id}})

export const coachUpdateService=({id,coachId,name,age,sex,salary,identityCard})=>
    request.put("/coach/update",{id,coachId,name,age,sex,salary,identityCard})
