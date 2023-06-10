import React, { useState } from "react";
import "../../Styles/Ration.css";

function Ration() {
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
    <React.Fragment>
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
              <form onSubmit={handleSubmit} className="form-container">
                <label>
                  Pachari:
                  <input
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
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button gray">
                  Submit
                </button>
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
              <form onSubmit={handleSubmit} className="form-container">
                <label>
                  Pachari:
                  <input
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
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Submit
                </button>
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
              <form onSubmit={handleSubmit} className="form-container">
                <label>
                  Pachari:
                  <input
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
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Submit
                </button>
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
              <form
                onSubmit={handleSubmit}
                className="form-container white_content"
              >
                <label>
                  Pachari:
                  <input
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
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button dark_gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Ration;
