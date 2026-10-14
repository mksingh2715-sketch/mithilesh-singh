import { FormDefinition } from '../types/prapatra';

export const OFFICIAL_CERTIFICATION_POINTS = [
  '(1) उपरोक्त प्रपत्र में सम्मिलित सभी कर्मी वैधानिक रूप से विद्यालय में पदस्थापित हैं एवं नियमित रूप से कार्यरत हैं।',
  '(2) उक्त कर्मियों के नियोजन/पदस्थापना के संबंध में किसी भी प्रकार का विवाद अथवा न्यायालयी मामला प्रक्रियाधीन नहीं है।',
  '(3) विद्यालय के सभी पदस्थापित शिक्षकों/कर्मियों का विवरण प्रपत्र में सम्मिलित है एवं किसी भी शिक्षक का नाम छूटा नहीं है।'
];

export const FORMS_DEFINITIONS: FormDefinition[] = [
  // ----------------------------------------------------
  // PRAPATRA I : विद्यालय अध्यापक (1-8)
  // ----------------------------------------------------
  {
    id: 'prapatra_1',
    prapatraNumber: 'प्रपत्र-I',
    categoryName: 'विद्यालय अध्यापक (1-8)',
    titleHindi: 'विद्यालय अध्यापक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-I : विद्यालय अध्यापक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'BPSC शिक्षक TRE-1, TRE-2, TRE-3 (कक्षा 1 से 8)',
    classRange: '1-5 / 6-8',
    teacherType: 'BPSC Vidyalaya Adhyapak (Primary & Middle)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'bpscRollNo', headerLabel: 'BPSC Roll\nNo.', excelHeader: 'BPSC Roll No.', widthPercent: 6.5, type: 'text', placeholder: 'Roll No.' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text', placeholder: 'PRAN' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 10.5, type: 'text', required: true, placeholder: 'FULL NAME (ARIAL)' },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class\n(1-5 /\n6-8)', excelHeader: 'Class (1-5 / 6-8)', widthPercent: 4.0, type: 'select', options: ['1-5', '6-8'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.5, type: 'text', placeholder: 'General / Subject' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(TRE-1/2/3)', excelHeader: 'Category (TRE-1/2/3)', widthPercent: 5.0, type: 'select', options: ['TRE-1', 'TRE-2', 'TRE-3'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 18.0, type: 'text' },
      { colNumber: 10, key: 'firstJoiningDate', headerLabel: '1st School\nJoining Date\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.5, type: 'number', placeholder: 'Basic Pay' },
      { colNumber: 13, key: 'hraRate', headerLabel: 'HRA\n(5%/ 7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 4.0, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 14, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 15, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text', placeholder: '10 digits' },
      { colNumber: 16, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 3.0, type: 'text', placeholder: 'Remarks' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA II : विशिष्ट शिक्षक (1-8)
  // ----------------------------------------------------
  {
    id: 'prapatra_2',
    prapatraNumber: 'प्रपत्र-II',
    categoryName: 'विशिष्ट शिक्षक (1-8)',
    titleHindi: 'विशिष्ट शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-II : विशिष्ट शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'सक्षमता परीक्षा उत्तीर्ण विशिष्ट शिक्षक (कक्षा 1 से 8)',
    classRange: '1-5 / 6-8',
    teacherType: 'Vishisht Shikshak (Primary & Middle)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl. No.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'sakshamtaAppNo', headerLabel: 'Sakshamta\nApplication\nNo.', excelHeader: 'Sakshamta Application No.', widthPercent: 6.5, type: 'text', placeholder: 'App No.' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text', placeholder: 'PRAN' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of\nTeacher', excelHeader: 'Name of Teacher', widthPercent: 10.0, type: 'text', required: true, placeholder: 'FULL NAME' },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class (1-5 /\n6-8)', excelHeader: 'Class (1-5 / 6-8)', widthPercent: 4.0, type: 'select', options: ['1-5', '6-8'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text', placeholder: 'Subject' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(Exclusive-\n1,2,3,4)', excelHeader: 'Category (Exclusive- 1,2,3,4)', widthPercent: 5.0, type: 'select', options: ['Exclusive-1', 'Exclusive-2', 'Exclusive-3', 'Exclusive-4'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of\nSchool', excelHeader: 'Name of School', widthPercent: 16.5, type: 'text' },
      { colNumber: 10, key: 'firstNiyojitJoiningDate', headerLabel: 'Date of 1st\nJoining as\nNiyojit\n(dd/mm/yyyy)', excelHeader: 'Date of 1st Joining as Niyojit Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'firstSpecialJoiningDate', headerLabel: '1st School\nJoining as\nExclusive\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date as Exclusive Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'presentJoiningDate', headerLabel: 'Present\nSchool Join\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 13, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.0, type: 'number', placeholder: 'Basic' },
      { colNumber: 14, key: 'hraRate', headerLabel: 'HRA (5%/\n7.5%/ 10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 3.5, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 15, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 16, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text', placeholder: 'Mobile' },
      { colNumber: 17, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 2.5, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA III : प्रधान शिक्षक (1-5)
  // ----------------------------------------------------
  {
    id: 'prapatra_3',
    prapatraNumber: 'प्रपत्र-III',
    categoryName: 'प्रधान शिक्षक (1-5)',
    titleHindi: 'प्रधान शिक्षक (1-5) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-III : प्रधान शिक्षक (1-5) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'BPSC प्रधान शिक्षक Head Teacher (कक्षा 1 से 5)',
    classRange: '1-5',
    teacherType: 'Head Teacher (Class 1-5)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl. No.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'bpscRollNo', headerLabel: 'BPSC Roll\nNo.', excelHeader: 'BPSC Roll No.', widthPercent: 6.5, type: 'text', placeholder: 'Roll No.' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text', placeholder: 'PRAN' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of\nTeacher', excelHeader: 'Name of Teacher', widthPercent: 10.0, type: 'text', required: true, placeholder: 'FULL NAME' },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class (1-5)', excelHeader: 'Class (1-5)', widthPercent: 4.0, type: 'select', options: ['1-5'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text', placeholder: 'General / Subject' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(Phase- 1/2)', excelHeader: 'Category (Phase- 1/2)', widthPercent: 5.0, type: 'select', options: ['Phase-1', 'Phase-2'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of\nSchool', excelHeader: 'Name of School', widthPercent: 16.5, type: 'text' },
      { colNumber: 10, key: 'firstNiyojitJoiningDate', headerLabel: 'Date of 1st\nJoining as\nNiyojit\n(dd/mm/yyyy)', excelHeader: 'Date of 1st Joining as Niyojit Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'firstSpecialJoiningDate', headerLabel: '1st School\nJoining Date\nas HT\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date as HT', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'presentJoiningDate', headerLabel: 'Present\nSchool Join\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 13, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.0, type: 'number' },
      { colNumber: 14, key: 'hraRate', headerLabel: 'HRA (5%/\n7.5%/ 10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 3.5, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 15, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 16, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 17, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 2.5, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA IV : विद्यालय अध्यापक (9-12)
  // ----------------------------------------------------
  {
    id: 'prapatra_4',
    prapatraNumber: 'प्रपत्र-IV',
    categoryName: 'विद्यालय अध्यापक (9-12)',
    titleHindi: 'विद्यालय अध्यापक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-IV : विद्यालय अध्यापक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'BPSC शिक्षक TRE-1, TRE-2, TRE-3 (माध्यमिक एवं उच्च माध्यमिक)',
    classRange: '9-10 / 11-12',
    teacherType: 'BPSC Vidyalaya Adhyapak (Secondary & Sr Secondary)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'bpscRollNo', headerLabel: 'BPSC Roll\nNo.', excelHeader: 'BPSC Roll No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 10.5, type: 'text', required: true },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class\n(9-10 /\n11-12)', excelHeader: 'Class (9-10 / 11-12)', widthPercent: 4.0, type: 'select', options: ['9-10', '11-12'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.5, type: 'text' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(TRE-1/2/3)', excelHeader: 'Category (TRE-1/2/3)', widthPercent: 5.0, type: 'select', options: ['TRE-1', 'TRE-2', 'TRE-3'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 18.0, type: 'text' },
      { colNumber: 10, key: 'firstJoiningDate', headerLabel: '1st School\nJoining Date\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.5, type: 'number' },
      { colNumber: 13, key: 'hraRate', headerLabel: 'HRA\n(5%/ 7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 4.0, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 14, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 15, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 16, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 3.0, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA V : विशिष्ट शिक्षक (9-12)
  // ----------------------------------------------------
  {
    id: 'prapatra_5',
    prapatraNumber: 'प्रपत्र-V',
    categoryName: 'विशिष्ट शिक्षक (9-12)',
    titleHindi: 'विशिष्ट शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-V : विशिष्ट शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'सक्षमता परीक्षा उत्तीर्ण विशिष्ट शिक्षक (माध्यमिक एवं उच्च माध्यमिक)',
    classRange: '9-10 / 11-12',
    teacherType: 'Vishisht Shikshak (Secondary & Higher Secondary)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl. No.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'sakshamtaAppNo', headerLabel: 'Sakshamta\nApplication\nNo.', excelHeader: 'Sakshamta Application No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of\nTeacher', excelHeader: 'Name of Teacher', widthPercent: 10.0, type: 'text', required: true },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class (9-10 /\n11-12)', excelHeader: 'Class (9-10 / 11-12)', widthPercent: 4.0, type: 'select', options: ['9-10', '11-12'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(Exclusive-\n1,2,3,4)', excelHeader: 'Category (Exclusive- 1,2,3,4)', widthPercent: 5.0, type: 'select', options: ['Exclusive-1', 'Exclusive-2', 'Exclusive-3', 'Exclusive-4'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of\nSchool', excelHeader: 'Name of School', widthPercent: 16.5, type: 'text' },
      { colNumber: 10, key: 'firstNiyojitJoiningDate', headerLabel: 'Date of 1st\nJoining as\nNiyojit\n(dd/mm/yyyy)', excelHeader: 'Date of 1st Joining as Niyojit Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'firstSpecialJoiningDate', headerLabel: '1st School\nJoining as\nExclusive\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date as Exclusive Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'presentJoiningDate', headerLabel: 'Present\nSchool Join\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 13, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.0, type: 'number' },
      { colNumber: 14, key: 'hraRate', headerLabel: 'HRA (5%/\n7.5%/ 10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 3.5, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 15, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 16, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 17, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 2.5, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA VI : प्रधानाध्यापक (9-12)
  // ----------------------------------------------------
  {
    id: 'prapatra_6',
    prapatraNumber: 'प्रपत्र-VI',
    categoryName: 'प्रधानाध्यापक (9-12)',
    titleHindi: 'प्रधानाध्यापक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-VI : प्रधानाध्यापक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'BPSC प्रधानाध्यापक Headmaster (माध्यमिक एवं उच्च माध्यमिक)',
    classRange: '9-10 / 11-12',
    teacherType: 'Headmaster (Secondary & Higher Secondary)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl. No.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'bpscRollNo', headerLabel: 'BPSC Roll\nNo.', excelHeader: 'BPSC Roll No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'pranNo', headerLabel: 'PRAN No.', excelHeader: 'PRAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 4, key: 'teacherName', headerLabel: 'Name of\nTeacher', excelHeader: 'Name of Teacher', widthPercent: 10.0, type: 'text', required: true },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class (9-10 /\n11-12)', excelHeader: 'Class (9-10 / 11-12)', widthPercent: 4.0, type: 'select', options: ['9-10', '11-12'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text' },
      { colNumber: 7, key: 'subCategory', headerLabel: 'Category\n(Phase- 1/2)', excelHeader: 'Category (Phase- 1/2)', widthPercent: 5.0, type: 'select', options: ['Phase-1', 'Phase-2'] },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of\nSchool', excelHeader: 'Name of School', widthPercent: 16.5, type: 'text' },
      { colNumber: 10, key: 'firstNiyojitJoiningDate', headerLabel: 'Date of 1st\nJoining as\nNiyojit\n(dd/mm/yyyy)', excelHeader: 'Date of 1st Joining as Niyojit Teacher', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'firstSpecialJoiningDate', headerLabel: '1st School\nJoining Date\nas HM\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date as HM', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'presentJoiningDate', headerLabel: 'Present\nSchool Join\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 13, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.0, type: 'number' },
      { colNumber: 14, key: 'hraRate', headerLabel: 'HRA (5%/\n7.5%/ 10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 3.5, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 15, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 16, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 17, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 2.5, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA VII : पुराने नियमित वेतनमान प्राप्त शिक्षक (1-8)
  // ----------------------------------------------------
  {
    id: 'prapatra_7',
    prapatraNumber: 'प्रपत्र-VII',
    categoryName: 'पुराने नियमित वेतनमान प्राप्त शिक्षक (1-8)',
    titleHindi: 'पुराने नियमित वेतनमान प्राप्त शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-VII : पुराने नियमित वेतनमान प्राप्त शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'पुराने नियमित वेतनमान प्राप्त शिक्षक (कक्षा 1 से 8)',
    classRange: '1-8',
    teacherType: 'Old Regular Scale Teachers (Primary/Middle)',
    certificationType: 'beo_and_hm', // Has both Middle School HM & BEO signature boxes
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'gpfOrPranNo', headerLabel: 'GPF No/\nPRAN No.', excelHeader: 'GPF No/ PRAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 10.5, type: 'text', required: true },
      { colNumber: 4, key: 'designation', headerLabel: 'Designation\n(Asst. / Grad.\nTeacher/HM)', excelHeader: 'Designation', widthPercent: 6.5, type: 'select', options: ['Asst. Teacher', 'Graduate Teacher', 'HM'] },
      { colNumber: 5, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text' },
      { colNumber: 6, key: 'subCategory', headerLabel: 'Category\n(BPSC/34540/\nAnukampa)', excelHeader: 'Category (BPSC/34540/Anukampa/Court Case)', widthPercent: 5.5, type: 'select', options: ['BPSC', '34540', 'Anukampa', 'Court Case'] },
      { colNumber: 7, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 8, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 18.0, type: 'text' },
      { colNumber: 9, key: 'firstJoiningDate', headerLabel: '1st School\nJoining Date\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 10, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'headFund', headerLabel: 'Head\n(Gob/\nSSA)', excelHeader: 'Head (Gob/ SSA)', widthPercent: 4.0, type: 'select', options: ['Gob', 'SSA'] },
      { colNumber: 12, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.5, type: 'number' },
      { colNumber: 13, key: 'hraRate', headerLabel: 'HRA\n(5%/\n7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 4.0, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 14, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 15, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 16, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 3.0, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA VIII : पुराने नियमित वेतनमान प्राप्त शिक्षक (9-12)
  // ----------------------------------------------------
  {
    id: 'prapatra_8',
    prapatraNumber: 'प्रपत्र-VIII',
    categoryName: 'पुराने नियमित वेतनमान प्राप्त शिक्षक (9-12)',
    titleHindi: 'पुराने नियमित वेतनमान प्राप्त शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-VIII : पुराने नियमित वेतनमान प्राप्त शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'पुराने नियमित वेतनमान प्राप्त शिक्षक एवं कर्मी (माध्यमिक एवं उच्च माध्यमिक)',
    classRange: '9-12',
    teacherType: 'Old Regular Scale Teachers / Staff (Class 9-12)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'gpfOrPranNo', headerLabel: 'GPF No/\nPRAN No.', excelHeader: 'GPF No/ PRAN No.', widthPercent: 7.0, type: 'text' },
      { colNumber: 3, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 11.0, type: 'text', required: true },
      { colNumber: 4, key: 'designation', headerLabel: 'Designation\n(Asstt./TGT/\nHM/Clerk)', excelHeader: 'Designation', widthPercent: 6.5, type: 'select', options: ['Asstt. Teacher', 'TGT', 'HM', 'Clerk', 'Peon'] },
      { colNumber: 5, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.5, type: 'text' },
      { colNumber: 6, key: 'subCategory', headerLabel: 'Category\n(BPSC/ 34540/\nAnukampa)', excelHeader: 'Category (BPSC/34540/Anukampa/Court Case)', widthPercent: 6.0, type: 'select', options: ['BPSC', '34540', 'Anukampa', 'Court Case'] },
      { colNumber: 7, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 8, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 18.5, type: 'text' },
      { colNumber: 9, key: 'firstJoiningDate', headerLabel: '1st School\nJoining Date\n(dd/mm/yyyy)', excelHeader: '1st School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 10, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.5, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.5, type: 'number' },
      { colNumber: 12, key: 'hraRate', headerLabel: 'HRA\n(5%/\n7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 4.0, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 13, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 14, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.5, type: 'text' },
      { colNumber: 15, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 4.0, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA IX : स्थानीय निकाय के नियोजित शिक्षक (1-8)
  // ----------------------------------------------------
  {
    id: 'prapatra_9',
    prapatraNumber: 'प्रपत्र-IX',
    categoryName: 'स्थानीय निकाय के नियोजित शिक्षक (1-8)',
    titleHindi: 'स्थानीय निकाय के नियोजित शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-IX : स्थानीय निकाय के नियोजित शिक्षक (1-8) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'पंचायत / प्रखंड / नगर शिक्षक (कक्षा 1 से 8)',
    classRange: '1-5 / 6-8',
    teacherType: 'Local Body Niyojit Teachers (Primary & Middle)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'uanNo', headerLabel: 'UAN No.', excelHeader: 'UAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 10.0, type: 'text', required: true },
      { colNumber: 4, key: 'designation', headerLabel: 'Designation\n(Panch./Block/\nNagar)', excelHeader: 'Designation', widthPercent: 6.0, type: 'select', options: ['Panchayat Teacher', 'Block Teacher', 'Nagar Teacher'] },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class\n(1-5/\n6-8)', excelHeader: 'Class (1-5 / 6-8)', widthPercent: 4.0, type: 'select', options: ['1-5', '6-8'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text' },
      { colNumber: 7, key: 'niyojanUnit', headerLabel: 'Name of Niyojan\nUnit', excelHeader: 'Name of Niyojan Unit', widthPercent: 6.5, type: 'text' },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 16.5, type: 'text' },
      { colNumber: 10, key: 'dob', headerLabel: 'Date of Birth\n(dd/mm/yyyy)', excelHeader: 'Date of Birth', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'headFund', headerLabel: 'Head\n(Gob/\nSSA)', excelHeader: 'Head (Gob/ SSA)', widthPercent: 4.0, type: 'select', options: ['Gob', 'SSA'] },
      { colNumber: 13, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.0, type: 'number' },
      { colNumber: 14, key: 'hraRate', headerLabel: 'HRA\n(5%/\n7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 3.5, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 15, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 16, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 17, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 2.5, type: 'text' },
    ]
  },

  // ----------------------------------------------------
  // PRAPATRA X : स्थानीय निकाय के नियोजित शिक्षक (9-12)
  // ----------------------------------------------------
  {
    id: 'prapatra_10',
    prapatraNumber: 'प्रपत्र-X',
    categoryName: 'स्थानीय निकाय के नियोजित शिक्षक (9-12)',
    titleHindi: 'स्थानीय निकाय के नियोजित शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    fullTitle: 'प्रपत्र-X : स्थानीय निकाय के नियोजित शिक्षक (9-12) का मास्टर डाटा तैयार करने हेतु विवरणी',
    subtitle: '(ENGLISH ARIAL FONT ONLY)',
    description: 'माध्यमिक / उच्च माध्यमिक / पुस्तकालयाध्यक्ष शिक्षक',
    classRange: '9-10 / 11-12',
    teacherType: 'Local Body Niyojit Teachers (Sec/Sr Sec/Librarian)',
    certificationType: 'standard_beo',
    columns: [
      { colNumber: 1, key: 'orderIndex', headerLabel: 'Sl.\nNo.', excelHeader: 'Sl. No.', widthPercent: 2.5, type: 'number' },
      { colNumber: 2, key: 'uanNo', headerLabel: 'UAN No.', excelHeader: 'UAN No.', widthPercent: 6.5, type: 'text' },
      { colNumber: 3, key: 'teacherName', headerLabel: 'Name of Teacher', excelHeader: 'Name of Teacher', widthPercent: 10.5, type: 'text', required: true },
      { colNumber: 4, key: 'designation', headerLabel: 'Designation\n(Sec./Sr.Sec/\nLib.)', excelHeader: 'Designation', widthPercent: 6.0, type: 'select', options: ['Sec.', 'Sr. Sec.', 'Lib.'] },
      { colNumber: 5, key: 'classLevel', headerLabel: 'Class\n(9-10/\n11-12)', excelHeader: 'Class (9-10 / 11-12)', widthPercent: 4.0, type: 'select', options: ['9-10', '11-12'] },
      { colNumber: 6, key: 'subject', headerLabel: 'Subject', excelHeader: 'Subject', widthPercent: 5.0, type: 'text' },
      { colNumber: 7, key: 'niyojanUnit', headerLabel: 'Name of Niyojan\nUnit', excelHeader: 'Name of Niyojan Unit', widthPercent: 6.5, type: 'text' },
      { colNumber: 8, key: 'udiseCode', headerLabel: 'UDISE Code', excelHeader: 'UDISE Code', widthPercent: 5.0, type: 'text' },
      { colNumber: 9, key: 'schoolName', headerLabel: 'Name of School', excelHeader: 'Name of School', widthPercent: 18.0, type: 'text' },
      { colNumber: 10, key: 'dob', headerLabel: 'Date of Birth\n(dd/mm/yyyy)', excelHeader: 'Date of Birth', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 11, key: 'presentJoiningDate', headerLabel: 'Present School\nJoining Date\n(dd/mm/yyyy)', excelHeader: 'Present School Joining Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 12, key: 'basicPay', headerLabel: 'Basic', excelHeader: 'Basic', widthPercent: 4.5, type: 'number' },
      { colNumber: 13, key: 'hraRate', headerLabel: 'HRA\n(5%/\n7.5%/\n10%)', excelHeader: 'HRA (5%/ 7.5%/ 10%)', widthPercent: 4.0, type: 'select', options: ['5%', '7.5%', '10%'] },
      { colNumber: 14, key: 'incrementDate', headerLabel: 'Increament\nDate\n(dd/mm/yyyy)', excelHeader: 'Increament Date', widthPercent: 5.0, type: 'text', placeholder: 'dd/mm/yyyy' },
      { colNumber: 15, key: 'mobileNo', headerLabel: 'Mobile No.', excelHeader: 'Mobile No.', widthPercent: 9.0, type: 'text' },
      { colNumber: 16, key: 'remarks', headerLabel: 'Remarks', excelHeader: 'Remarks', widthPercent: 3.5, type: 'text' },
    ]
  }
];

export function getFormDefinition(id: string): FormDefinition {
  const form = FORMS_DEFINITIONS.find((f) => f.id === id);
  if (!form) {
    return FORMS_DEFINITIONS[0];
  }
  return form;
}
