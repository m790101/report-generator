import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() step = signal(1);
  blue = 'text-blue-600'
  gray = 'text-gray-500'
  borderBlue = 'border-blue-600'
  borderGray = 'border-gray-500'


  getTextColor(step:number){
    if(this.step() === step){
      return this.blue
    }else {
      return this.gray
    }
  }

  getBorderColor(step:number){
    if(this.step() === step){
      return this.borderBlue
    }else {
      return this.borderGray
    }
  }
}
