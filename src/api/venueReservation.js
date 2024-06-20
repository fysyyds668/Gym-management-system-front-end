import request from "@/utils/request.js";

//查询可预约课程
export const venueReservationGetPageService=({page,size})=>
    request.post("/subscribe/get/subscribeclass",{page,size})

//查询已预约信息
export const venueReservationBookInformationService=({page,size})=>
    request.post('/subscribe/get/subscribevip',{page,size})
export const venueReservationAddService=({vipId,courseId,coachId,time,period})=>
    request.post("/subscribe/add",{vipId,courseId,coachId,time,period})

export const venueReservationDeleteService=(id)=>
    request.delete("/subscribe/delete",{params:{id}})

