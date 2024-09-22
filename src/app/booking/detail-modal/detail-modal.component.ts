import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { ModalComponent } from '../../compoment/modal/modal.component';
import { SafeHtml } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '@src/services/modal.service';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    CommonModule,
  ],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent implements OnInit {
  @Output() doCancel = new EventEmitter();
  @Output() doEdit = new EventEmitter();

  editBookingForm!: FormGroup;
  isEdit = false;
  title = '預約詳情'; // 通知
  content: string | SafeHtml = '';
  detailData: any = {};
  buttonText = 'close'; // 關閉
  showCrossBtn = true;
  outsideClose = false;
  hasLargeType = true;
  showBtn = true;

  equipmentList = [
    { name: 'eecp', key: 'eecp' },
    { name: '氫氧', key: 'oxygen' },
    { name: 'olib', key: 'olib' },
    { name: 'dfpp', key: 'dfpp' },
    { name: '點滴架', key: 'stand' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailModalComponent,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private modelService: ModalService,
    private fb: FormBuilder
  ) {
    if (data) {
      this.detailData = data;
    }
  }

  initForm() {
    this.editBookingForm = this.fb.group({
      name: new FormControl(this.detailData.name, [Validators.required]),
      treatment: new FormControl(this.getInitialTreatment(), [
        Validators.required,
      ]),
      eecp: new FormControl(this.getInitialEquipState('eecp')),
      oxygen: new FormControl(this.getInitialEquipState('oxygen')),
      olib: new FormControl(this.getInitialEquipState('olib')),
      dfpp: new FormControl(this.getInitialEquipState('dfpp')),
      stand: new FormControl(this.getInitialEquipState('stand')),
    });
  }

  getInitialTreatment() {
    const treatmentSelect = this.detailData.treatments.find((item: any) => {
      return item.name === this.detailData.treatment;
    });
    return treatmentSelect.value;
  }

  getInitialEquipState(name: string) {
    return this.detailData.equipment.includes(name);
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

  editBooking() {
    this.isEdit = true;
  }
  cancelEditBooking() {
    this.isEdit = false;
  }
  submitEditBooking() {
    if(this.editBookingForm.invalid){
      console.log('invalid')
      this.editBookingForm.markAllAsTouched()
    } else {
      const rawData = this.editBookingForm.value
      const equipment = this.getEquipmentList(rawData);
      const payload = {
        date:this.detailData.date,
        room:this.detailData.room,
        timeSlot:this.detailData.timeSlot,
        ...this.editBookingForm.value,
        equipment
      }
    this.doEdit.emit(payload);
    this.ok()
    }

  }
  ngOnInit() {
    this.initForm();
  }
  ok(): void {
    // this.doConfirm.emit();
    this.dialogRef.close();
  }
  cancelReservation() {
    // this.modelService.showInfoModal({})
    const isCancel = true;
    this.doCancel.emit(this.detailData);
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
