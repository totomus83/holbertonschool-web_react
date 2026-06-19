import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';

function Login({ logIn }) {

  const {email, password, enableSubmit, handleChangeEmail, handleChangePassword, handleLoginSubmit} = useLogin(logIn);

  return (
    <div className='App-body flex-1 text-justify border-t border-t-[2.5px] border-t-[var(--main-color)]'>
      <p className='ml-4 mt-4 mb-4'>Login to access the full dashboard</p>

      <form className='md:flex md:flex-row md:items-center' onSubmit={handleLoginSubmit} >
        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="email">Email</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
            type="email" name="email" id="email" onChange={handleChangeEmail} value={email} />
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="password">Password</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
            type="password" name="password" id="password" onChange={handleChangePassword} value={password} />
        </div>

        <input type='submit' disabled={!enableSubmit} value={'OK'}
          className={`mt-2 md:mt-0 ml-4 border border-black px-2 cursor-pointer rounded ${enableSubmit ? 'opacity-100' : 'opacity-50'}`} />
      </form>
    </div>
  )
}

Login.defaultProps = {
  logIn: () => {}
}


const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
