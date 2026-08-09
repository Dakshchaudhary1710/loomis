import React from "react";
import "./WeeklyHeatmap.css";

/**
 * Weekly Performance
 * GitHub-style heatmap: rows = weeks, columns = days, intensity = practice
 * time / score that day. Replace `weeks` with GET /api/weekly-performance
 * -> [[{ date, value }, ...7 days], ...N weeks]
 */

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function generateMockWeeks(weekCount = 6) {
  const weeks = [];
  const today = new Date();
  for (let w = weekCount - 1; w >= 0; w--) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (6 - d)));
      const value = Math.max(0, Math.round(Math.random() * 4 - (w === 0 && d > new Date().getDay() ? 4 : 0)));
      week.push({ date: date.toISOString(), value });
    }
    weeks.push(week);
  }
  return weeks;
}

const DEFAULT_WEEKS = generateMockWeeks();

export default function WeeklyHeatmap({ weeks = DEFAULT_WEEKS }) {
  const totalSessions = weeks.flat().reduce((sum, d) => sum + (d.value > 0 ? 1 : 0), 0);

  return (
    <div className="weekly-perf">
      <div className="weekly-perf__grid">
        <div className="weekly-perf__day-labels">
          {DAY_LABELS.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="weekly-perf__weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="weekly-perf__week">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="weekly-perf__cell"
                  style={{ background: intensityColor(day.value) }}
                  title={`${new Date(day.date).toLocaleDateString()} — ${day.value} session${day.value === 1 ? "" : "s"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="weekly-perf__footer">
        <span>{totalSessions} active days this period</span>
        <div className="weekly-perf__legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className="weekly-perf__legend-cell" style={{ background: intensityColor(v) }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function intensityColor(value) {
  const scale = ["#EEEEF3", "#D9D2FA", "#B6A6F5", "#8D75EF", "#6E56E8"];
  return scale[Math.min(value, scale.length - 1)];
}