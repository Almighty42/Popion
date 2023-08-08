interface InputProps {
  text: string;
}

const Input = ({ text }: InputProps) => {
  return (
    <input placeholder={text} />
  );
}

export default Input;