import { useState } from 'react';

// Déclaration de la constante emailRegex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

function useLogin(onLogin) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onLogin(formData.email, formData.password);
  }

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setFormData({ email: newEmail, password: formData.password });
    setEnableSubmit(emailRegex.test(newEmail) && formData.password.length >= 8);
  }

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setFormData({ email: formData.email, password: newPassword });
    setEnableSubmit(newPassword.length >= 8 && emailRegex.test(formData.email));
  }
  return {email: formData.email,
    password: formData.password,
    enableSubmit: enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit};
}

export default useLogin;
