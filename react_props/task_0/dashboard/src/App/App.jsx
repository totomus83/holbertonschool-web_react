import { Fragment } from 'react';
import './App.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import LoginForm from '../Login/Login.jsx';
import Notifications from '../Notifications/Notifications.jsx';

function App() {
  return (
    <Fragment>
      <div className="root-notifications">
        <Notifications/>
      </div>
      <Header/>
      <LoginForm/>
      <Footer/>
    </Fragment>
  )
}

export default App