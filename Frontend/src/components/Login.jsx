import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/userSlice";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      const user = res.user;
      console.log(user);
      
      dispatch(updateProfile(user));
      
      setApiError("");
      
    localStorage.setItem("user", JSON.stringify(user));
      navigate("/notes");
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {apiError && <p className="error-message">{apiError}</p>}

      <form onSubmit={handleSubmit(login)}>
        <Input
          label="Email :"
          placeholder="Enter your email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <Input
          label="Password :"
          placeholder="Enter your password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
};

export default Login;