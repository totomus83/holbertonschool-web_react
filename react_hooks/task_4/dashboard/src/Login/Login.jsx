import { useState } from 'react';
import WithLogging from '../HOC/WithLogging';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

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
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body text-justify flex-1 border-b-2 border-[var(--main-color)]">
      <p className="ml-4">Login to access the full dashboard</p>
      <form
        className="login-form flex items-center ml-2 gap-2 max-[520px]:flex-col max-[520px]:items-start"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeEmail}
          className="ml-2 border border-gray-400 px-2 py-1 rounded w-[180px] max-[520px]:w-full"
        />
        <label htmlFor="password" className="ml-2 max-[520px]:ml-0">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
          className="ml-2 border border-gray-400 px-2 py-1 rounded w-[180px] max-[520px]:w-full"
        />
        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="ml-4 border border-gray-600 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 max-[520px]:ml-0 max-[520px]:w-full disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}

export default WithLogging(Login);