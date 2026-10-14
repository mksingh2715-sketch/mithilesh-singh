import React, { useState, useEffect } from 'react';
import { X, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import { SchoolProfile } from '../types/prapatra';

interface SchoolProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: SchoolProfile | null;
  onSave: (profile: Omit<SchoolProfile, 'id'>) => Promise<void>;
  userEmail: string;
  userId: string;
}

export const SchoolProfileModal: React.FC<SchoolProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
  userEmail,
  userId
}) => {
  const [schoolName, setSchoolName] = useState('');
  const [udiseCode, setUdiseCode] = useState('');
  const [block, setBlock] = useState('');
  const [district, setDistrict] = useState('');
  const [headmasterName, setHeadmasterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProfile) {
      setSchoolName(currentProfile.schoolName || '');
      setUdiseCode(currentProfile.udiseCode || '');
      setBlock(currentProfile.block || '');
      setDistrict(currentProfile.district || '');
      setHeadmasterName(currentProfile.headmasterName || '');
    } else {
      // Default sample values for smooth onboarding
      setSchoolName('UTKRAMIT MADHYA VIDYALAYA RAMPUR');
      setUdiseCode('10190100201');
      setBlock('DUMRA');
      setDistrict('SITAMARHI');
      setHeadmasterName('ARUN KUMAR SINGH');
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanSchoolName = schoolName.trim().toUpperCase();
    const cleanUdise = udiseCode.trim();
    const cleanBlock = block.trim().toUpperCase();
    const cleanDistrict = district.trim().toUpperCase();
    const cleanHM = headmasterName.trim().toUpperCase();

    if (!cleanSchoolName) {
      setError('School Name is required.');
      return;
    }
    if (!cleanUdise) {
      setError('11-digit UDISE Code is required.');
      return;
    }
    if (cleanUdise.length !== 11 || !/^\d+$/.test(cleanUdise)) {
      setError('UDISE Code must be exactly 11 numeric digits (e.g., 10190100201).');
      return;
    }
    if (!cleanBlock) {
      setError('Block name is required.');
      return;
    }
    if (!cleanDistrict) {
      setError('District name is required.');
      return;
    }
    if (!cleanHM) {
      setError('Headmaster Name is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        schoolName: cleanSchoolName,
        udiseCode: cleanUdise,
        block: cleanBlock,
        district: cleanDistrict,
        headmasterName: cleanHM,
        headmasterUid: userId,
        headmasterEmail: userEmail,
        updatedAt: new Date().toISOString(),
        createdAt: currentProfile?.createdAt || new Date().toISOString()
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save school profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillSample = () => {
    setSchoolName('G.M. HIGH SCHOOL CUM INTER COLLEGE');
    setUdiseCode('10150201402');
    setBlock('PATNA SADAR');
    setDistrict('PATNA');
    setHeadmasterName('DR. RAJESH KUMAR VERMA');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">
              {currentProfile ? 'Update School Profile' : 'Register School Profile'}
            </h2>
          </div>
          {currentProfile && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            This school profile is stored securely in Firestore and auto-fills into all official Prapatra forms and PDF certificates.
          </p>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              School Name (Official) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. U.M.S. RAMPUR"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                UDISE Code (11 Digits) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={11}
                value={udiseCode}
                onChange={(e) => setUdiseCode(e.target.value.replace(/\D/g, ''))}
                placeholder="10190100201"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider"
                required
              />
              <span className="text-[10px] text-slate-500">
                {udiseCode.length}/11 digits
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Block (प्रखंड) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                placeholder="e.g. DUMRA"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District (जिला) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. SITAMARHI"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Headmaster Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={headmasterName}
                onChange={(e) => setHeadmasterName(e.target.value)}
                placeholder="e.g. ARUN KUMAR"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                required
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleFillSample}
              className="text-xs text-amber-600 hover:text-amber-700 underline font-medium"
            >
              Fill Sample High School
            </button>

            <div className="flex gap-2">
              {currentProfile && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Save School Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
