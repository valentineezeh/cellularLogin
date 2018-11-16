import React from 'react';
import { Link } from 'react-router-dom';

const SocialLogin = () => (
    <div className="form__foot">
        <a href="http://localhost:8009/api/user/auth/google">
            <button
                className="social__login"
                type="button">
                Login with google
</button>
        </a>
    </div>
);

export default SocialLogin;