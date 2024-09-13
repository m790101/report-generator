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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddBookingModalComponent,
    public dialogRef: MatDialogRef<AddBookingModalComponent>,
    private fb: FormBuilder
  ) {
    if (data) {
      this.bookingData = data;
    }
  }

  equipmentList = [
    { name: 'eecp',key:'eecp' },
    { name: '氫氧',key:'oxygen' },
    { name: 'olib',key:'olib' },
    { name: 'dfpp',key:'dfpp' },
    { name: '點滴架',key:'drip' },
  ];
  treatmentList = [
    { name: 'eecp',value:'1' },
    { name: 'dfpp',value:'2' },
    ]

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
      drip: new FormControl(false),
    });
  }
  ngOnInit() {
    this.initForm();
  }
  submit(){
    if(this.addBookingForm.invalid){
      this.addBookingForm.markAllAsTouched();
      console.log('invalid');
    } else {
      console.log(this.addBookingForm.value);
    }

  }

  ok(): void {
    this.doConfirm.emit();
    this.dialogRef.close();
  }
}
