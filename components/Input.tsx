interface InputProps {
  type: 'submit' | 'text' | 'email' | 'password',
  text: string;
  size: 'small' | 'regular' | 'large';
  border?: 'colored' | 'uncolored'
  icon?: JSX.Element;
}

const Input = ({ type, text, size, border, icon }: InputProps) => {
  return (
    <div className={'inputBody ' + size + ' ' + border} >
      <input type={type} placeholder={text} />
      {icon}
    </div>
  );
}

export default Input;