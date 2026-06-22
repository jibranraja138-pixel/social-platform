import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../schemas/authSchemas";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(form);

      login(form.email);

      navigate("/feed");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className="container"
      onSubmit={submitHandler}
    >
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value
          })
        }
      />

      <button>Login</button>
    </form>
  );
}

export default LoginPage;