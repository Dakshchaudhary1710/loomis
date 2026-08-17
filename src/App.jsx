import Home from "./assets/pages/Home";
import Main from "./assets/pages/Main";
import Overview from "./assets/main-page/sidebar-contents/Overview";
import Aicoach from "./assets/main-page/sidebar-contents/Aicoach";
import Studyplan from "./assets/main-page/sidebar-contents/Studyplan";

import Questionbank from "./assets/main-page/sidebar-contents/Questionbank";
import Settings from "./assets/main-page/sidebar-contents/Settings";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ResumeAnalysis from "./assets/main-page/sidebar-contents/ResumeAnalysis";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main/*" element={<Main />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="aicoach" element={<Aicoach />} />
          <Route path="studyplan" element={<Studyplan />} />
          <Route path="resumeanalysis" element={<ResumeAnalysis />} />
          <Route path="questionbank" element={<Questionbank />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}