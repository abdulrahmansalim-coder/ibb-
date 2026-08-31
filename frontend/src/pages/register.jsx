import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registrasi gagal');
        setLoading(false);
        return;
      }

      alert('✅ Registrasi berhasil! Silakan login dengan akun baru Anda.');
      navigate('/login');
    } catch (error) {
      console.error('❌ Error register:', error);
      alert('Tidak dapat terhubung ke server backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center font-sans p-4">
      <main className="max-w-5xl w-full bg-white shadow-2xl rounded-sm overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          
          {/* ===== KIRI: HERO IMAGE ===== */}
          <section className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
            <img
              alt="Laboratory Background"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4ge7r5fVfh_y3vQa5-TdTjB0KA8wkuOpp7wFROx938luIGWqTrA42wV9SVcCSLLpfNfsrC4_ZuglvOMqDy8zwDWFrDLo52zxPuwWwqr6pZrUMRkbyNFzxQJdU7FN0qgAhd9dTlECiw8TceZoTbJdR38cm8DUdd2wC19BqFEuTiQ9Y9Ctg8OnkzGg8OxW7ujPB8XbQiPmKMSXo-tqHOf_XVxeSUmHO4-abMTXLxZZROQbufj7VLW7"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,12,28,0.7)] to-[rgba(5,12,28,0.7)] flex flex-col justify-center px-6 md:px-12">
              <div className="space-y-2">
                <div className="text-[#facc15] text-2xl md:text-3xl font-bold leading-tight">
                  Advanced Bioindustrial Engineering Laboratory (ABEL)
                </div>
              </div>
            </div>
          </section>

          {/* ===== KANAN: FORM REGISTER ===== */}
          <section className="md:w-1/2 bg-white p-6 md:p-10 lg:p-16 flex flex-col justify-center">
            
            {/* Tab Toggle (Login & Register) */}
            <div className="flex bg-[#f3f4f6] p-1 rounded-md mb-6 max-w-[280px] mx-auto w-full">
              <button className="flex-1 bg-white py-1.5 px-4 rounded shadow-sm text-xs font-medium text-gray-700">
                Register
              </button>
              {/* Login sekarang menggunakan Link agar bisa pindah halaman */}
              <Link 
                to="/login"
                className="flex-1 py-1.5 px-4 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors text-center"
              >
                Login
              </Link>
            </div>

            {/* Welcome Text */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl md:text-3xl text-[#050c1c] mb-2">
                Welcome
              </h3>
              <p className="text-gray-500 text-xs">
                Please enter your data institutional credentials.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[0.65rem] font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-xs placeholder:text-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[0.65rem] font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-xs placeholder:text-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[0.65rem] font-semibold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-[0.6rem] text-orange-600 font-medium hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-xs placeholder:text-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#050c1c] hover:bg-black disabled:bg-gray-400 text-white py-3 rounded-md text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                {loading ? 'Memproses Registrasi...' : 'Registration to Logbook'}
                <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </form>
          </section>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="w-full py-4 border-t border-gray-300 flex justify-center items-center bg-white">
          <p className="text-[0.6rem] text-[#050c1c]">
            © 2026 Institute for Biosystems and Bioengineering
          </p>
        </footer>
      </main>
    </div>
  );
}