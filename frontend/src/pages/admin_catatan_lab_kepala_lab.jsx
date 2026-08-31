import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getLabLogbooks, updateLabReview } from '../api/adminService';

import AdminHeader from './AdminHeader';

// --- 2. SIDEBAR ---
function Sidebar() {
  const navigate = useNavigate();

  const handleCatatanClick = () => {
    alert('📋 Anda berada di halaman Catatan Kepala Lab');
  };

  const handleParafDigitalClick = () => {
    navigate('/admin/paraf-lab-kepala-lab');
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
            <h2 className="font-serif font-bold text-lg leading-tight text-white text-center">Data Laboratorium</h2>
            <p className="text-xs text-white/70 text-center">IBB FTUI</p>
          </div>
        </div>
        
        <nav className="px-4 space-y-2">
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm cursor-default"
          >
            <i className="fa-solid fa-box-archive text-white text-sm"></i>
            <span>Catatan</span>
          </button>
          
          <button 
            onClick={handleParafDigitalClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B1C33] text-white rounded-md font-medium text-sm hover:bg-gray-700 transition"
          >
            <i className="fa-solid fa-shield-halved text-white text-sm"></i>
            <span>Paraf Digital</span>
          </button>

          <Link 
            to="/admin/lab-logbook-kepala-lab"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-100 text-[#0B1C33] hover:bg-gray-200 rounded-md font-medium text-sm transition"
          >
            <span>Lihat Logbook Lab</span>
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
export default function AdminCatatanLabKepalaLab() {
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
      const res = await getLabLogbooks();
      if (res.success && res.data) {
        setLogbooks(res.data);
        const targetId = location.state?.id || (res.data.length > 0 ? res.data[0].logbook_lab_id : '');
        if (targetId) {
          setSelectedLogbookId(targetId);
          loadLogbookDetail(targetId, res.data);
        }
      }
    } catch (err) {
      console.error('Error load lab logbooks for kepala lab:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLogbookDetail = (id, list = logbooks) => {
    const found = list.find(item => item.logbook_lab_id === parseInt(id));
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
      alert('⚠️ Pilih data logbook terlebih dahulu!');
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

      const res = await updateLabReview(selectedLogbookId, payload);
      if (res.success) {
        alert('✅ Catatan Kepala Lab berhasil disimpan ke database!');
        navigate('/admin/lab-logbook-kepala-lab');
      } else {
        alert('❌ Gagal menyimpan: ' + res.message);
      }
    } catch (err) {
      console.error('Error saving lab catatan kepala lab:', err);
      alert('❌ Error simpan catatan: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans antialiased text-gray-800 flex flex-col items-center py-8">
      <div className="w-full max-w-[1200px] bg-white rounded-lg shadow-sm flex flex-col overflow-hidden border border-gray-200">
        <AdminHeader role="kepala_lab" activeCategory="lab" />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 bg-[#F3F4F6] p-8 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="max-w-2xl">
                <h2 className="font-serif font-bold text-lg text-ibb-dark mb-2">Catatan Kepala Laboratorium Untuk Researcher (Lab)</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Berikan instruksi operasional, rekomendasi riset, atau catatan keselamatan khusus untuk praktikum hari ini. Seluruh catatan akan tersimpan secara terstruktur di database.
                </p>
              </div>

              {/* Logbook Selector */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 flex flex-col gap-1 min-w-[240px]">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Pilih Logbook Lab:</label>
                <select 
                  value={selectedLogbookId} 
                  onChange={handleSelectChange}
                  className="text-xs p-1.5 border border-gray-300 rounded bg-white font-medium focus:ring-1 focus:ring-ibb-primary"
                >
                  {logbooks.map(lb => (
                    <option key={lb.logbook_lab_id} value={lb.logbook_lab_id}>
                      ID #{lb.logbook_lab_id} - {lb.nama_lengkap || lb.nama_researcher} ({lb.sub_lab_lab_id || 'Lab'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Info Banner */}
            {selectedLogbook && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-900 flex flex-wrap gap-4">
                <span><b>Peneliti:</b> {selectedLogbook.nama_lengkap || selectedLogbook.nama_researcher}</span>
                <span><b>Lab:</b> {selectedLogbook.sub_lab_lab_id || '-'}</span>
                <span><b>Judul Riset:</b> {selectedLogbook.judul_penelitian || '-'}</span>
                <span><b>Status Paraf Kepala Lab:</b> <span className="uppercase font-semibold">{selectedLogbook.status_paraf_kepala_lab || 'pending'}</span></span>
              </div>
            )}

            {/* Editor Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-500 tracking-wider">ISI CATATAN DARI KEPALA LABORATORIUM</h3>
                <div className="flex space-x-3 text-gray-400">
                  <button className="hover:text-gray-700" title="Bold">
                    <i className="fa-solid fa-bold"></i>
                  </button>
                  <button className="hover:text-gray-700" title="Italic">
                    <i className="fa-solid fa-italic"></i>
                  </button>
                  <button className="hover:text-gray-700" title="List">
                    <i className="fa-solid fa-list-ul"></i>
                  </button>
                </div>
              </div>
              <textarea 
                className="w-full flex-1 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 resize-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 min-h-[200px]"
                placeholder="Tuliskan catatan teknis atau instruksi khusus Kepala Lab untuk Researcher di sini..."
                value={catatan}
                onChange={handleCatatanChange}
                disabled={loading || saving}
              />
            </div>

            {/* Action Buttons */}
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