import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Download, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormDefinition, TeacherRecord, SchoolProfile } from '../types/prapatra';
import { parseExcelFile, downloadCategoryTemplate } from '../services/excelService';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormDefinition;
  school: SchoolProfile | null;
  onImportConfirmed: (teachers: Partial<TeacherRecord>[]) => Promise<void>;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  form,
  school,
  onImportConfirmed
}) => {
  const [parsedList, setParsedList] = useState<Partial<TeacherRecord>[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setFileName(file.name);
      setErrors([]);

      const buffer = await file.arrayBuffer();
      const result = parseExcelFile(buffer, form, school);

      setParsedList(result.teachers);
      setErrors(result.errors);
    } catch (err: any) {
      setErrors([err?.message || 'Failed to read Excel file. Please ensure it is a valid .xlsx or .xls file.']);
      setParsedList([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = async () => {
    if (parsedList.length === 0) return;

    try {
      setIsSubmitting(true);
      await onImportConfirmed(parsedList);
      onClose();
    } catch (err: any) {
      setErrors([err?.message || 'Error occurred while saving records into database.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">Import Teachers from Excel</h2>
              <p className="text-xs text-slate-300">
                Target Category: <strong>{form.prapatraNumber}</strong> ({form.categoryName})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Instructions and Download Template */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-emerald-900">
                Official Excel Column Template
              </h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Download the structured template with all {form.columns.length} columns for this category.
              </p>
            </div>
            <button
              onClick={() => downloadCategoryTemplate(form)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-sm flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Template</span>
            </button>
          </div>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition bg-slate-50 hover:bg-indigo-50/30"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />
            <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">
              {fileName ? fileName : 'Click to browse Excel file (.xlsx, .xls)'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              File will be parsed, mapped, and previewed before saving.
            </p>
          </div>

          {/* Errors list */}
          {errors.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Notice / Warnings:</span>
              </div>
              <ul className="text-xs text-amber-800 list-disc pl-5 space-y-0.5">
                {errors.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Table */}
          {parsedList.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>
                  Preview of Validated Records: <strong>{parsedList.length}</strong> teachers found
                </span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready for Import
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-56">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2 w-10 text-center">#</th>
                      <th className="p-2">Teacher Name</th>
                      <th className="p-2">PRAN / Roll</th>
                      <th className="p-2">Class</th>
                      <th className="p-2">Subject</th>
                      <th className="p-2">Basic</th>
                      <th className="p-2">Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedList.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 text-center font-mono text-slate-500">{i + 1}</td>
                        <td className="p-2 font-bold uppercase text-slate-900">{t.teacherName}</td>
                        <td className="p-2 font-mono text-slate-600">{t.pranNo || t.bpscRollNo || t.uanNo || '-'}</td>
                        <td className="p-2">{t.classLevel || '-'}</td>
                        <td className="p-2">{t.subject || '-'}</td>
                        <td className="p-2 font-mono">{t.basicPay || '-'}</td>
                        <td className="p-2 font-mono">{t.mobileNo || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmImport}
            disabled={parsedList.length === 0 || isSubmitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition flex items-center gap-1.5 disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isSubmitting ? 'Importing...' : `Confirm & Import ${parsedList.length} Teachers`}
          </button>
        </div>
      </div>
    </div>
  );
};
