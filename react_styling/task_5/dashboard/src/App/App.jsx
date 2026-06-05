import { Component, Fragment } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      const { logOut = () => {} } = this.props;
      logOut();
    }
  };

  render() {
    const { isLoggedIn = false } = this.props;

    return (
      <Fragment>
        <Header />

        <div className="flex min-h-screen max-[912px]:flex-col">
          <div className="flex-1 max-[912px]:w-full">
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            )}

            <BodySection title="News from the School">
              <p>
                Holberton School News goes here ipsum Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Similique, asperiores architecto
                blanditiis fuga doloribus sit illum aliquid ea distinctio minus
                accusantium, impedit quo voluptatibus ut magni dicta. Recusandae,
                quia dicta?
              </p>
            </BodySection>
          </div>

          <Notifications notifications={notificationsList} />
        </div>

        <Footer />
      </Fragment>
    );
  }
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

export default App;