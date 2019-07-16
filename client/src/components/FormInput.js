import React  from "react";
import SvgIcon from "./SvgIcon";

function FormInput(props) {
    const { fieldName, type, required, handler,minmax = [],pattern, value } = props;
    const formPrefix = "fe";
    
    return (
      <div className="field">
        <label htmlFor={formPrefix + fieldName}>
          {fieldName} {required && "*"}
        </label>
        <div className="input">         
          <input
            type={type}
            id={formPrefix + fieldName}
            placeholder={fieldName}
            autoComplete={fieldName}
            required={required && true}
            onChange={handler}
            pattern={pattern}
            min={minmax[0]}
            max={minmax[1]}
            defaultValue={value}
          />
          <span>
            <SvgIcon name={formPrefix + fieldName} />
          </span>          
        </div>
      </div>
    );
  }

  export default FormInput;