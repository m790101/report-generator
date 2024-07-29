import { rocToAd } from '../utils/date';

const defaultData: any = {
  id:1,
  name: '',
  date: '',
  SCC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  WBC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  RBC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  HgB: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Hct: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Neut: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Lym: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Mono: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Baso: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Eosin: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  PLT: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  MCH: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  MCV: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  MCHC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UColor: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UPRO: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UGLU: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UURO: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UBIL: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UKET: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UPH: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UNIT: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  USG: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Other: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  ULEU: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UOB: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  URBC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UWBC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UEP: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UCRY: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UCAS: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UBAC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CHDL: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  ACGlu: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  HBA1c: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  TG: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CHOL: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  HDLC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  LDLC: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  T4: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  FreeT4: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  FreeT3: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  TSH: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  T3: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Thyroglobulin: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  AntiTPO: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  ANA: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  TBili: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  DBili: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  SGOT: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  SGPT: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  rGT: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  ALKP: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  BUN: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CreaB: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  UA: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  TP: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  ALB: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  GLO: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  AG: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CEA: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  AFP: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  Cyfra: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  eGFR: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CA125: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CA199: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CA153: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  CA72: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  allergen: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  RA: { title: '', value: '', units: '', resultNote: '', criteria: '' },
  STSRPR: { title: '', value: '', units: '', resultNote: '', criteria: '' }
};

const keyMapping: any = {
  '子宮頸跟食道癌/SCC': 'SCC',
  '白血球計數/WBC': 'WBC',
  '紅 血 球/RBC': 'RBC',
  '血 色 素/HgB': 'HgB',
  '血球容積比值/Hct': 'Hct',
  '嗜中性白血球/Neut%': 'Neut',
  '淋巴球/Lym%': 'Lym',
  '單核球/Mono%': 'Mono',
  '嗜鹼性白血球/Baso%': 'Baso',
  '嗜酸性白血球/Eosin%': 'Eosin',
  '血小板計數/PLT': 'PLT',
  '紅血球平均血紅素/MCH': 'MCH',
  '紅血球平均體積值/MCV': 'MCV',
  '平均血色素濃度值/MCHC': 'MCHC',
  '尿液顏色/U-Color': 'UColor',
  '尿 蛋 白/U-PRO': 'UPRO',
  '尿    糖/U-GLU': 'UGLU',
  '尿膽素原/U-URO': 'UURO',
  '尿膽紅素/U-BIL': 'UBIL',
  '尿 丙 酮/U-KET': 'UKET',
  '尿酸鹼度/U-PH': 'UPH',
  '亞硝酸鹽/U-NIT': 'UNIT',
  '尿液比重/U-SG': 'USG',
  '其他/Other': 'Other',
  '白血球酯/U-LEU': 'ULEU',
  '尿液潛血反應/U-OB': 'UOB',
  '尿紅血球/U-RBC': 'URBC',
  '尿白血球/U-WBC': 'UWBC',
  '上皮細胞/U-EP': 'UEP',
  '尿結晶體/U-CRY': 'UCRY',
  '尿圓柱體/U-CAS': 'UCAS',
  '尿中細菌/U-BAC': 'UBAC',
  '血管硬化指數/C/HDL': 'CHDL',
  '飯前血糖/AC-Glu': 'ACGlu',
  '醣化血色素/HBA1c': 'HBA1c',
  '中性酯肪[三酸甘油酯]/T-G': 'TG',
  '血清總膽固醇/CHOL': 'CHOL',
  '高密度膽固醇/HDL-C': 'HDLC',
  '低密度膽固醇/LDL-C': 'LDLC',
  '四碘甲狀腺素/T4': 'T4',
  '游離四碘甲狀腺素/FreeT4': 'FreeT4',
  '游離三碘甲狀腺素/FreeT3': 'FreeT3',
  '甲狀腺促進素/TSH': 'TSH',
  '三碘甲狀腺素/T3': 'T3',
  '甲狀腺球蛋白/Thyroglobulin': 'Thyroglobulin',
  '甲狀腺過氧化脢抗體/Anti-TPO': 'AntiTPO',
  '抗核抗體/ANA': 'ANA',
  '總膽紅素值/T-Bili': 'TBili',
  '直接膽紅素/D-Bili': 'DBili',
  '草酸轉氨基酵素/SGOT': 'SGOT',
  '丙酮轉氨基酵素/SGPT': 'SGPT',
  '丙種麩晞轉移酵素/r-GT': 'rGT',
  '鹼性磷酸/ALK-P': 'ALKP',
  '尿 素 氮/BUN': 'BUN',
  '肌 酸 酐(血液)/Crea(B)': 'CreaB',
  '尿    酸/UA': 'UA',
  '總 蛋 白/T-P': 'TP',
  '白 蛋 白/ALB': 'ALB',
  '球 蛋 白/GLO': 'GLO',
  '白蛋白/球蛋白/A/G': 'AG',
  '大腸癌胚抗原/CEA': 'CEA',
  '甲種胎兒球蛋白/AFP': 'AFP',
  '非小細胞肺癌標記/Cyfra 21-1': 'Cyfra',
  '腎絲球過濾速率/eGFR': 'eGFR',
  '卵巢癌篩檢標記/CA-125': 'CA125',
  '胰 腸胃道腫瘤/CA-199': 'CA199',
  '乳癌篩檢標記/CA-153': 'CA153',
  '胃癌抗原 72-4/CA72-4': 'CA724',
  '224項過敏原/224項過敏?': 'allergen',
  '類風濕性關節炎因子/RA(定量)':'RA',
  '梅毒血清反應/STS-RPR':'STSRPR'
};

