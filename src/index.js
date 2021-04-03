import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import { store } from '../src/redux/store/index'
import './index.css';
import { Navbar } from 'react-bootstrap';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          {' '}
            Admin {' '}
        </Navbar.Brand>
      </Navbar>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
