import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@src/services/base/base.service';
import { GetRoomRes } from './model/getRoom.model';
import { Observable } from 'rxjs';
import { BookRoomRes, Reservation } from './model/reservation.model';
import { GetTreatmentRes } from './model/getTreatment.model';
import { GetEquipmentRes } from './model/getEquipment.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getRooms(): Observable<GetRoomRes> {
    return this.get({}, 'api/v1/room');
  }
  getBooking(date: string): Observable<any> {
    return this.get({}, `api/v1/reservation/${date}`);
  }
  getTreatment(): Observable<GetTreatmentRes> {
    return this.get({}, 'api/v1/treatment');
  }

  getEquipment(): Observable<GetEquipmentRes> {
    return this.get({}, 'api/v1/equipment');
  }

  addReservation(req: object | any[] | undefined): Observable<Reservation> {
    return this.post(req, 'api/v1/reservation');
  }
  deleteReservation(req: object | any[] | undefined): Observable<string> {
    return this.post(req, 'api/v1/reservation/delete');
  }
  editReservation(req: object | any[] | undefined): Observable<Reservation> {
    return this.post(req, 'api/v1/edit');
  }
}
