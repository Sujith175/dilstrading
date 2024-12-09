import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";
import axios from "axios";
import { server } from "../../Server";
import { toast } from "react-toastify";
import { UserContext } from "../Context/AuthContext";

const LoginComponent = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // const { loginAsGuest, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGuest = () => {
    loginAsGuest();
    toast.success("Logged in as Guest", { theme: "colored" });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${server}/login-user`, {
          username: name,
          password,
        })
        .then((res) => {
          setCurrentUser(res.data.user);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          toast.success("login successFull");
        });
    } catch (error) {
      console.log(error);
      toast.error("login Failed");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full sm:w-[500px] sm:h-[500px] h-screen flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <span className="text-2xl text-blue-950 font-semibold">
            Welcome Back
          </span>
          <p className="text-gray-500 mt-2">Login to your Account</p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 items-center">
          {/* Username Input */}
          <div className="mb-5 relative">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
            <input
              className="w-full h-12 pl-12 pr-4 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
            <input
              className="w-full h-12 pl-12 pr-12 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
              type={visible ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                size={25}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setVisible(true)}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="mb-6 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full h-12 bg-blue-950 text-white rounded-md shadow-xl hover:bg-blue-800 transition-all duration-300"
            >
              <IoArrowForwardOutline size={20} className="inline mr-2" />
              Sign In
            </button>
            <button
              type="button"
              className="w-full h-12 bg-yellow-600 text-white rounded-md shadow-xl hover:bg-yellow-500 transition-all duration-300"
              onClick={handleGuest}
            >
              <MdPermContactCalendar size={20} className="inline mr-2" />
              Guest
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <span className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-950 font-semibold">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
