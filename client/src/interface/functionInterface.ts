export interface RawData {
  id: number;
  project_name: string;
  create_date: string;
  description: string;
  like: boolean;
}

export interface AddUrl {
  url: string;
  edit: boolean;
}

export type ChangedData = RawData & AddUrl;

export interface DescriptionType {
  description: string;
  isVisible: boolean;
}

export interface Todescription {
  description: DescriptionType[];
  setDescription: (arg: DescriptionType[]) => void;
}

export interface ViewAll {
  viewAll: boolean;
  setViewAll: (arg: boolean) => void;
}

export type ViewAllAndDescription = ViewAll & Todescription;

export interface CheckedData {
  checkedData: ChangedData[];
}

export interface AllData {
  allData: ChangedData[];
  setAllData: (arg: ChangedData[]) => void;
  isModal: boolean;
  setIsModal: (arg: boolean) => void;
}

export type AllDataAndDescription = AllData & Todescription;

export interface EditData {
  project_name?: string;
  create_date?: string;
  description?: string;
  like?: boolean;
}

export interface ModalType {
  setIsModal: (arg: boolean) => void;
  setAllData: (arg: ChangedData[]) => void;
}

export interface AuthData {
  username: string;
  password: string;
}

export interface IsAuthChange {
  isAuth: boolean;
  setIsAuth: (arg: boolean) => void;
}

export interface IsAuthCurrent {
  isAuth: boolean;
}
