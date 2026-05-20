import HbSLogo from './assets/holberton-logo.jpg'
import './App.css'

function App() {
  return (
    <>
      <div className='holberton-header'>
        <img src={HbSLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>

      <div className='holberton-body'>
        <p>Login to access the full dashboard</p>
      </div>

      <div className='holberton-footer'>
        <p>Copyright {new Date().getFullYear()} - holberton School</p>
      </div>
    </>
  )
}

export default App;