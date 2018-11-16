import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLoginRequest, deleteErrorMessageSuccess } from "../actions/LoginAction";
import { socialLoginSubmit } from '../actions/SocialLoginAction';
import TextField from './TextField';
import validateInput from "../middleware/userInputValidation";
import AlertNotification from './AlertNotification';
import SocialLogin from './socialLogin/SocialLogin';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            done: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onChange(event) {
        if (this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    handleDelete() {
        this.props.deleteErrorMessageSuccess()
    }

    isValid() {
        // eslint-disable-next-line no-undef
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props
                .userLoginRequest(this.state)
                .then(() => {
                    this.setState({ done: true });
                })
        }
    }
    render() {
        const { auth } = this.props;
        if (auth) {
            return <Redirect to="/home/auth" />;
        }
        const { errors, email, password, isLoading } = this.state;

        const { error } = this.props; // eslint-disable-line

        const form = (
            <div id="wrapper" className="clear">
                <div className="left">
                    <img src="images/download.jpg" alt="Ezecellular" />
                </div>
                <div className="right">
                    <div className="content">
                        <div className="form_head">
                            <h3>
                                Member Login
                            </h3>
                        </div>
                        <form>
                            {
                                (error && error.message) ? (
                                    <AlertNotification
                                        errors={error.message}
                                        onClick={this.handleDelete}
                                    />
                                ) : ''
                            }
                            <div className="input__group">
                                <TextField
                                    error={errors.email}
                                    type="email" required name="email"
                                    field="email"
                                    onChange={this.onChange}
                                    value={email}
                                    placeholder="Email" />
                                <span className="input__group__icon">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                            <div className="input__group">
                                <TextField
                                    error={errors.password}
                                    type="password" required
                                    onChange={this.onChange}
                                    value={password}
                                    field='password'
                                    name="password" placeholder="Password" />
                                <span className="input__group__icon">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <div className="input__group">
                                <button
                                    type="submit"
                                    onClick={this.onSubmit}
                                    name="login">Login</button>
                            </div>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
            </div>

        );
        return <div>{form}</div>;
    }
}

LoginForm.propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
    deleteErrorMessageSuccess: PropTypes.func.isRequired,
    socialLoginSubmit: PropTypes.func.isRequired,
};



const mapStateToProps = state => ({
    error: state.auth.error,
    auth: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, { userLoginRequest, deleteErrorMessageSuccess, socialLoginSubmit })((LoginForm));