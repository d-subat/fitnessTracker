import React  from "react";
import SvgIcon from "./SvgIcon";


const FormInput = React.forwardRef((props, ref) => {
    const { fieldName, type, required, handler,minmax = [],pattern, value,placeholder,onBlur } = props;
    const formPrefix = "fe";

    return (
      <div className="field">
        <label htmlFor={formPrefix + fieldName}>
          {fieldName} {required && "*"}
        </label>
        <div className="input">         
          <input
            type={type}
            ref={ref}
            onBlur={onBlur}
            id={formPrefix + fieldName}
            placeholder={placeholder? placeholder:fieldName}
            autoComplete={fieldName}
            required={required && true}
            onChange={handler}
            pattern={pattern}
            min={minmax[0]}
            max={minmax[1]}
            value={value}          />
          <span>
            <SvgIcon name={formPrefix + fieldName} />
          </span> 
          
        </div>
      </div>
    );
})

  export default FormInput;