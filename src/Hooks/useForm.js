import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    if ( event.target.name == 'username' || event.target.name == 'password' || event.target.name == 'email' || event.target.name == 'confirmPassword'){
      setValues({ ...values, [event.target.name]: event.target.value });
    } else {
      setValues({ ...values, body: event.target.value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};