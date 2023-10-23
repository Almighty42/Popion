// Types
import { InputProps } from "./SimpleInterface";
// Other
import ReactTextareaAutosize from "react-textarea-autosize";

const Input = ({ 
  type, 
  text, 
  size, 
  border, 
  icon, 
  iconSide, 
  value, 
  onChange, 
  required = false, 
  textarea = false,
  inputRef
}: InputProps) => {
  return (
    <>
      {textarea ?
        <div className={'input ' + size + ' ' + border + ' ' + textarea} >
          {iconSide == 'left' && icon}
          <ReactTextareaAutosize placeholder={text} value={value} onChange={onChange} required={required} />
          {iconSide == 'right' && icon}
        </div>
        :
        <div className={'input ' + size + ' ' + border} >
          {iconSide == 'left' && icon}
          <input ref={inputRef} type={type} placeholder={text} value={value} onChange={onChange} required={required} />
          {iconSide == 'right' && icon}
        </div>
      }
    </>
  );
}

export default Input;