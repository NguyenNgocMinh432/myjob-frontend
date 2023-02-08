import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { validateInput } from "./Validator";

function InputFormCV({
  label,
  value,
  type,
  validators,
  onChange,
  placeholder,
  helpText,
}) {
  const [error, setError] = useState(false);
  const HangdelOnChange = (e) => {
    const { value } = e.target;
    setError(validateInput(validators, value));
    onChange(value);
  };
  return (
    <div class="form-group">
      <label for="">{label}</label>
      <input
        type={type}
        class="form-control"
        value={value}
        onChange={HangdelOnChange}
        aria-describedby="helpId"
        placeholder={placeholder}
      />
      <small id="helpId" class="form-text text-muted">
        {helpText}
      </small>
      <br />
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}

InputFormCV.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validators: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};
InputFormCV.defaultProps = {
  value: "",
  label: "",
  placeholder: "",
  validators: [],
  type: "text",
};

export default InputFormCV;
