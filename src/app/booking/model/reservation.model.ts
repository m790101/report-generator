interface Reservation {
  date: string,
  room: string,
  timeSlot: string,
  treatment: string,
  name:string,
  equipment:string
}



interface BookRoomRes {
  reservations:Reservation[]
}

export {BookRoomRes,Reservation}
