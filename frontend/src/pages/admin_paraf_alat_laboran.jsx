import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAlatLogbooks, updateAlatReview } from '../api/adminService';

import AdminHeader from './AdminHeader';

// --- 2. SIDEBAR ---
function Sidebar() {
  const navigate = useNavigate();

  const handleCatatanClick = () => {
    navigate('/admin/catatan-alat-laboran');
  };

  const handleParafDigitalClick = () => {
    alert('📝 Anda berada di halaman Paraf Digital Laboran (Alat)');
  };

  const handleSupportClick = () => {
    alert('🆘 Navigasi ke halaman Support');
  };

  const handleLogoutClick = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col justify-between py-6">
      <div>
        <div className="px-4 mb-8">
          <div className="w-full bg-[#0B1C33] rounded-lg p-4 flex flex-col items-center justify-center cursor-default select-none">
            <h2 className="font-serif font-bold text-lg leading-tight text-white text-center">Data Alat</h2>
            <p className="text-xs text-white/70 text-center">IBB FTUI</p>
          </div>
        </div>
        <nav className="px-4 space-y-2">
          <button 
            onClick={handleCatatanClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm hover:bg-gray-700 transition"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Catatan</span>
          </button>
          
          <button 
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm cursor-default"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Paraf Digital</span>
          </button>

          <Link 
            to="/admin/alat-logbook-laboran"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-100 text-[#0B1C33] hover:bg-gray-200 rounded-md font-medium text-sm transition"
          >
            <span>Lihat Logbook Alat</span>
          </Link>
        </nav>
      </div>

      <div className="px-4 space-y-2 pb-4">
        <hr className="border-gray-200 mb-4 mx-2"/>
        <button 
          onClick={handleSupportClick}
          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-600 hover:text-slate-900 transition rounded-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="text-sm font-medium">Support</span>
        </button>
        <button 
          onClick={handleLogoutClick}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:text-red-700 transition rounded-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// --- 3. MAIN COMPONENT ---
export default function AdminParafAlatLaboran() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [namaLaboran, setNamaLaboran] = useState(user.nama_lengkap || user.full_name || 'Laboran ABEL');
  const [isVerified, setIsVerified] = useState(false);
  const [parafFile, setParafFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [logbooks, setLogbooks] = useState([]);
  const [selectedLogbookId, setSelectedLogbookId] = useState(location.state?.id || '');
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [status, setStatus] = useState('approved');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLogbooks();
  }, []);

  const fetchLogbooks = async () => {
    try {
      const res = await getAlatLogbooks();
      if (res.success && res.data) {
        setLogbooks(res.data);
        const targetId = location.state?.id || (res.data.length > 0 ? res.data[0].logbook_id : '');
        if (targetId) {
          setSelectedLogbookId(targetId);
          loadLogbookDetail(targetId, res.data);
        }
      }
    } catch (err) {
      console.error('Error load alat logbooks for paraf laboran:', err);
    }
  };

  const loadLogbookDetail = (id, list = logbooks) => {
    const found = list.find(item => item.logbook_id === parseInt(id));
    if (found) {
      setSelectedLogbook(found);
      if (found.paraf_laboran) {
        setPreviewUrl(found.paraf_laboran);
        setIsVerified(true);
      }
      if (found.status_paraf_laboran === 'rejected' || found.status_paraf_laboran === 'approved') {
        setStatus(found.status_paraf_laboran);
      } else {
        setStatus('approved');
      }
    }
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedLogbookId(val);
    loadLogbookDetail(val);
  };

  const handleNamaChange = (e) => {
    setNamaLaboran(e.target.value);
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
        setParafFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
          setIsVerified(true);
        };
        reader.readAsDataURL(file);
        alert(`📄 File tanda tangan "${file.name}" berhasil diunggah!`);
      } else {
        alert('⚠️ Hanya file gambar (PNG/JPG) dan PDF yang diperbolehkan!');
        e.target.value = '';
      }
    }
  };

  const handleHapusParaf = () => {
    setParafFile(null);
    setPreviewUrl(null);
    setIsVerified(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    alert('🗑️ Tanda tangan telah dihapus');
  };

  const handleSimpanPersetujuan = async () => {
    if (!selectedLogbookId) {
      alert('⚠️ Pilih data logbook alat terlebih dahulu!');
      return;
    }
    if (!previewUrl) {
      alert('⚠️ Harap unggah tanda tangan terlebih dahulu!');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        role: 'laboran',
        paraf: previewUrl,
        status: status || 'approved',
        id_account: user.id || null
      };

      const res = await updateAlatReview(selectedLogbookId, payload);
      if (res.success) {
        alert('✅ Paraf Digital Laboran (Alat) berhasil disimpan ke database!');
        navigate('/admin/alat-logbook-laboran');
      } else {
        alert('❌ Gagal menyimpan: ' + res.message);
      }
    } catch (err) {
      console.error('Error saving alat paraf laboran:', err);
      alert('❌ Error simpan paraf: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans antialiased text-gray-800 flex flex-col items-center py-8">
      <div className="w-full max-w-[1200px] bg-white rounded-lg shadow-sm flex flex-col overflow-hidden border border-gray-200">
        <AdminHeader role="laboran" activeCategory="alat" />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 bg-[#F3F4F6] p-8 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1C33] mb-2">Validasi &amp; Paraf Digital Laboran (Alat)</h2>
                <p className="text-sm text-gray-600 max-w-xl">
                  Unggah tanda tangan digital laboran penanggung jawab untuk menyetujui logbook operasional instrumen laboratorium.
                </p>
              </div>

              {/* Logbook Selector */}
              <div className="bg-white border border-gray-300 rounded-lg p-2 flex flex-col gap-1 min-w-[240px] shadow-sm">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Pilih Logbook Alat:</label>
                <select 
                  value={selectedLogbookId} 
                  onChange={handleSelectChange}
                  className="text-xs p-1.5 border border-gray-300 rounded bg-white font-medium focus:ring-1 focus:ring-[#0B1C33]"
                >
                  {logbooks.map(lb => (
                    <option key={lb.logbook_id} value={lb.logbook_id}>
                      ID #{lb.logbook_id} - {lb.nama_lengkap || lb.nama_researcher} ({lb.sub_lab_alat_id || 'Alat'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Info Banner */}
            {selectedLogbook && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-900 flex flex-wrap gap-4">
                <span><b>Peneliti:</b> {selectedLogbook.nama_lengkap || selectedLogbook.nama_researcher}</span>
                <span><b>Alat:</b> {selectedLogbook.sub_lab_alat_id || '-'}</span>
                <span><b>Pengujian:</b> {selectedLogbook.jenis_pengujian || '-'}</span>
                <span><b>Status Paraf Laboran:</b> <span className="uppercase font-semibold">{selectedLogbook.status_paraf_laboran || 'pending'}</span></span>
              </div>
            )}

            {/* Signature Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-8 relative">
              <div className="flex flex-col items-center mb-6">
                <h3 className="font-serif text-lg font-bold text-[#0B1C33] mb-1">Area Tanda Tangan Digital Laboran (Alat)</h3>
              </div>

              {/* Drawing Area - Click to Upload */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 flex items-center justify-center bg-gray-50 min-h-[160px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={handleFileUpload}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.png,.jpg,.jpeg,image/*,application/pdf"
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="text-center">
                    <img 
                      src={previewUrl} 
                      alt="Preview Tanda Tangan" 
                      className="max-h-[120px] object-contain mb-2 mx-auto"
                    />
                    <p className="text-sm text-green-600 font-medium">✓ File Paraf siap disimpan ke database</p>
                    <p className="text-xs text-gray-400 mt-1">Klik untuk mengganti gambar</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <p className="text-sm text-gray-400 font-medium">Klik untuk unggah Tanda Tangan / Paraf</p>
                    <p className="text-xs text-gray-300">Format PNG, JPG, atau PDF</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={handleHapusParaf}
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Hapus
                </button>
              </div>
            </div>

            {/* SOP Note */}
            <div className="bg-[#0B1C33] text-white rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-semibold text-sm text-[#FCD385]">SOP PENGGUNAAN ALAT</h4>
              </div>
              <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-300 ml-1">
                <li>Pastikan peneliti telah mengoperasikan instrumen sesuai SOP yang berlaku.</li>
                <li>Tanda tangan digital tersimpan otomatis ke database MySQL &amp; riwayat audit.</li>
                <li>Status paraf logbook akan disimpan sesuai pilihan (Approved / Rejected).</li>
              </ul>
            </div>

            {/* Footer Actions & Preview */}
            <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <input 
                  type="text" 
                  value={namaLaboran}
                  onChange={handleNamaChange}
                  className="text-2xl font-signature text-gray-800 tracking-wide border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#0B1C33] w-64" 
                  aria-label="Nama Laboran"
                />
                <div className="h-8 border-l border-gray-200 hidden sm:block"></div>
                <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${isVerified ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`w-2 h-2 rounded-full inline-block ${isVerified ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {isVerified ? '✓ Tanda Tangan Siap / Terverifikasi' : 'Belum Tanda Tangan'}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex space-x-2">
                  <button 
                    type="button"
                    onClick={() => setStatus('rejected')}
                    className={`px-5 py-2 rounded text-sm font-semibold transition flex items-center gap-1.5 ${
                      status === 'rejected'
                        ? 'bg-red-600 text-white shadow-sm border border-red-600'
                        : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    Rejected
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStatus('approved')}
                    className={`px-5 py-2 rounded text-sm font-semibold transition flex items-center gap-1.5 ${
                      status === 'approved'
                        ? 'bg-green-600 text-white shadow-sm border border-green-600'
                        : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </svg>
                    Approved
                  </button>
                </div>
                <button 
                  onClick={handleSimpanPersetujuan}
                  disabled={saving}
                  type="button"
                  className="bg-[#0B1C33] text-white py-2.5 px-6 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <span>{saving ? 'Menyimpan ke Database...' : 'Simpan Paraf ke Database'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </main>
        </div>

        <footer className="bg-[#0B1C33] py-4 px-8">
          <div className="max-w-[1200px] mx-auto flex justify-between items-center">
            <p className="text-white text-xs">
              Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        .nav-underline {
          text-decoration-thickness: 3px;
          text-underline-offset: 8px;
        }
        .font-signature {
          font-family: 'Great Vibes', cursive, 'Brush Script MT', sans-serif;
        }
      `}</style>
    </div>
  );
}