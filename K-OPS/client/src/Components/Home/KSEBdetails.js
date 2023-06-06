import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/KSEBdetails.css";

function KSEBdetails() {
  const navigate = useNavigate();

  const goToReport = () => {
    navigate("/KSEB/report");
  };

  const goToEnquiry = () => {
    navigate("/KSEB/enquiry");
  };

  const goToNotification = () => {
    navigate("/KSEB/notification");
  };

  return (
    <div className="container_KSEB">
      <div className="image_section_KSEB">
        <img src="../KSEB.svg" alt="KSEB Logo" />
      </div>
      <div className="contents_KSEB">
        <h1>Kerala State Electricity Board Limited (KSEB)</h1>
        <p>
          Explore our services, report failures, make inquiries or complaints,
          and stay updated with our notifications. Together, let's power a
          brighter future for Kerala.
        </p>
        <div className="buttons_KESB">
          <h2 onClick={goToReport}>
            <span>-</span>Report Failures
          </h2>
          <h2 onClick={goToEnquiry}>
            <span>-</span>Enquiries or Complaints
          </h2>
          <h2 onClick={goToNotification}>
            <span>-</span>Notifications
          </h2>
        </div>
      </div>
    </div>
  );
}

export default KSEBdetails;
