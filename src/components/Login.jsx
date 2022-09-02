import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;

        let myHeaders = new Headers();
        myHeaders.set('Authorization', 'Basic ' + btoa(`${username}:${password}`))

        let response = await fetch(`${props.base_url}/auth/token`, {
            method:'POST',
            headers:myHeaders
        })
        if (response.ok){
            let data = await response.json();
            
            // Store the token and expiration in localStorage
            localStorage.setItem('token', data.token);

            // Change the loggedIn state to true
            props.login();
    
            // Flash success message and navigate back to home
            props.flashMessage('You have successfully logged in', 'success');
            navigate('/');
        } else {
            props.flashMessage('Your username and/or password are incorrect', 'danger');
        }


    }

    return (
        <>
            <h4 className="text-center">Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />
                    
                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />
                    
                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Login' />
                </div>
            </form>
        </>
    )
}