import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, output } from '@angular/core';
import { TableRowComponent } from './tableRow/tableRow.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableRowComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() data!: Signal<any>;
  @Input() step!: Signal<number>;

  @Output()
  backEvent = new EventEmitter();


  criteria:CriteriaItem = {
    SCC: "<2.7",
    WBC: "4-10",
    RBC: "男:4.2-6.2;女:3.7-5.5",
    HgB: "男:12.3-18.3;女:11.3-15.3",
    Hct: "男:39.0-53.0;女:33.0-47.0",
    Neut: "40-75",
    Lym: "20-45",
    Mono: "2-10",
    Baso: "0-1",
    Eosin: "0-6",
    PLT: "140-400",
    MCH: "25-34",
    MCV: "80-100",
    MCHC: "30-36",
    UColor: "Yellow",
    UPRO: "(-)",
    UGLU: "(-)",
    UURO: "Normal",
    UBIL: "(-)",
    UKET: "(-)",
    UPH: "5.0-8.0",
    UNIT: "(-)",
    USG: "1.005-1.030",
    Other: "NOT FOUND",
    ULEU: "(-)",
    UOB: "(-)",
    URBC: "0-5",
    UWBC: "0-5",
    UEP: "M:1-4，F:1-8",
    UCRY: "NOT FOUND",
    UCAS: "NOT FOUND",
    UBAC: "NOT FOUND",
    CHDL: "<5.0",
    ACGlu: "70-100",
    HBA1c: "4.0-6.0",
    TG: "30-150",
    CHOL: "<200(糖尿病<160)",
    HDLC: "40-200",
    LDLC: "<130(糖尿病<100；心血管疾病<70)",
    T4: "4.87-11.72",
    FreeT4: "0.7-1.48",
    FreeT3: "2.50-3.90",
    TSH: "0.35-4.94",
    T3: "0.35-1.93",
    Thyroglobulin: "3.5-77",
    AntiTPO: "<34",
    ANA: "(-)1:80X; >160X(+)具臨床意義",
    TBili: "0.10-1.40",
    DBili: "<0.50",
    SGOT: "5-37",
    SGPT: "<42",
    rGT: "10-47",
    ALKP: "男:40-130;女:35-105",
    BUN: "5-23",
    CreaB: "0.1-1.4",
    UA: "男:3.5-7.2;女:2.6-6.0",
    TP: "6.3-8.7",
    ALB: "3.5-5.5",
    GLO: "2.4-3.6",
    AG: "1.1-2.5",
    CEA: "0-5.00",
    AFP: "0.89-8.78",
    Cyfra: "<3.3",
    eGFR: "≧60",
    CA125: "0-35.0",
    CA199: "0-35.0",
    CA153: "0-23.5",
    CA72: "0-6.9",
    RA:"<14.0",
    STSRPR:"(-):Non-Reactive"
  }
  units = {
    SCC: "ng/mL",
    WBC: "10^3/uL",
    RBC: "10^6/uL",
    HgB: "g/dL",
    Hct: "%",
    Neut: "%",
    Lym: "%",
    Mono: "%",
    Baso: "%",
    Eosin: "%",
    PLT: "10^3/uL",
    MCH: "pg",
    MCV: "fL",
    MCHC: "g/dL",
    UColor: "",
    UPRO: "",
    UGLU: "",
    UURO: "",
    UBIL: "",
    UKET: "",
    UPH: "",
    UNIT: "",
    USG: "",
    Other: "",
    ULEU: "",
    UOB: "",
    URBC: "",
    UWBC: "",
    UEP: "",
    UCRY: "",
    UCAS: "",
    UBAC: "",
    CHDL: "mmol/L",
    ACGlu: "mg/dL",
    HBA1c: "%",
    TG: "mg/dL",
    CHOL: "mg/dL",
    HDLC: "mg/dL",
    LDLC: "mg/dL",
    T4: "μg/dL",
    FreeT4: "ng/dL",
    FreeT3: "pg/mL",
    TSH: "μIU/mL",
    T3: "ng/mL",
    Thyroglobulin: "ng/mL",
    AntiTPO: "IU/mL",
    ANA: "",
    TBili: "mg/dL",
    DBili: "mg/dL",
    SGOT: "U/L",
    SGPT: "U/L",
    rGT: "U/L",
    ALKP: "U/L",
    BUN: "mg/dL",
    CreaB: "mg/dL",
    UA: "mg/dL",
    TP: "g/dL",
    ALB: "g/dL",
    GLO: "g/dL",
    AG: "",
    CEA: "ng/mL",
    AFP: "ng/mL",
    Cyfra: "ng/mL",
    eGFR: "mL/min/1.73m^2",
    CA125: "U/mL",
    CA199: "U/mL",
    CA153: "U/mL",
    CA72: "U/mL",
    RA:'IU/ mL',
    STSRPR: ''
  }

  hasValue(key: keyof DataItem): boolean {
    return this.data().some((item:DataItem) => item[key]?.value !== null && item[key]?.value !== undefined && item[key]?.value !== '');
  }
  back(){
    this.backEvent.emit()
  }

  checkResult(result:string):string{
      if(result !== 'N'){
        return 'red'
      }
      return ''
  }

}

