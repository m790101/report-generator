import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookingForm!: FormGroup;
  readonly startDate = new Date();
  rooms = [
    '201',
    '202',
    '203',
    '205',
    '206',
    '207',
    '208',
    '209',
    '999'
  ]
  timeSlots = [
    '9:30',
    '11:00',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
  ]

  fakeData = [
    {
      date: '2021-09-09',
      room: '201',
      time: '9:30',
      name: 'John Doe',
    },
    {
      date: '2021-09-09',
      room: '203',
      time: '13:30',
      name: 'John Doe3',
    },
    {
      date: '2021-09-09',
      room: '203',
      time: '9:30',
      name: 'John Doe2',
    }
  ]
  bookingMap = new Map()

  constructor( private fb: FormBuilder, ) { }

  initForm() {
    this.bookingForm = this.fb.group({
      date: new FormControl('',[Validators.required]),
    });
  }
  ngOnInit() {
    this.initForm();
    this.initBookingMap()
    //api call
    this.getBooking()
    console.log(this.bookingMap)
    // this.scrollToTop()
  }

  initBookingMap(){
    this.rooms.forEach((room)=>{
      this.bookingMap.set(room,[])
    })
  }

  getBooking(){
    // for now fake data
    this.fakeData.forEach((item)=>{
      const timeList = this.bookingMap.get(item.room)
      const list = [...timeList,item.time]
      this.bookingMap.set(item.room,list)
    })
  }

  search(){
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
    }
    console.log(this.bookingForm.value)
  }

  checkBooking(room:string,timeSlot:string):boolean{
    return this.bookingMap.get(room).includes(timeSlot)
  }

}
