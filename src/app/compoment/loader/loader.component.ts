import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from '@src/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading = false
  constructor(private loaderService: LoaderService, private changeDetectorRef: ChangeDetectorRef){}
  ngOnInit(): void {
    this.loaderService.loading$.subscribe((status: boolean) => {
      console.log(status)
      this.isLoading = status;
      this.trigger();
    });
  }

  trigger(): void {
    this.changeDetectorRef.detectChanges();
  }
}
