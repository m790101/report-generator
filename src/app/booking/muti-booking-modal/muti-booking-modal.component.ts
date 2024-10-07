import { Component } from '@angular/core';
import { ModalComponent } from "../../compoment/modal/modal.component";

@Component({
  selector: 'app-muti-booking-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './muti-booking-modal.component.html',
  styleUrl: './muti-booking-modal.component.scss'
})
export class MutiBookingModalComponent {

  ok(){

  }
}
