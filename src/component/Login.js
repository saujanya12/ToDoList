import { useState } from 'react'
import { Redirect } from 'react-router';
import config from '../config';
import '../css/Login.css'
import useToken from './Token/useToken';

export default function Login(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const { token, setToken } = useToken();
    const [errMsg, setErrMsg] = useState('');
    // const url = "http://todolistsapi.herokuapp.com"

    // Login
    const login = async (credential) => {
        const token = await fetch(`${config.baseURL}/auth`, {
            method: 'POST'
            , headers: { 'content-type': 'application/json' }
            , body: JSON.stringify(credential)
        });

        const data = await token.json();
        if (data.code === undefined) {
            setToken(data);
            setErrMsg(null);
            setRedirect(true);
        }
        else {
            setErrMsg('Wrong UserName/Password');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (userName === '' | password === '') {
            setErrMsg('Please enter credentials');
        }
        else {
            login({ 'name': `${userName}`, 'password': `${password}` });
        }
        setUserName('');
        setPassword('');
    }

    if (redirect === true) {
        return <Redirect to={{ pathname: '/' }} />
    }
    else
        return (
            <div className="contents">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-12">
                            <div className="form-block mx-auto">
                                <div className="text-center mb-5">
                                    <h3 className="text-uppercase">Login</h3>
                                </div>

                                <form onSubmit={onSubmit} >
                                    <div className="form-group first">
                                        <label htmlFor="username">Username</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Your Name (admin)"
                                            id="username"
                                            value={userName}
                                            onChange={(e) => { setUserName(e.target.value); }} />
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                            className="form-control"
                                            placeholder="Your Password (admin)"
                                            id="password"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); }} />
                                    </div>

                                    <div className="form-group last mb-3">
                                        <span style={{ color: 'red' }} role="alert">{errMsg ? errMsg : null}</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-5">
                                        <span className="ml-auto"><a href="asds" className="forgot-pass">Forgot Password</a></span>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <input type="submit" value="Log In" className="btn btn-block py-2 btn-primary" />
                                        <input type="button" value="Register " className="btn btn-block py-2 btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
