import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BorrowStatusBadge } from '../utils/timeStatus';

// --- 1. COMPONENT HEADER ---
function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-[#0B1C33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section - Left Side */}
          <div className="flex items-center gap-3">
            <img
              alt="Institute Logo"
              className="h-10 md:h-12 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbro60xS2lLLCBheA9vun2VFFTb_Q3ibg5fP90o3KfeXZtaE394jM2Mg7QFUY5zdtRVEvdORuz0dRKbULKNwp-dcmq4okigh4XuNP-MhuA_JBF1h9nXfL1F__axEwCFsWRzSTx0TlEhrW6t1oUSIr5kzCi6RsDhpkr4Mx07QP0IA5xKbqWNhYMpaoMa_tiIz7vFL1RW2njJVAr4ZVPhdJcdcoV_449G9ReGvYOmNVi9w-afD2LM2ggaHUbxIL0y-y9w"
            />
          </div>

          {/* Desktop Navigation - Shown on lg and up */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/sub-lab-alat" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0B1C33] border-b-2 border-transparent hover:border-[#0B1C33] pb-1 transition">
              SUB LAB
            </Link>
            <Link to="/logbook_alat_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0B1C33] border-b-2 border-transparent hover:border-[#0B1C33] pb-1 transition">
              LOGBOOK
            </Link>
            <Link to="/final_logbook_alat_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[#0B1C33] border-b-2 border-[#0B1C33] pb-1">
              FINAL LOGBOOK
            </Link>
            <div className="flex items-center gap-4 border-l pl-8 ml-4">
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// --- 2. COMPONENT SIDEBAR ---
function Sidebar({ onLabChange, selectedLab }) {
  const navigate = useNavigate();
  const [localSelectedLab, setLocalSelectedLab] = useState(selectedLab || 'all');

  const handleNewInput = () => {
    navigate('/logbook_alat_researcher');
  };

  const handleLabChange = (e) => {
    const lab = e.target.value;
    setLocalSelectedLab(lab);
    if (onLabChange) {
      onLabChange(lab);
    }
  };

  return (
    <aside className="hidden lg:flex w-56 xl:w-64 bg-[#F8F9FA] border-r border-[#E2E8F0] flex flex-col justify-between py-8 px-4 flex-shrink-0 min-h-[calc(100vh-80px)]">
      <div>
        <div className="mb-8 px-4">
          <h1 className="text-xl font-serif font-bold text-slate-900 leading-tight">Data Peminjaman</h1>
          <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
        </div>
        <nav className="space-y-1">
          <Link to="/sub-lab-alat" className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-sm">Sub Lab</span>
          </Link>
          <Link to="/logbook_alat_researcher" className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-sm">LogBook</span>
          </Link>
          <Link to="/final_logbook_alat_researcher" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition bg-[#1a2332] text-white">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-sm">Final LogBook</span>
          </Link>
        </nav>
      </div>
      <div className="pt-8 border-t border-slate-200 space-y-1">
        <Link to="/support" className="flex items-center space-x-3 px-4 py-2 text-slate-600 hover:text-slate-900 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="text-sm font-medium">Support</span>
        </Link>
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }}
          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:text-red-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}

// --- 3. COMPONENT SIGNATURE STATUS (DISPLAY ONLY) ---
function SignatureStatus({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          icon: '✅',
          label: 'Approved'
        };
      case 'rejected':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
          icon: '❌',
          label: 'Rejected'
        };
      default:
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-300',
          icon: '⏳',
          label: 'Pending'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} text-[10px] sm:text-xs font-medium shadow-sm transition-all`}>
        <span>{config.icon}</span>
        <span className="hidden xs:inline">{config.label}</span>
      </div>
    </div>
  );
}

// --- 4. COMPONENT TABLE ROW ---
function DataRow({ row }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="space-y-1">
          <div>
            <span className="text-[8px] sm:text-[9px] font-bold text-[#64748B] uppercase">MULAI</span>
            <br />
            <span className="font-semibold text-[11px] sm:text-xs">{row.mulai}</span>
          </div>
          <div>
            <span className="text-[8px] sm:text-[9px] font-bold text-[#64748B] uppercase">SELESAI</span>
            <br />
            <span className="font-semibold text-[11px] sm:text-xs">{row.selesai}</span>
          </div>
          <BorrowStatusBadge waktuMulai={row.waktuMulaiRaw} waktuSelesai={row.waktuSelesaiRaw} />
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="flex items-start gap-1 sm:gap-2 mt-1 sm:mt-2">
          <span className="font-bold text-[#0B1C33] text-[11px] sm:text-xs">{row.namaAlat || "-"}</span>
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="flex items-start gap-1 sm:gap-2 mt-1 sm:mt-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1A233A] text-white flex items-center justify-center text-[8px] sm:text-[9px] font-bold shrink-0 mt-1">
            {row.inisial}
          </div>
          <div>
            <p className="font-bold leading-tight text-[11px] sm:text-xs">{row.nama}</p>
            <p className="text-[8px] sm:text-[10px] text-[#64748B] mt-0.5">{row.institusi}</p>
            <p className="text-[8px] sm:text-[10px] text-[#64748B] mt-0.5">Prodi: {row.prodi}</p>
            <p className="text-[8px] sm:text-[10px] text-[#64748B] mt-0.5">{row.jabatan}</p>
          </div>
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-2 sm:mt-4">
          <span className="inline-block text-[10px] sm:text-xs font-medium">{row.sampel}</span>
          {row.sampelLainnya && row.sampelLainnya !== '-' && row.sampelLainnya !== '' && row.sampelLainnya !== 'null' && (
            <div className="mt-0.5">
              <span className="inline-block text-[8px] sm:text-[9px] text-[#F4B942] font-medium">📝 Isian Singkat:</span>
              <span className="block text-[8px] sm:text-[9px] text-gray-600 italic">
                {row.sampelLainnya}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <span className="mt-2 sm:mt-4 inline-block text-[10px] sm:text-xs">{row.pengujian}</span>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <span className="mt-2 sm:mt-5 inline-block text-[10px] sm:text-xs">{row.tujuan}</span>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-1 sm:mt-3 text-[8px] sm:text-[10px] text-[#334155] whitespace-pre-line leading-relaxed">
          {row.kondisi.join('\n')}
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center">
        <div className="mt-2 sm:mt-4">
          <SignatureStatus status={row.parafResearcher} />
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center">
        <div className="mt-2 sm:mt-4">
          <SignatureStatus status={row.parafLaboran} />
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <p className="text-[8px] sm:text-[10px] text-[#64748B] whitespace-normal max-w-[70px] sm:max-w-[90px] mt-2 sm:mt-4 leading-tight">
          {row.catatanLaboran}
        </p>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center">
        <div className="mt-2 sm:mt-4">
          <SignatureStatus status={row.parafKepalaLab} />
        </div>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <p className="text-[8px] sm:text-[10px] text-[#64748B] whitespace-normal max-w-[60px] sm:max-w-[80px] mt-2 sm:mt-4 leading-tight">
          {row.catatanKepalaLab}
        </p>
      </td>

      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <p className="text-[8px] sm:text-[10px] text-[#64748B] whitespace-normal max-w-[80px] sm:max-w-[100px] mt-2 sm:mt-4 leading-tight">
          {row.catatanTambahan}
        </p>
      </td>
    </tr>
  );
}

// --- 5. COMPONENT PAGINATION ---
function Pagination({ currentPage, totalPages, paginate, nextPage, prevPage }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={prevPage}
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded border border-[#E2E8F0] flex items-center justify-center bg-white text-[#64748B] hover:bg-gray-50 text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {getPageNumbers().map((number, index) => (
        number === '...' ? (
          <span key={`ellipsis-${index}`} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#64748B] text-sm">
            …
          </span>
        ) : (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center font-medium transition-all text-sm ${currentPage === number
              ? 'bg-[#1A233A] text-white shadow-md'
              : 'border border-[#E2E8F0] bg-white text-[#1A233A] hover:bg-gray-50'
              }`}
          >
            {number}
          </button>
        )
      ))}

      <button
        onClick={nextPage}
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded border border-[#E2E8F0] flex items-center justify-center bg-white text-[#1A233A] hover:bg-gray-50 text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}

// --- 6. MAIN PAGE COMPONENT ---
export default function LogbookAlatResearcher() {
  const [selectedLab, setSelectedLab] = useState('all');
  const [databaseRows, setDatabaseRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/logbooks/alat')
      .then(response => response.json())
      .then(rows => {
        if (!Array.isArray(rows)) return;
        setDatabaseRows(rows.map(row => ({
          id: row.logbook_alat_id,
          waktuMulaiRaw: row.waktu_mulai || row.created_at,
          waktuSelesaiRaw: row.waktu_selesai || row.created_at,
          mulai: row.waktu_mulai ? new Date(row.waktu_mulai).toLocaleString('id-ID') : '-',
          selesai: row.waktu_selesai ? new Date(row.waktu_selesai).toLocaleString('id-ID') : '-',
          namaAlat: row.nama_alat || '-',
          inisial: (row.nama_lengkap || '-').slice(0, 2).toUpperCase(),
          nama: row.nama_lengkap || '-',
          jabatan: 'Researcher',
          sampel: row.jenis_sample || '-',
          sampelLainnya: row.jenis_sample_lainnya || null,
          pengujian: row.jenis_pengujian || '-',
          tujuan: row.tujuan_pengujian || '-',
          kondisi: row.kondisi_teknis ? [row.kondisi_teknis] : ['-'],
          subLab: (row.sub_lab_alat_id || '').replace('Sub Lab ', ''),
          parafResearcher: 'approved',
          parafKepalaLab: row.status_paraf_kepala_lab || 'pending',
          parafLaboran: row.status_paraf_laboran || 'pending',
          catatanTambahan: row.catatan_tambahan || '-',
          catatanLaboran: row.catatan_laboran || '-',
          catatanKepalaLab: row.catatan_kepala_lab || '-',
          institusi: row.institusi_departemen || '-',
          prodi: row.prodi || '-'
        })));
      })
      .catch(error => console.error('Gagal mengambil data logbook alat:', error));
  }, []);

  const allEntries = databaseRows;
  const latestEntry = databaseRows[0];
  const filteredData = selectedLab === 'all'
    ? allEntries
    : allEntries.filter(row => row.subLab === selectedLab);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleLabChange = (lab) => {
    setSelectedLab(lab);
    setCurrentPage(1);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('landscape');
    const tableColumn = [
      "SUB-LAB", "PERIODE", "NAMA ALAT", "NAMA RESEARCHER", "SAMPEL", "PENGUJIAN", "TUJUAN",
      "KONDISI TEKNIS", "PARAF RESEARCHER", "PARAF LABORAN", "CATATAN LABORAN",
      "PARAF KEPALA LAB", "CATATAN KEPALA LAB", "CATATAN TAMBAHAN"
    ];
    const tableRows = [];

    filteredData.forEach(row => {
      const getStatusLabel = (status) => {
        switch (status) {
          case 'approved': return '✅ Approved';
          case 'rejected': return '❌ Rejected';
          default: return '⏳ Pending';
        }
      };

      let sampelText = row.sampel;
      if (row.sampelLainnya && row.sampelLainnya !== '-' && row.sampelLainnya !== '' && row.sampelLainnya !== 'null') {
        sampelText = `${row.sampel} (${row.sampelLainnya})`;
      }

      const rowData = [
        row.subLab,
        row.mulai + " - " + row.selesai,
        row.namaAlat,
        row.nama,
        sampelText,
        row.pengujian,
        row.tujuan,
        row.kondisi.join("\n"),
        getStatusLabel(row.parafResearcher),
        getStatusLabel(row.parafLaboran),
        row.catatanLaboran,
        getStatusLabel(row.parafKepalaLab),
        row.catatanKepalaLab,
        row.catatanTambahan
      ];
      tableRows.push(rowData);
    });

    const title = selectedLab === 'all'
      ? "General Data Logbook Alat (ABEL) - All Rooms"
      : `General Data Logbook Alat (ABEL) - Sub-Lab ${selectedLab}`;

    doc.text(title, 14, 15);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      headStyles: { fillColor: '#1A233A', textColor: '#FFFFFF', fontSize: 7 },
      bodyStyles: { fontSize: 6 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 22 },
        8: { cellWidth: 22 },
        9: { cellWidth: 22 }
      }
    });

    const fileName = selectedLab === 'all'
      ? "General_Data_Logbook_Alat_ABEL_All_Rooms.pdf"
      : `General_Data_Logbook_Alat_ABEL_SubLab_${selectedLab}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-2 sm:p-3 md:p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <Header />
        <div className="flex flex-col lg:flex-row flex-1">

          {/* Mobile & Tablet Horizontal Navigation */}
          <nav className="lg:hidden bg-[#F8F9FA] border-b border-[#E2E8F0] py-2 sm:py-3 px-3 sm:px-4 flex items-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
            <Link to="/sub-lab-alat" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-[10px] sm:text-xs font-medium transition shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Sub Lab</span>
            </Link>
            <Link to="/logbook_alat_researcher" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-[10px] sm:text-xs font-medium transition shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>LogBook</span>
            </Link>
            <Link to="/final_logbook_alat_researcher" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1a2332] text-white text-[10px] sm:text-xs font-medium shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Final LogBook</span>
            </Link>
            <Link to="/support" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:text-slate-900 text-[10px] sm:text-xs font-medium transition shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Support</span>
            </Link>
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-red-600 hover:text-red-700 text-[10px] sm:text-xs font-medium transition shrink-0"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Logout</span>
            </Link>
          </nav>

          <Sidebar onLabChange={handleLabChange} selectedLab={selectedLab} />

          <main className="flex-1 bg-white overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

              {/* Breadcrumbs - Responsive */}
              <div className="flex items-center text-[10px] sm:text-xs text-[#64748B] gap-1 sm:gap-2 overflow-x-auto">
                <Link to="/logs" className="hover:text-[#1A233A] whitespace-nowrap">Logs</Link>
                <span className="whitespace-nowrap">›</span>
                <span className="font-semibold text-[#0B1C33] uppercase whitespace-nowrap">GENERAL DATA ALAT ABEL</span>
                {selectedLab !== 'all' && (
                  <>
                    <span className="whitespace-nowrap">›</span>
                    <span className="font-semibold text-[#0B1C33] whitespace-nowrap">Sub-Lab {selectedLab}</span>
                  </>
                )}
              </div>

              {/* User Info Card - Responsive */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] tracking-wider uppercase mb-1">NAMA LENGKAP</p>
                  <p className="font-bold text-xs sm:text-sm text-[#1A233A] break-words">{latestEntry?.nama || '-'}</p>
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] tracking-wider uppercase mb-1">INSTITUSI/DEPARTEMEN</p>
                  <p className="font-bold text-xs sm:text-sm text-[#1A233A] break-words">{latestEntry?.institusi || '-'}</p>
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] tracking-wider uppercase mb-1">PRODI</p>
                  <p className="font-bold text-xs sm:text-sm text-[#1A233A] break-words">{latestEntry?.prodi || '-'}</p>
                </div>
              </div>

              {/* Page Title & Actions - Responsive */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl text-[#1A233A] font-serif break-words">
                    General Data Logbook Alat (ABEL)
                  </h1>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Menampilkan {filteredData.length} data dari {allEntries.length} total entri
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-gray-100 text-[#1A233A] border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium text-[10px] sm:text-sm shadow-sm flex items-center gap-1 sm:gap-2 hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="hidden xs:inline">Unduh Laporan</span>
                    <span className="xs:hidden">PDF</span>
                  </button>
                </div>
              </div>

              {/* Room Statistics Cards - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {[
                  { code: '801', name: 'Fermentation & Separation' },
                  { code: '802', name: 'Hydrolysis & Detoxification' },
                  { code: '803', name: 'Biomass Pretreatment' },
                  { code: '804', name: 'Molecular Genomics' }
                ].map(room => {
                  const count = allEntries.filter(row => String(row.subLab).includes(room.code)).length;
                  const isActive = selectedLab === room.code;
                  return (
                    <div
                      key={room.code}
                      onClick={() => handleLabChange(room.code)}
                      className={`bg-white rounded-xl border p-3 sm:p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${isActive ? 'border-[#1A233A] ring-2 ring-[#1A233A]/20' : 'border-[#E2E8F0]'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[8px] sm:text-xs text-[#64748B] font-medium">I.{room.code}</p>
                          <p className="text-xs sm:text-sm font-bold text-[#1A233A] leading-tight truncate max-w-[130px]">{room.name}</p>
                        </div>
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[#1A233A] text-white' : 'bg-gray-100 text-[#1A233A]'
                          }`}>
                          <span className="font-bold text-sm sm:text-base">{count}</span>
                        </div>
                      </div>
                      <p className="text-[8px] sm:text-[10px] text-[#64748B] mt-1.5">{count} entries</p>
                    </div>
                  );
                })}
              </div>

              {/* Data Table Container */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col">

                {/* Table Pagination Info - Responsive */}
                <div className="px-3 sm:px-6 py-2 sm:py-3 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between bg-gray-50 text-xs sm:text-sm gap-2">
                  <span className="text-[#64748B] text-[10px] sm:text-sm">
                    Menampilkan {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} - {Math.min(indexOfLastRow, filteredData.length)} dari {filteredData.length} entri
                    {selectedLab !== 'all' && (
                      <span className="ml-1 sm:ml-2 text-[8px] sm:text-[10px] font-medium text-[#1A233A] bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded">
                        Sub-Lab {selectedLab}
                      </span>
                    )}
                  </span>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                    nextPage={nextPage}
                    prevPage={prevPage}
                  />
                </div>

                {/* Responsive Table - Horizontal Scroll on Mobile */}
                <div className="overflow-x-auto">
                  {filteredData.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-[#64748B]">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                      <p className="font-medium text-sm sm:text-base">Tidak ada data untuk Sub-Lab {selectedLab}</p>
                      <p className="text-xs sm:text-sm mt-1">Pilih Sub-Lab lain atau lihat semua data</p>
                    </div>
                  ) : (
                    <table className="w-full text-left text-[10px] sm:text-xs whitespace-nowrap">
                      <thead className="bg-[#E9EBED] text-[#6B7280] font-bold uppercase tracking-wider text-[8px] sm:text-[10px]">
                        <tr>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[120px]">PERIODE</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[120px]">NAMA ALAT</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[100px] sm:min-w-[160px]">NAMA PENELITI</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[100px]">SAMPEL</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">PENGUJIAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">TUJUAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">KONDISI</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[60px] sm:min-w-[80px]">PARAF<br />PENELITI</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[60px] sm:min-w-[80px]">PARAF<br />LABORAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">CATATAN<br />LABORAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[60px] sm:min-w-[80px]">PARAF<br />KEPALA LAB</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">CATATAN<br />KEPALA LAB</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[80px]">CATATAN<br />TAMBAHAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                        {currentRows.map((row, index) => (
                          <DataRow key={index} row={row} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Back Button - Responsive */}
              <div className="flex justify-end pt-2 sm:pt-4 pb-4 sm:pb-8">
                <Link
                  to="/"
                  className="bg-[#1A233A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-bold shadow-md hover:bg-gray-800 transition-colors flex items-center gap-1 sm:gap-2 font-serif text-xs sm:text-sm"
                >
                  Back to Beranda →
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Footer - Responsive */}
        <footer className="bg-[#1a2332] text-slate-400 text-[9px] sm:text-[10px] md:text-xs py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 flex-shrink-0 z-10 relative">
          <p className="text-center sm:text-left">Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}