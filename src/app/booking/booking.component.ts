import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
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
export class BookingComponent {
  bookingForm!: FormGroup;
  readonly startDate = new Date();
  today = moment().format('YYYY-MM-DD');
  rooms = ['201', '202', '203', '205', '206', '207', '208', '209', '999'];
  timeSlots = ['9:30', '11:00', '12:00', '13:30', '15:00', '16:30'];
  equipments = ['eecp', '氫氧', 'olib', 'dfpp', '點滴架'];

  fakeData = [
    {
      date: '2021-09-09',
      room: '201',
      time: '9:30',
      treatment: 'olib',
      name: 'John Doe',
    },
    {
      date: '2021-09-09',
      room: '203',
      time: '13:30',
      treatment: 'eecp',
      name: 'John Doe3',
    },
    {
      date: '2021-09-09',
      room: '203',
      time: '9:30',
      treatment: 'eecp',
      name: 'John Doe2',
    },
  ];
  bookingMap = new Map();
  bookingDetailMap = new Map();
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  initForm() {
    this.bookingForm = this.fb.group({
      date: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.initForm();
    this.initBookingMap();
    //api call
    this.getBooking();
    this.scrollToTop();
  }

  initBookingMap() {
    this.rooms.forEach((room) => {
      this.bookingMap.set(room, []);
    });
  }

  scrollToTop() {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 300);
  }

  getBooking() {
    // for now fake data
    this.fakeData.forEach((item) => {
      const timeList = this.bookingMap.get(item.room);
      const list = [...timeList, item.time];
      this.bookingDetailMap.set(item.room, item);
      this.bookingMap.set(item.room, list);
    });
  }

  search() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
    }
    console.log(this.bookingForm.value);
  }

  checkBooking(room: string, timeSlot: string): boolean {
    return this.bookingMap.get(room).includes(timeSlot);
  }

  showModal() {
    this.dialog.open(DetailModalComponent);
  }

  showDetail(room: string, timeSlot: string) {
    const booking = this.fakeData.find(
      (item) => item.room === room && item.time === timeSlot
    );
    if (booking) {
      this.dialog.open(DetailModalComponent, {
        data: booking,
      });
    }
  }
  showAddModal(room: string, timeSlot: string) {
    const data = {
      room,
      time: timeSlot,
    };
    this.dialog.open(AddBookingModalComponent, {
      data,
    });
  }

  checkToShowModal(room: string, timeSlot: string):void {
    if(this.checkBooking(room, timeSlot)){
      this.showDetail(room, timeSlot);
    } else {
      this.showAddModal(room, timeSlot);
    }
  }
}
