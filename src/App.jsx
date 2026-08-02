import Home from "./assets/pages/Home"
import Main from "./assets/pages/Main"
import Overview from "./assets/main-page/sidebar-contents/Overview";
import Aicoach from "./assets/main-page/sidebar-contents/Aicoach";
import Studyplan from "./assets/main-page/sidebar-contents/Studyplan";
import Voiceanalysis from "./assets/main-page/sidebar-contents/Voiceanalysis";
import Questionbank from "./assets/main-page/sidebar-contents/Questionbank";

import { BrowserRouter, Routes, Route } from "react-router-dom";
export default  function App(){
  return(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/main/*" element={<Main />}>
  <Route index element={<Overview />} />
  <Route path="overview" element={<Overview />} />
  <Route path="aicoach" element={<Aicoach />} />
  <Route path="studyplan" element={<Studyplan />} />
  <Route path="voiceanalysis" element={<Voiceanalysis />} />

  <Route path="questionbank" element={<Questionbank />}/>

</Route>
  </Routes>
  </BrowserRouter>
    
  )
}
