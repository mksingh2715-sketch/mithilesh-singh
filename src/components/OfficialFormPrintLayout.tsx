import React from 'react';
import { FormDefinition, TeacherRecord, SchoolProfile } from '../types/prapatra';
import { OFFICIAL_CERTIFICATION_POINTS } from '../data/formsDefinition';

interface OfficialFormPrintLayoutProps {
  form: FormDefinition;
  teachers: TeacherRecord[];
  school: SchoolProfile | null;
  letterNo?: string;
  letterDate?: string;
}

export const OfficialFormPrintLayout: React.FC<OfficialFormPrintLayoutProps> = ({
  form,
  teachers,
  school,
  letterNo = '',
  letterDate = ''
}) => {
  const ROWS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(teachers.length / ROWS_PER_PAGE));

  const pages = Array.from({ length: totalPages }, (_, pageIdx) => {
    const startIdx = pageIdx * ROWS_PER_PAGE;
    const pageTeachers = teachers.slice(startIdx, startIdx + ROWS_PER_PAGE);

    // Fill up to 10 rows with blanks if on the last page or only page
    const rows = [];
    for (let i = 0; i < ROWS_PER_PAGE; i++) {
      const serialNum = startIdx + i + 1;
      const teacher = pageTeachers[i] || null;
      rows.push({ serialNum, teacher });
    }

    return {
      pageNumber: pageIdx + 1,
      rows,
      isLastPage: pageIdx === totalPages - 1
    };
  });

  return (
    <div className="official-print-document font-sans text-black bg-transparent">
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          className="print-page mb-6 bg-white border border-gray-300 shadow-md print:shadow-none print:border-none print:m-0 page-break-after mx-auto"
          style={{
            width: '287mm',
            minHeight: '200mm',
            maxHeight: '200mm',
            boxSizing: 'border-box',
            padding: '3mm 4mm 2.5mm 4mm',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Header Row */}
            <div className="flex justify-between items-center text-[11px] mb-1 font-semibold text-black">
              <div>
                Name of Block :-{' '}
                <span className="font-bold underline uppercase">
                  {school?.block || '____________________'}
                </span>
              </div>
              <div className="text-[10px] text-slate-700 font-mono">
                {totalPages > 1 ? `Page ${page.pageNumber} of ${totalPages}` : ''}
              </div>
            </div>

            {/* Title Area */}
            <div className="text-center mb-1 text-black">
              <h1
                className="text-[13px] font-bold hindi-text"
                style={{
                  fontFamily: '"Noto Sans Devanagari", sans-serif',
                  color: '#000000',
                  letterSpacing: 'normal',
                  lineHeight: 1.45,
                }}
              >
                {form.fullTitle}
              </h1>
              <p className="text-[9.5px] font-bold tracking-wider text-slate-800" style={{ marginTop: '1px' }}>
                {form.subtitle}
              </p>
            </div>

            {/* Table - Strict Fixed Width to fit Landscape A4 perfectly */}
            <div className="w-full overflow-hidden">
              <table
                className="w-full border-collapse border border-black text-center"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  borderColor: '#000000',
                  color: '#000000',
                }}
              >
                <thead>
                  {/* Column Titles */}
                  <tr style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold' }}>
                    {form.columns.map((col) => (
                      <th
                        key={col.colNumber}
                        className="border border-black align-middle font-bold"
                        style={{
                          width: `${col.widthPercent}%`,
                          borderColor: '#000000',
                          color: '#000000',
                          fontSize: '7.8px',
                          lineHeight: 1.15,
                          padding: '2px 1px',
                          wordBreak: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {col.headerLabel}
                      </th>
                    ))}
                  </tr>
                  {/* Column Numbers 1 to N */}
                  <tr style={{ backgroundColor: '#f3f4f6', color: '#374151', fontSize: '7.5px', fontWeight: 'bold' }}>
                    {form.columns.map((col) => (
                      <th
                        key={col.colNumber}
                        className="border border-black font-semibold"
                        style={{
                          borderColor: '#000000',
                          color: '#374151',
                          padding: '1px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {col.colNumber}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Arial, sans-serif' }}>
                  {page.rows.map(({ serialNum, teacher }) => {
                    return (
                      <tr
                        key={serialNum}
                        style={{ backgroundColor: '#ffffff', height: '24px' }}
                      >
                        {form.columns.map((col) => {
                          let cellContent: React.ReactNode = '';

                          if (col.key === 'orderIndex') {
                            cellContent = serialNum;
                          } else if (teacher) {
                            if (col.key === 'udiseCode') {
                              cellContent = teacher.udiseCode || school?.udiseCode || '';
                            } else if (col.key === 'schoolName') {
                              cellContent = teacher.schoolName || school?.schoolName || '';
                            } else {
                              cellContent = (teacher as any)[col.key] || '';
                            }
                          }

                          // Mobile No Column: Ensure full 10 digits are clearly shown without wrapping or clipping
                          if (col.key === 'mobileNo') {
                            return (
                              <td
                                key={col.colNumber}
                                className="border border-black text-center whitespace-nowrap"
                                style={{
                                  width: `${col.widthPercent}%`,
                                  borderColor: '#000000',
                                  color: '#000000',
                                  fontSize: '8.5px',
                                  fontFamily: 'Arial, monospace, sans-serif',
                                  letterSpacing: '0px',
                                  padding: '1px 2px',
                                  overflow: 'visible',
                                  boxSizing: 'border-box',
                                }}
                                title={String(cellContent || '')}
                              >
                                {cellContent}
                              </td>
                            );
                          }

                          // Teacher Name Column: uppercase, clear name display
                          if (col.key === 'teacherName') {
                            return (
                              <td
                                key={col.colNumber}
                                className="border border-black text-left font-semibold uppercase"
                                style={{
                                  width: `${col.widthPercent}%`,
                                  borderColor: '#000000',
                                  color: '#000000',
                                  fontSize: '8px',
                                  lineHeight: 1.15,
                                  padding: '2px 3px',
                                  wordBreak: 'break-word',
                                  boxSizing: 'border-box',
                                }}
                                title={String(cellContent || '')}
                              >
                                {cellContent}
                              </td>
                            );
                          }

                          // School Name Column: full school name clearly visible without truncation
                          if (col.key === 'schoolName') {
                            return (
                              <td
                                key={col.colNumber}
                                className="border border-black text-left"
                                style={{
                                  width: `${col.widthPercent}%`,
                                  borderColor: '#000000',
                                  color: '#000000',
                                  fontSize: '8.5px',
                                  lineHeight: 1.2,
                                  padding: '2px 4px',
                                  whiteSpace: 'normal',
                                  wordBreak: 'normal',
                                  overflowWrap: 'break-word',
                                  boxSizing: 'border-box',
                                }}
                                title={String(cellContent || '')}
                              >
                                {cellContent}
                              </td>
                            );
                          }

                          // Date, Roll, PRAN, and other standard columns
                          return (
                            <td
                              key={col.colNumber}
                              className="border border-black text-center whitespace-nowrap"
                              style={{
                                width: `${col.widthPercent}%`,
                                borderColor: '#000000',
                                color: '#000000',
                                fontSize: '8px',
                                padding: '1px 1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                boxSizing: 'border-box',
                              }}
                              title={String(cellContent || '')}
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certification Box & Signatures (Pure Hindi text with zero letterSpacing to prevent overlaps) */}
          <div
            className="mt-2 text-[9.5px] hindi-text text-black"
            style={{
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              color: '#000000',
              lineHeight: 1.55,
              letterSpacing: 'normal',
            }}
          >
            <div
              className="font-bold underline mb-0.5"
              style={{
                color: '#000000',
                letterSpacing: 'normal',
                lineHeight: 1.5,
              }}
            >
              प्रमाणित किया जाता है कि
            </div>
            {OFFICIAL_CERTIFICATION_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="text-left"
                style={{
                  color: '#000000',
                  lineHeight: 1.55,
                  letterSpacing: 'normal',
                  marginBottom: '1.5px',
                  wordBreak: 'normal',
                }}
              >
                {point}
              </div>
            ))}

            {/* Letter Number and Signatures */}
            {form.certificationType === 'beo_and_hm' ? (
              <div className="mt-3 pt-1">
                <div className="flex justify-between items-center text-[9px] font-semibold mb-4">
                  <div style={{ letterSpacing: 'normal', lineHeight: 1.4 }}>
                    पत्रांक: <span className="underline">{letterNo || '........................................'}</span>
                    {'      '}
                    दिनांक: <span className="underline">{letterDate || '........................................'}</span>
                  </div>
                  <div style={{ letterSpacing: 'normal', lineHeight: 1.4 }}>
                    पत्रांक: <span className="underline">{letterNo || '........................................'}</span>
                    {'      '}
                    दिनांक: <span className="underline">{letterDate || '........................................'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end font-bold text-[9px]">
                  <div
                    className="text-center w-64 border-t border-dotted border-black pt-1"
                    style={{ letterSpacing: 'normal', lineHeight: 1.4 }}
                  >
                    चिह्नित म०वि० के प्र०अ० का हस्ताक्षर एवं मुहर
                  </div>
                  <div
                    className="text-center w-64 border-t border-dotted border-black pt-1"
                    style={{ letterSpacing: 'normal', lineHeight: 1.4 }}
                  >
                    हस्ताक्षर एवं मुहर प्रधानाध्यापक / प्र०अ०
                    {school?.schoolName && (
                      <div className="text-[8px] font-normal mt-0.5 text-slate-800">
                        {school.schoolName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 pt-1">
                <div className="flex justify-between items-center text-[9px] font-semibold mb-4">
                  <div style={{ letterSpacing: 'normal', lineHeight: 1.4 }}>
                    पत्रांक: <span className="underline">{letterNo || '....................'}</span>
                    {'      '}
                    दिनांक: <span className="underline">{letterDate || '....................'}</span>
                  </div>
                  <div className="text-[8.5px] text-slate-600 font-normal">
                    {school?.schoolName ? `विद्यालय: ${school.schoolName}` : ''}
                  </div>
                </div>
                <div className="flex justify-end font-bold text-[9px]">
                  <div
                    className="text-center w-64 border-t border-dotted border-black pt-1"
                    style={{ letterSpacing: 'normal', lineHeight: 1.4 }}
                  >
                    हस्ताक्षर एवं मुहर प्रधानाध्यापक / प्रभारी प्र०अ०
                    {school?.schoolName && (
                      <div className="text-[8px] font-normal mt-0.5 text-slate-800">
                        {school.schoolName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
