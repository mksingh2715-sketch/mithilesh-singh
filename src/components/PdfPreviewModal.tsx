import React, { useState } from 'react';
import { X, Download, Printer, ZoomIn, ZoomOut, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { FormDefinition, TeacherRecord, SchoolProfile } from '../types/prapatra';
import { OfficialFormPrintLayout } from './OfficialFormPrintLayout';
import { generateFormPdfFromElement, triggerPrintWindow } from '../services/pdfService';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormDefinition;
  teachers: TeacherRecord[];
  school: SchoolProfile | null;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  form,
  teachers,
  school,
}) => {
  const [letterNo, setLetterNo] = useState('');
  const [letterDate, setLetterDate] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  });
  const [scale, setScale] = useState(0.85);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      setStatusMessage('Rendering high-resolution A4 Landscape PDF with Hindi font support...');
      const fileName = `${form.prapatraNumber}_${form.categoryName.replace(/\s+/g, '_')}_Combined_Official_Form.pdf`;
      await generateFormPdfFromElement('official-form-render-target', fileName, (msg) => {
        setStatusMessage(msg);
      });
      setStatusMessage('PDF generated and downloaded successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. You can also use the "Print Form / Save as PDF" option.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    try {
      setStatusMessage('प्रिंट डायलॉग खोला जा रहा है (Opening Print Dialog)...');
      const success = await triggerPrintWindow('official-form-render-target');
      if (!success) {
        setStatusMessage('Browser sandbox restricts direct print dialog. Generating Landscape PDF...');
        await handleDownloadPdf();
      } else {
        setStatusMessage('प्रिंट विकल्प सक्रिय है!');
        setTimeout(() => setStatusMessage(null), 3500);
      }
    } catch (err) {
      console.error('Print trigger error:', err);
      setStatusMessage('Generating Landscape PDF...');
      await handleDownloadPdf();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-hidden">
      <div className="bg-slate-100 rounded-2xl shadow-2xl border border-slate-300 w-full max-w-[96vw] h-[95vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
        {/* Top Control Bar */}
        <div className="bg-slate-900 px-5 py-3 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                {form.prapatraNumber}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 tracking-wider uppercase">
                Landscape A4 (297 × 210 mm)
              </span>
              <h2 className="text-sm font-bold text-white">
                Official Combined PDF ({teachers.length} {teachers.length === 1 ? 'Teacher' : 'Teachers'})
              </h2>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              {form.titleHindi} • आधिकारिक लैंडस्केप प्रारूप
            </p>
          </div>

          {/* Letter No & Date inputs */}
          <div className="flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <div className="flex items-center gap-1.5">
              <label className="text-slate-400">पत्रांक (Letter No):</label>
              <input
                type="text"
                value={letterNo}
                onChange={(e) => setLetterNo(e.target.value)}
                placeholder="Optional"
                className="w-24 px-2 py-0.5 rounded bg-slate-900 border border-slate-600 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-slate-400">दिनांक (Date):</label>
              <input
                type="text"
                value={letterDate}
                onChange={(e) => setLetterDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-24 px-2 py-0.5 rounded bg-slate-900 border border-slate-600 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setScale((s) => Math.max(0.4, s - 0.1))}
              className="p-1 text-slate-300 hover:text-white transition"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] px-1.5 text-slate-300">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
              className="p-1 text-slate-300 hover:text-white transition"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(0.85)}
              className="p-1 text-slate-400 hover:text-white transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Print directly or save as vector PDF from browser print dialog in Landscape mode"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Form (Landscape)</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-md transition disabled:opacity-50"
              title="Download compiled Landscape A4 PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Download Landscape PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast Notification */}
        {statusMessage && (
          <div className="bg-amber-100 border-b border-amber-200 text-amber-900 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Scrollable Printable Target Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center bg-slate-300/80">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div id="official-form-render-target" className="w-[287mm] shadow-2xl bg-white">
              <OfficialFormPrintLayout
                form={form}
                teachers={teachers}
                school={school}
                letterNo={letterNo}
                letterDate={letterDate}
              />
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-white px-5 py-2.5 border-t border-slate-300 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-800">
              आधिकारिक लैंडस्केप मोड (Landscape A4 • 297mm × 210mm)
            </span>
            <span className="text-slate-500">• 10 पंक्तियां प्रति पृष्ठ • प्रपत्र I-X मानक अनुपालन</span>
          </div>
          <div className="text-slate-600 text-[11px]">
            नोट: "Print Form" पर क्लिक करने पर सीधे लैंडस्केप A4 में प्रिंट/Save as PDF होगा।
          </div>
        </div>
      </div>
    </div>
  );
};
