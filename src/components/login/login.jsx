import React, { PureComponent } from 'react';
import LoginForm from './loginForm';
import './login.css';

class LoginPage extends PureComponent {
  render() {
    return (
      <div className="App">
        <div className="App-Layout">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
