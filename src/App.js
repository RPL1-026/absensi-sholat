// src/App.js
import React, { useState } from 'react';
import WeeklyAttendance from './components/WeeklyAttendance';

// Fungsi untuk menentukan minggu aktif berdasarkan tanggal saat ini
function getCurrentWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() mengembalikan 0-11, jadi tambah 1
  const date = today.getDate();

  // Misal, kita hanya pertimbangkan Februari 2025
  if (year === 2025 && month === 2) {
    if (date >= 3 && date <= 7) return 'minggu1';
    if (date >= 10 && date <= 14) return 'minggu2';
    if (date >= 17 && date <= 21) return 'minggu3';
    if (date >= 24 && date <= 28) return 'minggu4';
  }
  // Jika di luar rentang yang ditentukan, default ke minggu1 (atau logika lainnya)
  return 'minggu1';
}

function App() {
  // Gunakan fungsi getCurrentWeek untuk menginisialisasi state
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  const weeks = {
    minggu1: "3 Februari 2025 - 7 Februari 2025",
    minggu2: "10 Februari 2025 - 14 Februari 2025",
    minggu3: "17 Februari 2025 - 21 Februari 2025",
    minggu4: "24 Februari 2025 - 28 Februari 2025",
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Absensi Sholat Dzuhur & Ashar</h1>
      {/* Dropdown ini bisa tetap ada agar pengguna bisa memilih minggu lain */}
      <div className="mb-4">
        <label htmlFor="weekSelect" className="mr-2">Pilih Minggu:</label>
        <select
          id="weekSelect"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="border p-2"
        >
          {Object.keys(weeks).map(weekId => (
            <option key={weekId} value={weekId}>{weeks[weekId]}</option>
          ))}
        </select>
      </div>
      <WeeklyAttendance
        weekId={selectedWeek}
        weekRange={weeks[selectedWeek]}
      />
    </div>
  );
}

export default App;