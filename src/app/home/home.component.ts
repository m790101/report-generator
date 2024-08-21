import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { TableComponent } from '../compoment/table/table.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CsvService } from '../../services/cvs.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import { StepperComponent } from '../compoment/stepper/stepper.component';
import moment from 'moment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    StepperComponent
  ],

  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  formNameControl  = new FormControl('',[Validators.required]);
  step = signal(1);

  constructor(
    private fb: FormBuilder,
    private _csvService: CsvService,
    private cd: ChangeDetectorRef
  ) {}
  inputDate: any = [];

  data: any = signal([]);
  nameSet = new Set()
  availableNames = signal([]);
  dataCache:any = []

  initForm() {
    this.searchForm = this.fb.group({
      name: this.formNameControl,
    });
  }
  ngOnInit() {
    this.initForm();
    this.scrollToTop()
  }

  scrollToTop(){
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 300);
  }

  next() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
    } else {
      const name = this.searchForm.value.name;
      const filterDate = this.inputDate.filter((person:any)=>{
        return person.name === name
      })
      const resData = this.sortByDateAndId(filterDate)
      this.dataCache = resData
      console.log(resData)
      this.data.set(resData);
    }
  }


  handleSwap($event:any){
    const temp = this.dataCache[$event]
    this.dataCache[$event] = this.dataCache[$event-1]
    this.dataCache[$event-1] = temp
    this.data.set([]);
    this.data.set(this.dataCache);
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
    this.step.set(2)
    const importedData = this._csvService.importDataFromCSV(fileContent);
    this.getNames(importedData)
    this.inputDate = importedData
  }

  public getNames(data: any) {
    data.forEach((person: any) => {
      this.nameSet.add(person.name);
    });
    const res:any = []
    this.nameSet.forEach((name)=>{
      res.push(name)
    })
    this.nameSet.clear()
    this.availableNames.set(res)
  }

  toChooseName(){
    this.step.set(2)
  }
  toUpload(){
    this.step.set(1)
    this.data.set([])
    this.searchForm.reset()
    this.scrollToTop()
  }

  sortByDateAndId(dataArray:any) {
    return dataArray.sort((a:any, b:any) => {
      if(a.date !== b.date){
        const dateA = moment(a.date, "YYYYMMDD");
        const dateB = moment(b.date, "YYYYMMDD");
        return dateA.diff(dateB);
      } else{
        return a.id - b.id
      }
    });
}
}
