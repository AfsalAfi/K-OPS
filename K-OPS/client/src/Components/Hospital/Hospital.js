import React, { useState, useEffect } from "react";
import DoctorTable from "./DoctorTable";
import PatientTable from "./PatientTable";
import Notification_Hopital from "./Notification_Hospital";

const Hospital = () => {
  const dummyData = [
    { id: 1, name: "Doctor 1", count: 0 },
    { id: 2, name: "Doctor 2", count: 0 },
    { id: 3, name: "Doctor 3", count: 0 },
    { id: 4, name: "Doctor 4", count: 0 },
  ];

  const [patientData, setPatientData] = useState(dummyData);
  const [doctorData, setDoctorData] = useState(dummyData);

  useEffect(() => {
    setDoctorData(patientData);
  }, [patientData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        background: "var(--mainColorLight)",
        gap: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <div
        className="h1_KSEB_report"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "3rem",
        }}
      >
        <h1>Hospital</h1>
      </div>
      <DoctorTable patientData={patientData} setPatientData={setPatientData} />
      <PatientTable
        doctorData={doctorData}
        setDoctorData={setDoctorData}
        setPatientData={setPatientData}
      />
      <Notification_Hopital />
    </div>
  );
};

export default Hospital;
