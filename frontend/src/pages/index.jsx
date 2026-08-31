import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- 1. HEADER / NAVBAR ---
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="px-0">
        <div className="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8">
          
          {/* Logo - Pojok Kiri Sekali */}
          <div className="flex items-center flex-shrink-0">
            <img 
              alt="Institute Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbro60xS2lLLCBheA9vun2VFFTb_Q3ibg5fP90o3KfeXZtaE394jM2Mg7QFUY5zdtRVEvdORuz0dRKbULKNwp-dcmq4okigh4XuNP-MhuA_JBF1h9nXfL1F__axEwCFsWRzSTx0TlEhrW6t1oUSIr5kzCi6RsDhpkr4Mx07QP0IA5xKbqWNhYMpaoMa_tiIz7vFL1RW2njJVAr4ZVPhdJcdcoV_449G9ReGvYOmNVi9w-afD2LM2ggaHUbxIL0y-y9w"
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#0A1D37] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu - Dashboard di Pojok Kanan Sekali */}
          <nav className="hidden md:flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="text-xs font-bold uppercase tracking-widest text-[#0A1D37] border-b-2 border-[#FACC15] pb-1"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 px-4">
            <Link to="/" className="block text-sm font-bold uppercase tracking-widest text-[#0A1D37] py-2 border-b border-gray-100">Dashboard</Link>
          </div>
        )}
      </div>
    </header>
  );
}

