import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent
  ],
  templateUrl:'./info-modal.component.html',
  styleUrl: './info-modal.component.scss',
})
export class InfoModalComponent {
  @Output() doConfirm = new EventEmitter();

  title = '通知' // 通知

  infoData: any={};
  buttonText ='確定' // 關閉
  buttonCancelText ='取消' // 關閉
  showCrossBtn = true;
  outsideClose = false;
  hasLargeType = true;
  showBtn = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InfoModalComponent,
    public dialogRef: MatDialogRef<InfoModalComponent>,
  ) {
    if (data) {
      this.infoData = data;
      this.infoData.title = this.title
    }
  }

  ok(): void {
    this.doConfirm.emit();
    this.dialogRef.close();
  }
 }
