// src/components/WeeklyAttendance.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const students = [
    "Abel Nova Azzahrah", "Adelia Bunga Febrianti", "Alif Alfan", "Annisa Nur Fadlilah", "Aulia Arin Maftuckah",
    "Brillian Yusuf Sejati", "Dian Putri Kartikasari", "Dimar Nur Arifin", "Dinda Puspita Ayuningtyas", "Eleen Aulia Nafisa",
    "Enggar Widyaningrum", "Erlita Deva Agustina", "Faris Elfrida Hadriyansyah", "Ferlyana Glady Savila", "Ghofur Reza Ananta",
    "Intan Cahaya Salsabila", "Intan Melisa Nur Aeni", "Jasmine Nurmaulidha", "Jazila Maftukha", "Kayla Nazwa Eliza",
    "Kharisma Aulia Faigrima", "Kharissa Kurnia Mecha", "Marlina Indah Sari", "Maulana Jihaniyavi", "Nalasari Aghniya",
    "Nayla Karima Zahirannisa", "Naysilla Ramadhani", "Nessa Mike Ardinasari", "Nur Alif Arga Prastia", "Putra Abdurrahman Muhammad",
    "Risma Ella widayanti", "Risti Munthoharoh", "Rofiatun", "Vina Layinatu Syifa", "Widya Anindita", "Yulia Deviani"
];

const weekdays = [
  { day: 'Senin',  sessions: ['Dzuhur', 'Ashar'] },
  { day: 'Selasa', sessions: ['Dzuhur', 'Ashar'] },
  { day: 'Rabu',   sessions: ['Dzuhur', 'Ashar'] },
  { day: 'Kamis',  sessions: ['Dzuhur', 'Ashar'] },
  { day: 'Jumat',  sessions: ['Jumatan/Dzuhur'] }
];

const statuses = ["Tidak/Belum", "Sudah", "Halangan"];

function WeeklyAttendance({ weekId, weekRange }) {
  const [attendance, setAttendance] = useState([]);

  // 1. Ambil data dari Firestore saat komponen pertama kali di-render
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'absensiFeb2025', weekId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Jika dokumen sudah ada, gunakan datanya
        const docData = docSnap.data();
        if (docData && Array.isArray(docData.data)) {
          setAttendance(docData.data);
        } else {
          setAttendance([]);
        }
      } else {
        // Jika dokumen belum ada, inisialisasi data baru
        const initialData = students.map(name => {
          const record = { nama: name, absen: {} };
          weekdays.forEach(day => {
            if (day.day !== 'Jumat') {
              record.absen[day.day] = { Dzuhur: "Tidak/Belum", Ashar: "Tidak/Belum" };
            } else {
              record.absen[day.day] = { "Jumatan/Dzuhur": "Tidak/Belum" };
            }
          });
          return record;
        });

        // Simpan data awal ke Firestore
        await setDoc(docRef, {
          weekRange,
          data: initialData
        });

        setAttendance(initialData);
      }
    };

    fetchData();
  }, [weekId, weekRange]);

  // 2. Fungsi untuk ubah status absensi & update ke Firestore
  const handleStatusChange = async (studentIndex, day, session) => {
    setAttendance(prev => {
      const newAttendance = [...prev];
      const currentStatus = newAttendance[studentIndex].absen[day][session];
      const currentIndex = statuses.indexOf(currentStatus);
      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
      newAttendance[studentIndex].absen[day][session] = nextStatus;
      return newAttendance;
    });

    // Setelah state local di-update, simpan ke Firestore
    // (Lakukan di callback setState atau di useEffect agar data pasti sudah terupdate)
    // Di sini kita bisa menunggu state benar-benar selesai di-update, 
    // tetapi untuk contoh sederhana, kita langsung simpan saja:
    const docRef = doc(db, 'absensiFeb2025', weekId);
    // Ambil data terbaru dari newAttendance (bisa juga langsung dari state setelah setAttendance)
    // Pastikan data final (pakai function callback di setState agar akurat).
    setAttendance(prev => {
      setDoc(docRef, {
        weekRange,
        data: prev
      });
      return prev;
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Absensi Minggu: {weekRange}</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Nama Siswa</th>
            {weekdays.map(day =>
              day.sessions.map((session, idx) => (
                <th key={`${day.day}-${idx}`}>
                  {day.day} <br />({session})
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, studentIndex) => (
            <tr key={record.nama}>
              <td>{record.nama}</td>
              {weekdays.map(day =>
                day.sessions.map(session => (
                  <td
                    key={`${record.nama}-${day.day}-${session}`}
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => handleStatusChange(studentIndex, day.day, session)}
                  >
                    {record.absen[day.day][session]}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyAttendance;
