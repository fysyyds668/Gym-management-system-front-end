import request from "@/utils/request.js";

//查询可预约课程
export const venueReservationGetPageService=({page,size})=>
    request.post("/subscribe/get/subscribeclass",{page,size})

//查询已预约信息
export const venueReservationBookInformationService=({page,size})=>
    request.post('/subscribe/get/subscribevip',{page,size})
export const venueReservationAddService=()=>
    request.post("/subscribe/add",)

export const venueReservationDeleteService=(courseId)=>
    request.delete("/subscribe/delete",{params:{courseId}})

