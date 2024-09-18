import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { InfoModalComponent } from "@src/app/compoment/info-modal/info-modal.component";


@Injectable({
  providedIn: 'root',
})


export class ModalService {

constructor(public dialog: MatDialog){
}

  showInfoModal(modalData:any, next = ()=>{}){

    const dialogRef = this.dialog.open( InfoModalComponent, {
      data: modalData,
    });

    dialogRef.componentInstance.doConfirm.subscribe((payload) => {
      next()
    });

    return dialogRef
  }

}
