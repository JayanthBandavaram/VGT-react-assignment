import { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    ID: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitData, setSubmitData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitData(formValues);
      setFormValues(initialValues);
      setShowPassword(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex =
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email))
      errors.email = "Invalid email address";

    if (!values.ID) errors.ID = "ID is required";
    if (!values.password) errors.password = "Password is required";

    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Form Handling & Password Toggle </h2>

        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <p className="error">{errors.name}</p>
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p className="error">{errors.email}</p>
        </div>

        <div className="field">
          <label>ID</label>
          <input
            type="text"
            name="ID"
            value={formValues.ID}
            onChange={handleChange}
          />
          <p className="error">{errors.ID}</p>
        </div>

        <div className="field">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="error">{errors.password}</p>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {submitData && (
        <div className="result">
          <h3>Captured Data</h3>
          <p><strong>Name:</strong> {submitData.name}</p>
          <p><strong>Email:</strong> {submitData.email}</p>
          <p><strong>ID:</strong> {submitData.ID}</p>
          <p>
            <strong>Password:</strong>{" "}
            {"*".repeat(submitData.password.length)}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
