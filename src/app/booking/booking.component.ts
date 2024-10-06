import { BookingService } from './booking.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import moment from 'moment';
import { AddBookingModalComponent } from './add-booking-modal/add-booking-modal.component';
import { concatMap, Subject, takeUntil } from 'rxjs';
import { Room } from './model/getRoom.model';
import { isSuccess } from '@src/utils/api-helper';
import { ErrorHandlerService } from '@src/services/error-handle.service';
import { MonthlyFormComponent } from './monthly-form/monthly-form.component';

/**
 * @description 設定 TW 日期區間選擇器格式
 */
export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MM月 YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM',
  },
};

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MonthlyFormComponent,
  ],
  templateUrl: './booking.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    provideNativeDateAdapter(TW_FORMATS),
  ],
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  monthlyReservationList = signal([]);
  today = moment().format('YYYY-MM-DD');
  bookingDate = moment().format('YYYY-MM-DD');
  rooms = ['201', '202', '203', '205', '206', '207', '208', '209', '999'];
  timeSlots = ['09:30', '11:00', '12:00', '13:30', '15:00', '16:30'];
  equipments: any = [];
  targetDate = signal(this.today);
  showCalendar = true

  equipmentMap = new Map();
  reservations: any = [];
  treatments: any = [];
  private readonly destroy$ = new Subject();
  bookingMap = new Map();
  bookingDetailMap = new Map();
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private errorHandleService: ErrorHandlerService
  ) {}

  toggleCalendar(){
    this.showCalendar = ! this.showCalendar
  }
  initForm() {
    this.bookingForm = this.fb.group({
      date: new FormControl('', [Validators.required]),
    });
  }

  initEquipmentMap() {
    this.timeSlots.forEach((time: string) => {
      const equipNumMap = new Map();
      this.equipments.forEach((equipment: any) => {
        equipNumMap.set(equipment.name, equipment.num);
      });

      this.equipmentMap.set(time, equipNumMap);
    });
  }

  ngOnInit() {
    this.initForm();
    this.initBookingMap();
    //api call
    this.getTreatment();
    this.getBookingWithEquipment(this.bookingDate);
    this.scrollToTop();
  }

  getYearMonth(){
    return moment(this.bookingDate).format('YYYY-MM')
  }
  goNextMonth() {
    this.targetDate.set('')
    this.bookingDate = moment(this.bookingDate, 'YYYY-MM-DD')
      .add(1, 'month')
      .format('YYYY-MM-DD');
    this.getBooking(this.bookingDate);
  }
  goPreviousMonth() {
    this.targetDate.set('')
    this.bookingDate = moment(this.bookingDate, 'YYYY-MM-DD')
      .add(-1, 'month')
      .format('YYYY-MM-DD');
    this.getBooking(this.bookingDate);
  }
  changeDate(date: any) {
    this.bookingDate = date;
    this.targetDate.set(date);
    this.initBookingMap();
    this.initEquipmentMap();
    const reservationDay = this.monthlyReservationList().filter((item: any) => {
      return item.date === this.bookingDate;
    });
    reservationDay.forEach((item: any) => {
      this.setTimeSlot(item.room, item.timeSlot, item);
      this.setEquipment(item.timeSlot, item.equipment);
    });
  }

  getMonthlyReservation(req: any): void {
    this.bookingService
      .getReservationMonthly(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.monthlyReservationList.set(res.reservationList);
      });
  }

  getEquipment() {
    this.bookingService
      .getEquipment()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.equipments = res.equipmentList;
      });
  }

  initBookingMap() {
    this.rooms.forEach((room) => {
      if (room) {
        this.bookingMap.set(room, []);
      }
    });
  }

  scrollToTop() {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 300);
  }

  getBookingWithEquipment(bookingDate: string) {
    this.bookingService
      .getEquipment()
      .pipe(
        takeUntil(this.destroy$),
        concatMap((res) => {
          this.equipments = res.equipmentList;
          return this.bookingService.getReservationMonthly({
            date: moment(this.today).format('YYYY-MM'),
          });
        })
      )
      .subscribe((res) => {
        if (isSuccess(res)) {
          this.monthlyReservationList.set(res.reservationList);
          this.initEquipmentMap();
          const reservationDay = res.reservationList.filter((item: any) => {
            return item.date === bookingDate;
          });
          reservationDay.forEach((item: any) => {
            this.setTimeSlot(item.room, item.timeSlot, item);
            this.setEquipment(item.timeSlot, item.equipment);
          });
        } else {
          this.errorHandleService.errorModalShow(
            res.errorCode,
            res.errorMessage
          );
        }
      });
  }

  editReservation(req: any) {
    this.bookingService
      .editReservation(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (isSuccess(res)) {
          this.getBooking(this.bookingDate);
        } else {
          this.errorHandleService.errorModalShow(
            res.errorCode,
            res.errorMessage
          );
        }
      });
  }
  getBooking(bookingDate: string) {
    const req = {
      date: moment(bookingDate).format('YYYY-MM'),
    };
    this.bookingService
      .getReservationMonthly(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.monthlyReservationList.set(res.reservationList);
        this.initEquipmentMap();
        const reservationDay = res.reservationList.filter((item: any) => {
          return item.date === bookingDate;
        });
        reservationDay.forEach((item: any) => {
          this.setTimeSlot(item.room, item.timeSlot, item);
          this.setEquipment(item.timeSlot, item.equipment);
        });
      });
  }

  resetEquipNumInTimeSlot(timeSlot: string, equipments: any) {
    equipments.forEach((item: any) => {
      this.equipmentMap.get(timeSlot).set(item.name, item.num);
    });
  }

  setEquipment(timeSlot: string, equipment: string) {
    const timeSlotEquipment = this.equipmentMap.get(timeSlot);
    const equipmentList = JSON.parse(equipment);
    equipmentList.forEach((item: string) => {
      if (timeSlotEquipment.has(item)) {
        const numAfter = timeSlotEquipment.get(item) - 1;
        timeSlotEquipment.set(item, numAfter);
      }
    });
  }

  setTimeSlot(room: string, timeSlot: string, detail: any) {
    const timeList = this.bookingMap.get(room);
    const list = [...timeList, timeSlot];
    const detailWithEquipAray = {
      ...detail,
      equipment: JSON.parse(detail.equipment),
    };
    this.bookingDetailMap.set(room, detailWithEquipAray);
    this.bookingMap.set(room, list);
  }

  getTreatment() {
    this.bookingService
      .getTreatment()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.treatments = res;
      });
  }

  search() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    const selectedDate = moment(this.bookingForm.value.date).format(
      'YYYY-MM-DD'
    );
    this.bookingDate = selectedDate;
    this.initBookingMap();
    this.getBookingWithEquipment(this.bookingDate);
  }

  checkBooking(room: string, timeSlot: string): boolean {
    return this.bookingMap.get(room).includes(timeSlot);
  }

  showModal() {
    this.dialog.open(DetailModalComponent);
  }

  showDetail(room: string, timeSlot: string) {
    const booking:any = this.monthlyReservationList().find(
      (item: any) => item.date === this.targetDate() && item.room === room && item.timeSlot === timeSlot
    );
    if (booking) {
      const bookingDetail = {
        ...booking,
        equipment: JSON.parse(booking.equipment),
        treatments: this.treatments.treatmentList,
        equipmentMap: this.equipmentMap.get(timeSlot),
      };
      const dialogRef = this.dialog.open(DetailModalComponent, {
        data: bookingDetail,
      });

      dialogRef.componentInstance.doCancel.subscribe((payload) => {
        if (payload) {
          this.cancelReservation(payload);
        }
      });
      dialogRef.componentInstance.doEdit.subscribe((payload) => {
        if (payload) {
          payload = {
            ...payload,
            equipment: JSON.stringify(payload.equipment),
          };
          this.editReservation(payload);
        }
      });
      return dialogRef;
    }
    return;
  }

  cancelReservation(payload: any) {
    this.bookingService
      .deleteReservation(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.initBookingMap();
        this.getBooking(payload.date);
      });
  }

  showAddModal(room: string, timeSlot: string) {
    const data = {
      date: this.bookingDate,
      room,
      time: timeSlot,
      treatments: this.treatments.treatmentList,
      equipment: this.equipmentMap.get(timeSlot),
    };
    const dialogRef = this.dialog.open(AddBookingModalComponent, {
      data,
    });

    dialogRef.componentInstance.doConfirm.subscribe((payload) => {
      const req = {
        ...payload,
        equipment: JSON.stringify(payload.equipment),
      };
      this.addReservation(req);
    });
    return dialogRef;
  }

  addReservation(req: any) {
    this.bookingService
      .addReservation(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.getBooking(this.bookingDate);
      });
  }

  checkToShowModal(room: string, timeSlot: string): void {
    if (this.checkBooking(room, timeSlot)) {
      this.showDetail(room, timeSlot);
    } else {
      this.showAddModal(room, timeSlot);
    }
  }
}
