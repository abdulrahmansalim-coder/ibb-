import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      console.log('Response Login:', data);

      if (!response.ok) {
        alert(data.message || 'Login gagal');
        return;
      }

      // Simpan token dan data user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect berdasarkan role
      if (data.user.role === 'researcher') {
        window.location.href = '/sub-lab-lab';
      }

      else if (data.user.role === 'laboran') {
        window.location.href = '/admin/lab-logbook-laboran';
      }

      else if (data.user.role === 'kepala_lab') {
        window.location.href = '/admin/lab-logbook-kepala-lab';
      }

      else {
        alert('Role pengguna tidak dikenali');
      }

    } catch (error) {
      console.error('❌ Error login:', error);
      alert('Tidak dapat terhubung ke server');
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
                <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">

                </h2>
                <h2 className="text-[#facc15] text-2xl md:text-3xl font-bold leading-tight">
                  Advanced Bioindustrial Engineering Laboratory (ABEL)
                </h2>
              </div>
            </div>
          </section>

          {/* ===== KANAN: FORM LOGIN ===== */}
          <section className="md:w-1/2 bg-white p-6 md:p-10 lg:p-16 flex flex-col justify-center">

            {/* Tab Toggle (Register & Login) - Sekarang Login aktif */}
            <div className="flex bg-[#f3f4f6] p-1 rounded-md mb-6 max-w-[280px] mx-auto w-full">
              <Link
                to="/register"
                className="flex-1 py-1.5 px-4 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors text-center"
              >
                Register
              </Link>
              <button className="flex-1 bg-white py-1.5 px-4 rounded shadow-sm text-xs font-medium text-gray-700">
                Login
              </button>
            </div>

            {/* Login Headline */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl md:text-3xl text-[#050c1c] mb-2">
                Login
              </h3>
              <p className="text-gray-500 text-xs">
                Please enter your credentials to access your account.
              </p>
            </div>

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email */}
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

              {/* Password */}
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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#050c1c] hover:bg-black text-white py-3 rounded-md text-xs font-semibold flex items-center justify-center transition-colors"
              >
                Login to Logbook
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