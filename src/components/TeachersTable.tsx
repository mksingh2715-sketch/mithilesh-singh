import React, { useState } from 'react';
import {
  FormDefinition,
  TeacherRecord,
  SchoolProfile
} from '../types/prapatra';
import {
  Search,
  PlusCircle,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit2,
  ArrowLeft,
  Upload,
  Sparkles,
  Users,
  FileText
} from 'lucide-react';

interface TeachersTableProps {
  form: FormDefinition;
  teachers: TeacherRecord[];
  school: SchoolProfile | null;
  onBack: () => void;
  onAddTeacher: () => void;
  onEditTeacher: (teacher: TeacherRecord) => void;
  onDeleteTeacher: (teacherId: string) => Promise<void>;
  onGeneratePdf: () => void;
  onExportExcel: () => void;
  onOpenImportModal: () => void;
  onSeedDemoTeachers: () => void;
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  form,
  teachers,
  school,
  onBack,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
  onGeneratePdf,
  onExportExcel,
  onOpenImportModal,
  onSeedDemoTeachers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredTeachers = teachers.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (t.teacherName && t.teacherName.toLowerCase().includes(term)) ||
      (t.pranNo && t.pranNo.toLowerCase().includes(term)) ||
      (t.bpscRollNo && t.bpscRollNo.toLowerCase().includes(term)) ||
      (t.uanNo && t.uanNo.toLowerCase().includes(term)) ||
      (t.mobileNo && t.mobileNo.includes(term)) ||
      (t.subject && t.subject.toLowerCase().includes(term))
    );
  });

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this teacher record?')) {
      try {
        setDeletingId(id);
        await onDeleteTeacher(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Navigation & Category Title */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Categories</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-slate-900 text-amber-300">
                {form.prapatraNumber}
              </span>
              <h2
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
              >
                {form.titleHindi}
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              {form.description} • {form.columns.length} Columns Proforma
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onAddTeacher}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Teacher</span>
            </button>

            <button
              onClick={onOpenImportModal}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
              title="Import records from Excel spreadsheet"
            >
              <Upload className="w-3.5 h-3.5 text-slate-600" />
              <span>Import Excel</span>
            </button>

            <button
              onClick={onExportExcel}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
              title="Export Category records to Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={onGeneratePdf}
              disabled={teachers.length === 0}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
              title="Generate combined official form PDF"
            >
              <Download className="w-4 h-4" />
              <span>Generate PDF ({teachers.length})</span>
            </button>

            {teachers.length === 0 && (
              <button
                onClick={onSeedDemoTeachers}
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
                title="Add 3 realistic sample teachers to quickly test PDF layout"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>+ Load 3 Demo Teachers</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Count */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by teacher name, PRAN, roll..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-3">
            <span>
              Showing <strong>{filteredTeachers.length}</strong> of <strong>{teachers.length}</strong> teachers in this category
            </span>
          </div>
        </div>
      </div>

      {/* Teachers Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {teachers.length === 0 ? 'No Teachers in this Category Yet' : 'No matching records found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {teachers.length === 0
                ? 'Click "Add Teacher", "Import Excel", or "Load 3 Demo Teachers" above to enter records for this category.'
                : 'Try adjusting your search query.'}
            </p>
            {teachers.length === 0 && (
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={onAddTeacher}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow transition"
                >
                  + Add First Teacher
                </button>
                <button
                  onClick={onSeedDemoTeachers}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow transition"
                >
                  + Load 3 Demo Records
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold border-b border-slate-800">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-3 min-w-[160px]">Teacher Name</th>
                  {form.columns.some((c) => c.key === 'bpscRollNo') && (
                    <th className="py-2.5 px-3">BPSC Roll No.</th>
                  )}
                  {form.columns.some((c) => c.key === 'sakshamtaAppNo') && (
                    <th className="py-2.5 px-3">Sakshamta App No.</th>
                  )}
                  {form.columns.some((c) => c.key === 'pranNo') && (
                    <th className="py-2.5 px-3">PRAN No.</th>
                  )}
                  {form.columns.some((c) => c.key === 'uanNo') && (
                    <th className="py-2.5 px-3">UAN No.</th>
                  )}
                  {form.columns.some((c) => c.key === 'gpfOrPranNo') && (
                    <th className="py-2.5 px-3">GPF/PRAN</th>
                  )}
                  {form.columns.some((c) => c.key === 'classLevel') && (
                    <th className="py-2.5 px-3">Class</th>
                  )}
                  {form.columns.some((c) => c.key === 'subject') && (
                    <th className="py-2.5 px-3">Subject</th>
                  )}
                  {form.columns.some((c) => c.key === 'subCategory') && (
                    <th className="py-2.5 px-3">Category</th>
                  )}
                  <th className="py-2.5 px-3">Present School Joining</th>
                  <th className="py-2.5 px-3">Basic Pay</th>
                  <th className="py-2.5 px-3">HRA</th>
                  <th className="py-2.5 px-3 min-w-[115px] whitespace-nowrap">Mobile No.</th>
                  <th className="py-2.5 px-3 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((teacher, idx) => (
                  <tr
                    key={teacher.id || idx}
                    className="hover:bg-indigo-50/40 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 uppercase">
                      {teacher.teacherName}
                    </td>
                    {form.columns.some((c) => c.key === 'bpscRollNo') && (
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {teacher.bpscRollNo || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'sakshamtaAppNo') && (
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {teacher.sakshamtaAppNo || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'pranNo') && (
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {teacher.pranNo || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'uanNo') && (
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {teacher.uanNo || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'gpfOrPranNo') && (
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {teacher.gpfOrPranNo || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'classLevel') && (
                      <td className="py-2.5 px-3 text-slate-700">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          {teacher.classLevel || '-'}
                        </span>
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'subject') && (
                      <td className="py-2.5 px-3 text-slate-700">
                        {teacher.subject || '-'}
                      </td>
                    )}
                    {form.columns.some((c) => c.key === 'subCategory') && (
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {teacher.subCategory || '-'}
                      </td>
                    )}
                    <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                      {teacher.presentJoiningDate || '-'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-900 font-semibold">
                      {teacher.basicPay ? `₹${teacher.basicPay}` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-mono">
                      {teacher.hraRate || '-'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-800 whitespace-nowrap font-medium tracking-wide">
                      {teacher.mobileNo || '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditTeacher(teacher)}
                          className="p-1 rounded text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition"
                          title="Edit Teacher"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          disabled={deletingId === teacher.id}
                          className="p-1 rounded text-slate-600 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Teacher"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
