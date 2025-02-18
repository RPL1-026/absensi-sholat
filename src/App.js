// src/App.js

import React, { useState } from 'react';
import WeeklyAttendance from './components/WeeklyAttendance';

function App() {
  // Contoh: kita punya 4 minggu
  const [selectedWeek, setSelectedWeek] = useState('minggu1');
  const weeks = {
    minggu1: "3 Februari 2025 - 7 Februari 2025",
    minggu2: "10 Februari 2025 - 14 Februari 2025",
    minggu3: "17 Februari 2025 - 21 Februari 2025",
    minggu4: "24 Februari 2025 - 28 Februari 2025",
  };

  return (
    <div>
      <h1>Absensi Sholat Dzuhur & Ashar</h1>
      <select
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(e.target.value)}
      >
        {Object.keys(weeks).map(weekId => (
          <option key={weekId} value={weekId}>
            {weeks[weekId]}
          </option>
        ))}
      </select>

      <WeeklyAttendance
        weekId={selectedWeek}
        weekRange={weeks[selectedWeek]}
      />
    </div>
  );
}

export default App;