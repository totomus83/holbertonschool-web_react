import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="login">
      <p>Login to access the full dashboard</p>
      <div className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="button">OK</button>
      </div>
    </div>
  );
}

export default WithLogging(Login);