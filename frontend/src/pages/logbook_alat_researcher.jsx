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
          
          {/* Desktop Navigation - Hidden on mobile/tablet, shown on xl */}
          <nav className="hidden xl:flex items-center space-x-8">
            <Link to="/final_logbook_alat_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[#0B1C33] border-b-2 border-[#0B1C33] pb-1">
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleFinalClick = () => {
    setIsClickingFinal(true);
  };

  const isFinalActive = location.pathname === '/final_logbook_alat_researcher' || isClickingFinal;

  return (
    <div className="flex flex-col xl:flex-row flex-1 relative">
      
      {/* Mobile/Tablet Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="w-72 h-full bg-[#F8F9FA] shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-[#0B1C33] flex justify-between items-center">
              <h2 className="font-bold text-[#0B1C33] text-lg">Menu</h2>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="text-[#0B1C33] hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">Data Peminjaman</h3>
                <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
              </div>
              <div className="w-full bg-[#0B1C33] text-white rounded-lg flex items-center gap-3 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white shrink-0">
                  <path d="M10 2v6.34a4 4 0 0 1-.76 2.37L4.5 18.5a2 2 0 0 0 1.67 3h11.66a2 2 0 0 0 1.67-3l-4.74-7.79a4 4 0 0 1-.76-2.37V2" />
                  <path d="M8.5 2h7" />
                  <path d="M7 15h10" />
                </svg>
                <span className="text-sm font-bold leading-tight">Input LogBook Alat</span>
              </div>
              <button className="w-full bg-[#FFD770] text-[#1A233A] rounded-md py-2.5 px-4 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                New Input
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop & Mac Vertical Sidebar - Hidden on mobile/tablet */}
      <aside className="hidden xl:flex w-56 xl:w-64 bg-[#F8F9FA] border-r border-[#0B1C33] flex flex-col justify-between py-8 px-4 flex-shrink-0 min-h-[calc(100vh-80px)]">
        <div className="space-y-4 px-4">
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-900 leading-tight">Data Peminjaman</h1>
            <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
          </div>
          <div className="w-full bg-[#0B1C33] text-white rounded-lg flex items-center gap-4 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white shrink-0">
              <path d="M10 2v6.34a4 4 0 0 1-.76 2.37L4.5 18.5a2 2 0 0 0 1.67 3h11.66a2 2 0 0 0 1.67-3l-4.74-7.79a4 4 0 0 1-.76-2.37V2" />
              <path d="M8.5 2h7" />
              <path d="M7 15h10" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight">Input LogBook Alat</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 bg-white overflow-y-auto p-3 sm:p-4 md:p-6 xl:p-8">
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
export default function LogbookAlatResearcher() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedRoom, setSelectedRoom] = useState(() => {
    if (location.state && location.state.selectedRoom) {
      localStorage.setItem('selectedRoomAlat', JSON.stringify(location.state.selectedRoom));
      return location.state.selectedRoom;
    }
    const saved = localStorage.getItem('selectedRoomAlat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) return parsed;
      } catch (e) {}
    }
    return AVAILABLE_ROOMS[0];
  });

  useEffect(() => {
    if (location.state && location.state.selectedRoom) {
      setSelectedRoom(location.state.selectedRoom);
      localStorage.setItem('selectedRoomAlat', JSON.stringify(location.state.selectedRoom));
    }
  }, [location]);

  const [formData, setFormData] = useState({
    namaLengkap: '',
    institusi: '',
    prodi: '',
    namaAlat: '',
    jenisSample: '',
    jenisSampleLainnya: '', // Kolom isian singkat untuk jenis sample
    researcherName: '',
    jenisPengujian: '',
    tujuanPengujian: '',
    mulaiTanggal: '',
    mulaiWaktu: '',
    selesaiTanggal: '',
    selesaiWaktu: '',
    kondisiAlat: '',
    notes: ''
  });

  const [parafFile, setParafFile] = useState(null);
  const [parafPreviewUrl, setParafPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (parafPreviewUrl) URL.revokeObjectURL(parafPreviewUrl);
    };
  }, [parafPreviewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setParafFile(file);
      setParafPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : '');
      alert(`📄 File "${file.name}" berhasil dipilih!`);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    
    if (!parafFile) {
      alert('⚠️ Harap unggah file paraf terlebih dahulu!');
      return;
    }

    const activeRoom = selectedRoom || AVAILABLE_ROOMS[0];

    try {
      const response = await fetch('http://localhost:5000/api/logbooks/alat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          room: activeRoom.title,
          parafFile: await fileToDataUrl(parafFile)
        })
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Gagal menyimpan logbook alat');
        return;
      }

      alert('✅ Data Logbook Alat berhasil disimpan!');
      navigate('/final_logbook_alat_researcher');
    } catch (error) {
      console.error('❌ Error menyimpan logbook alat:', error);
      alert('Tidak dapat menyimpan logbook alat ke database');
    }
  };

  const handleClearDraft = () => {
    setFormData({
      namaLengkap: '',
      institusi: '',
      prodi: '',
      namaAlat: '',
      jenisSample: '',
      jenisSampleLainnya: '',
      researcherName: '',
      jenisPengujian: '',
      tujuanPengujian: '',
      mulaiTanggal: '',
      mulaiWaktu: '',
      selesaiTanggal: '',
      selesaiWaktu: '',
      kondisiAlat: '',
      notes: ''
    });
    setParafFile(null);
    setParafPreviewUrl('');

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-2 sm:p-3 md:p-4 xl:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <Header />
        <SidebarWrapper>
          {/* Breadcrumb - Responsive */}
          <nav aria-label="Breadcrumb" className="flex text-[10px] sm:text-xs text-slate-500 mb-4 md:mb-6 overflow-x-auto">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-slate-700 whitespace-nowrap">Beranda</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-[8px] mx-1">›</span>
                  <Link to="/sub-lab-alat" className="hover:text-slate-700 whitespace-nowrap">Sub Lab</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-[8px] mx-1">›</span>
                  <span className="text-[#0B1C33] font-medium whitespace-nowrap">
                    {selectedRoom ? selectedRoom.title : AVAILABLE_ROOMS[0].title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Title - Responsive */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 xl:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-[#0B1C33] font-bold mb-2 sm:mb-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              LogBook Researcher
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg xl:text-xl text-[#0B1C33] font-semibold mb-3 sm:mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Advanced Bioindustrial Engineering Laboratory
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Formulir ini digunakan untuk mencatat penggunaan alat-alat laboratorium. Pastikan data yang dimasukkan akurat dan sesuai dengan kondisi sebenarnya. Form ini wajib diisi oleh setiap Peneliti/Mahasiswa yang menggunakan fasilitas Advanced Bioindustrial Engineering Laboratory.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8 px-1 sm:px-0">

            {/* Ruangan Sub-Lab Selector Banner */}
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B1C33] text-white flex items-center justify-center text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
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
                    localStorage.setItem('selectedRoomAlat', JSON.stringify(found));
                  }}
                  className="text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                >
                  {AVAILABLE_ROOMS.map(r => (
                    <option key={r.code} value={r.code}>{r.title}</option>
                  ))}
                </select>
              </div>
            </div>
              
            {/* SECTION 1: Identitas Peneliti */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-3 sm:p-4 md:p-6 xl:p-8 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0B1C33] flex items-center gap-2">
                  <span className="text-[#F4B942] text-base sm:text-lg">👤</span>
                  Input Identitas Peneliti
                </h3>
                <span className="bg-[#F4B942] text-[#0B1C33] text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F4B942] whitespace-nowrap">
                  Data Entry Required
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Institusi / Departemen</label>
                  <input 
                    type="text" 
                    name="institusi"
                    value={formData.institusi}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                    placeholder="e.g. ITB/BE"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Prodi</label>
                  <input 
                    type="text" 
                    name="prodi"
                    value={formData.prodi}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                    placeholder="e.g. Rekayasa Hayati"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 2: Logbook Alat */}
            <section className="bg-white rounded-xl shadow-sm border border-[#0B1C33] p-3 sm:p-4 md:p-6 xl:p-8 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0B1C33] flex items-center gap-2">
                  <span className="text-[#F4B942] text-base sm:text-lg">🔬</span>
                  Input Logbook Alat (ABEL)
                </h3>
                <span className="bg-[#F4B942] text-[#0B1C33] text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F4B942] whitespace-nowrap">
                  Data Entry Required
                </span>
              </div>
              
              {/* Nama Alat & Jenis Sample */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Nama Alat</label>
                  <select 
                    name="namaAlat"
                    value={formData.namaAlat}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3 bg-gray-50"
                  >
                    <option value="">Pilih Nama Alat</option>
                    {(selectedRoom?.items || ['Lainnya']).map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Jenis Sample</label>
                  <select 
                    name="jenisSample"
                    value={formData.jenisSample}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3 bg-gray-50"
                  >
                    <option value="">Pilih Jenis Sample</option>
                    <option value="Padat">Padat</option>
                    <option value="Semi-Padat">Semi-Padat</option>
                    <option value="Cair">Cair</option>
                    <option value="Serbuk">Serbuk</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">
                    Jenis Sample (Isian Singkat)
                    <span className="font-normal text-gray-400 ml-1">(opsional)</span>
                  </label>
                  <input 
                    type="text" 
                    name="jenisSampleLainnya"
                    value={formData.jenisSampleLainnya}
                    onChange={handleChange}
                    className={`w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3 transition-all ${
                      formData.jenisSample === 'Lainnya' 
                        ? 'bg-white' 
                        : 'bg-gray-100 cursor-not-allowed opacity-60'
                    }`}
                    placeholder={formData.jenisSample === 'Lainnya' ? 'Tulis jenis sample Anda...' : 'Pilih "Lainnya" untuk mengisi'}
                    disabled={formData.jenisSample !== 'Lainnya'}
                  />
                  {formData.jenisSample === 'Lainnya' && (
                    <p className="text-[8px] text-gray-400 mt-1">📝 Silakan tulis jenis sample Anda</p>
                  )}
                  {formData.jenisSample && formData.jenisSample !== 'Lainnya' && (
                    <p className="text-[8px] text-gray-400 mt-1">✓ Menggunakan opsi: <span className="font-medium">{formData.jenisSample}</span></p>
                  )}
                  {!formData.jenisSample && (
                    <p className="text-[8px] text-gray-400 mt-1">Pilih jenis sample terlebih dahulu</p>
                  )}
                </div>
              </div>

              {/* Researcher Name & Jenis Pengujian */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Researcher / Student Name</label>
                  <input 
                    type="text" 
                    name="researcherName"
                    value={formData.researcherName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                    placeholder="e.g. Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Jenis Pengujian</label>
                  <input 
                    type="text" 
                    name="jenisPengujian"
                    value={formData.jenisPengujian}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                    placeholder="e.g. Uji Spektrofotometri / Kromatografi"
                  />
                </div>
              </div>

              {/* Tujuan Pengujian / Penggunaan Alat */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Tujuan Pengujian / Penggunaan Alat</label>
                <input 
                  type="text" 
                  name="tujuanPengujian"
                  value={formData.tujuanPengujian}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                  placeholder="e.g. Mengukur absorbansi larutan glukosa hasil hidrolisis"
                />
              </div>

              {/* Periode Penggunaan Alat */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-2 sm:mb-3">Periode Penggunaan Alat</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 xl:gap-6">
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <div className="flex-1 relative">
                      <input 
                        type="date" 
                        name="mulaiTanggal"
                        value={formData.mulaiTanggal}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[9px] sm:text-[10px] md:text-[12px] xl:text-sm p-1.5 sm:p-2 md:p-2 xl:p-3 pl-5 sm:pl-6 md:pl-8 xl:pl-10 text-gray-500"
                      />
                      <span className="absolute left-1.5 sm:left-2 md:left-2 xl:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-[10px] md:text-[12px] xl:text-xs">📅</span>
                    </div>
                    <span className="text-gray-400 text-[9px] sm:text-[10px] md:text-[12px]">-</span>
                    <div className="flex-1 relative">
                      <input 
                        type="time" 
                        name="mulaiWaktu"
                        value={formData.mulaiWaktu}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[9px] sm:text-[10px] md:text-[12px] xl:text-sm p-1.5 sm:p-2 md:p-2 xl:p-3 pl-5 sm:pl-6 md:pl-8 xl:pl-10 text-gray-500"
                      />
                      <span className="absolute left-1.5 sm:left-2 md:left-2 xl:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-[10px] md:text-[12px] xl:text-xs">🕐</span>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <div className="flex-1 relative">
                      <input 
                        type="date" 
                        name="selesaiTanggal"
                        value={formData.selesaiTanggal}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[9px] sm:text-[10px] md:text-[12px] xl:text-sm p-1.5 sm:p-2 md:p-2 xl:p-3 pl-5 sm:pl-6 md:pl-8 xl:pl-10 text-gray-500"
                      />
                      <span className="absolute left-1.5 sm:left-2 md:left-2 xl:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-[10px] md:text-[12px] xl:text-xs">📅</span>
                    </div>
                    <span className="text-gray-400 text-[9px] sm:text-[10px] md:text-[12px]">-</span>
                    <div className="flex-1 relative">
                      <input 
                        type="time" 
                        name="selesaiWaktu"
                        value={formData.selesaiWaktu}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-[9px] sm:text-[10px] md:text-[12px] xl:text-sm p-1.5 sm:p-2 md:p-2 xl:p-3 pl-5 sm:pl-6 md:pl-8 xl:pl-10 text-gray-500"
                      />
                      <span className="absolute left-1.5 sm:left-2 md:left-2 xl:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-[10px] md:text-[12px] xl:text-xs">🕐</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kondisi Alat */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Kondisi Alat</label>
                <textarea 
                  name="kondisiAlat"
                  value={formData.kondisiAlat}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                  placeholder="Jelaskan kondisi alat sebelum dan sesudah penggunaan secara detail."
                  rows="3"
                />
              </div>

              {/* Notes */}
              <div className="mb-3 sm:mb-4 md:mb-8">
                <label className="block text-[8px] sm:text-[10px] md:text-xs font-bold text-[#0B1C33] uppercase tracking-wide mb-1 sm:mb-2">Description / Notes</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#0B1C33] shadow-sm focus:border-[#0B1C33] focus:ring-[#0B1C33] text-xs sm:text-sm p-2 md:p-3" 
                  placeholder="Catatan tambahan mengenai kendala teknis atau informasi spesifik selama proses pengujian."
                  rows="3"
                />
              </div>

              {/* Paraf Upload Area - Responsive */}
              <div className="border border-dashed border-[#0B1C33] rounded-xl p-3 sm:p-4 md:p-6 xl:p-8 flex flex-col items-center justify-center text-center bg-gray-50 relative">
                <button 
                  type="button"
                  className="absolute top-1.5 sm:top-2 md:top-4 xl:top-4 right-1.5 sm:right-2 md:right-4 xl:right-4 text-gray-400 hover:text-[#0B1C33] transition-colors"
                  onClick={() => alert('📋 Menu opsi paraf akan muncul di sini.')}
                >
                  <span className="text-lg sm:text-xl md:text-2xl">⋮</span>
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 xl:w-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-1.5 sm:mb-2 md:mb-3">
                  <img 
                    src="https://thumbs.dreamstime.com/b/paraf-initial-signature-beautiful-abstract-signature-vector-image-paraf-initial-signature-beautiful-abstract-signature-243655383.jpg?w=768" 
                    alt="Paraf Tanda Tangan" 
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 object-contain"
                  />
                </div>
                <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#0B1C33] mb-0.5 sm:mb-1">Paraf Student</h4>
                <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-500 mb-2 sm:mb-3 md:mb-4 break-all max-w-full px-2">
                  {parafFile ? `📎 File terpilih: ${parafFile.name}` : 'Silahkan unggah paraf / tanda tangan elektronik berformat JPG, PNG, atau PDF'}
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={handleUploadClick}
                  className="px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-white border border-[#0B1C33] text-[#0B1C33] text-[10px] sm:text-xs md:text-sm rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1.5 sm:gap-2"
                >
                  <span className="text-[#F4B942] text-sm sm:text-base">☁️</span>
                  {parafFile ? 'Ganti File Paraf' : 'Unggah File Paraf'}
                </button>
                {parafFile && (
                  <div className="w-full max-w-md mt-4 rounded-lg border border-[#0B1C33]/20 bg-white p-3 text-left">
                    {parafPreviewUrl ? (
                      <img
                        src={parafPreviewUrl}
                        alt="Preview Paraf Student"
                        className="w-full h-32 object-contain rounded-md border border-gray-200 bg-gray-50"
                      />
                    ) : (
                      <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 text-[#0B1C33]">
                        <span className="text-2xl text-red-500">PDF</span>
                        <span className="text-xs font-semibold">PDF siap diunggah</span>
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-gray-500">
                      <span className="truncate" title={parafFile.name}>{parafFile.name}</span>
                      <span className="shrink-0">{(parafFile.size / 1024).toFixed(1)} KB</span>
                    </div>
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
              <Link 
                to="/sub-lab-alat" 
                className="px-4 md:px-8 py-2 md:py-3 bg-[#0B1C33] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#0B1C33]/90 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <i className="fa-solid fa-arrow-left"></i> Back to Sub-Lab
              </Link>
            </div>
          </form>
        </SidebarWrapper>
        
        {/* Footer - Responsive */}
        <footer className="bg-[#1a2332] text-slate-400 text-[9px] sm:text-[10px] md:text-xs py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 flex-shrink-0 z-10 relative">
          <p className="text-center sm:text-left">Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}