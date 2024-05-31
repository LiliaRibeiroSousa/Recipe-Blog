import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'


    
const SignupForm = () => {
    const [username, setUsername] = useState('');
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    /* const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }; */

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apiUrl = "https://salty-temple-86081-1a18659ec846.herokuapp.com/signup/";



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
		}else {
			return response.json()
		}
	})
	.then((data) => {
	console.log(data)
        if(data.token){
            localStorage.setItem('token', data.token)
            navigate('/')
        }else if(!username){
            setErrors({username: 'Username is required'})
        }else if(!password){
            setErrors({password: 'Password is required'})
        }

	})



        // console.log('Username:', username);
        //console.log('Email:', email);
        // console.log('Password:', password);
    };

   

    return (
        <div className='signUp'>
            <form className="signUpForm" onSubmit={handleSubmit}>
            <h2 className='signUpTitle'>Sign Up</h2>
            {errors.username && <p className='error'>{errors.username}</p>}
            {errors.password && <p className='error'>{errors.password}</p>}
            <label>
                Username:
                <input  type="text" value={username} onChange={handleUsernameChange} />
                <br />
            </label>
            
            <br />
            
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button onChange={handleSubmit} type="submit">Sign Up</button>
        </form>

        </div>
       
    );
};

export default SignupForm;