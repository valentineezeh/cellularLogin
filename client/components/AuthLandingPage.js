import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/LoginAction'
import swal from 'sweetalert';

class AuthLandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(event) {
        event.preventDefault();
        this.props.logout();
        location.href = "/";
        swal('Good Bye! Come again soon.');
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Welcome Authenticated User</h3>
                </div>
                <div className="input__group">
                    <button
                        type="submit"
                        onClick={this.logout}
                        name="login">Logout</button>
                </div>
            </div>
        )
    }
}

AuthLandingPage.propTypes = {
    logout: PropTypes.func.isRequired,
}

AuthLandingPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { logout })(withRouter(AuthLandingPage));