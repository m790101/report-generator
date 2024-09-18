import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ModalComponent } from "../../compoment/modal/modal.component";
import { SafeHtml } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '@src/services/modal.service';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss'
})
export class DetailModalComponent {

  @Output() doConfirm = new EventEmitter();


  title = '預約詳情' // 通知
  content: string | SafeHtml = '';
  detailData: any={};
  buttonText ='close' // 關閉
  showCrossBtn = true;
  outsideClose = false;
  hasLargeType = true;
  showBtn = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailModalComponent,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private modelService: ModalService
  ) {
    if (data) {
      this.detailData = data;
    }
  }
  ok(): void {
    // this.doConfirm.emit();
    this.dialogRef.close();
  }
  cancelReservation(){
    // this.modelService.showInfoModal({})
    const isCancel = true
    this.doConfirm.emit(this.detailData);
    this.dialogRef.close();
  }

}
