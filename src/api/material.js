import request from "@/utils/request.js";

export const wellMaterialAddService=({name,num,unitPrice,destroy})=>
    request.post('/material/add/well',{name,num,unitPrice,destroy})
export const badMaterialAddService=({name,num,unitPrice,destroy})=>
    request.post('/material/add/bad',{name,num,unitPrice,destroy})
export const wellMaterialGetService=({materialName,page,size})=>
    request.post('/material/get/well',{materialName,page,size})
export const badMaterialAGetService=({materialName,page,size})=>
    request.post('/material/get/bad',{materialName,page,size})
export const wellMaterialDeleteService=(materialId)=>
    request.delete('/material/delete/well',{params:{materialId}})
export const badMaterialDeleteService=(materialId)=>
    request.delete('/material/delete/bad',{params:{materialId}})
export const wellMaterialUpdateService=({materialId,name,num,unitPrice,destroy})=>
    request.put('/material/update/well',{materialId,name,num,unitPrice,destroy})
export const badMaterialUpdateService=({materialId,name,num,unitPrice,destroy})=>
    request.put('/material/update/bad',{materialId,name,num,unitPrice,destroy})