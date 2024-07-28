import { rocToAd } from '../utils/date';

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
  14: 'unit',
  15: 'resultNote'
};

export class CsvService {
  public sortByName(data: any) {


    let res:any = [];
    const map = new Map();

    data.forEach((item: any) => {
      const key = item.name + item.date;
      if (map.has(key)) {
        let singleData = map.get(key);
        const title = item.title;
        const titleChange = keyMapping[title];
        singleData = {
          ...singleData,
          [titleChange]: {
            value: item.value,
            resultNote: item.resultNote
          },
        };
        // singleData.item.title = item.value
        map.set(key, singleData);
      } else {
        const title = item.title;
        const titleChange = keyMapping[title];
        // add new key to map
        const newData = {
          name: item.name,
          [titleChange]: {
            value: item.value,
            resultNote: item.resultNote
          },
          date: rocToAd(item.date),
        };
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
    return sortedData;
  }
}
