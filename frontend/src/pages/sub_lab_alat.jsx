import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// --- 1. HEADER ---
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
            <Link to="/sub-lab-alat" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[#0B1C33] border-b-2 border-[#0B1C33] pb-1">
              SUB LAB
            </Link>
            <Link to="/logbook_alat_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0B1C33] border-b-2 border-transparent hover:border-[#0B1C33] pb-1 transition">
              LOGBOOK
            </Link>
            <Link to="/final_logbook_alat_researcher" className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0B1C33] border-b-2 border-transparent hover:border-[#0B1C33] pb-1 transition">
              FINAL LOGBOOK
            </Link>
          </nav>         
        </div>
      </div>
    </header>
  );
}

// --- 2. SIDEBAR WRAPPER ---
function SidebarWrapper({ children }) {
  return (
    <div className="flex flex-col lg:flex-row flex-1">
      
      {/* Mobile & Tablet Horizontal Navigation - Shown on lg and below */}
      <nav className="lg:hidden bg-[#F8F9FA] border-b border-[#E2E8F0] py-2 sm:py-3 px-3 sm:px-4 flex items-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
        <Link to="/sub-lab-alat" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1a2332] text-white text-[10px] sm:text-xs font-medium shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Sub Lab</span>
        </Link>
        <Link to="/logbook_alat_researcher" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-[10px] sm:text-xs font-medium transition shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>LogBook</span>
        </Link>
        <Link to="/final_logbook_alat_researcher" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-[10px] sm:text-xs font-medium transition shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Final LogBook</span>
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

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:flex w-full lg:w-64 bg-[#F8F9FA] border-r border-slate-200 flex-col justify-between p-4 sm:p-6 flex-shrink-0">
        <div className="space-y-4 sm:space-y-6">
          <div className="px-2 sm:px-3">
            <h1 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-tight">Data Researcher</h1>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium">IBB FTUI</p>
          </div>
          <nav className="space-y-1">
            <Link to="/sub-lab-alat" className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition bg-[#1a2332] text-white text-xs sm:text-sm">
              <i className="fa-solid fa-flask text-xs sm:text-sm w-4 sm:w-5 text-center"></i>
              <span>Sub Lab</span>
            </Link>
            <Link to="/logbook_alat_researcher" className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-xs sm:text-sm">
              <i className="fa-solid fa-box-archive text-xs sm:text-sm w-4 sm:w-5 text-center"></i>
              <span>LogBook</span>
            </Link>
            <Link to="/final_logbook_alat_researcher" className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-xs sm:text-sm">
              <i className="fa-solid fa-check-circle text-xs sm:text-sm w-4 sm:w-5 text-center"></i>
              <span>Final LogBook</span>
            </Link>
          </nav>
        </div>
        <div className="pt-4 sm:pt-8 border-t border-slate-200 space-y-1">
          <Link 
            to="/login" 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }}
            className="flex items-center space-x-3 px-3 sm:px-4 py-2 text-red-600 hover:text-red-700 transition text-xs sm:text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 bg-white overflow-y-auto p-4 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

// --- 3. LAB CARD ---
function LabCard({ code, title, description, image, items, isAvailable }) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    const roomObj = { code, title, description, image, items };
    localStorage.setItem('selectedRoomAlat', JSON.stringify(roomObj));
    navigate('/logbook_alat_researcher', {
      state: {
        selectedRoom: roomObj
      }
    });
  };

  return (
    <article className="bg-white border-2 border-[#1a2332] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="h-32 sm:h-36 md:h-40 bg-slate-100 overflow-hidden relative">
        <img alt={title} className="w-full h-full object-cover" src={image} />
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ruang Sub-Lab</span>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
            isSelected ? 'bg-slate-900 text-white' : 'bg-green-100 text-green-700'
          }`}>
            {isSelected ? 'Dipilih' : 'Tersedia'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
        
        {description && (
          <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3 text-justify">
            {description}
          </p>
        )}

        <div className="text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">Berisi List Alat :</div>
        <ol className="text-[10px] sm:text-xs text-slate-600 list-decimal list-inside space-y-1 mb-6 flex-grow">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
        <button
          onClick={handleSelect}
          className={`w-full py-2 sm:py-2.5 px-4 border-2 rounded-lg text-xs sm:text-sm font-semibold transition mt-auto ${
            isSelected
              ? 'bg-[#1a2332] border-[#1a2332] text-white cursor-default'
              : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-[#1a2332]'
          }`}
        >
          {isSelected ? 'Selected ✓' : 'Select Room'}
        </button>
      </div>
    </article>
  );
}

// --- 4. MAIN PAGE ---
export default function SubLabLab() {
  const labData = [
    {
      code: '801',
      title: 'I.801 | Fermentation and Separation Sub Lab',
      description: 'The Biomass Pretreatment Sublab focuses on the development and optimization of lignocellulosic biomass pretreatment technologies to enhance the accessibility of cellulose and hemicellulose for subsequent conversion processes. This sublab examines various physical, chemical, physicochemical, and biological pretreatment methods to improve the efficiency of renewable biomass utilization as a raw material for bioprocesses and biorefineries.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-4k-unSho73610UIWtS4DlHdZqapBsszNSJBekEkfYaFRcGPZYZLatwdspb-13DKbQY4ENUwDnl4ofiBe7xIWScHhGFDJrkUxsLdWsCg8rtBz12VZOTUdcuCvHlvoogrrCXB3j1barJVTOvtg-R7cHqhAs-rM0Y_4Om2ZPR0hMePhfGUfc1nBkhRlqMMmlqGlxPbwcN8zmBO1-GP1551LvENv72KZ_W2TbR47xkB-vuU_98p43bbs',
      items: ['Microscope A', 'Centrifuge B', 'Incubator C'],
      isAvailable: true
    },
    {
      code: '802',
      title: 'I.802 | Hydrolysis and Detoxification Sub Lab',
      description: 'The Hydrolysis and Detoxification Sublab focuses on converting pretreated biomass into fermentable sugars through enzymatic or chemical hydrolysis processes, as well as removing inhibitory compounds formed during pretreatment. Research activities include optimizing hydrolysis conditions, developing detoxification methods, and evaluating hydrolysate quality to support the sustainable production of biofuels, biochemicals, and biomaterials.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpO9w0f1-1dvmEMWOKKOWh4nQ67EMvvJ6Maji8a7Mkavhiwvyot5K8h5Qpm9MSv7hIhH1OfsODNUyMQIdPsZjKDm1pkpffaqMOO4PfKMeduNBLs_GdFjvYIXlV1IrQyRo2mASlBd6qPAngUg2V3CV5XdHaZYEBK-jb8BRqmtzhY8lAUMAa8rBP5kBVV2_KIGBCrXuTgxhhnHBXgjLSza4I6phI75hovN6cJ8ZtEvZcHdkG2k6WIVyG',
      items: ['Spectrophotometer', 'PCR Machine', 'Autoclave'],
      isAvailable: true
    },
    {
      code: '803',
      title: 'I.803 | Biomass Pretreatment Sub Lab',
      description: 'The Biomass Pretreatment Sublab focuses on the development and optimization of lignocellulosic biomass pretreatment technologies to enhance the accessibility of cellulose and hemicellulose for subsequent conversion processes. This sublab examines various physical, chemical, physicochemical, and biological pretreatment methods to improve utilization efficiency.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsLOVyqf1y0ckn9z3-MMbbMC-5ym3SjDEBPIkMB7LrNf7QAqKG7uHNoQUxqwU7wYK6ilpZP7omWbOD0wg077-gznAEHoZXNZPWy0HZl-tD47M1wTVNsQFW2KMQemybOuPPnlL-b3C51dtdMcEXmOqDxrG94QCCc3nFOGIOMgYV32Pmdf2d5cvhme4juLyCDBO9zGdob62MF_yQZfI5wkmotkPdaHfRQsoe7P13lmgCPZyWDZ3SJzxZ',
      items: ['Fume Hood 1', 'Fume Hood 2', 'Biosafety Cabinet'],
      isAvailable: true
    },
    {
      code: '804',
      title: 'I.804 | Molecular Genomics Sub Lab',
      description: 'The Molecular Genomics Sublab focuses on utilizing molecular biology and genomics approaches to understand, characterize, and engineer biological systems involved in bioconversion processes. Research activities include genome analysis, gene expression, microbial community identification, metagenomics, as well as the development of microorganism engineering strategies to enhance the performance of fermentation, biodegradation, and high-value compound production processes.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkP48o8LF_RO1pC_7gTa2PrV9wqg4KPUHriXd5_BI1r3CXGR9aongE3Z6yvqkWba7h7d94o1PDiMUucsLZeL5MEPMGvSNXEre6wRfrq7nosWnnLxGKAy5BTrnxw2bpuawBfRXbRAfGSeJKdDAOLh-5-MfrFUMCqg4C_WPdPOvhxBMgZNfXR2Q1H_fGli9UlWwvt9EnDx-6-IaFXeSc3adPFm8knTPZEqDH0UtU8XOS9ovPAs7AiF3U',
      items: ['Workstation 1', 'Workstation 2', 'Server Rack'],
      isAvailable: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-2 sm:p-3 md:p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <Header />
        <SidebarWrapper>
          {/* Breadcrumb - Responsive */}
          <nav aria-label="Breadcrumb" className="flex text-[10px] sm:text-xs text-slate-500 mb-4 sm:mb-6 overflow-x-auto">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-slate-700 whitespace-nowrap">Beranda</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-[8px] mx-1">›</span>
                  <span className="text-slate-700 font-medium whitespace-nowrap">Sub Lab Data Penggunaan Lab & Alat</span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Page Title - Responsive */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1 sm:mb-2">Sub Lab Data Peminjaman Alat</h2>
            <p className="text-xs sm:text-sm text-slate-500">Pilih ruang laboratorium yang sudah Anda input pada peminjaman lab.</p>
          </div>
          
          {/* Lab Cards Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {labData.map((data, index) => (
              <LabCard
                key={index}
                code={data.code}
                title={data.title}
                description={data.description}
                image={data.image}
                items={data.items}
                isAvailable={data.isAvailable}
              />
            ))}
          </div>
        </SidebarWrapper>
        
        {/* Footer - Responsive */}
        <footer className="bg-[#1a2332] text-slate-400 text-xs py-6 px-8 flex-shrink-0 z-10 relative">
          <p>Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}