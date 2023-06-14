import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { serverURL } from "../serverConfig";

function Ration_status() {
  const location = useLocation();
  console.log(location);
  const regId = location.state.regId;
  console.log(regId);

  const [stocksYellow, setStocksYellow] = useState([]);
  const [stocksRed, setStocksRed] = useState([]);

  const [stocksBlue, setStocksBlue] = useState([]);

  const [stocksWhite, setStocksWhite] = useState([]);

  // const [stocks, setStocksYellow] = useState([]);

  console.log("ethi");

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    console.log("podasd");
    axios
      .post(
        `http://${serverURL}:3001/list-available-stocks`,
        {
          regId: regId,
        },
        {}
      )
      .then(function (response) {
        console.log("hi");
        console.log(response.data.stocks[0].yellow.pachari);
        setStocksYellow(response.data.stocks[0].yellow);
        setStocksRed(response.data.stocks[0].red);

        setStocksBlue(response.data.stocks[0].blue);

        setStocksWhite(response.data.stocks[0].white);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);
  console.log("ethpppppi");

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
                    placeholder={`${stocksYellow.pachari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    placeholder={`${stocksYellow.chakkari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    readOnly
                    type="text"
                    name="aatta"
                    placeholder={`${stocksYellow.Aatta}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    placeholder={`${stocksYellow.kerosene}`}
                    className="white-placeholder"
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
                    placeholder={`${stocksRed.pachari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    placeholder={`${stocksRed.chakkari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    readOnly
                    type="text"
                    name="aatta"
                    placeholder={`${stocksRed.Aatta}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    placeholder={`${stocksRed.kerosene}`}
                    className="white-placeholder"
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
                    placeholder={`${stocksBlue.pachari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    placeholder={`${stocksBlue.chakkari}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    readOnly
                    type="text"
                    name="aatta"
                    placeholder={`${stocksBlue.Aatta}`}
                    className="white-placeholder"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    placeholder={`${stocksBlue.kerosene}`}
                    className="white-placeholder"
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
                    placeholder={`${stocksWhite.pachari}`}
                    className="black-placeholder"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    readOnly
                    type="text"
                    name="chakkari"
                    placeholder={`${stocksWhite.chakkari}`}
                    className="black-placeholder"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    readOnly
                    type="text"
                    name="aatta"
                    placeholder={`${stocksWhite.Aatta}`}
                    className="black-placeholder"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    readOnly
                    type="text"
                    name="kerosene"
                    placeholder={`${stocksWhite.kerosene}`}
                    className="black-placeholder"
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
