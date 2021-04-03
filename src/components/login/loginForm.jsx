import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.css';
import { userLogin } from '../../redux/actions';

function mapDispatchToProps(dispatch) {
    return {
        userLoginAction: credentials => dispatch(userLogin(credentials))
    };
}

const mapStateToProps = state => {
    return {
        loginResponse: state.loginResponse
    };
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginSuccess: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.persist();
        this.setState({ loginSuccess: '' })
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = () => {
        const { userLoginAction } = this.props;
        const { email, password } = this.state;
        userLoginAction({ email, password }).then(() => {
            const { loginResponse } = this.props;
            if (loginResponse.status === 1) {
                this.setState({ loginSuccess: 'Success' })
            }
            else {
                this.setState({ loginSuccess: 'Error' })
            }
            console.log('loginResponse', loginResponse)
        });
    }


    render() {
        const {
            email,
            password,
            passwordType,
            loginSuccess
        } = this.state;

        if (loginSuccess === 'Success') {
            return <Redirect to="/Dashboard" />;
        }
        return (
            <div>
                <Form>
                    <Form.Group
                        style={{ marginLeft: '1%' }}
                        controlId="email"
                        className="input-with-icon"
                    >
                        <Form.Control
                            className="form-control"
                            name="username"
                            type="text"
                            placeholder="User Name"
                            value={email}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted" />
                    </Form.Group>
                    <Form.Group
                        style={{ marginLeft: '1%' }}
                        controlId="password"
                        className="input-with-icon"
                    >
                        <Form.Control
                            className="form-control"
                            name="password "
                            type={passwordType}
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                    </Form.Group>
                    {loginSuccess === 'Error' && (
                        <p className="errorMsg">Invalid email   or password .</p>
                    )}
                    <Button
                        className="btn btn-primary btn-fill btn-wd"
                        onClick={() => this.handleSubmit()}
                        id="login"
                        type="button"
                    >
                        Login
                   </Button>
                </Form>
            </div>
        );
    }
}

const Login = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);

export default Login;
