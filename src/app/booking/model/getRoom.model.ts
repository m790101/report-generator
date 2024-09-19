import { ErrorRes } from "@src/model/error-res"

interface Room {
  name:string
}



interface GetRoomRes extends ErrorRes{
  roomList:Room[]
}



export {GetRoomRes,Room}
