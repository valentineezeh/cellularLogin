import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AuthLandingPage from '../components/AuthLandingPage';
import requiredAuth from '../utils/requiredAuth.js';
import '../css/style.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div>
                    <Route exact path='/' component={LoginForm} />
                    <Route exact path='/home/auth' component={requiredAuth(AuthLandingPage)} />
                </div>
            </div>
        );
    }
}
export default App