import * as XLSX from 'xlsx';
import { FormDefinition, TeacherRecord, SchoolProfile } from '../types/prapatra';
import { FORMS_DEFINITIONS, getFormDefinition } from '../data/formsDefinition';

export function exportCategoryToExcel(
  form: FormDefinition,
  teachers: TeacherRecord[],
  school?: SchoolProfile | null
) {
  // Construct sheet rows
  // Row 1: Header metadata
  const dataRows: (string | number)[][] = [];

  // Title
  dataRows.push([`${form.prapatraNumber} : ${form.titleHindi} ${form.subtitle}`]);
  dataRows.push([
    `School: ${school?.schoolName || teachers[0]?.schoolName || ''}`,
    `UDISE: ${school?.udiseCode || teachers[0]?.udiseCode || ''}`,
    `Block: ${school?.block || ''}`,
    `District: ${school?.district || ''}`
  ]);
  dataRows.push([]); // empty line

  // Column header row
  const headerRow = form.columns.map((c) => c.excelHeader);
  dataRows.push(headerRow);

  // Data rows
  teachers.forEach((t, index) => {
    const row = form.columns.map((c) => {
      if (c.key === 'orderIndex') return index + 1;
      const val = t[c.key];
      return val !== undefined && val !== null ? val : '';
    });
    dataRows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(dataRows);

  // Auto-width
  const colWidths = form.columns.map(() => ({ wch: 18 }));
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  const safeSheetName = form.prapatraNumber.replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, '_').slice(0, 31);
  XLSX.utils.book_append_sheet(wb, ws, safeSheetName);

  const safeFileName = `${form.prapatraNumber}_${form.categoryName.replace(/\s+/g, '_')}_Master_Data.xlsx`;
  XLSX.writeFile(wb, safeFileName);
}

export function downloadCategoryTemplate(form: FormDefinition) {
  const dataRows: (string | number)[][] = [];
  const headerRow = form.columns.map((c) => c.excelHeader);
  dataRows.push(headerRow);

  // Add 1 sample placeholder row
  const sampleRow = form.columns.map((c, i) => {
    if (c.key === 'orderIndex') return 1;
    if (c.key === 'teacherName') return 'RAMESH KUMAR SHARMA';
    if (c.key === 'classLevel') return c.options?.[0] || '1-5';
    if (c.key === 'hraRate') return '5%';
    if (c.key === 'basicPay') return '31000';
    if (c.key === 'mobileNo') return '9876543210';
    if (c.type === 'date') return '01/01/2024';
    return '';
  });
  dataRows.push(sampleRow);

  const ws = XLSX.utils.aoa_to_sheet(dataRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, `Template_${form.prapatraNumber}.xlsx`);
}

export function exportAllCategoriesToExcel(
  allTeachers: TeacherRecord[],
  school?: SchoolProfile | null
) {
  const wb = XLSX.utils.book_new();

  FORMS_DEFINITIONS.forEach((form) => {
    const categoryTeachers = allTeachers.filter((t) => t.formCategory === form.id);
    const dataRows: (string | number)[][] = [];

    dataRows.push([`${form.prapatraNumber} : ${form.titleHindi}`]);
    dataRows.push([
      `School: ${school?.schoolName || ''}`,
      `UDISE: ${school?.udiseCode || ''}`,
      `Block: ${school?.block || ''}`
    ]);
    dataRows.push([]);

    const headerRow = form.columns.map((c) => c.excelHeader);
    dataRows.push(headerRow);

    categoryTeachers.forEach((t, index) => {
      const row = form.columns.map((c) => {
        if (c.key === 'orderIndex') return index + 1;
        const val = t[c.key];
        return val !== undefined && val !== null ? val : '';
      });
      dataRows.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataRows);
    const safeSheetName = form.prapatraNumber.slice(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, safeSheetName);
  });

  XLSX.writeFile(wb, `Bihar_School_All_Teachers_Master_Data_${school?.udiseCode || 'Export'}.xlsx`);
}

export interface ParseResult {
  teachers: Partial<TeacherRecord>[];
  errors: string[];
}

export function parseExcelFile(
  fileData: ArrayBuffer,
  form: FormDefinition,
  school?: SchoolProfile | null
): ParseResult {
  const wb = XLSX.read(fileData, { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rawRows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const errors: string[] = [];
  if (!rawRows || rawRows.length === 0) {
    return { teachers: [], errors: ['Uploaded file is empty.'] };
  }

  // Find the header row by searching for 'Name of Teacher' or 'Sl. No.'
  let headerIndex = -1;
  for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
    const row = rawRows[i] || [];
    const hasTeacherCol = row.some((cell: any) =>
      String(cell || '').toLowerCase().includes('teacher') ||
      String(cell || '').toLowerCase().includes('name') ||
      String(cell || '').toLowerCase().includes('sl')
    );
    if (hasTeacherCol) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) {
    return { teachers: [], errors: ['Could not detect column header row. Please use the official template.'] };
  }

  const rawHeaders: string[] = (rawRows[headerIndex] || []).map((h: any) =>
    String(h || '').trim().toLowerCase()
  );

  // Map header column indices to form columns
  const colIndexMap: Map<number, typeof form.columns[0]> = new Map();

  form.columns.forEach((formCol) => {
    const targetLabel = formCol.excelHeader.toLowerCase();
    const targetKey = String(formCol.key).toLowerCase();

    const idx = rawHeaders.findIndex((h) => {
      if (!h) return false;
      return (
        h === targetLabel ||
        h.includes(targetLabel) ||
        targetLabel.includes(h) ||
        (formCol.key === 'teacherName' && (h.includes('name of teacher') || h.includes('teacher name'))) ||
        (formCol.key === 'pranNo' && h.includes('pran')) ||
        (formCol.key === 'bpscRollNo' && (h.includes('bpsc') || h.includes('roll'))) ||
        (formCol.key === 'sakshamtaAppNo' && (h.includes('sakshamta') || h.includes('application'))) ||
        (formCol.key === 'classLevel' && h.includes('class')) ||
        (formCol.key === 'subject' && h.includes('subject')) ||
        (formCol.key === 'basicPay' && h.includes('basic')) ||
        (formCol.key === 'hraRate' && h.includes('hra')) ||
        (formCol.key === 'mobileNo' && (h.includes('mobile') || h.includes('phone'))) ||
        (formCol.key === 'firstJoiningDate' && h.includes('1st school joining')) ||
        (formCol.key === 'presentJoiningDate' && h.includes('present school joining'))
      );
    });

    if (idx !== -1) {
      colIndexMap.set(idx, formCol);
    }
  });

  const parsedTeachers: Partial<TeacherRecord>[] = [];

  for (let r = headerIndex + 1; r < rawRows.length; r++) {
    const row = rawRows[r];
    if (!row || row.length === 0) continue;

    // Skip rows that look like signature or certification
    const firstCell = String(row[0] || '').toLowerCase();
    if (firstCell.includes('प्रमाणित') || firstCell.includes('certified') || firstCell.includes('पत्रांक')) {
      continue;
    }

    const teacherObj: any = {
      formCategory: form.id,
      schoolId: school?.headmasterUid || '',
      schoolName: school?.schoolName || '',
      udiseCode: school?.udiseCode || '',
    };

    let hasAnyData = false;

    row.forEach((cellVal: any, cIdx: number) => {
      const colDef = colIndexMap.get(cIdx);
      if (colDef) {
        let valStr = '';
        if (cellVal !== undefined && cellVal !== null) {
          if (typeof cellVal === 'number') {
            if (Number.isInteger(cellVal)) {
              valStr = cellVal.toLocaleString('fullwide', { useGrouping: false });
            } else {
              valStr = String(cellVal).trim();
            }
          } else {
            valStr = String(cellVal).trim();
          }
        }

        // Convert Excel serial dates if numeric
        if (colDef.type === 'date' && typeof cellVal === 'number' && cellVal > 20000 && cellVal < 60000) {
          const dateObj = new Date(Math.round((cellVal - 25569) * 86400 * 1000));
          const dd = String(dateObj.getDate()).padStart(2, '0');
          const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
          const yyyy = dateObj.getFullYear();
          valStr = `${dd}/${mm}/${yyyy}`;
        }

        // Format and validate mobile number
        if (colDef.key === 'mobileNo' && valStr) {
          const digitsOnly = valStr.replace(/\D/g, '');
          if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
            valStr = digitsOnly.slice(2);
          } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
            valStr = digitsOnly.slice(1);
          } else if (digitsOnly.length === 10) {
            valStr = digitsOnly;
          }
        }

        if (valStr) {
          teacherObj[colDef.key] = valStr;
          hasAnyData = true;
        }
      }
    });

    if (hasAnyData && (teacherObj.teacherName || teacherObj.pranNo || teacherObj.bpscRollNo)) {
      if (!teacherObj.teacherName) {
        errors.push(`Row ${r + 1}: Missing Teacher Name`);
      } else {
        teacherObj.teacherName = teacherObj.teacherName.toUpperCase();
        parsedTeachers.push(teacherObj);
      }
    }
  }

  return {
    teachers: parsedTeachers,
    errors
  };
}
