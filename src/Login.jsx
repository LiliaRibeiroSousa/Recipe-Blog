import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'; // Import the useLocalStorage hook

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [setToken, _] = useLocalStorage('authToken', ''); // Use the useLocalStorage hook

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here

        const apiUrl = "https://salty-temple-86081-1a18659ec846.herokuapp.com/login/";

        fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
          })
        })
       .then((response) => {
            if(response.status === 403){
                console.log(response)
            } else {
                return response.json()
            }
        })
       .then((data) => {
            console.log(data)
            // Store the token in localStorage
            setToken(data.token); // Assuming the token is returned in the response
            navigate('/');
        })
       .catch((error) => {
            console.error('Login failed', error);
        });

        console.log('Username:', username);
        console.log('Password:', password);
    }

    return (
        <div className='loginForm'>
            <h2 className='loginTitle'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;