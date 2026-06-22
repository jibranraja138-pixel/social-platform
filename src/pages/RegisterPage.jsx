import { useState } from "react";
import { registerSchema } from "../schemas/authSchemas";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await registerSchema.validate(form);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className="container"
      onSubmit={submitHandler}
    >
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value
          })
        }
      />

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

      <button>Register</button>
    </form>
  );
}

export default RegisterPage;