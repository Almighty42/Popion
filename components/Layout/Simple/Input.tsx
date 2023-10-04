// Other
import ReactTextareaAutosize from "react-textarea-autosize";

// Interface
interface InputProps {
  type: 'submit' | 'text' | 'email' | 'password',
  text: string;
  size: 'small' | 'regular' | 'large';
  border?: 'colored' | 'uncolored'
  icon?: JSX.Element;
  iconSide?: 'left' | 'right',
  value?: string,
  onChange?: (e: any) => void,
  required?: boolean,
  textarea?: boolean
}

const Input = ({ type, text, size, border, icon, iconSide, value, onChange, required = false, textarea = false }: InputProps) => {
  return (
    <>
      {textarea ?
        <div className={'input ' + size + ' ' + border + ' ' + textarea} >
          {iconSide == 'left' && icon}
          <ReactTextareaAutosize placeholder={text} value={value} onChange={onChange} required />
          {iconSide == 'right' && icon}
        </div>
        :
        <div className={'input ' + size + ' ' + border} >
          {iconSide == 'left' && icon}
          <input type={type} placeholder={text} value={value} onChange={onChange} required />
          {iconSide == 'right' && icon}
        </div>
      }
    </>
  );
}

export default Input;