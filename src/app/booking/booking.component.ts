import { BookingService } from './booking.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
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
import { Subject, takeUntil } from 'rxjs';
import { Room } from './model/getRoom.model';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    provideNativeDateAdapter(TW_FORMATS),
  ],
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  readonly startDate = new Date();
  today = moment().format('YYYY-MM-DD');
  bookingDate = moment().format('YYYY-MM-DD');
  rooms = ['201', '202', '203', '205', '206', '207', '208', '209', '999'];
  timeSlots = ['09:30', '11:00', '12:00', '13:30', '15:00', '16:30'];
  equipments: any = [];

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
    private cdr: ChangeDetectorRef
  ) {}

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
    this.getEquipment();
    this.getBooking(this.bookingDate);
    this.scrollToTop();
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

  getBooking(bookingDate: string) {
    this.bookingService
      .getBooking(bookingDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reservations = res;
        this.initEquipmentMap();
        res.forEach((item: any) => {
          this.setTimeSlot(item.room, item.timeSlot, item);
          this.setEquipment(item.timeSlot, item.equipment);
        });
        this.cdr.detectChanges();
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
    this.getBooking(this.bookingDate);
  }

  checkBooking(room: string, timeSlot: string): boolean {
    return this.bookingMap.get(room).includes(timeSlot);
  }

  showModal() {
    this.dialog.open(DetailModalComponent);
  }

  showDetail(room: string, timeSlot: string) {
    const booking = this.reservations.find(
      (item: any) => item.room === room && item.timeSlot === timeSlot
    );
    if (booking) {
      const bookingDetail = {
        ...booking,
        equipment: JSON.parse(booking.equipment),
      };
      const dialogRef = this.dialog.open(DetailModalComponent, {
        data: bookingDetail,
      });

      dialogRef.componentInstance.doConfirm.subscribe((payload) => {
        if (payload) {
          this.cancelReservation(payload);
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
        this.initBookingMap()
        this.getBooking(payload.date);
      });
  }

  showAddModal(room: string, timeSlot: string) {
    const data = {
      date: this.bookingDate,
      room,
      time: timeSlot,
      ...this.treatments,
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
