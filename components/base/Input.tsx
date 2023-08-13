// Interface
interface InputProps {
  type: 'submit' | 'text' | 'email' | 'password',
  text: string;
  size: 'small' | 'regular' | 'large';
  border?: 'colored' | 'uncolored'
  icon?: JSX.Element;
  iconSide?: 'left' | 'right'
}

const Input = ({ type, text, size, border, icon, iconSide }: InputProps) => {
  return (
    <div className={'input ' + size + ' ' + border} >
      {iconSide == 'left' && icon}
      <input type={type} placeholder={text} />
      {iconSide == 'right' && icon}
    </div>
  );
}

export default Input;