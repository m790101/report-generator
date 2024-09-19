import { ErrorRes } from "@src/model/error-res"

interface Equipment {
  name:string
  num:number
}



interface GetEquipmentRes extends ErrorRes{
  equipmentList:Equipment[]
}



export {GetEquipmentRes,Equipment}
