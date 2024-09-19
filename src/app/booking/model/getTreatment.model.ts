import { ErrorRes } from "@src/model/error-res"

interface Treatment {
  name:string
}



interface GetTreatmentRes extends ErrorRes {
  roomList:Treatment[]
}



export {GetTreatmentRes,Treatment}
