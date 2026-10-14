export type PrapatraId =
  | 'prapatra_1'
  | 'prapatra_2'
  | 'prapatra_3'
  | 'prapatra_4'
  | 'prapatra_5'
  | 'prapatra_6'
  | 'prapatra_7'
  | 'prapatra_8'
  | 'prapatra_9'
  | 'prapatra_10';

export interface SchoolProfile {
  id?: string;
  schoolName: string;
  udiseCode: string; // 11 digits
  block: string;
  district: string;
  headmasterName: string;
  headmasterUid: string;
  headmasterEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherRecord {
  id?: string;
  schoolId: string;
  formCategory: PrapatraId;
  orderIndex?: number;
  
  // Standard fields mapped across forms
  teacherName: string;
  bpscRollNo?: string;
  pranNo?: string;
  uanNo?: string;
  gpfOrPranNo?: string;
  sakshamtaAppNo?: string;
  classLevel?: string; // '1-5' | '6-8' | '9-10' | '11-12' | '1-5 / 6-8' | '9-10 / 11-12'
  designation?: string;
  subject?: string;
  subCategory?: string; // TRE-1/2/3, Exclusive-1..4, Phase-1/2, BPSC/34540/Anukampa/Court Case
  niyojanUnit?: string;
  udiseCode?: string;
  schoolName?: string;
  firstJoiningDate?: string; // dd/mm/yyyy
  firstNiyojitJoiningDate?: string; // dd/mm/yyyy
  firstSpecialJoiningDate?: string; // dd/mm/yyyy (as Exclusive / HT / HM)
  presentJoiningDate?: string; // dd/mm/yyyy
  dob?: string; // dd/mm/yyyy
  headFund?: string; // Gob / SSA
  basicPay?: string;
  hraRate?: string; // 5% / 7.5% / 10%
  incrementDate?: string; // dd/mm/yyyy
  mobileNo?: string;
  remarks?: string;

  createdAt?: string;
  updatedAt?: string;
}

export type InputFieldType = 'text' | 'date' | 'select' | 'number';

export interface ColumnDefinition {
  colNumber: number;
  key: keyof TeacherRecord;
  headerLabel: string;
  subHeader?: string;
  excelHeader: string;
  widthPercent: number;
  type: InputFieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

export interface FormDefinition {
  id: PrapatraId;
  prapatraNumber: string; // 'प्रपत्र-I'
  titleHindi: string; // 'विद्यालय अध्यापक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी'
  fullTitle: string; // 'प्रपत्र-I : विद्यालय अध्यापक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी'
  categoryName: string; // 'विद्यालय अध्यापक (1-8)'
  description: string;
  classRange: string;
  teacherType: string;
  subtitle: string; // '(ENGLISH ARIAL FONT ONLY)'
  certificationType: 'standard_beo' | 'beo_and_hm';
  columns: ColumnDefinition[];
}
