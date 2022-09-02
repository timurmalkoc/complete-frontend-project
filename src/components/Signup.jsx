import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    
    let navigate = useNavigate();

    
    const handleSubmit = async e => {

        e.preventDefault();
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            props.flashMessage('Your passwords do not match', 'danger')
        } else {

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            await fetch(`${props.base_url}/auth/users`, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                    } else {
                        props.flashMessage('You have successfully registered', 'success')
                        navigate('/')
                    }
                })
        }


    }

    return (
        <>
            <h4 className="text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type='text' className='form-control' placeholder='Enter Email' name='email' />
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password Again' name='confirmPass' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Register' />
                </div>
            </form>
        </>
    )
}