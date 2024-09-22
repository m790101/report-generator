import { ErrorRes } from "@src/model/error-res"

interface Reservation extends ErrorRes{
  date: string,
  room: string,
  timeSlot: string,
  treatment: string,
  name:string,
  equipment:string
}



interface BookRoomRes extends ErrorRes{
  reservations:Reservation[]
}

export {BookRoomRes,Reservation}
