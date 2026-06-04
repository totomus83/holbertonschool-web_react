import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body text-justify flex-1 border-b-2 border-(--main-color)">
      <p className="ml-4">Login to access the full dashboard</p>
      <div className="login-form flex items-center ml-2">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className="ml-2" />
        <label htmlFor="password" className="ml-2">Password</label>
        <input type="password" id="password" name="password" className="ml-2" />
        <button type="button" className="ml-4">OK</button>
      </div>
    </div>
  );
}

export default WithLogging(Login);