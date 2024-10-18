import { Component, Inject, Signal, signal } from '@angular/core';
import { ModalComponent } from '../../compoment/modal/modal.component';
import { MonthlyFormComponent } from '../monthly-form/monthly-form.component';
import moment from 'moment';
import { MonthlyFormMutiComponent } from './monthly-form-muti/monthly-form-muti.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from '../booking.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-muti-booking-modal',
  standalone: true,
  imports: [
    ModalComponent,
    MonthlyFormMutiComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './muti-booking-modal.component.html',
  styleUrl: './muti-booking-modal.component.scss',
})
export class MutiBookingModalComponent {
  equipmentList = [
    { name: 'eecp', key: 'eecp' },
    { name: '氫氧', key: 'oxygen' },
    { name: 'olib', key: 'olib' },
    { name: 'dfpp', key: 'dfpp' },
    { name: '點滴架', key: 'stand' },
  ];
  EECPRooms = ['203', '205', '208'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rooms: string[] },
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    if (data) {
      this.bookingData.rooms = data.rooms.filter((room: any) => {
        return this.EECPRooms.includes(room);
      });
    }
  }

  bookingData: any = {};
  mutiReservationForm!: FormGroup;
  title = '多次預約';
  today = moment().format('YYYY-MM-DD');
  targetDate = signal(this.today);
  bookingDate = moment().format('YYYY-MM-DD');
  timeSlots = ['09:30', '11:00', '12:00', '13:30', '15:00', '16:30'];
  reservationList = signal([]);
  roomSelected = signal('');

  private readonly destroy$ = new Subject();

  initForm() {
    this.mutiReservationForm = this.fb.group({
      room: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      timeSlot: new FormControl('', [Validators.required]),
      treatment: new FormControl('1', [Validators.required]),
      eecp: new FormControl(false),
      oxygen: new FormControl(false),
      olib: new FormControl(false),
      dfpp: new FormControl(false),
      stand: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  goNextMonth() {
    this.bookingDate = moment(this.bookingDate, 'YYYY-MM-DD')
      .add(1, 'month')
      .format('YYYY-MM-DD');
  }
  checkPreviousMonth() {
    const bookingMonth = moment(this.bookingDate);
    const MonthNow = moment();
    return bookingMonth.isAfter(MonthNow, 'month');
  }
  goPreviousMonth() {
    this.bookingDate = moment(this.bookingDate, 'YYYY-MM-DD')
      .add(-1, 'month')
      .format('YYYY-MM-DD');
  }
  ok() {}

  getReservationByTime() {
    // console.log('change')
    const timeValue = this.mutiReservationForm.get('timeSlot')?.value;
    this.getReservationMuti(timeValue);
  }

  updateRoomSelected() {
    const roomValue = this.mutiReservationForm.get('room')?.value;
    console.log(roomValue);
    this.roomSelected.set(roomValue);
  }
  getReservationMuti(timeSlot: string) {
    this.bookingService
      .getReservationMuti(timeSlot)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        console.log(res);
        this.reservationList.set(res);
      });
  }

  getYearMonth() {
    return moment(this.bookingDate).format('YYYY-MM');
  }

  changeDate(e: any) {
    // console.log(e);
  }
}
