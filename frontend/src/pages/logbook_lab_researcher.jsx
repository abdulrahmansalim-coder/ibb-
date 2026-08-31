import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// --- 1. HEADER ---
function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-[#0B1C33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img 
              alt="Institute Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbro60xS2lLLCBheA9vun2VFFTb_Q3ibg5fP90o3KfeXZtaE394jM2Mg7QFUY5zdtRVEvdORuz0dRKbULKNwp-dcmq4okigh4XuNP-MhuA_JBF1h9nXfL1F__axEwCFsWRzSTx0TlEhrW6t1oUSIr5kzCi6RsDhpkr4Mx07QP0IA5xKbqWNhYMpaoMa_tiIz7vFL1RW2njJVAr4ZVPhdJcdcoV_449G9ReGvYOmNVi9w-afD2LM2ggaHUbxIL0y-y9w"
            />
          </div>
          <nav className="hidden xl:flex items-center space-x-8">
            <Link to="/logbook_lab_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[#0B1C33] border-b-2 border-[#0B1C33] pb-1">
              LOGBOOK
            </Link>
            
          </nav>
        </div>
      </div>
    </header>
  );
}

// --- 2. MAIN WRAPPER + SIDEBAR ---
function SidebarWrapper({ children }) {
  const location = useLocation();
  const [isClickingFinal, setIsClickingFinal] = useState(false);

  const handleFinalClick = () => {
    setIsClickingFinal(true);
  };

  const isFinalActive = location.pathname === '/logbook_lab_researcher' || isClickingFinal;

  return (
    <div className="flex flex-col xl:flex-row flex-1">
      
      {/* Mobile & Semua iPad Horizontal Navigation */}
      <nav className="xl:hidden bg-[#F8F9FA] border-b border-[#0B1C33] py-3 px-4 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
        <Link 
          to="/logbook_lab_researcher" 
          onClick={handleFinalClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
            isFinalActive ? 'bg-[#0B1C33] text-white' : 'bg-[#1a2332] text-white'
          }`}
        >
          <i className="fa-solid fa-flask text-xs"></i>
          <span>Input LogBook Lab</span>
        </Link>
      </nav>

      {/* Desktop & Mac Vertical Sidebar */}
      <aside className="hidden xl:flex w-56 xl:w-64 bg-[#F8F9FA] border-r border-[#0B1C33] flex flex-col justify-between py-8 px-4 flex-shrink-0">
        <div className="space-y-4 px-4">
          
          {/* 1. Data Peminjaman */}
          <div className="mb-4 px-4">
            <h1 className="text-l font-serif font-bold text-slate-900 leading-tight">Data Peminjaman</h1>
            <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
          </div>

          {/* 2. Kotak Navy Input LogBook */}
          <div className="w-full bg-[#0B1C33] text-white rounded-lg flex items-center gap-4 p-4 mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 text-white"
            >
              <path d="M10 2v6.34a4 4 0 0 1-.76 2.37L4.5 18.5a2 2 0 0 0 1.67 3h11.66a2 2 0 0 0 1.67-3l-4.74-7.79a4 4 0 0 1-.76-2.37V2" />
              <path d="M8.5 2h7" />
              <path d="M7 15h10" />
            </svg>
            <span className="text-sm font-bold leading-tight">Input LogBook Lab</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 bg-white overflow-y-auto p-4 md:p-6 xl:p-8">
        {children}
      </div>
    </div>
  );
}

const AVAILABLE_ROOMS = [
  { code: '801', title: 'I.801 | Fermentation and Separation Sub Lab' },
  { code: '802', title: 'I.802 | Hydrolysis and Detoxification Sub Lab' },
  { code: '803', title: 'I.803 | Biomass Pretreatment Sub Lab' },
  { code: '804', title: 'I.804 | Molecular Genomics Sub Lab' }
];

// --- 3. LOGBOOK FORM ---
export default function LogbookLabResearcher() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk menyimpan data ruangan yang dipilih (otomatis tersimpan di localStorage & fallback ke room pertama)
  const [selectedRoom, setSelectedRoom] = useState(() => {
    if (location.state && location.state.selectedRoom) {
      localStorage.setItem('selectedRoomLab', JSON.stringify(location.state.selectedRoom));
      return location.state.selectedRoom;
    }
    const saved = localStorage.getItem('selectedRoomLab');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) return parsed;
      } catch (e) {}
    }
    return AVAILABLE_ROOMS[0];
  });
  
  // Ambil data ruangan dari location state jika ada update
  useEffect(() => {
    if (location.state && location.state.selectedRoom) {
      setSelectedRoom(location.state.selectedRoom);
      localStorage.setItem('selectedRoomLab', JSON.stringify(location.state.selectedRoom));
    }
  }, [location]);

  const [formData, setFormData] = useState({
    namaLengkap: '',
    prodi: '',
    institusi: '',
    proyekPenelitian: '',
    tanggalMulai: '',
    waktuMulai: '',
    tanggalSelesai: '',
    waktuSelesai: '',
    detailAktivitas: '',
    noHp: '',
    jumlahOrang: '',
    daftarAlat: '',
    catatan: ''
  });

  const [dokumenFile, setDokumenFile] = useState(null);
  const [dokumenPreviewUrl, setDokumenPreviewUrl] = useState('');
  const [parafResearcherFile, setParafResearcherFile] = useState(null);
  const [parafPiFile, setParafPiFile] = useState(null);
  const [parafResearcherPreviewUrl, setParafResearcherPreviewUrl] = useState('');
  const [parafPiPreviewUrl, setParafPiPreviewUrl] = useState('');
  
  const dokumenInputRef = useRef(null);
  const parafResearcherInputRef = useRef(null);
  const parafPiInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (dokumenPreviewUrl) {
        URL.revokeObjectURL(dokumenPreviewUrl);
      }
    };
  }, [dokumenPreviewUrl]);

  useEffect(() => {
    return () => {
      if (parafResearcherPreviewUrl) URL.revokeObjectURL(parafResearcherPreviewUrl);
      if (parafPiPreviewUrl) URL.revokeObjectURL(parafPiPreviewUrl);
    };
  }, [parafResearcherPreviewUrl, parafPiPreviewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDokumenUpload = () => {
    if (dokumenInputRef.current) dokumenInputRef.current.click();
  };

  const handleDokumenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDokumenFile(file);
      setDokumenPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : '');
      alert(`📄 Dokumen "${file.name}" berhasil dipilih!`);
    }
  };

  const handleParafUpload = (inputRef) => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleParafChange = (e, setFile, setPreviewUrl) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : '');
      alert(`📄 Tanda tangan / Dokumen "${file.name}" berhasil dipilih!`);
    }
  };

  const fileToDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Gagal membaca file ${file.name}`));
    reader.readAsDataURL(file);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dokumenFile || !parafResearcherFile || !parafPiFile) {
      alert('⚠️ Harap unggah dokumen identitas, paraf Researcher, dan paraf PI terlebih dahulu!');
      return;
    }

    const activeRoom = selectedRoom || AVAILABLE_ROOMS[0];

    try {
      const response = await fetch('http://localhost:5000/api/logbooks/lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          researcherName: formData.namaLengkap,
          room: activeRoom.title,
          institusi: formData.institusi,
          prodi: formData.prodi,
          proyekPenelitian: formData.proyekPenelitian,
          tanggalMulai: formData.tanggalMulai,
          waktuMulai: formData.waktuMulai,
          tanggalSelesai: formData.tanggalSelesai,
          waktuSelesai: formData.waktuSelesai,
          detailAktivitas: formData.detailAktivitas,
          identitasFile: await fileToDataUrl(dokumenFile),
          parafResearcherFile: await fileToDataUrl(parafResearcherFile),
          parafPiFile: await fileToDataUrl(parafPiFile),
          catatan: formData.catatan
        })
      });
      const data = await response.json();

      if (!response.ok) {
        alert('⚠️ ' + (data.message || 'Gagal menyimpan logbook'));
        return;
      }

      alert('✅ Data Logbook Lab berhasil disimpan!');
      navigate('/final_logbook_lab_researcher');
    } catch (error) {
      console.error('❌ Error menyimpan logbook:', error);
      alert('❌ Gagal menyimpan: ' + (error.message || 'Koneksi ke backend bermasalah'));
    }
  };

  const handleClearDraft = () => {
    setFormData({
      namaLengkap: '',
      prodi: '',
      institusi: '',
      proyekPenelitian: '',
      tanggalMulai: '',
      waktuMulai: '',
      tanggalSelesai: '',
      waktuSelesai: '',
      detailAktivitas: '',
      noHp: '',
      jumlahOrang: '',
      daftarAlat: '',
      catatan: ''
    });
    setDokumenFile(null);
    setDokumenPreviewUrl('');
    setParafResearcherFile(null);
    setParafPiFile(null);
    setParafResearcherPreviewUrl('');
    setParafPiPreviewUrl('');

    if (dokumenInputRef.current) dokumenInputRef.current.value = '';
    if (parafResearcherInputRef.current) parafResearcherInputRef.current.value = '';
    if (parafPiInputRef.current) parafPiInputRef.current.value = '';
  };

  // Fungsi untuk kembali ke sub lab
  const handleBackToSubLab = () => {
    navigate('/sub-lab-lab');
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-2 md:p-4 xl:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <Header />
        <SidebarWrapper>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-4 md:mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-slate-700">Beranda</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fa-solid fa-chevron-right text-[8px] mx-1"></i>
                  <Link to="/sub-lab-lab" className="hover:text-slate-700">Sub Lab</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fa-solid fa-chevron-right text-[8px] mx-1"></i>
                  <span className="text-[#0B1C33] font-bold">
                    {selectedRoom ? selectedRoom.title : AVAILABLE_ROOMS[0].title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Title with Room Info */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0B1C33] font-bold mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Logbook Penggunaan Laboratorium
            </h1>
            <p className="text-xs md:text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Formulir ini digunakan untuk mencatat penggunaan laboratorium. Pastikan data yang dimasukkan akurat dan sesuai dengan kondisi sebenarnya.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

            {/* Ruangan Sub-Lab Selector Banner */}
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B1C33] text-white flex items-center justify-center text-base shrink-0">
                  <i className="fa-solid fa-flask"></i>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Ruangan Sub-Lab Terpilih</p>
                  <p className="text-sm sm:text-base font-bold text-[#0B1C33]">{selectedRoom?.title || AVAILABLE_ROOMS[0].title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Ganti Ruang:</label>
                <select
                  value={selectedRoom?.code || '801'}
                  onChange={(e) => {
                    const found = AVAILABLE_ROOMS.find(r => r.code === e.target.value) || AVAILABLE_ROOMS[0];
                    setSelectedRoom(found);
                    localStorage.setItem('selectedRoomLab', JSON.stringify(found));
                  }}
                  className="text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                >
                  {AVAILABLE_ROOMS.map(r => (
                    <option key={r.code} value={r.code}>{r.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* SECTION 1: Identitas Pemesan */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">1</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Identitas Peneliti/Researcher</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-sm p-2 md:p-3" 
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2">Institusi</label>
                  <input 
                    type="text" 
                    name="institusi"
                    value={formData.institusi}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-sm p-2 md:p-3" 
                    placeholder="Institusi"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 2: Proses Peminjaman */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">2</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Judul/Proyek Penelitian</h3>
              </div>
              <div>
                <input 
                  type="text" 
                  name="proyekPenelitian"
                  value={formData.proyekPenelitian}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-sm p-2 md:p-3" 
                  placeholder="Input Proyek Penelitian"
                />
              </div>
            </section>

            {/* SECTION 3: Periode Penelitian */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">3</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Periode Penelitian</h3>
              </div>
              <div className="flex flex-col items-start gap-5 md:gap-6">
                <div className="w-full">
                  <label className="block text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2">Mulai</label>
                  <div className="flex gap-1 md:gap-2 items-center">
                  <div className="flex-1 relative">
                    <input 
                      type="date" 
                      name="tanggalMulai"
                      value={formData.tanggalMulai}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[10px] md:text-[12px] xl:text-sm p-1.5 md:p-2 xl:p-3 pl-6 md:pl-8 xl:pl-10 text-gray-500"
                    />
                    <i className="fa-regular fa-calendar absolute left-1.5 md:left-2 xl:left-3 top-1.5 md:top-2 xl:top-3 text-gray-400 text-[10px] md:text-[12px] xl:text-xs"></i>
                  </div>
                  <span className="text-gray-400 text-[10px] md:text-[12px]">-</span>
                  <div className="flex-1 relative">
                    <input 
                      type="time" 
                      name="waktuMulai"
                      value={formData.waktuMulai}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[10px] md:text-[12px] xl:text-sm p-1.5 md:p-2 xl:p-3 pl-6 md:pl-8 xl:pl-10 text-gray-500"
                    />
                    <i className="fa-regular fa-clock absolute left-1.5 md:left-2 xl:left-3 top-1.5 md:top-2 xl:top-3 text-gray-400 text-[10px] md:text-[12px] xl:text-xs"></i>
                  </div>
                </div>
                </div>
                <div className="w-full">
                  <label className="block text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2">Selesai</label>
                  <div className="flex gap-1 md:gap-2 items-center">
                  <div className="flex-1 relative">
                    <input 
                      type="date" 
                      name="tanggalSelesai"
                      value={formData.tanggalSelesai}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[10px] md:text-[12px] xl:text-sm p-1.5 md:p-2 xl:p-3 pl-6 md:pl-8 xl:pl-10 text-gray-500"
                    />
                    <i className="fa-regular fa-calendar absolute left-1.5 md:left-2 xl:left-3 top-1.5 md:top-2 xl:top-3 text-gray-400 text-[10px] md:text-[12px] xl:text-xs"></i>
                  </div>
                  <span className="text-gray-400 text-[10px] md:text-[12px]">-</span>
                  <div className="flex-1 relative">
                    <input 
                      type="time" 
                      name="waktuSelesai"
                      value={formData.waktuSelesai}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[10px] md:text-[12px] xl:text-sm p-1.5 md:p-2 xl:p-3 pl-6 md:pl-8 xl:pl-10 text-gray-500"
                    />
                    <i className="fa-regular fa-clock absolute left-1.5 md:left-2 xl:left-3 top-1.5 md:top-2 xl:top-3 text-gray-400 text-[10px] md:text-[12px] xl:text-xs"></i>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: Detail Aktivitas yang Dilakukan */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">4</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Detail Aktivitas yang Dilakukan</h3>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2">Detail Aktivitas</label>
                <input
                  type="text"
                  name="detailAktivitas"
                  value={formData.detailAktivitas}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-sm p-2 md:p-3"
                  placeholder="Detail Aktivitas yang Dilakukan"
                  required
                />
              </div>
            </section>

            {/* SECTION 6: Dokumen Pendukung */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">6</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Identitas Peneliti/Researcher</h3>
              </div>
              <div className="border border-dashed border-[#0B1C33] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center bg-gray-50 relative">
                <button 
                  type="button"
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-[#0B1C33] transition-colors"
                  onClick={() => alert('📋 Menu opsi akan muncul di sini.')}
                >
                  <i className="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
                </button>
                <h4 className="text-sm md:text-base font-bold text-[#0B1C33] mb-1">Unggah KTM/Kartu Identitas Anda</h4>
                <p className="text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4">
                  File Berupa PNG atau PDF
                </p>
                <input 
                  type="file" 
                  ref={dokumenInputRef} 
                  onChange={handleDokumenChange} 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={handleDokumenUpload}
                  className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-[#0B1C33] text-[#0B1C33] text-xs md:text-sm rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-[#F4B942]"></i> 
                  {dokumenFile ? 'Ganti File' : 'Unggah File'}
                </button>
                {dokumenFile && (
                  <div className="w-full max-w-md mt-4 rounded-lg border border-[#0B1C33]/20 bg-white p-3 text-left">
                    {dokumenPreviewUrl ? (
                      <img
                        src={dokumenPreviewUrl}
                        alt="Preview KTM atau kartu identitas"
                        className="w-full max-h-56 object-contain rounded-md border border-gray-200 bg-gray-50"
                      />
                    ) : (
                      <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 text-[#0B1C33]">
                        <i className="fa-solid fa-file-pdf text-2xl text-red-500"></i>
                        <span className="text-xs font-semibold">PDF siap diunggah</span>
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-gray-500">
                      <span className="truncate" title={dokumenFile.name}>{dokumenFile.name}</span>
                      <span className="shrink-0">{(dokumenFile.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 7: Catatan Tambahan */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">7</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Catatan Tambahan</h3>
              </div>
              <div>
                <textarea 
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-sm p-2 md:p-3 bg-gray-50 resize-none" 
                  placeholder="Masukkan catatan tambahan jika diperlukan"
                  rows="3"
                />
              </div>
            </section>

            {/* SECTION 8: Otorisasi & Paraf Researcher */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">8</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Otorisasi & Paraf Researcher</h3>
              </div>
              <div className="border border-dashed border-[#0B1C33] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center bg-gray-50 relative">
                <button 
                  type="button"
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-[#0B1C33] transition-colors"
                  onClick={() => alert('📋 Menu opsi akan muncul di sini.')}
                >
                  <i className="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
                </button>
                <h4 className="text-sm md:text-base font-bold text-[#0B1C33] mb-1">Paraf Researcher</h4>
                <p className="text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4">
                  Klik Untuk "Bubuhkan Paraf" atau Unggah File "Paraf" (PNG, JPG, PDF)
                </p>
                <input 
                  type="file" 
                  ref={parafResearcherInputRef} 
                  onChange={(e) => handleParafChange(e, setParafResearcherFile, setParafResearcherPreviewUrl)} 
                  accept=".pdf,.png,.jpg,.jpeg,image/*,application/pdf"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={() => handleParafUpload(parafResearcherInputRef)}
                  className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-[#0B1C33] text-[#0B1C33] text-xs md:text-sm rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-[#F4B942]"></i> 
                  {parafResearcherFile ? 'Ganti File' : 'Unggah File'}
                </button>
                {parafResearcherFile && (
                  <div className="w-full max-w-md mt-4 rounded-lg border border-[#0B1C33]/20 bg-white p-3 text-left">
                    {parafResearcherPreviewUrl ? (
                      <img
                        src={parafResearcherPreviewUrl}
                        alt="Preview paraf Researcher"
                        className="w-full h-32 object-contain rounded-md border border-gray-200 bg-gray-50"
                      />
                    ) : (
                      <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 text-[#0B1C33]">
                        <span className="text-2xl font-bold text-red-500">PDF</span>
                        <div>
                          <p className="text-xs font-bold">Dokumen PDF Terpilih</p>
                          <p className="text-[10px] text-gray-500">{parafResearcherFile.name}</p>
                        </div>
                      </div>
                    )}
                    <p className="mt-2 truncate text-[10px] text-gray-500" title={parafResearcherFile.name}>
                      {parafResearcherFile.name} ({(parafResearcherFile.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 9: Otorisasi & Paraf PI */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-4 md:p-6 relative">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 rounded-full bg-[#0B1C33] text-white flex items-center justify-center text-xs font-bold">9</div>
                <h3 className="text-base md:text-lg font-bold text-[#0B1C33]">Otorisasi & Paraf PI</h3>
              </div>
              <div className="border border-dashed border-[#0B1C33] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center bg-gray-50 relative">
                <button 
                  type="button"
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-[#0B1C33] transition-colors"
                  onClick={() => alert('📋 Menu opsi akan muncul di sini.')}
                >
                  <i className="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
                </button>
                <h4 className="text-sm md:text-base font-bold text-[#0B1C33] mb-1">Paraf PI</h4>
                <p className="text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4">
                  Klik Untuk "Bubuhkan Paraf" atau Unggah File "Paraf" (PNG, JPG, PDF)
                </p>
                <input 
                  type="file" 
                  ref={parafPiInputRef} 
                  onChange={(e) => handleParafChange(e, setParafPiFile, setParafPiPreviewUrl)}
                  accept=".pdf,.png,.jpg,.jpeg,image/*,application/pdf"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={() => handleParafUpload(parafPiInputRef)}
                  className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-[#0B1C33] text-[#0B1C33] text-xs md:text-sm rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-[#F4B942]"></i> 
                  {parafPiFile ? 'Ganti File' : 'Unggah File'}
                </button>
                {parafPiFile && (
                  <div className="w-full max-w-md mt-4 rounded-lg border border-[#0B1C33]/20 bg-white p-3 text-left">
                    {parafPiPreviewUrl ? (
                      <img
                        src={parafPiPreviewUrl}
                        alt="Preview paraf PI"
                        className="w-full h-32 object-contain rounded-md border border-gray-200 bg-gray-50"
                      />
                    ) : (
                      <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 text-[#0B1C33]">
                        <span className="text-2xl font-bold text-red-500">PDF</span>
                        <div>
                          <p className="text-xs font-bold">Dokumen PDF Terpilih</p>
                          <p className="text-[10px] text-gray-500">{parafPiFile.name}</p>
                        </div>
                      </div>
                    )}
                    <p className="mt-2 truncate text-[10px] text-gray-500" title={parafPiFile.name}>
                      {parafPiFile.name} ({(parafPiFile.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 pt-4 pb-4 md:pb-8">
              <button 
                type="button"
                className="px-4 md:px-6 py-2 md:py-3 bg-[#F4B942]/20 text-[#0B1C33] text-sm font-bold rounded-lg hover:bg-[#F4B942]/30 transition-colors w-full sm:w-auto"
                onClick={handleClearDraft}
              >
                Clear Draft
              </button>
              <button 
                type="submit"
                className="px-4 md:px-8 py-2 md:py-3 bg-[#0B1C33] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#0B1C33]/90 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <i className="fa-regular fa-paper-plane"></i> Save and Confirm
              </button>
              <button 
                type="button"
                onClick={handleBackToSubLab}
                className="px-4 md:px-8 py-2 md:py-3 bg-[#0B1C33] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#0B1C33]/90 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <i className="fa-solid fa-arrow-left"></i> Back to Sub-Lab
              </button>
            </div>
          </form>
        </SidebarWrapper>
        
        {/* Footer */}
        <footer className="bg-[#1a2332] text-slate-400 text-[10px] md:text-xs py-6 px-4 md:px-8 flex-shrink-0 z-10 relative">
          <p>Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}