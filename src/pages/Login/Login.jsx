import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import './Login.css'
import { connect } from 'react-redux';
import { loginUserGoogle, loginUserFacebook } from '../../redux/actions/user';

import Facebook from '../../assets/images/facebook.png';

class Login extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.props.history.push('/');
        }
    }

    render() {
        console.log("login");
        return(
            <div className="login-page">
                <Link to='/'>
                    <img src={Logo} alt="logo_login" className="mb-5"/>
                </Link>

                <h1 className="h2 p-5">Login</h1>
                <div className="btn-group-vertical">
                <button
                        className="btn btn-outline-dark d-flex align-items-center"
                        onClick={() => this.props.signInWithGoogle()}
                    >
                        <Google className="w-50 mr-3"/>
                        <span className="text-nowrap"> Login with Google </span>
                    </button>
            
                    <button
                        className="btn btn-outline-dark d-flex align-items-center"
                        onClick={() => this.props.signInWithFacebook()}
                    >
                        <Facebook className="w-50 mr-3"/>
                        <span className="text-nowrap">Login with Facebook</span>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: () => dispatch(loginUserGoogle()),
        signInWithFacebook:  () => dispatch(loginUserFacebook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);