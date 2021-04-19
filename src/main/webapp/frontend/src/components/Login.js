import {login} from '../services/authService';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successful, setSuccessful] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        if (e.target.value) {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setPasswordError('');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!username) setUsernameError('Username field can\'t be empty!');
        if (!password) setPasswordError('Password field can\'t be empty!');
        
        if (!usernameError.length && !passwordError.length && username.length && password.length) {
            setLoading(true);
            login(username, password)
            .then(
                () => {
                    setLoading(false);
                    setSuccessful(true);
                    setMessage('Login successful!');
                    setTimeout(() => {
                        history.push("/")
                        window.location.reload();
                    }, 500);
                },
                error => {
                    const resMessage = 
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            
                    setLoading(false);
                    setSuccessful(false);
                    setMessage(resMessage);
                }
            )
        }
    }

    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">
                    Your data is safe with Recipe Book, or maybe not.
                </div>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="my-1">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputUsername" 
                            placeholder="Your cool username..."
                            onChange={handleUsernameChange}
                            value={username}/>

                        {usernameError.length > 0 &&
                            <span className='error'>{usernameError}</span>
                        }
                    </div>

                    <div className="form-group my-2">
                        <label className="my-1">Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            id="inputPassword" 
                            placeholder="Your secure password..."
                            onChange={handlePasswordChange}
                            value={password}/>
                        
                        {passwordError.length > 0 &&
                            <span className='error'>{passwordError}</span>
                        }
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary" disabled={loading}>Login!</button>
                    </form>

                    {message.length > 0 && ( successful
                        ?
                            (
                            <div className="alert alert-success my-3" role="alert">
                                <p>{message}</p>
                            </div>
                            )
                        :   
                            (
                            <div className="alert alert-danger my-3" role="alert">
                                <p>{message}</p>
                            </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;