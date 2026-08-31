import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBorrowStatus } from '../utils/timeStatus';

// --- 1. HEADER ---
function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <img 
              alt="Institute Logo" 
              className="h-10 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbro60xS2lLLCBheA9vun2VFFTb_Q3ibg5fP90o3KfeXZtaE394jM2Mg7QFUY5zdtRVEvdORuz0dRKbULKNwp-dcmq4okigh4XuNP-MhuA_JBF1h9nXfL1F__axEwCFsWRzSTx0TlEhrW6t1oUSIr5kzCi6RsDhpkr4Mx07QP0IA5xKbqWNhYMpaoMa_tiIz7vFL1RW2njJVAr4ZVPhdJcdcoV_449G9ReGvYOmNVi9w-afD2LM2ggaHUbxIL0y-y9w"
            />
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/sub-lab-lab" className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">
              Sub-Lab
            </Link>
            <div className="flex items-center gap-4 border-l pl-8 ml-4">
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// --- 2. MAIN WRAPPER + SIDEBAR ---
function SidebarWrapper({ children }) {
  return (
    <div className="flex flex-col lg:flex-row flex-1">
      
      {/* Mobile & iPad Horizontal Navigation */}
      <nav className="lg:hidden bg-[#F8F9FA] border-b border-[#E2E8F0] py-3 px-4 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
        <Link to="/sub-lab-lab" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a2332] text-white text-xs font-medium">
          <i className="fa-solid fa-flask"></i>
          <span>Sub Lab</span>
        </Link>
        <Link to="/logbook_lab_researcher" className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition">
          <i className="fa-solid fa-box-archive"></i>
          <span>LogBook</span>
        </Link>
        <Link to="/final_logbook_lab_researcher" className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition">
          <i className="fa-solid fa-check-circle"></i>
          <span>Final LogBook</span>
        </Link>
        <Link 
          to="/login" 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:text-red-700 text-xs font-medium transition"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </Link>
      </nav>

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:flex w-full lg:w-64 bg-[#F8F9FA] border-r border-slate-200 flex-col justify-between p-6 flex-shrink-0">
        <div className="space-y-6">
          <div className="px-3">
            <h1 className="text-xl font-serif font-bold text-slate-900 leading-tight">Data Researcher</h1>
            <p className="text-xs text-slate-500 font-medium">IBB FTUI</p>
          </div>
          <nav className="space-y-1">
            <Link to="/sub-lab-lab" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition bg-[#1a2332] text-white">
              <i className="fa-solid fa-flask text-sm w-5 text-center"></i>
              <span className="text-sm">Sub Lab</span>
            </Link>
            <Link to="/logbook_lab_researcher" className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
              <i className="fa-solid fa-box-archive text-sm w-5 text-center"></i>
              <span className="text-sm">LogBook</span>
            </Link>
            <Link to="/final_logbook_lab_researcher" className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
              <i className="fa-solid fa-check-circle text-sm w-5 text-center"></i>
              <span className="text-sm">Final LogBook</span>
            </Link>
          </nav>
        </div>
        <div className="pt-8 border-t border-slate-200 space-y-1">
          <Link 
            to="/login" 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }}
            className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:text-red-700 transition"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-sm w-5 text-center"></i>
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 bg-white overflow-y-auto p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

// --- 3. LAB CARD ---
function LabCard({ code, title, description, image, items, isAvailable }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  const handleSelect = () => {
    setIsSelected(true);
    const roomObj = { code, title, description, image, items };
    localStorage.setItem('selectedRoomLab', JSON.stringify(roomObj));
    navigate('/logbook_lab_researcher', {
      state: {
        selectedRoom: roomObj
      }
    });
  };

  return (
    <article className="bg-white border-2 border-[#1a2332] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="h-32 md:h-40 bg-slate-100 overflow-hidden relative">
        <img alt={title} className="w-full h-full object-cover" src={image} />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ruang Sub-Lab</span>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
            isSelected ? 'bg-slate-900 text-white' : 'bg-green-100 text-green-700'
          }`}>
            {isSelected ? 'Dipilih' : 'Tersedia'}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
        

        <div className="text-xs font-semibold text-slate-700 mb-1">Berisi List Alat :</div>
        <ol className="text-xs text-slate-600 list-decimal list-inside space-y-1 mb-6 flex-grow">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
        <button
          onClick={handleSelect}
          className={`w-full py-2.5 px-4 border-2 rounded-lg text-sm font-semibold transition mt-auto ${
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
      image: '/images/fermentation_lab.jpg',
      items: ['Microscope A', 'Centrifuge B', 'Incubator C'],
      isAvailable: true
    },
    {
      code: '802',
      title: 'I.802 | Hydrolysis and Detoxification Sub Lab',
      description: 'The Hydrolysis and Detoxification Sublab focuses on converting pretreated biomass into fermentable sugars through enzymatic or chemical hydrolysis processes, as well as removing inhibitory compounds formed during pretreatment. Research activities include optimizing hydrolysis conditions, developing detoxification methods, and evaluating hydrolysate quality to support the sustainable production of biofuels, biochemicals, and biomaterials.',
      image: '/images/hydrolysis_lab.jpg',
      items: ['Spectrophotometer', 'PCR Machine', 'Autoclave'],
      isAvailable: true
    },
    {
      code: '803',
      title: 'I.803 | Biomass Pretreatment Sub Lab',
      description: 'The Biomass Pretreatment Sublab focuses on the development and optimization of lignocellulosic biomass pretreatment technologies to enhance the accessibility of cellulose and hemicellulose for subsequent conversion processes. This sublab examines various physical, chemical, physicochemical, and biological pretreatment methods to improve utilization efficiency.',
      image: '/images/biomass_lab.jpg',
      items: ['Fume Hood 1', 'Fume Hood 2', 'Biosafety Cabinet'],
      isAvailable: true
    },
    {
      code: '804',
      title: 'I.804 | Molecular Genomics Sub Lab',
      description: 'The Molecular Genomics Sublab focuses on utilizing molecular biology and genomics approaches to understand, characterize, and engineer biological systems involved in bioconversion processes. Research activities include genome analysis, gene expression, microbial community identification, metagenomics, as well as the development of microorganism engineering strategies to enhance the performance of fermentation, biodegradation, and high-value compound production processes.',
      image: '/images/molecular_lab.jpg',
      items: ['Workstation 1', 'Workstation 2', 'Server Rack'],
      isAvailable: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F3F5] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        <Header />
        <SidebarWrapper>
          <nav aria-label="Breadcrumb" className="flex text-xs text-slate-500 mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-slate-700">Beranda</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fa-solid fa-chevron-right text-[8px] mx-1"></i>
                  <span className="text-slate-700 font-medium">Sub Lab Data Penggunaan Lab</span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Sub Lab Data Peminjaman Lab</h2>
            <p className="text-sm text-slate-500">Pilih ruang laboratorium dan sesuaikan dengan kebutuhan Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
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
        <footer className="bg-[#1a2332] text-slate-400 text-xs py-6 px-8 flex-shrink-0 z-10 relative">
          <p>Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering</p>
        </footer>
      </div>
    </div>
  );
}