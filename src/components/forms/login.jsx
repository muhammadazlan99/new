import React, { useState } from "react";
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const [showPwd, setShowPwd] = useState(false);

  const handleDisplayPwd = () => {
    setShowPwd((prev) => !prev);
  }

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form data:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input {...register("email", { 
        required: "This field is required email",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email format"
        }
      })} type="email" />
      {errors.email ? <span>{errors.email.message}</span> : ""}

      <br/>

      <label>Firstname:</label>
      <input {...register("fname", { 
        required: "Name is required",
      })} type="text" />
      {errors.fname ? <span>{errors.fname.message}</span> : "" }

      <br/>

      <label>Password:</label>
      <input {...register("password", {
        required: "This field is required password",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters"
        },
        maxLength: {
          value: 20,
          message: "Password must not exceed 20 characters"
        }
      })} type={showPwd ? "text" : "password"} />
      {errors.password ? <span>{errors.password.message}</span> : ""}

      <br/>

      <label>Confirm Password:</label>
      <input {...register("cpassword", {
        validate: value => value === password || "Passwords do not match",
        required: "This field is required",
      })} type={showPwd ? "text" : "password"} />
      {errors.cpassword ? <span>{errors.cpassword.message}</span> : ""}

      <br/>

      <button type="button" onClick={handleDisplayPwd}>
        {showPwd ? "Hide Password" : "Show Password"}
      </button>

      <br/>
      <button type="submit" disabled={isSubmitting}>Login</button>
    </form>
  );
}

export default Login;
