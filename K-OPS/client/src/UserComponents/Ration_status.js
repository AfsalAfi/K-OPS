import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

function Ration_status() {
  const [values, setValues] = useState({
    pachari: "",
    chakkari: "",
    atta: "",
    kerosene: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <div>
      <div
        className="h1_KSEB_report"
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <h1
          style={{
            color: "var(--textColor)",
            display: "flex",
            height: "25vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Ration Cards
        </h1>
      </div>

      <div
        style={{
          minHeight: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front yellow">
              <p className="title">YELLOW CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back yellow">
              <form className="form-container">
                <label>
                  Pachari:
                  <input
                    readOnly
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Atta:
                  <input
                    readOnly
                    type="text"
                    name="atta"
                    value={values.atta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Atta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front red">
              <p className="title">RED CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back red">
              <form className="form-container">
                <label>
                  Pachari:
                  <input
                    readOnly
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Atta:
                  <input
                    readOnly
                    type="text"
                    name="atta"
                    value={values.atta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Atta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front blue">
              <p className="title">BLUE CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back blue">
              <form className="form-container">
                <label>
                  Pachari:
                  <input
                    readOnly
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Atta:
                  <input
                    readOnly
                    type="text"
                    name="atta"
                    value={values.atta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Atta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front white">
              <p className="title">WHITE CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back white">
              <form className="form-container white_content">
                <label>
                  Pachari:
                  <input
                    readOnly
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Atta:
                  <input
                    readOnly
                    type="text"
                    name="atta"
                    value={values.atta}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Atta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ration_status;
