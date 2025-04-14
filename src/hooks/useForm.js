import React, { useState } from 'react';

export function useForm() {
  const [values, setValues] = useState({});
	console.log('%cvalues', 'color: purple', values)
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  return { values, handleChange, errors, isValid, setValues, setIsValid };
}
