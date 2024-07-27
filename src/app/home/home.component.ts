import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { TableComponent } from '../compoment/table/table.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CsvService } from '../../services/cvs.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],

  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  formName = new FormControl('');
  step = signal(1);

  constructor(private fb: FormBuilder, private http: HttpClient,private _csvService: CsvService) {}
  inputDate: any = [];

  data: any = signal([]);

  initForm() {
    this.searchForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit() {
    // this.data.set([this.fakeData])
    this.initForm();
    // this.getData();
  }
  submit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
    } else {
      const name = this.searchForm.value.name;
      this.data.set(this.filterData(this.inputDate, name));
    }
  }

  filterData(data: any, name: string) {
    return data.filter((item: any) => {
      return item.name == name;
    });
  }

  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }

  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    // this.step.set(2)
    const importedData = this._csvService.importDataFromCSV(fileContent);
    this.inputDate = importedData

}


}
