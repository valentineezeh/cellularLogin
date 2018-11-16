import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import swal from 'sweetalert';
import { socialLoginAction } from '../../actions/SocialLoginAction';

/**
 * @description handles social login
 * @returns {*} jsx
 *
 */
class SocialLoginContainer extends React.Component {
    /**
           *
           * @param {object} props
           */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     *@description comfirms a user and redirects
     *@returns {*} obj
     */
    componentDidMount() {
        const { history, match, social } = this.props;
        const { code } = parse(history.location.search);
        const { socialLogin } = match.params;
        if (!code) return undefined;
        social(code, socialLogin).then((response) => {
            const { message } = response.data;
            if (response && (response.status === 200 || response.status === 201)) {
                swal(message);
                return history.push('/home/auth');
            }
            return history.push('/');
        }).catch(error => error);
    }
    render() {
        return (
            <div>
                <div class="loader">
                </div>
            </div>
        )
    }
}

SocialLoginContainer.propTypes = {
    match: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    social: PropTypes.func.isRequired,
};

const matchStateToProps = state => ({
    user: state.socialLoginReducer.user,
    error: state.socialLoginReducer.error,
});

const mapDistpatchToProps = dispatch => ({
    social: (code, socialLoginProv) => dispatch(socialLoginAction(code, socialLoginProv)),
});

export default withRouter(connect(matchStateToProps, mapDistpatchToProps)(SocialLoginContainer));