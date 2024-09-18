import { BookingService } from './../booking.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../compoment/modal/modal.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-booking-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
  ],
  templateUrl: './add-booking-modal.component.html',
  styleUrl: './add-booking-modal.component.scss',
})
export class AddBookingModalComponent implements OnInit {
  @Output() doConfirm = new EventEmitter();
  title = '預約療程'; // 通知
  bookingData: any = {};
  addBookingForm!: FormGroup;
  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddBookingModalComponent,
    public dialogRef: MatDialogRef<AddBookingModalComponent>,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    if (data) {
      this.bookingData = data;
    }
  }

  equipmentList = [
    { name: 'eecp', key: 'eecp' },
    { name: '氫氧', key: 'oxygen' },
    { name: 'olib', key: 'olib' },
    { name: 'dfpp', key: 'dfpp' },
    { name: '點滴架', key: 'stand' },
  ];

  initForm() {
    this.addBookingForm = this.fb.group({
      room: new FormControl(this.bookingData.room, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      timeSlot: new FormControl(this.bookingData.time, [Validators.required]),
      treatment: new FormControl('', [Validators.required]),
      eecp: new FormControl(false),
      oxygen: new FormControl(false),
      olib: new FormControl(false),
      dfpp: new FormControl(false),
      stand: new FormControl(false),
    });
  }
  ngOnInit() {
    this.initForm();
  }
  submit() {
    if (this.addBookingForm.invalid) {
      this.addBookingForm.markAllAsTouched();
      console.log('invalid');
    } else {
      const rawData = this.addBookingForm.value;
      const equipment = this.getEquipmentList(rawData);
      const req = {
        date: this.bookingData.date,
        name: rawData.name,
        room: rawData.room,
        timeSlot: rawData.timeSlot,
        treatment: rawData.treatment,
        equipment
      };

      this.doConfirm.emit(req);
      this.ok();
    }
  }

  getEquipmentList(data: any): string[] {
    const equipmentKeys = ['eecp', 'oxygen', 'olib', 'dfpp', 'stand'];
    const list: string[] = [];
    equipmentKeys.forEach((equip) => {
      if (data[equip as keyof ReservationData]) {
        list.push(equip);
      }
    });
    return list;
  }

  ok(): void {
    this.dialogRef.close();
  }
}

interface ReservationData {
  dfpp: boolean;
  eecp: boolean;
  name: string;
  olib: boolean;
  oxygen: boolean;
  room: string;
  stand: boolean;
  timeSlot: string;
  treatment: number;
}
