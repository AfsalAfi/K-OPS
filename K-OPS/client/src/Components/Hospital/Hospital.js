import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorTable from "./DoctorTable";
import PatientTable from "./PatientTable";
import AddDoctor from "./AddDoctor";
import axios from "axios";
import { serverURL } from "../../serverConfig";
import HospitalEnquiry from "./HospitalEnquiry";

const Hospital = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/login");
  };

  useEffect(() => {
    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/available-doctors`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("response nokke");
        console.log(response);
        if (response.data.status === "ok") {
          console.log(response.data.availableDoctors);
          setData(response.data.availableDoctors);
        } else {
          console.log(`${response.data.message}`);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post(
  //       `http://${serverURL}:3001/admin/hospital/op-ticket-status`,
  //       {},
  //       {
  //         headers: {
  //           Autherization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //     })

  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       console.log("ethi");
  //     });
  // }, []);

  const [patientData, setPatientData] = useState(data);
  const [doctorData, setDoctorData] = useState(data);

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
      <h3
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          cursor: "pointer",
          padding: "25px 50px 0px 0px",
          color: "grey"
        }}
        onClick={backToHome}
      >
        Logout
      </h3>
      <div
        className="h1_KSEB_report"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          // marginTop: "1rem",
        }}
      >

        <h1>Hospital</h1>
      </div>
      <AddDoctor />
      <DoctorTable patientData={data} setPatientData={setData} />
      <PatientTable
        doctorData={data}
        setDoctorData={setData}
        setPatientData={setData}
      />
      <HospitalEnquiry />
    </div>
  );
};

export default Hospital;
