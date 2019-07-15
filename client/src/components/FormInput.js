import React  from "react";
import SvgIcon from "./SvgIcon";

function FormInput(props) {
    const { fieldName, type, required, handler,minmax = [] } = props;
    console.log(minmax);
    const formPrefix = "fe";
    console.log(formPrefix + fieldName);
    return (
      <div className="field">
        <label htmlFor={formPrefix + fieldName}>
          {fieldName} {required && "*"}
        </label>
        <div className="input">
          <span>
            <SvgIcon name={formPrefix + fieldName} />
          </span>
          <input
            type={type}
            id={formPrefix + fieldName}
            placeholder={fieldName}
            autoComplete={fieldName}
            required={required && "true"}
            onChange={handler}
            min={minmax[0]}
            max={minmax[1]}
          />
          <label></label>
        </div>
      </div>
    );
  }

  export default FormInput;