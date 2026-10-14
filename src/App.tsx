/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  auth,
  db,
  onAuthStateChanged,
  signOut,
  doc,
  onSnapshot,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  handleFirestoreError,
  OperationType,
  User,
} from './firebase/config';
import { SchoolProfile, TeacherRecord, FormDefinition } from './types/prapatra';
import { FORMS_DEFINITIONS, getFormDefinition } from './data/formsDefinition';
import { exportCategoryToExcel, exportAllCategoriesToExcel } from './services/excelService';
import { getSampleTeachersForCategory } from './data/sampleData';

import { Header } from './components/Header';
import { AuthScreen } from './components/AuthScreen';
import { CategoryDashboard } from './components/CategoryDashboard';
import { TeachersTable } from './components/TeachersTable';
import { SchoolProfileModal } from './components/SchoolProfileModal';
import { TeacherEntryModal } from './components/TeacherEntryModal';
import { ExcelImportModal } from './components/ExcelImportModal';
import { PdfPreviewModal } from './components/PdfPreviewModal';

import {
  FileSpreadsheet,
  PlusCircle,
  Sparkles,
  School,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Download,
  Info
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // School profile state
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  // Teachers state
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [isTeachersLoading, setIsTeachersLoading] = useState(true);

  // Navigation state
  const [selectedCategory, setSelectedCategory] = useState<FormDefinition | null>(null);

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<TeacherRecord | null>(null);

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfCategory, setPdfCategory] = useState<FormDefinition>(FORMS_DEFINITIONS[0]);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importCategory, setImportCategory] = useState<FormDefinition>(FORMS_DEFINITIONS[0]);

  const [appAlert, setAppAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showAlert = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setAppAlert({ message, type });
    setTimeout(() => {
      setAppAlert(null);
    }, 4500);
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // School Profile & Teachers listeners
  useEffect(() => {
    if (!currentUser) {
      setSchoolProfile(null);
      setTeachers([]);
      setIsProfileLoading(false);
      setIsTeachersLoading(false);
      return;
    }

    setIsProfileLoading(true);
    setIsTeachersLoading(true);

    const schoolDocRef = doc(db, 'schools', currentUser.uid);

    // Listen to School Profile
    const unsubSchool = onSnapshot(
      schoolDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSchoolProfile({ id: docSnap.id, ...(docSnap.data() as SchoolProfile) });
        } else {
          setSchoolProfile(null);
          // Prompt user to fill school profile
          setIsProfileModalOpen(true);
        }
        setIsProfileLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `schools/${currentUser.uid}`);
        setIsProfileLoading(false);
      }
    );

    // Listen to Teachers subcollection
    const teachersColRef = collection(db, 'schools', currentUser.uid, 'teachers');
    const unsubTeachers = onSnapshot(
      teachersColRef,
      (snapshot) => {
        const teacherDocs: TeacherRecord[] = [];
        snapshot.forEach((doc) => {
          teacherDocs.push({ id: doc.id, ...(doc.data() as TeacherRecord) });
        });
        // Sort by orderIndex or creation date
        teacherDocs.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        setTeachers(teacherDocs);
        setIsTeachersLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, `schools/${currentUser.uid}/teachers`);
        setIsTeachersLoading(false);
      }
    );

    return () => {
      unsubSchool();
      unsubTeachers();
    };
  }, [currentUser]);

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSelectedCategory(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  // Save School Profile
  const handleSaveSchoolProfile = async (profileData: Omit<SchoolProfile, 'id'>) => {
    if (!currentUser) return;
    try {
      const schoolDocRef = doc(db, 'schools', currentUser.uid);
      await setDoc(schoolDocRef, profileData, { merge: true });
      showAlert('School profile updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `schools/${currentUser.uid}`);
    }
  };

  // Save or Update Teacher
  const handleSaveTeacher = async (record: Partial<TeacherRecord>) => {
    if (!currentUser) return;
    try {
      const teachersColRef = collection(db, 'schools', currentUser.uid, 'teachers');
      if (teacherToEdit && teacherToEdit.id) {
        const docRef = doc(db, 'schools', currentUser.uid, 'teachers', teacherToEdit.id);
        await updateDoc(docRef, record as any);
        showAlert(`Teacher "${record.teacherName}" updated successfully!`);
      } else {
        const newOrder = teachers.filter((t) => t.formCategory === record.formCategory).length + 1;
        await addDoc(teachersColRef, {
          ...record,
          orderIndex: newOrder,
          createdAt: new Date().toISOString(),
        });
        showAlert(`Teacher "${record.teacherName}" added successfully!`);
      }
      setTeacherToEdit(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `schools/${currentUser.uid}/teachers`);
    }
  };

  // Delete Teacher
  const handleDeleteTeacher = async (teacherId: string) => {
    if (!currentUser) return;
    try {
      const docRef = doc(db, 'schools', currentUser.uid, 'teachers', teacherId);
      await deleteDoc(docRef);
      showAlert('Teacher record deleted.');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `schools/${currentUser.uid}/teachers/${teacherId}`);
    }
  };

  // Seed 3 Demo Teachers for a Category
  const handleSeedDemoTeachers = async (category: FormDefinition) => {
    if (!currentUser) return;
    try {
      const sName = schoolProfile?.schoolName || 'UTKRAMIT MADHYA VIDYALAYA RAMPUR';
      const uCode = schoolProfile?.udiseCode || '10190100201';
      const sampleList = getSampleTeachersForCategory(category.id, currentUser.uid, sName, uCode);

      const teachersColRef = collection(db, 'schools', currentUser.uid, 'teachers');
      for (let i = 0; i < sampleList.length; i++) {
        const item = sampleList[i];
        await addDoc(teachersColRef, {
          ...item,
          formCategory: category.id,
          schoolId: currentUser.uid,
          orderIndex: i + 1,
          createdAt: new Date().toISOString(),
        });
      }
      showAlert(`Added ${sampleList.length} test teachers to ${category.prapatraNumber}! Click "Generate PDF" to preview.`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `schools/${currentUser.uid}/teachers`);
    }
  };

  // Import Teachers from Excel
  const handleImportTeachersFromExcel = async (parsedList: Partial<TeacherRecord>[]) => {
    if (!currentUser) return;
    try {
      const teachersColRef = collection(db, 'schools', currentUser.uid, 'teachers');
      let count = 0;
      for (const t of parsedList) {
        await addDoc(teachersColRef, {
          ...t,
          schoolId: currentUser.uid,
          schoolName: schoolProfile?.schoolName || t.schoolName || '',
          udiseCode: schoolProfile?.udiseCode || t.udiseCode || '',
          createdAt: new Date().toISOString(),
        });
        count++;
      }
      showAlert(`Successfully imported ${count} teachers into ${importCategory.prapatraNumber}!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `schools/${currentUser.uid}/teachers`);
    }
  };

  // Open PDF Modal for category
  const handleOpenPdfForCategory = (category: FormDefinition) => {
    setPdfCategory(category);
    setIsPdfModalOpen(true);
  };

  // Open Excel Import Modal for category
  const handleOpenImportModal = (category: FormDefinition) => {
    setImportCategory(category);
    setIsImportModalOpen(true);
  };

  // Export single category Excel
  const handleExportCategoryExcel = (category: FormDefinition) => {
    const categoryTeachers = teachers.filter((t) => t.formCategory === category.id);
    exportCategoryToExcel(category, categoryTeachers, schoolProfile);
    showAlert(`Downloaded Excel for ${category.prapatraNumber}.`);
  };

  // Export all categories Excel
  const handleExportAllExcel = () => {
    exportAllCategoriesToExcel(teachers, schoolProfile);
    showAlert('Downloaded consolidated Excel for all categories.');
  };

  // Quick Seed Demo School Profile
  const handleLoadDemoSchool = async () => {
    if (!currentUser) return;
    await handleSaveSchoolProfile({
      schoolName: 'UTKRAMIT MADHYA VIDYALAYA RAMPUR',
      udiseCode: '10190100201',
      block: 'DUMRA',
      district: 'SITAMARHI',
      headmasterName: 'ARUN KUMAR SINGH',
      headmasterUid: currentUser.uid,
      headmasterEmail: currentUser.email || 'hm@school.edu.in',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  // Loading spinner during auth check
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <p className="text-xs text-slate-300 font-medium tracking-wide">
          Initializing Bihar Teacher Master Data Manager...
        </p>
      </div>
    );
  }

  // Not signed in: Show Auth Screen
  if (!currentUser) {
    return <AuthScreen onDemoLoginRequested={handleLoadDemoSchool} />;
  }

  // Active Category teachers filter
  const currentCategoryTeachers = selectedCategory
    ? teachers.filter((t) => t.formCategory === selectedCategory.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        school={schoolProfile}
        userEmail={currentUser.email}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onSignOut={handleSignOut}
        onLoadDemoSchool={handleLoadDemoSchool}
      />

      {/* Floating Alert Banner */}
      {appAlert && (
        <div className="fixed top-14 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            className={`px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
              appAlert.type === 'success'
                ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
                : appAlert.type === 'error'
                ? 'bg-red-900 text-red-50 border-red-700'
                : 'bg-indigo-900 text-indigo-50 border-indigo-700'
            }`}
          >
            {appAlert.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400" />
            )}
            <span>{appAlert.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* If school profile not setup banner */}
        {!schoolProfile && !isProfileLoading && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <strong>School Profile Required:</strong> Please configure your school name, 11-digit UDISE code, block, and district to generate valid official PDFs.
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleLoadDemoSchool}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition shadow-sm"
              >
                Auto-Fill Sample School
              </button>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold transition"
              >
                Set Up Manually
              </button>
            </div>
          </div>
        )}

        {/* Global Toolbar Bar */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Quick Actions:
            </span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-medium transition"
              >
                ← View All Categories
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAllExcel}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition"
              title="Export all categories to Excel sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export All to Excel</span>
            </button>

            {selectedCategory && (
              <button
                onClick={() => {
                  setTeacherToEdit(null);
                  setIsTeacherModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Teacher ({selectedCategory.prapatraNumber})</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Category Table or Category Dashboard */}
        {selectedCategory ? (
          <TeachersTable
            form={selectedCategory}
            teachers={currentCategoryTeachers}
            school={schoolProfile}
            onBack={() => setSelectedCategory(null)}
            onAddTeacher={() => {
              setTeacherToEdit(null);
              setIsTeacherModalOpen(true);
            }}
            onEditTeacher={(t) => {
              setTeacherToEdit(t);
              setIsTeacherModalOpen(true);
            }}
            onDeleteTeacher={handleDeleteTeacher}
            onGeneratePdf={() => handleOpenPdfForCategory(selectedCategory)}
            onExportExcel={() => handleExportCategoryExcel(selectedCategory)}
            onOpenImportModal={() => handleOpenImportModal(selectedCategory)}
            onSeedDemoTeachers={() => handleSeedDemoTeachers(selectedCategory)}
          />
        ) : (
          <CategoryDashboard
            teachers={teachers}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onAddTeacher={(cat) => {
              setSelectedCategory(cat);
              setTeacherToEdit(null);
              setIsTeacherModalOpen(true);
            }}
            onGeneratePdf={handleOpenPdfForCategory}
            onExportExcel={handleExportCategoryExcel}
            onSeedDemoTeachersForCategory={handleSeedDemoTeachers}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <School className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Bihar School Teacher Master Data Manager</span>
            <span>• शिक्षा विभाग बिहार सरकार</span>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            <span>Compliant with official Prapatra I - X standards • Landscape A4 Vector Layout</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SchoolProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={schoolProfile}
        onSave={handleSaveSchoolProfile}
        userEmail={currentUser.email || 'headmaster@school.edu.in'}
        userId={currentUser.uid}
      />

      {isTeacherModalOpen && (
        <TeacherEntryModal
          isOpen={isTeacherModalOpen}
          onClose={() => {
            setIsTeacherModalOpen(false);
            setTeacherToEdit(null);
          }}
          form={selectedCategory || FORMS_DEFINITIONS[0]}
          school={schoolProfile}
          teacherToEdit={teacherToEdit}
          onSave={handleSaveTeacher}
        />
      )}

      {isImportModalOpen && (
        <ExcelImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          form={importCategory}
          school={schoolProfile}
          onImportConfirmed={handleImportTeachersFromExcel}
        />
      )}

      {isPdfModalOpen && (
        <PdfPreviewModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          form={pdfCategory}
          teachers={teachers.filter((t) => t.formCategory === pdfCategory.id)}
          school={schoolProfile}
        />
      )}
    </div>
  );
}
