import { Component } from 'react';
import WithLogging from '../HOC/WithLogging';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Login extends Component {
  constructor(props) {
    super(props);
    const { email = '', password = '' } = props;
    this.state = {
      email,
      password,
      enableSubmit: false,
    };
  }

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({ email }, this.validateForm);
  };

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({ password }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length >= 8;
    this.setState({ enableSubmit: isEmailValid && isPasswordValid });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { logIn = () => {} } = this.props;
    logIn(email, password);
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body text-justify flex-1 border-b-2 border-[var(--main-color)]">

        <p className="ml-4">Login to access the full dashboard</p>

        <form
          className="login-form flex items-center ml-2 gap-2 max-[520px]:flex-col max-[520px]:items-start"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
            className="ml-2 border border-gray-400 px-2 py-1 rounded w-[180px] max-[520px]:w-full"
          />

          <label htmlFor="password" className="ml-2 max-[520px]:ml-0">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
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
}

export default WithLogging(Login);