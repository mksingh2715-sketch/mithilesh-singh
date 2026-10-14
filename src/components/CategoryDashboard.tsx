import React from 'react';
import { FORMS_DEFINITIONS } from '../data/formsDefinition';
import { FormDefinition, TeacherRecord, PrapatraId } from '../types/prapatra';
import {
  FileText,
  Users,
  PlusCircle,
  FileSpreadsheet,
  Download,
  Eye,
  CheckCircle,
  Sparkles,
  School
} from 'lucide-react';

interface CategoryDashboardProps {
  teachers: TeacherRecord[];
  onSelectCategory: (category: FormDefinition) => void;
  onAddTeacher: (category: FormDefinition) => void;
  onGeneratePdf: (category: FormDefinition) => void;
  onExportExcel: (category: FormDefinition) => void;
  onSeedDemoTeachersForCategory: (category: FormDefinition) => void;
}

export const CategoryDashboard: React.FC<CategoryDashboardProps> = ({
  teachers,
  onSelectCategory,
  onAddTeacher,
  onGeneratePdf,
  onExportExcel,
  onSeedDemoTeachersForCategory
}) => {
  // Count teachers per category
  const categoryCounts: Record<PrapatraId, number> = FORMS_DEFINITIONS.reduce((acc, form) => {
    acc[form.id] = teachers.filter((t) => t.formCategory === form.id).length;
    return acc;
  }, {} as Record<PrapatraId, number>);

  const totalTeachers = teachers.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide">
                10 OFFICIAL PRAPATRA CATEGORIES
              </span>
              <span className="text-xs text-slate-400">बिहार शिक्षक मास्टर डाटा प्रपत्र (I - X)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Teacher Category Dashboard (श्रेणीवार डैशबोर्ड)
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Select any official Bihar teacher category below to add teachers, review records, export Excel, or generate the official combined Landscape A4 PDF proforma.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-2xl font-black text-amber-400">{totalTeachers}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Total Teachers</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400">
                {Object.values(categoryCounts).filter((c) => c > 0).length} / 10
              </div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Active Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 10 Official Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {FORMS_DEFINITIONS.map((form) => {
          const count = categoryCounts[form.id] || 0;
          const hasTeachers = count > 0;

          return (
            <div
              key={form.id}
              className={`rounded-xl border transition-all duration-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-md ${
                hasTeachers
                  ? 'border-emerald-200 ring-1 ring-emerald-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-5">
                {/* Header Badge & Counts */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-slate-900 text-amber-300 tracking-wider">
                      {form.prapatraNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Class {form.classRange}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      hasTeachers
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{count} {count === 1 ? 'Teacher' : 'Teachers'}</span>
                  </div>
                </div>

                {/* Form Hindi Category Title */}
                <h3
                  className="text-base font-bold text-slate-900 mb-1 leading-snug"
                  style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
                >
                  {form.titleHindi}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {form.description}
                </p>

                {/* Columns spec preview */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 mb-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>{form.columns.length} Columns</strong> proforma • Landscape A4 • Arial English
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCategory(form)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View / Manage ({count})</span>
                  </button>

                  <button
                    onClick={() => onAddTeacher(form)}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
                    title="Add single teacher record"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onExportExcel(form)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-white border border-transparent hover:border-slate-200 transition"
                    title="Export Category Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => onGeneratePdf(form)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm ${
                      hasTeachers
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                    title="Generate combined official Landscape A4 PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Form</span>
                  </button>

                  {!hasTeachers && (
                    <button
                      onClick={() => onSeedDemoTeachersForCategory(form)}
                      className="text-[11px] text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
                      title="Load 3 sample teachers for instant PDF preview & testing"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>+3 Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
