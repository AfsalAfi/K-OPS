import React from "react";
import "../../Styles/Admin.css";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineFieldNumber,
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineUsergroupAdd,
  AiOutlineLock,
} from "react-icons/ai";
import { FaUser, FaLock } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";
import axios from "axios";
import { serverURL } from "../../serverConfig";

function Admin() {
  function handleClick(e) {
    e.preventDefault();
    const registerId = document.getElementById("username").value;
    const district = document.getElementById("district").value;
    const division = document.getElementById("division").value;
    const place = document.getElementById("place").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const email = document.getElementById("email").value;
    const officer = document.getElementById("officer").value;
    const password = document.getElementById("password").value;

    console.log("Register ID:", registerId);
    console.log("District:", district);
    console.log("Division:", division);
    console.log("Place:", place);
    console.log("Contact Number:", contactNumber);
    console.log("Email:", email);
    console.log("Officer:", officer);
    console.log("Pass:", password);

    axios
      .post(
        `http://${serverURL}:3001/admin/create-kseb-division`,
        {
          regId: registerId,
          district: district,
          division: division,
          place: place,
          contact: contactNumber,
          email: email,
          officer: officer,
          password: password,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        window.location.reload()
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }

  function handleSubmitRation(event) {
    event.preventDefault();
    const form = event.target;
    const registerId = form.elements.registerId.value;
    const password = form.elements.password.value;
    const district = form.elements.district.value;
    const place = form.elements.place.value;
    const contact = form.elements.contact.value;
    const email = form.elements.email.value;
    const rationShop = form.elements.rationShop.value;

    console.log(registerId);
    console.log(password);
    console.log(district);
    console.log(place);
    console.log(contact);
    console.log(email);
    console.log(rationShop);

    axios
      .post(
        `http://${serverURL}:3001/admin/create-ration-shop`,
        {
          regId: registerId,
          password: password,
          district: district,
          place: place,
          contact: contact,
          email: email,
          RationShopName: rationShop,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        window.location.reload();
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const registerId = form.elements.registerId.value;
    const category = form.elements.category.value;
    const district = form.elements.district.value;
    const place = form.elements.place.value;
    const email = form.elements.email.value;
    const contact = form.elements.contact.value;
    const hospitalName = form.elements.hospitalName.value;
    const password = form.elements.password.value;
    console.log("Register ID:", registerId);
    console.log("Category:", category);
    console.log("District:", district);
    console.log("Place:", place);
    console.log("Email:", email);
    console.log("Contact:", contact);
    console.log("Hospital Name:", hospitalName);
    console.log("Password:", password);

    axios
      .post(
        `http://${serverURL}:3001/admin/create-hospital`,
        {
          regId: registerId,
          category: category,
          district: district,
          place: place,
          email: email,
          contact: contact,
          name: hospitalName,
          password: password,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        window.location.reload();
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {/* KSEB */}
      <form className="form_main" onSubmit={handleClick}>
        <p className="heading">
          Sign Up <br /> KSEB
        </p>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineUser color="#2e2e2e" />}
            />
            <Input
              placeholder="Register ID"
              id="username"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineFieldNumber color="#2e2e2e" />}
            />
            <Input
              placeholder="District"
              id="district"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineEnvironment color="#2e2e2e" />}
            />
            <Input
              placeholder="Division"
              id="division"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineEnvironment color="#2e2e2e" />}
            />
            <Input
              placeholder="Place"
              id="place"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlinePhone color="#2e2e2e" />}
            />
            <Input
              placeholder="Contact Number"
              id="contactNumber"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineMail color="#2e2e2e" />}
            />
            <Input
              placeholder="Email"
              id="email"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineUsergroupAdd color="#2e2e2e" />}
            />
            <Input
              placeholder="Officer"
              id="officer"
              className="inputField"
              type="text"
              required // added required attribute
            />
          </InputGroup>
        </Box>
        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              className="icon_color"
              pointerEvents="none"
              children={<AiOutlineLock color="#2e2e2e" />}
            />
            <Input
              placeholder="Password"
              id="password"
              className="inputField"
              type="password"
              required // added required attribute
            />
          </InputGroup>
        </Box>

        <button id="button">Submit</button>
      </form>
      {/* Ration */}
      <form className="form_main" onSubmit={handleSubmitRation}>
        <p className="heading">
          {" "}
          Sign Up <br /> Ration Shop
        </p>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Register ID"
              id="registerId"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaLock} color="#2e2e2e" />}
            />
            <Input
              placeholder="Password"
              id="password"
              className="inputField"
              type="password"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="District"
              id="district"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Place"
              id="place"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Contact"
              id="contact"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Email"
              id="email"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Ration Shop"
              id="rationShop"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Button type="submit" id="button">
          Submit
        </Button>
      </form>
      {/* Hospital */}
      <form className="form_main" onSubmit={handleSubmit}>
        <p className="heading">
          Sign Up <br /> Hospital
        </p>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Register ID"
              id="registerId"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Category"
              id="category"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="District"
              id="district"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Place"
              id="place"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Email"
              id="email"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Contact"
              id="contact"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaUser} color="#2e2e2e" />}
            />
            <Input
              placeholder="Hospital Name"
              id="hospitalName"
              className="inputField"
              type="text"
              required
            />
          </InputGroup>
        </Box>

        <Box className="inputContainer">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaLock} color="#2e2e2e" />}
            />
            <Input
              placeholder="Password"
              id="password"
              className="inputField"
              type="password"
              required
            />
          </InputGroup>
        </Box>

        <Button type="submit" id="button">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Admin;
