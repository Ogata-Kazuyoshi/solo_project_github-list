import {
  ChangedData,
  DescriptionType,
  RawData,
} from '../interface/functionInterface';

const changeDateToString = (created: String) => {
  // console.log(created);
  const split = created.split('-');
  const day = split[2].split('T');
  return `${split[0]}-${split[1]}-${day[0]}`;
};

export const addUrl = (array: RawData[]): ChangedData[] => {
  return array.map((elm) => ({
    ...elm,
    url: `https://github.com/Ogata-Kazuyoshi/${elm.project_name}`,
    create_date: changeDateToString(elm.create_date),
    edit: false,
  }));
};

export const createDescription = (array: string[]): DescriptionType[] => {
  const result: string[] = [];
  const capital: string[] = [];
  const returnObj: DescriptionType[] = [];
  for (const elm of array) {
    const split = elm.split('/');
    for (const checkEach of split) {
      if (capital.length === 0 && checkEach !== '') {
        result.push(checkEach);
        capital.push(checkEach.toUpperCase());
      } else {
        if (!capital.includes(checkEach.toUpperCase()) && checkEach !== '') {
          result.push(checkEach);
          capital.push(checkEach.toUpperCase());
        }
      }
    }
  }
  result.sort();
  for (const elm of result) {
    const temp = { description: elm, isVisible: false };
    returnObj.push(temp);
  }

  return returnObj;
};

const checkDateType = (editDate: string): boolean => {
  const splitData = editDate.split('-');
  if (splitData.length !== 3) return false;
  if (splitData[0].length !== 4) return false;
  if (splitData[1].length !== 2 || splitData[2].length !== 2) return false;
  if (!Number(splitData[1])) return false;
  if (Number(splitData[1]) < 1 || Number(splitData[1]) > 12) return false;
  if (!Number(splitData[2])) return false;
  if (Number(splitData[2]) < 1 || Number(splitData[2]) > 31) return false;
  return true;
};

export const editValidate = (
  editName: string,
  editDate: string,
  editDescription: string
): string => {
  let cnt = 0;
  let result = '';
  if (editName === '') {
    result += `${cnt} : project_nameを入力してください\n`;
    cnt++;
  }
  if (!checkDateType(editDate)) {
    result += `${cnt} : dateの形が違います。「yyyy-mm-dd」で入力してください\n`;
    cnt++;
  }
  if (editDescription === '') {
    result += `${cnt} : descriptionを入力してください\n`;
    cnt++;
  }
  return result;
};
