import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminHeader({ role = 'laboran', activeCategory = 'lab' }) {
  const isLaboran = role.toLowerCase().includes('laboran');
  const roleName = isLaboran ? 'Laboran' : 'Kepala Laboratorium';

  const labUrl = isLaboran ? '/admin/lab-logbook-laboran' : '/admin/lab-logbook-kepala-lab';
  const alatUrl = isLaboran ? '/admin/alat-logbook-laboran' : '/admin/alat-logbook-kepala-lab';

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-[#0B1C33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo & Role Identity */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                alt="IBB FTUI Logo"
                className="h-10 md:h-12 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbro60xS2lLLCBheA9vun2VFFTb_Q3ibg5fP90o3KfeXZtaE394jM2Mg7QFUY5zdtRVEvdORuz0dRKbULKNwp-dcmq4okigh4XuNP-MhuA_JBF1h9nXfL1F__axEwCFsWRzSTx0TlEhrW6t1oUSIr5kzCi6RsDhpkr4Mx07QP0IA5xKbqWNhYMpaoMa_tiIz7vFL1RW2njJVAr4ZVPhdJcdcoV_449G9ReGvYOmNVi9w-afD2LM2ggaHUbxIL0y-y9w"
              />
            </Link>
          </div>

          {/* 2 Pilihan Utama di Navbar: Logbook Lab vs Logbook Alat */}
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Pilihan 1: LAB */}
            <Link
              to={labUrl}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-all ${activeCategory === 'lab'
                  ? 'bg-[#0B1C33] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1C33] hover:bg-gray-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Data Pengguna Lab</span>
            </Link>

            {/* Pilihan 2: ALAT */}
            <Link
              to={alatUrl}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-all ${activeCategory === 'alat'
                  ? 'bg-[#0B1C33] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1C33] hover:bg-gray-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span>Data Penggunaan Alat</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
