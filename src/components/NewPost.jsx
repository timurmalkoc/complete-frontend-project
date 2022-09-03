import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    
    let navigate = useNavigate();

    
    const handleSubmit = async e => {

        e.preventDefault();
        
        
            let myHeaders = new Headers();

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                title: e.target.title.value,
                content: e.target.content.value,
            })

            await fetch(`${props.base_url}/blog/posts`, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                    } else {
                        props.flashMessage('You have successfully created the post', 'success')
                        navigate('/')
                    }
                })
        }


    return (
        <>
            <h4 className="text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type='text' className='form-control' placeholder='Enter Title' name='title' />
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" name='content' id="floatingTextarea" placeholder='Enter Content'></textarea>
                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Post' />
                </div>
            </form>
        </>
    )
}