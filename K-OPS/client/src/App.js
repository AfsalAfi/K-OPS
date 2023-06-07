import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/Home";
import KSEB_report from "./UserComponents/KSEB_report";
import KSEB_enquiry from "./UserComponents/KSEB_enquiry";
import KSEB_notification from "./UserComponents/KSEB_notification";
import Hospital_availability from "./UserComponents/Hospital_availability";
import Hospital_enquiry from "./UserComponents/Hospital_enquiry";
import Hospital_medical_facility from "./UserComponents/Hospital_medical_facility";
import Hospital_OP_ticket from "./UserComponents/Hospital_OP_ticket";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* KSEB */}
          <Route path="KSEB/report" element={<KSEB_report />} />
          <Route path="KSEB/enquiry" element={<KSEB_enquiry />} />
          <Route path="KSEB/notification" element={<KSEB_notification />} />
          {/* Hospital */}
          <Route
            path="/hospital/availability"
            element={<Hospital_availability />}
          />
          <Route path="/hospital/enquiry" element={<Hospital_enquiry />} />
          <Route
            path="/hospital/medical-facility"
            element={<Hospital_medical_facility />}
          />
          <Route path="/hospital/OP-ticket" element={<Hospital_OP_ticket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
