import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tableRow.component.html',
  styleUrl: './tableRow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableRowComponent implements OnInit{

  @Input() key!: string;
  @Input() data!: Signal<any>;
  @Input() criteria: any;
  @Input() units: any;

  checkResult(resultNote: string): string {
    // Implement your checkResult logic here
    return resultNote ? 'red' : 'black'; // Example implementation
  }

  hasValue(key: string): boolean {
    return this.data().some(
      (item: any) => item[key] !== null && item[key] !== undefined && item[key] !== ''
    );
  }

  ngOnInit(): void {
   console.log('keyyyy',this.key)
  }
}