// --- 2. HERO SECTION (Gambar lab modern dari Unsplash) ---
function Hero() {
  return (
    <section className="relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background Image dengan gambar lab modern */}
      <div className="absolute inset-0">
        <img 
          alt="Advanced Bioindustrial Engineering Laboratory" 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-[#FACC15] text-xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10 leading-tight">
            Advanced Bioindustrial Engineering Laboratory (ABEL)
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              to="/register" 
              className="bg-[#FACC15] hover:bg-[#EAB308] text-[#0A1D37] font-bold px-6 py-3 rounded flex items-center justify-center transition-all text-xs sm:text-sm w-full sm:w-auto"
            >
              Researcher Register
            </Link>
            <Link 
              to="/login" 
              className="bg-black hover:bg-gray-900 text-white font-bold px-6 py-3 rounded flex items-center justify-center transition-all text-xs sm:text-sm w-full sm:w-auto"
            >
              Researcher Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Komponen LogBookCard ---
function LogBookCard({ 
  title, 
  description, 
  icon, 
  iconPosition = 'left',
  targetRoute,
  showButton = true,
  showInfo = false,
  buttonText = 'Open LogBook',
  buttonRoute = ''
}) {
  const navigate = useNavigate();
  
  const handleOpenLogBook = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      navigate(targetRoute);
    } else {
      navigate('/login');
    }
  };

  const handleInfoButtonClick = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Arahkan ke halaman final_logbook_lab_researcher
      navigate('/final_logbook_lab_researcher');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="border-2 border-[#FACC15] rounded-xl p-6 md:p-8 flex flex-col h-full bg-white hover:shadow-lg transition-shadow">
      <div className={`mb-4 md:mb-6 ${iconPosition === 'right' ? 'flex justify-end' : ''}`}>
        {icon}
      </div>
      <h4 className={`text-lg md:text-xl font-bold text-[#0A1D37] mb-2 md:mb-4 ${iconPosition === 'right' ? 'text-right' : ''}`}>
        {title}
      </h4>
      <p className={`text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-8 flex-grow ${iconPosition === 'right' ? 'text-right' : ''}`}>
        {description}
      </p>
      
      {/* Button Default - Open LogBook */}
      {showButton && !showInfo && (
        <div className={`${iconPosition === 'right' ? 'text-right' : ''}`}>
          <button 
            onClick={handleOpenLogBook}
            className="inline-block bg-[#FACC15] hover:bg-[#EAB308] text-[#0A1D37] font-bold px-5 py-2 rounded text-xs transition-all cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      )}

      {/* Informasi SOP dengan Button Kuning */}
      {showInfo && (
        <div className="mt-2 border-t-2 border-[#FACC15]/30 pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="text-[#FACC15] text-sm flex-shrink-0">📋</span>
              <div className="text-[11px] text-gray-600 leading-relaxed text-justify">
                <p className="font-semibold text-[#0A1D37] mb-1">SOP Peminjaman Alat:</p>
                <p className="italic">
                  Harap mengisi LogBook Penggunaan Lab Terlebih Dahulu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 3. LOGBOOK SECTION ---
function LogBookSection() {
  return (
    <main className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A1D37] inline-block relative pb-4">
            LogBook Input Data
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#FACC15]"></span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Lab Card - dengan button default */}
          <LogBookCard
            title="LogBook Penggunaan Lab"
            description="Data Kelola Input Identitas & Aktivitas yang Dilakukan Beserta Kelengkapan Data Lainnya"
            targetRoute="/sub-lab-lab"
            iconPosition="left"
            showButton={true}
            showInfo={false}
            buttonText="Open LogBook"
            icon={
              <svg className="h-8 md:h-10 w-8 md:w-10 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            }
          />

          {/* Tool Card - dengan informasi SOP dan button kuning */}
          <LogBookCard
            title="LogBook Penggunaan Alat"
            description="Data Kelola Input Kondisi Alat, Jenis Pengujian Beserta Sample Hasil Pengujian"
            targetRoute="/sub-lab-alat"
            iconPosition="right"
            showButton={false}
            showInfo={true}
            buttonRoute="/final_logbook_lab_researcher"
            icon={
              <svg className="h-8 md:h-10 w-8 md:w-10 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            }
          />
        </div>
      </div>
    </main>
  );
}

// --- 4. FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#0A1D37] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-12">
          
          <div className="pr-0 md:pr-4 pb-6 md:pb-0">
            <h5 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b border-white/20">Motto</h5>
            <div className="mt-6 md:mt-8">
              <div className="inline-block">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtvEOs9seV2DisVlmx6g4Q_ZJZRe94Gz5ALWvk191PVS-3sFEWpyVmmIdJfbhJs4_IlMHQujtpa-aAVuNF2y0T1rO_C6ilBWbJHxlVwvP9Tc5JiaoXrVB5fmG1I0gFfXha4dfR8cghHNtu_qARDdpeb3XeQpaIGhyVjxNqSdvyqy43ds_WaOs4AknJJFd9bzc6qVbI6zI2vbBRCq2WZ68mtyHqFZL0Y_QK1bwX0Dr5QUk1-wQ0uEu_wpURTWOEBYMaHQ" 
                  alt="FTUI UNGGUL Motto" 
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="px-0 md:px-4 border-l-0 md:border-l border-white/10 pb-6 md:pb-0">
            <h5 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b border-white/20">Follow Us</h5>
            <div className="mt-6 md:mt-8 flex gap-4">
              <a className="text-white hover:opacity-80 transition-opacity" href="#">
                <svg fill="currentColor" height="28" viewBox="0 0 16 16" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </a>
              <a className="text-white hover:opacity-80 transition-opacity" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.28h-3v-5.5c0-1.31-.02-2.99-1.82-2.99-1.82 0-2.1 1.42-2.1 2.89v5.6h-3v-11h2.88v1.5h.04c.4-.76 1.37-1.55 2.82-1.55 3.02 0 3.58 1.99 3.58 4.57v6.48z"/>
                </svg>
              </a>
              <a className="text-white hover:opacity-80 transition-opacity" href="#">
                <svg fill="currentColor" height="28" viewBox="0 0 16 16" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.05-.075 1.959l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="pl-0 md:pl-4 border-l-0 md:border-l border-white/10">
            <h5 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b border-white/20">Contact Us</h5>
            <div className="mt-6 md:mt-8 space-y-1 md:space-y-2 text-xs md:text-sm leading-relaxed text-gray-300">
              <p>Interdisciplinary Engineering (IDE) Building</p>
              <p>Faculty of Engineering Universitas Indonesia</p>
              <p>Depok, 16424, Indonesia</p>
              <p className="pt-2 md:pt-4">Email: rcbe@eng.ui.ac.id</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-8">
          <p className="text-[10px] text-gray-500 text-center">
            Copyright All Right Reserved 2026, Institute for Biosystems and Bioengineering
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- 5. MAIN PAGE ---
export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <Hero />
      <LogBookSection />
      <Footer />
    </div>
  );
}