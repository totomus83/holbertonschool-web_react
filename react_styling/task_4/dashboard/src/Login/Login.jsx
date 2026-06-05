import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body text-justify flex-1 border-b-2 border-[var(--main-color)]">

      <p className="ml-4">Login to access the full dashboard</p>

      <div className="login-form flex items-center ml-2 gap-2 max-[520px]:flex-col max-[520px]:items-start">

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="ml-2 border border-gray-400 px-2 py-1 rounded w-[180px] max-[520px]:w-full"
        />

        <label htmlFor="password" className="ml-2 max-[520px]:ml-0">
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          className="ml-2 border border-gray-400 px-2 py-1 rounded w-[180px] max-[520px]:w-full"
        />

        <button
          type="button"
          className="ml-4 border border-gray-600 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 max-[520px]:ml-0 max-[520px]:w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default WithLogging(Login);