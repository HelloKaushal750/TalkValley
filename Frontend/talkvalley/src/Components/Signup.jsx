import "../Styles/Signup.css";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const toast = useToast();
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const handleSignup = () => {
    if (data.name === "" || data.email === "") {
      toast({
        title: "Kindly fill all the inputs",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      axios
        .post("http://localhost:7000/signup", data)
        .then((res) => {
          if (res.data.message === "User Already Exist. Please Login") {
            toast({
              title: "User Already Exist. Please Login",
              status: "info",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
          } else if (res.data.message === "Account created" && res.data.token) {
            toast({
              title: "Account created",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
            navigate("/record")
          }
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        });
    }
  };
  return (
    <div>
      <div className="signup_page">
        <div>
          <input
            type="text"
            placeholder="Enter Name Here"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Email Here"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <button className="btn" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