interface ExamItemResult{
  value:string
  resultNote:string
}


interface CriteriaItem {
  SCC?: string;
  WBC?: string;
  RBC?: string;
  HgB?: string;
  Hct?: string;
  Neut?: string;
  Lym?: string;
  Mono?: string;
  Baso?: string;
  Eosin?: string;
  PLT?: string;
  MCH?: string;
  MCV?: string;
  MCHC?: string;
  UColor?: string;
  UPRO?: string;
  UGLU?: string;
  UURO?: string;
  UBIL?: string;
  UKET?: string;
  UPH?: string;
  UNIT?: string;
  USG?: string;
  Other?: string;
  ULEU?: string;
  UOB?: string;
  URBC?: string;
  UWBC?: string;
  UEP?: string;
  UCRY?: string;
  UCAS?: string;
  UBAC?: string;
  CHDL?: string;
  ACGlu?: string;
  HBA1c?: string;
  TG?: string;
  CHOL?: string;
  HDLC?: string;
  LDLC?: string;
  T4?: string;
  FreeT4?: string;
  FreeT3?: string;
  TSH?: string;
  T3?: string;
  Thyroglobulin?: string;
  AntiTPO?: string;
  ANA?: string;
  TBili?: string;
  DBili?: string;
  SGOT?: string;
  SGPT?: string;
  rGT?: string;
  ALKP?: string;
  BUN?: string;
  CreaB?: string;
  UA?: string;
  TP?: string;
  ALB?: string;
  GLO?: string;
  AG?: string;
  CEA?: string;
  AFP?: string;
  Cyfra?: string;
  eGFR?: string;
  CA125?: string;
  CA199?: string;
  CA153?: string;
  CA72?: string;
  RA?: string;
  STSRPR?:string
}


interface DataItem {
  SCC?: ExamItemResult;
  WBC?: ExamItemResult;
  RBC?: ExamItemResult;
  HgB?: ExamItemResult;
  Hct?: ExamItemResult;
  Neut?: ExamItemResult;
  Lym?: ExamItemResult;
  Mono?: ExamItemResult;
  Baso?: ExamItemResult;
  Eosin?: ExamItemResult;
  PLT?: ExamItemResult;
  MCH?: ExamItemResult;
  MCV?: ExamItemResult;
  MCHC?: ExamItemResult;
  UColor?: ExamItemResult;
  UPRO?: ExamItemResult;
  UGLU?: ExamItemResult;
  UURO?: ExamItemResult;
  UBIL?: ExamItemResult;
  UKET?: ExamItemResult;
  UPH?: ExamItemResult;
  UNIT?: ExamItemResult;
  USG?: ExamItemResult;
  Other?: ExamItemResult;
  ULEU?: ExamItemResult;
  UOB?: ExamItemResult;
  URBC?: ExamItemResult;
  UWBC?: ExamItemResult;
  UEP?: ExamItemResult;
  UCRY?: ExamItemResult;
  UCAS?: ExamItemResult;
  UBAC?: ExamItemResult;
  CHDL?: ExamItemResult;
  ACGlu?: ExamItemResult;
  HBA1c?: ExamItemResult;
  TG?: ExamItemResult;
  CHOL?: ExamItemResult;
  HDLC?: ExamItemResult;
  LDLC?: ExamItemResult;
  T4?: ExamItemResult;
  FreeT4?: ExamItemResult;
  FreeT3?: ExamItemResult;
  TSH?: ExamItemResult;
  T3?: ExamItemResult;
  Thyroglobulin?: ExamItemResult;
  AntiTPO?: ExamItemResult;
  ANA?: ExamItemResult;
  TBili?: ExamItemResult;
  DBili?: ExamItemResult;
  SGOT?: ExamItemResult;
  SGPT?: ExamItemResult;
  rGT?: ExamItemResult;
  ALKP?: ExamItemResult;
  BUN?: ExamItemResult;
  CreaB?: ExamItemResult;
  UA?: ExamItemResult;
  TP?: ExamItemResult;
  ALB?: ExamItemResult;
  GLO?: ExamItemResult;
  AG?: ExamItemResult;
  CEA?: ExamItemResult;
  AFP?: ExamItemResult;
  Cyfra?: ExamItemResult;
  eGFR?: ExamItemResult;
  CA125?: ExamItemResult;
  CA199?: ExamItemResult;
  CA153?: ExamItemResult;
  CA72?: ExamItemResult;
  RA?: ExamItemResult;
  STSRPR?:ExamItemResult
}
