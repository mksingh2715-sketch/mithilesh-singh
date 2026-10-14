import React from 'react';
import { School, User as UserIcon, LogOut, Building, Edit3, Shield, BookOpen } from 'lucide-react';
import { SchoolProfile } from '../types/prapatra';

interface HeaderProps {
  school: SchoolProfile | null;
  userEmail: string | null;
  onOpenProfile: () => void;
  onSignOut: () => void;
  onLoadDemoSchool: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  school,
  userEmail,
  onOpenProfile,
  onSignOut,
  onLoadDemoSchool
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-30">
      {/* Top Govt Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-amber-50 text-[11px] font-medium py-1 px-4 flex justify-between items-center tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">BIHAR EDUCATION DEPARTMENT</span>
          <span>शिक्षा विभाग, बिहार सरकार • शिक्षक मास्टर डाटा प्रबंधन प्रणाली</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[10px]">
          <span>प्रपत्र I से X प्रारूप अनुपालन</span>
          <span>आधिकारिक प्रारूप (Landscape A4)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & School Name */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Bihar Teacher Master Data Manager
                </h1>
                <span className="hidden lg:inline-block text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  HM PORTAL
                </span>
              </div>
              {school ? (
                <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-300 mt-0.5">
                  <span className="font-semibold text-amber-300">{school.schoolName}</span>
                  <span className="text-slate-400">|</span>
                  <span>UDISE: <strong className="text-white font-mono">{school.udiseCode}</strong></span>
                  <span className="text-slate-400">|</span>
                  <span>Block: <strong className="text-white">{school.block}</strong></span>
                  <span className="text-slate-400">|</span>
                  <span>Dist: <strong className="text-white">{school.district}</strong></span>
                </div>
              ) : (
                <p className="text-xs text-amber-400">
                  Please complete school profile registration to begin.
                </p>
              )}
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {!school && (
              <button
                onClick={onLoadDemoSchool}
                className="text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-2.5 py-1.5 rounded transition flex items-center gap-1.5 shadow"
                title="Fill sample Bihar school details for quick testing"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Fill Sample School
              </button>
            )}

            <button
              onClick={onOpenProfile}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded transition flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{school ? 'School Details' : 'Set Up School'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] truncate max-w-[160px]" title={userEmail || ''}>
                <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{userEmail}</span>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="text-xs bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/50 px-2.5 py-1.5 rounded transition flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
