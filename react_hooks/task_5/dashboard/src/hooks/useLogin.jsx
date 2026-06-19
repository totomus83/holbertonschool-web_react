import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function useLogin(onLogin) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));
    setEnableSubmit(EMAIL_REGEX.test(email) && formData.password.length >= 8);
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({ ...prev, password }));
    setEnableSubmit(EMAIL_REGEX.test(formData.email) && password.length >= 8);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;