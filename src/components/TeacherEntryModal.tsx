import React, { useState, useEffect } from 'react';
import { X, UserPlus, Check, AlertCircle } from 'lucide-react';
import { FormDefinition, TeacherRecord, SchoolProfile } from '../types/prapatra';

interface TeacherEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormDefinition;
  school: SchoolProfile | null;
  teacherToEdit: TeacherRecord | null;
  onSave: (record: Partial<TeacherRecord>) => Promise<void>;
}

export const TeacherEntryModal: React.FC<TeacherEntryModalProps> = ({
  isOpen,
  onClose,
  form,
  school,
  teacherToEdit,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<TeacherRecord>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teacherToEdit) {
      setFormData({ ...teacherToEdit });
    } else {
      // Default new entry with school and category defaults
      setFormData({
        formCategory: form.id,
        schoolId: school?.headmasterUid || '',
        schoolName: school?.schoolName || '',
        udiseCode: school?.udiseCode || '',
        hraRate: '5%',
        basicPay: form.id.includes('9_12') ? '32000' : '25000',
        classLevel: form.columns.find((c) => c.key === 'classLevel')?.options?.[0] || '1-5',
        subCategory: form.columns.find((c) => c.key === 'subCategory')?.options?.[0] || '',
        designation: form.columns.find((c) => c.key === 'designation')?.options?.[0] || '',
        headFund: 'Gob',
      });
    }
    setError(null);
  }, [teacherToEdit, form, school, isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: keyof TeacherRecord, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = formData.teacherName?.trim().toUpperCase();
    if (!name) {
      setError('Name of Teacher is required.');
      return;
    }

    if (formData.mobileNo && formData.mobileNo.trim().length > 0 && formData.mobileNo.trim().length < 10) {
      setError('Mobile Number should be at least 10 digits.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        ...formData,
        teacherName: name,
        formCategory: form.id,
        schoolId: school?.headmasterUid || formData.schoolId || '',
        schoolName: school?.schoolName || formData.schoolName || '',
        udiseCode: school?.udiseCode || formData.udiseCode || '',
        updatedAt: new Date().toISOString(),
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save teacher record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter columns that need input fields (exclude orderIndex, udiseCode, schoolName since they are auto-populated)
  const inputColumns = form.columns.filter(
    (col) => !['orderIndex', 'udiseCode', 'schoolName'].includes(String(col.key))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                {form.prapatraNumber}
              </span>
              <h2 className="text-base font-bold">
                {teacherToEdit ? 'Edit Teacher Record' : 'Add Teacher Record'}
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              {form.titleHindi}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Auto-inherited info pill */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex flex-wrap justify-between items-center text-xs text-slate-600">
            <div>
              <strong>School:</strong> {school?.schoolName || 'Not Set'}
            </div>
            <div>
              <strong>UDISE:</strong> {school?.udiseCode || 'Not Set'}
            </div>
            <div>
              <strong>Block:</strong> {school?.block || 'Not Set'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputColumns.map((col) => {
              const val = (formData as any)[col.key] || '';
              const isRequired = col.key === 'teacherName';

              return (
                <div
                  key={col.colNumber}
                  className={col.key === 'teacherName' || col.key === 'remarks' ? 'md:col-span-2' : ''}
                >
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {col.excelHeader} {isRequired && <span className="text-red-500">*</span>}
                  </label>

                  {col.type === 'select' ? (
                    <select
                      value={val}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      required={isRequired}
                    >
                      <option value="">-- Select --</option>
                      {col.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : col.type === 'number' ? (
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      placeholder={col.placeholder || 'e.g. 31000'}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      required={isRequired}
                    />
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        handleChange(
                          col.key,
                          col.key === 'teacherName' ? e.target.value.toUpperCase() : e.target.value
                        )
                      }
                      placeholder={
                        col.placeholder ||
                        (col.key === 'teacherName'
                          ? 'NAME IN ENGLISH ARIAL (e.g. SUNITA KUMARI)'
                          : col.key === 'mobileNo'
                          ? '10-digit Mobile (e.g. 9835012345)'
                          : '')
                      }
                      maxLength={col.key === 'mobileNo' ? 10 : undefined}
                      className={`w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        col.key === 'teacherName' ? 'uppercase font-semibold tracking-wide' : col.key === 'mobileNo' ? 'font-mono' : ''
                      }`}
                      required={isRequired}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : teacherToEdit ? 'Update Teacher' : 'Save Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
