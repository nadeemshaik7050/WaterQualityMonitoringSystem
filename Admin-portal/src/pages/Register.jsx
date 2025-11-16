import { useState } from "react";
import { registerUserWithRole } from "../api/register";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "wqm-user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Registering user...");

    try {
      await registerUserWithRole(
        {
          username: form.username,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
        },
        form.role
      );

      toast.success("Registration successful!", { id: toastId });

      // optional redirect
      // window.location.href =
      //   "http://localhost:8080/realms/WaterQualityMonitoring/protocol/openid-connect/auth?client_id=water-quality-client&response_type=code";
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed!", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <select
          name="role"
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="wqm-user">User</option>
          <option value="wqm-admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
