import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/Home";
import KSEB_report from "./UserComponents/KSEB_report";
import KSEB_enquiry from "./UserComponents/KSEB_enquiry";
import KSEB_notification from "./UserComponents/KSEB_notification";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="KSEB/report" element={<KSEB_report />} />
          <Route path="KSEB/enquiry" element={<KSEB_enquiry />} />
          <Route path="KSEB/notification" element={<KSEB_notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
