import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-monthly-form-muti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-form-muti.component.html',
  styleUrls: ['./monthly-form-muti.component.scss'],
})
export class MonthlyFormMutiComponent implements OnInit {
  @Output() selectDateEvent = new EventEmitter();
  @Output() goNextMonth = new EventEmitter();
  @Output() goPreviousMonth = new EventEmitter();
  @Input() reservationList!: Signal<any>;
  @Input() targetDate!: Signal<any>;
  @Input() roomSelected!: Signal<any>;
  selectDateList: string[] = [];
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
  checkPreviousMonth() {
    return this.timeYearMonth.isAfter(moment(), 'month');
  }
  checkNextMonth() {
    return this.timeYearMonth.isBefore(moment().add(6, 'month'), 'month');
  }
  checkTargetDate(date: string) {
    const yearMonth = this.timeYearMonth.format('YYYY-MM');
    const targetDate = yearMonth + '-' + date.padStart(2, '0');
    return moment(this.targetDate()).format('YYYY-MM-DD') === targetDate;
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
  markDate(date: string) {
    const fullDate =
      this.timeYearMonth.format('YYYY-MM') + '-' + date.padStart(2, '0');
    if (this.selectDateList.includes(fullDate)) {
      this.selectDateList = this.selectDateList.filter(
        (item) => item !== fullDate
      );
      this.selectDateEvent.emit(this.selectDateList);
      return;
    }
    this.selectDateList.push(fullDate);
    this.selectDateEvent.emit(this.selectDateList);
  }
  getFullDate(date: string) {
    return this.timeYearMonth.format('YYYY-MM') + '-' + date.padStart(2, '0');
  }
  checkIsValidDate(date: string) {
    if (date) {
      const fullDate =
        this.timeYearMonth.format('YYYY-MM') + '-' + date.padStart(2, '0');
      if (moment(fullDate).isSameOrAfter(moment(), 'day')) {
        return true;
      }
    }
    return false;
  }
  checkIsReserved(index: number) {
    const day = this.getDate(index); // Get the day of the month
    if (!day) return null; // If the day is not valid, return null

    const calendarDate =
      this.timeYearMonth.format('YYYY-MM') + '-' + String(day).padStart(2, '0');
    if (this.roomSelected() === '') return false;

    if (
      this.reservationList().find(
        (res: Reservation) =>
          res.date === calendarDate && res.room === this.roomSelected()
      )
    ) {
      return true;
    }
    return false;
  }
  isWeekday(index: number) {
    const firstDayWeekday = this.timeYearMonth.startOf('month').weekday();
    const dayOfMonth = index - firstDayWeekday + 1;
    const daysInMonth = this.timeYearMonth.daysInMonth();

    // Only return a valid date if it falls within the current month
    return dayOfMonth > 0 && dayOfMonth <= daysInMonth;
  }

  // checkReservationRoomColor(room: number) {
  //   const roomWithBlue = [
  //     this.roomNumMapper['203'],
  //     this.roomNumMapper['205'],
  //     this.roomNumMapper['208'],
  //   ];
  //   if (roomWithBlue.includes(room)) {
  //     return '#7152e3';
  //   }
  //   return '#f76767';
  // }
  getReservationForDate(index: number): Reservation | null {
    const day = this.getDate(index); // Get the day of the month
    if (!day) return null; // If the day is not valid, return null

    const calendarDate =
      this.timeYearMonth.format('YYYY-MM') + '-' + String(day).padStart(2, '0'); // Get the full date

    // Find a reservation that matches the current calendar date
    const reservation = this.reservationList().find(
      (res: Reservation) => res.date === calendarDate
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
