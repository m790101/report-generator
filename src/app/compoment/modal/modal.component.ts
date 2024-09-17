import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  showCrossBtn = true;

  @Input()
  outsideClose = false;

  @Input()
  hasLargeType = false;

  @Output()
  cancelEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  cancel(): void {
    this.cancelEvent.emit();
  }

  clickOutsideClose(): void {
    if (this.outsideClose) {
      this.cancel();
    }
  }
}
