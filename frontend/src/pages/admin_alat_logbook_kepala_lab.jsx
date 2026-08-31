import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getAlatLogbooks } from '../api/adminService';
import { BorrowStatusBadge } from '../utils/timeStatus';

import AdminHeader from './AdminHeader';

// --- 2. COMPONENT SIDEBAR ---
function Sidebar({ onLabChange, selectedLab }) {
  return (
    <aside className="hidden lg:flex w-56 xl:w-64 bg-[#F8F9FA] border-r border-[#E2E8F0] flex flex-col justify-between py-8 px-4 flex-shrink-0 min-h-[calc(100vh-80px)]">
      <div>
        <div className="mb-8 px-4">
          <h1 className="text-xl font-serif font-bold text-slate-900 leading-tight">Data Kepala Laboratorium</h1>
          <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
        </div>
        <nav className="space-y-1">
          <Link to="/admin/catatan-alat-kepala-lab" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
            <span className="text-sm">Catatan untuk Researcher</span>
          </Link>
          <Link to="/admin/paraf-alat-kepala-lab" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
            <span className="text-sm">Paraf untuk Researcher</span>
          </Link>
          <Link to="/admin/lab-logbook-kepala-lab" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
            <span className="text-sm">Data LogBook Researcher</span>
          </Link>
          <Link to="/admin/alat-logbook-kepala-lab" className="flex items-center px-4 py-2.5 rounded-lg font-medium transition bg-[#1a2332] text-white">
            <span className="text-sm">Data LogBook Alat</span>
          </Link>
        </nav>
      </div>
      <Link to="/login" className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 transition">
        <span className="text-sm font-medium">Logout</span>
      </Link>
    </aside>
  );
}

