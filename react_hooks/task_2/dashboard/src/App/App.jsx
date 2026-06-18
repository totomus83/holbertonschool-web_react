import { Component, Fragment } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import newContext from '../Context/context';

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
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      notifications: notificationsList,
      courses: coursesList,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  };

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter((notif) => notif.id !== id),
    }));
  };

  render() {
    const { displayDrawer, user, notifications, courses } = this.state;

    return (
      <newContext.Provider value={{ user, logOut: this.logOut }}>
        <Fragment>
          <Header
            notifications={notifications}
            displayDrawer={displayDrawer}
          />

          <div className="flex min-h-screen max-[912px]:flex-col">
            <div className="flex-1 max-[912px]:w-full">
              {user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList courses={courses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login
                    logIn={this.logIn}
                    email={user.email}
                    password={user.password}
                  />
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

            <Notifications
              notifications={notifications}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
              markNotificationAsRead={this.markNotificationAsRead}
            />
          </div>

          <Footer />
        </Fragment>
      </newContext.Provider>
    );
  }
}

export default App;