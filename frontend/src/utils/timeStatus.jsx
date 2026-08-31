import React from 'react';

/**
 * Menghitung status tenggat waktu peminjaman Lab & Alat
 * @param {string|Date} waktuMulai 
 * @param {string|Date} waktuSelesai 
 * @returns {object} status info
 */
export function getBorrowStatus(waktuMulai, waktuSelesai) {
  if (!waktuSelesai) {
    return {
      status: 'unknown',
      label: 'Waktu Tidak Ditentukan',
      detail: '',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      dotColor: 'bg-gray-400',
      icon: '⏱️'
    };
  }

  const now = new Date();
  const start = waktuMulai ? new Date(waktuMulai) : null;
  const end = new Date(waktuSelesai);

  if (isNaN(end.getTime())) {
    return {
      status: 'unknown',
      label: 'Waktu Tidak Valid',
      detail: '',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      dotColor: 'bg-gray-400',
      icon: '⏱️'
    };
  }

  // 1. Jika sudah melewati waktu_selesai -> Peminjaman Berakhir
  if (now > end) {
    return {
      status: 'expired',
      label: 'Peminjaman Berakhir',
      detail: '',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      dotColor: 'bg-red-500',
      icon: '🛑'
    };
  }

  // 2. Jika belum mencapai waktu_mulai -> Terjadwal
  if (start && !isNaN(start.getTime()) && now < start) {
    return {
      status: 'scheduled',
      label: 'Terjadwal',
      detail: `Mulai: ${start.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      dotColor: 'bg-blue-500',
      icon: '📅'
    };
  }

  // 3. Sedang Berjalan / Sedang Dipinjam
  const remMs = end - now;
  const remHours = Math.floor(remMs / (1000 * 60 * 60));
  const remMins = Math.floor((remMs % (1000 * 60 * 60)) / (1000 * 60));
  const remDays = Math.floor(remHours / 24);

  let remainingText = '';
  if (remDays > 0) remainingText = `Sisa ${remDays}h ${remHours % 24}j`;
  else if (remHours > 0) remainingText = `Sisa ${remHours}j ${remMins}m`;
  else remainingText = `Sisa ${remMins} mnt`;

  const isUrgent = remHours < 1;

  return {
    status: 'active',
    label: 'Sedang Dipinjam',
    detail: `Tenggat: ${remainingText}`,
    bgColor: isUrgent ? 'bg-amber-50' : 'bg-emerald-50',
    textColor: isUrgent ? 'text-amber-800' : 'text-emerald-800',
    borderColor: isUrgent ? 'border-amber-300' : 'border-emerald-300',
    dotColor: isUrgent ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse',
    icon: isUrgent ? '⚠️' : '🟢',
    isUrgent
  };
}

/**
 * Komponen Badge Indikator Tenggat Waktu Peminjaman
 */
export function BorrowStatusBadge({ waktuMulai, waktuSelesai, compact = false }) {
  const info = getBorrowStatus(waktuMulai, waktuSelesai);

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold border ${info.bgColor} ${info.textColor} ${info.borderColor}`}
        title={info.detail ? `${info.label} - ${info.detail}` : info.label}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${info.dotColor}`}></span>
        <span>{info.label}</span>
      </span>
    );
  }

  return (
    <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold border shadow-xs ${info.bgColor} ${info.textColor} ${info.borderColor}`}>
      <span className="relative flex h-2 w-2">
        {info.status === 'active' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${info.isUrgent ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${info.dotColor}`}></span>
      </span>
      <span className="font-bold">{info.label}</span>
      {info.detail && <span className="opacity-80 font-normal">({info.detail})</span>}
    </div>
  );
}
