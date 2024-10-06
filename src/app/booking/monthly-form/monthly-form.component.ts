import { BookingService } from './../booking.service';
import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  OnInit,
  EventEmitter,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-monthly-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-form.component.html',
  styleUrl: './monthly-form.component.scss',
})
export class MonthlyFormComponent implements OnInit {
  @Output() changeDateEvent = new EventEmitter();
  @Output() goNextMonth = new EventEmitter();
  @Output() goPreviousMonth = new EventEmitter();
  @Input() monthlyReservationList!: Signal<any>;
  @Input() targetDate!: Signal<any>;
  reRender = false;
  date = 1;
  timeYearMonth = moment();
  roomNumMapper: { [key: string]: number } = {
    '201': 0,
    '202': 1,
    '203': 2,
    '205': 3,
    '206': 4,
    '207': 5,
    '208': 6,
    '209': 7,
    '999': 8,
  };

  timeSlotMapper: { [key: string]: number } = {
    '09:30': 0,
    '11:00': 1,
    '12:00': 2,
    '13:30': 3,
    '15:00': 4,
    '16:30': 5,
  };
  private readonly destroy$ = new Subject();
  constructor() {}
  ngOnInit(): void {}
  nextMonth() {
    this.timeYearMonth = this.timeYearMonth.add(1, 'month');
    this.goNextMonth.emit();
  }
  previousMonth() {
    this.timeYearMonth = this.timeYearMonth.add(-1, 'month');
    this.goPreviousMonth.emit();
  }
  checkTargetDate(date: string) {
    return moment(this.targetDate()).format('D') === date;
  }
  getDate(index: number): string {
    const firstDayWeekday = this.timeYearMonth.startOf('month').weekday();
    const dayOfMonth = index - firstDayWeekday + 1;
    const daysInMonth = this.timeYearMonth.daysInMonth();

    // Only return a valid date if it falls within the current month
    if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
      return dayOfMonth.toString();
    }
    return '';
  }
  changeDate(date: string) {
    const targetDate =
      this.timeYearMonth.format('YYYY-MM') + '-' + date.padStart(2, '0');
    this.changeDateEvent.emit(targetDate);
  }
  isWeekday(index: number) {
    const firstDayWeekday = this.timeYearMonth.startOf('month').weekday();
    const dayOfMonth = index - firstDayWeekday + 1;
    const daysInMonth = this.timeYearMonth.daysInMonth();

    // Only return a valid date if it falls within the current month
    return dayOfMonth > 0 && dayOfMonth <= daysInMonth;
  }

  checkReservationRoomColor(room: number) {
    const roomWithBlue = [
      this.roomNumMapper['203'],
      this.roomNumMapper['205'],
      this.roomNumMapper['208'],
    ];
    if (roomWithBlue.includes(room)) {
      return '#7152e3';
    }
    return '#f76767';
  }
  getReservationForDate(
    index: number,
    room: number,
    timeSlot: number
  ): Reservation | null {
    const day = this.getDate(index); // Get the day of the month
    if (!day) return null; // If the day is not valid, return null

    const calendarDate =
      this.timeYearMonth.format('YYYY-MM') + '-' + String(day).padStart(2, '0'); // Get the full date

    // Find a reservation that matches the current calendar date
    const reservation = this.monthlyReservationList().find(
      (res: Reservation) =>
        res.date === calendarDate &&
        this.roomNumMapper[res.room as keyof typeof this.roomNumMapper] ===
          room &&
        this.timeSlotMapper[
          res.timeSlot as keyof typeof this.timeSlotMapper
        ] === timeSlot
    );

    return reservation || null; // Return the reservation if found, otherwise null
  }
}
interface Reservation {
  date: string;
  equipment: string;
  name: string;
  room: string;
  timeSlot: string;
  treatment: string;
}