const columnMap: any = {
  5: 'date',
  7: 'name',
  10: 'title',
  11: 'value',
  13:'criteria',
  14: 'units',
  15: 'resultNote'
};


function makeNewDataItem(item:any,titleChange:any,id:number){
  const newData = {
    ...defaultData,
    name: item.name,
    id: id,
    date: rocToAd(item.date),
    [titleChange]: {
      value: item.value,
      resultNote: item.resultNote,
      units: item.units,
      criteria: item.criteria,
    },
  };
  return newData
}

export class CsvService {
  public sortByName(data: any) {


    let res:any = [];
    const map = new Map();
    let id = 1
    data.forEach((item: any) => {
      const key = item.name + item.date;
      if (map.has(key)) {
        let singleData = map.get(key);

        const title = item.title;
        const titleChange = keyMapping[title];

        if(singleData[titleChange].value.length > 0){
          // add new one
          if (map.has(key + '2')){
            let secondData = map.get(key+'2');
            secondData[titleChange] = {
              value: item.value,
              resultNote: item.resultNote,
              units: item.units,
              criteria: item.criteria,
              title: item.title
            }
          } else {
            const newData = makeNewDataItem(item,titleChange,id+1)
            const updateKey = item.name + item.date + '2'
            map.set(updateKey, newData);
          }
        }
        else{
          singleData[titleChange] = {
            value: item.value,
            resultNote: item.resultNote,
            units: item.units,
            criteria: item.criteria,
            title: item.title
          }

        }
      } else {
        const title = item.title;
        const titleChange = keyMapping[title];
        const newData = makeNewDataItem(item,titleChange,id)
        map.set(key, newData);
      }
    });

    map.forEach((value, key) => {
      res.push(value);
    });

    return res;
  }



  public importDataFromCSV(csvText: string): Array<any> {
    const dataRows = csvText
      .split('\n')
      .map((row) => row.trimEnd().replace(/"$/, ''));
    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let obj: any = new Object();
      for (let index = 5; index < values.length; index++) {
        let val: any = columnMap[index]
        if (!val) {
          continue;
        }

        obj[columnMap[index]] = values[index]?.replace(/\\|"/g, '');
      }
      if (Object.keys(obj).length !== 0) {
        dataArray.push(obj);
      }
    });


    const sortedData = this.sortByName(dataArray)
    console.log(sortedData)
    return sortedData;
  }
}




