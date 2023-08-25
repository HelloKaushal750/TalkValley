import "../Styles/Signup.css";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const handleSignin = () => {
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
        .post("http://localhost:7000/login", data)
        .then((res) => {
          if (res.data.message === "Login Successful" && res.data.token) {
            toast({
              title: "Login Successful",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
            navigate("/record");
          }
        })
        .catch((err) => {
          toast({
            title: "User Not Found. Check email or do registeration",
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
            type="email"
            placeholder="Enter Email Here"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Name Here"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <button className="btn" onClick={handleSignin}>
          Signin
        </button>
      </div>
    </div>
  );
}

export default Login;
