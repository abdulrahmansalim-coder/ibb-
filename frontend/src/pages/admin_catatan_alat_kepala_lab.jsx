import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAlatLogbooks, updateAlatReview } from '../api/adminService';

import AdminHeader from './AdminHeader';

// --- 2. SIDEBAR ---
function Sidebar() {
  const navigate = useNavigate();

  const handleParafDigitalClick = () => {
    navigate('/admin/paraf-alat-kepala-lab');
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
          <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm cursor-default">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Catatan</span>
          </button>
          <button 
            onClick={handleParafDigitalClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm hover:bg-gray-700 transition"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Paraf Digital</span>
          </button>
          <Link 
            to="/admin/alat-logbook-kepala-lab"
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
export default function AdminCatatanAlatKepalaLab() {
  const navigate = useNavigate();
  const location = useLocation();

  const [logbooks, setLogbooks] = useState([]);
  const [selectedLogbookId, setSelectedLogbookId] = useState(location.state?.id || '');
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLogbooks();
  }, []);

  const fetchLogbooks = async () => {
    try {
      setLoading(true);
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
      console.error('Error load alat logbooks for kepala lab:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLogbookDetail = (id, list = logbooks) => {
    const found = list.find(item => item.logbook_id === parseInt(id));
    if (found) {
      setSelectedLogbook(found);
      setCatatan(found.catatan_kepala_lab || '');
    }
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedLogbookId(val);
    loadLogbookDetail(val);
  };

  const handleCatatanChange = (e) => {
    setCatatan(e.target.value);
  };

  const handleSaveAndInput = async () => {
    if (!selectedLogbookId) {
      alert('⚠️ Pilih data logbook alat terlebih dahulu!');
      return;
    }
    if (!catatan.trim()) {
      alert('⚠️ Harap isi catatan terlebih dahulu!');
      return;
    }

    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        role: 'kepala_lab',
        catatan: catatan,
        id_account: user.id || null
      };

      const res = await updateAlatReview(selectedLogbookId, payload);
      if (res.success) {
        alert('✅ Catatan Kepala Lab (Alat) berhasil disimpan ke database!');
        navigate('/admin/alat-logbook-kepala-lab');
      } else {
        alert('❌ Gagal menyimpan: ' + res.message);
      }
    } catch (err) {
      console.error('Error saving alat catatan kepala lab:', err);
      alert('❌ Error simpan catatan: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans antialiased text-gray-800 flex flex-col items-center py-8">
      <div className="w-full max-w-[1200px] bg-white rounded-lg shadow-sm flex flex-col overflow-hidden border border-gray-200">
        <AdminHeader role="kepala_lab" activeCategory="alat" />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-[#F3F4F6] p-8 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="max-w-2xl">
                <h2 className="font-serif font-bold text-lg text-[#0B1C33] mb-2">Catatan Kepala Laboratorium Untuk Penggunaan Alat</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Berikan instruksi operasional, evaluasi teknis, atau catatan keselamatan khusus untuk pemakaian instrumen lab hari ini. Seluruh catatan akan disimpan secara permanen di Database.
                </p>
              </div>

              {/* Logbook Selector */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 flex flex-col gap-1 min-w-[240px]">
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
                <span><b>Sampel:</b> {selectedLogbook.jenis_sample || '-'}</span>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-500 tracking-wider">ISI CATATAN DARI KEPALA LABORATORIUM</h3>
                <div className="flex space-x-3 text-gray-400">
                  <button className="hover:text-gray-700" title="Bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9M6 16h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <button className="hover:text-gray-700" title="Italic">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 4h8M14 4L10 20M6 20h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <button className="hover:text-gray-700" title="List">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>
              <textarea 
                className="w-full flex-1 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 resize-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 min-h-[200px]"
                placeholder="Tuliskan catatan teknis atau instruksi khusus Kepala Lab untuk alat di sini..."
                value={catatan}
                onChange={handleCatatanChange}
                disabled={loading || saving}
              />
            </div>

            <div className="flex justify-end items-center mt-6">
              <button 
                type="button"
                onClick={handleSaveAndInput}
                disabled={saving}
                className="px-6 py-2.5 bg-[#0B1C33] text-white rounded text-sm font-medium hover:bg-gray-800 transition flex items-center space-x-2 disabled:opacity-50"
              >
                <span>{saving ? 'Menyimpan...' : 'Save and Input'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </button>
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
      `}</style>
    </div>
  );
}