// --- 3. COMPONENT SIGNATURE STATUS ---
function SignatureStatus({ status }) {
  const getStatusConfig = () => {
    switch(status?.toLowerCase()) {
      case 'approved':
      case 'signed':
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
      <div className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} text-[10px] sm:text-xs font-medium shadow-sm transition-all w-full justify-center`}>
        <span>{config.icon}</span>
        <span className="hidden xs:inline">{config.label}</span>
      </div>
    </div>
  );
}

// --- 4. COMPONENT FIXED NOTE & PARAGRAF ---
function FixedNote({ value, placeholder = '-' }) {
  return (
    <div className="px-2 py-1 min-h-[28px] w-full bg-gray-50 rounded border border-gray-200">
      <span className="text-[10px] sm:text-xs text-gray-700">{value || placeholder}</span>
    </div>
  );
}

function FixedParagraf({ value, placeholder = '-' }) {
  return (
    <div className="px-2 py-1 min-h-[28px] w-full bg-gray-50 rounded border border-gray-200">
      <p className="text-[10px] sm:text-xs text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
        {value || placeholder}
      </p>
    </div>
  );
}

// --- 5. COMPONENT EDIT BUTTONS KEPALA LAB ---
function EditableParafKepalaLab({ row }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/paraf-alat-kepala-lab', { 
      state: { 
        id: row.id,
        namaPeneliti: row.namaPeneliti,
        npm: row.npm,
        aktivitas: row.aktivitasDetail
      } 
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 min-h-[28px] w-full">
      <SignatureStatus status={row.parafKepalaLab || 'pending'} />
      <button 
        onClick={handleEdit}
        className="text-[#0B1C33] hover:text-[#1A233A] p-1 hover:bg-gray-100 rounded-full transition-colors"
        title="Edit Paraf Kepala Lab"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

function EditableCatatanKepalaLab({ row }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/catatan-alat-kepala-lab', { 
      state: { 
        id: row.id,
        namaPeneliti: row.namaPeneliti,
        npm: row.npm,
        aktivitas: row.aktivitasDetail
      } 
    });
  };

  return (
    <div className="flex items-center gap-1 w-full min-w-[150px]">
      <div className="flex-1 px-2 py-1 min-h-[28px] bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs text-gray-700 truncate">{row.catatanKepalaLab || 'Tidak ada catatan'}</span>
        <button 
          onClick={handleEdit}
          className="text-[#0B1C33] hover:text-[#1A233A] p-0.5 hover:bg-gray-200 rounded transition-colors ml-1"
          title="Edit Catatan Kepala Lab"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// --- 6. COMPONENT TABLE ROW (Kepala Lab Version - Alat) ---
function DataRow({ row }) {
  return (
    <tr className="hover:bg-gray-50">
      {/* PERIODE PENGGUNAAN ALAT */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="space-y-0.5 sm:space-y-1">
          <div className="text-[10px] sm:text-xs text-gray-600">
            <span className="font-medium">Mulai:</span> {row.tanggalMulai} {row.jamMulai}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-600">
            <span className="font-medium">Selesai:</span> {row.tanggalSelesai} {row.jamSelesai}
          </div>
          <BorrowStatusBadge waktuMulai={row.waktuMulaiRaw} waktuSelesai={row.waktuSelesaiRaw} />
        </div>
      </td>

      {/* NAMA RESEARCHER */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-1 sm:mt-2">
          <span className="text-[10px] sm:text-xs text-gray-700 font-semibold">{row.namaResearcher}</span>
        </div>
      </td>

      {/* JENIS SAMPLE */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-1 sm:mt-2">
          <span className="text-[10px] sm:text-xs text-gray-600">{row.jenisSample}</span>
        </div>
      </td>

      {/* JENIS PENGUJIAN */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-1 sm:mt-2">
          <span className="text-[10px] sm:text-xs text-gray-600">{row.jenisPengujian}</span>
        </div>
      </td>

      {/* TUJUAN PENGUJIAN */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top">
        <div className="mt-1 sm:mt-2">
          <span className="text-[10px] sm:text-xs text-gray-600">{row.tujuanPengujian}</span>
        </div>
      </td>

      {/* KONDISI TEKNIS */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top min-w-[200px]">
        <div className="mt-1 sm:mt-2">
          <FixedParagraf 
            value={row.kondisiTeknis}
            placeholder="Tidak ada kondisi teknis"
          />
        </div>
      </td>

      {/* PARAF STUDENT */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center min-w-[100px]">
        <div className="mt-2 sm:mt-4">
          <SignatureStatus status={row.parafStudent || 'approved'} />
        </div>
      </td>

      {/* PARAF LABORAN - READ-ONLY */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center min-w-[100px]">
        <div className="mt-2 sm:mt-4">
          <SignatureStatus status={row.parafLaboran || 'pending'} />
        </div>
      </td>

      {/* CATATAN LABORAN - READ-ONLY */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top min-w-[180px]">
        <div className="mt-1 sm:mt-2">
          <FixedNote 
            value={row.catatanLaboran}
            placeholder="Tidak ada catatan"
          />
        </div>
      </td>

      {/* PARAF KEPALA LAB - EDITABLE */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top text-center min-w-[120px]">
        <div className="mt-2 sm:mt-4">
          <EditableParafKepalaLab row={row} />
        </div>
      </td>

      {/* CATATAN KEPALA LAB - EDITABLE */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top min-w-[200px]">
        <div className="mt-1 sm:mt-2">
          <EditableCatatanKepalaLab row={row} />
        </div>
      </td>

      {/* CATATAN TAMBAHAN */}
      <td className="px-2 sm:px-4 py-3 sm:py-4 align-top min-w-[180px]">
        <div className="mt-1 sm:mt-2">
          <FixedNote 
            value={row.catatanTambahan}
            placeholder="Tidak ada catatan tambahan"
          />
        </div>
      </td>
    </tr>
  );
}

// --- 7. PAGINATION COMPONENT ---
function Pagination({ currentPage, totalPages, paginate, nextPage, prevPage }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      <button 
        onClick={prevPage}
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded border border-[#E2E8F0] flex items-center justify-center bg-white text-[#1A233A] hover:bg-gray-50 text-sm ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
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
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center font-medium transition-all text-sm ${
              currentPage === number 
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
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded border border-[#E2E8F0] flex items-center justify-center bg-white text-[#1A233A] hover:bg-gray-50 text-sm ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}

// --- 8. MAIN PAGE COMPONENT ---
export default function AdminAlatLogbookKepalaLab() {
  const [selectedLab, setSelectedLab] = useState('all');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDbData = async () => {
    try {
      setLoading(true);
      const res = await getAlatLogbooks();
      if (res.success && res.data) {
        const mapped = res.data.map(item => {
          const wMulai = item.waktu_mulai ? new Date(item.waktu_mulai) : new Date(item.created_at);
          const wSelesai = item.waktu_selesai ? new Date(item.waktu_selesai) : new Date(item.created_at);
          
          return {
            id: item.logbook_id,
            waktuMulaiRaw: item.waktu_mulai || item.created_at,
            waktuSelesaiRaw: item.waktu_selesai || item.created_at,
            tanggalMulai: wMulai.toLocaleDateString('id-ID'),
            jamMulai: wMulai.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            tanggalSelesai: wSelesai.toLocaleDateString('id-ID'),
            jamSelesai: wSelesai.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            namaResearcher: item.nama_researcher || item.nama_lengkap || '-',
            jenisSample: item.jenis_sample || '-',
            jenisPengujian: item.jenis_pengujian || '-',
            tujuanPengujian: item.tujuan_pengujian || '-',
            kondisiTeknis: item.kondisi_teknis || '-',
            namaPeneliti: item.nama_lengkap || item.nama_researcher || '-',
            npm: item.nim_atau_nik || '-',
            subLab: item.sub_lab_alat_id || 'ALAT-01',
            parafStudent: item.status_paraf_student || 'approved',
            parafKepalaLab: item.status_paraf_kepala_lab || 'pending',
            catatanKepalaLab: item.catatan_kepala_lab || '',
            parafLaboran: item.status_paraf_laboran || 'pending',
            catatanLaboran: item.catatan_laboran || '',
            catatanTambahan: item.catatan_tambahan || ''
          };
        });
        setTableData(mapped);
      }
    } catch (err) {
      console.error('Error load alat logbooks for kepala lab from DB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const filteredData = selectedLab === 'all' 
    ? tableData 
    : tableData.filter(row => String(row.subLab).toLowerCase().includes(selectedLab.toLowerCase()));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

  const handleLabChange = (lab) => {
    setSelectedLab(lab);
    setCurrentPage(1);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('landscape');
    const tableColumn = [
      "PERIODE PENGGUNAAN ALAT", "NAMA RESEARCHER", "JENIS SAMPLE", 
      "JENIS PENGUJIAN", "TUJUAN PENGUJIAN", "KONDISI TEKNIS",
      "PARAF STUDENT", "PARAF LABORAN", "CATATAN LABORAN", 
      "PARAF KEPALA LAB", "CATATAN KEPALA LAB", "CATATAN TAMBAHAN"
    ];
    const tableRows = [];

    filteredData.forEach(row => {
      const parafKepalaLabLabel = row.parafKepalaLab === 'approved' ? '✅ Approved' : 
                                  row.parafKepalaLab === 'rejected' ? '❌ Rejected' : '⏳ Pending';
      const parafLaboranLabel = row.parafLaboran === 'approved' ? '✅ Approved' : 
                                row.parafLaboran === 'rejected' ? '❌ Rejected' : '⏳ Pending';
      
      const rowData = [
        `Mulai: ${row.tanggalMulai} ${row.jamMulai}\nSelesai: ${row.tanggalSelesai} ${row.jamSelesai}`,
        row.namaResearcher,
        row.jenisSample,
        row.jenisPengujian,
        row.tujuanPengujian,
        row.kondisiTeknis,
        "✅ Approved",
        parafLaboranLabel,
        row.catatanLaboran || "-",
        parafKepalaLabLabel,
        row.catatanKepalaLab || "-",
        row.catatanTambahan || "-"
      ];
      tableRows.push(rowData);
    });

    const title = selectedLab === 'all' 
      ? "General LogBook Penggunaan Alat - All Tools (Kepala Lab View)" 
      : `General LogBook Penggunaan Alat - Sub-Lab ${selectedLab} (Kepala Lab View)`;
    
    doc.text(title, 14, 15);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      headStyles: { fillColor: '#1A233A', textColor: '#FFFFFF', fontSize: 6 },
      bodyStyles: { fontSize: 5 }
    });
    
    const fileName = selectedLab === 'all' 
      ? "General_LogBook_Alat_All_KepalaLab.pdf" 
      : `General_LogBook_Alat_SubLab_${selectedLab}_KepalaLab.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-2 sm:p-3 md:p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <AdminHeader role="kepala_lab" activeCategory="alat" />
        <div className="flex flex-col lg:flex-row flex-1">
          
          <Sidebar onLabChange={handleLabChange} selectedLab={selectedLab} />

          {/* Main Content */}
          <main className="flex-1 bg-white p-3 sm:p-4 md:p-6 lg:p-8 min-w-0">
            <div className="max-w-full">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A233A]">
                    General Data LogBook Penggunaan Alat (Kepala Lab)
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Daftar logbook penggunaan instrumen terintegrasi real-time dengan Database MySQL.
                  </p>
                </div>
              </div>

              {/* Table Container */}
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-white shadow-sm mb-6">
                <div className="px-3 sm:px-6 py-2 sm:py-3 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between bg-gray-50 text-[10px] sm:text-sm gap-2">
                  <span className="text-[#64748B]">
                    Menampilkan {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} - {Math.min(indexOfLastRow, filteredData.length)} dari {filteredData.length} Data Logbook di Database
                  </span>
                  
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={(page) => setCurrentPage(page)}
                    nextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    prevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  />
                </div>

                {loading ? (
                  <div className="py-12 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A233A] mx-auto mb-2"></div>
                    Memuat data dari database MySQL...
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 text-[#64748B]">
                    <p className="font-medium text-sm sm:text-base">Belum ada data logbook di database</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[9px] sm:text-xs whitespace-nowrap">
                      <thead className="bg-[#E9EBED] text-[#6B7280] font-bold uppercase tracking-wider text-[8px] sm:text-[10px]">
                        <tr>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[140px]">PERIODE PENGGUNAAN ALAT</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[120px]">NAMA RESEARCHER</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[100px]">JENIS SAMPLE</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[120px]">JENIS PENGUJIAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[80px] sm:min-w-[120px]">TUJUAN PENGUJIAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[140px]">KONDISI TEKNIS</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[100px]">PARAF STUDENT</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[100px]">PARAF LABORAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[180px]">CATATAN LABORAN</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 text-center min-w-[120px]">PARAF KEPALA LAB</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[200px]">CATATAN KEPALA LAB</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-4 min-w-[180px]">CATATAN TAMBAHAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                        {currentRows.map((row) => (
                          <DataRow 
                            key={row.id} 
                            row={row} 
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Back Button */}
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

        {/* Footer */}
        <footer className="bg-[#1a2332] text-slate-400 text-[9px] sm:text-[10px] md:text-xs py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 flex-shrink-0 z-10 relative">
          <p className="text-center sm:text-left">Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}