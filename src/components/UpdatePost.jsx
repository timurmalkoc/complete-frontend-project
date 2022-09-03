import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePost(props) {
    
    let navigate = useNavigate();
    const { postId } = useParams();
    const [ data, setData ] = useState(null);

    useEffect(() => {
    
        async function getData() {
            await fetch(`${props.base_url}/blog/posts/${postId}`)
            .then(res => res.json())
            .then(post => {setData(post.content) })
        }
        getData()
    }, [postId])

    const handleSubmit = async e => {

        e.preventDefault();
        
        
            let myHeaders = new Headers();

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                content: e.target.content.value,
            })

            await fetch(`${props.base_url}/blog/posts/${postId}`, {
                method: 'PUT',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                        props.flashMessage("Unauthorized Access ! The changes have't been saved", 'danger')
                        navigate('/')
                    } else {
                        props.flashMessage('You have successfully updated the post', 'success')
                        navigate('/')
                    }
                })
        }

        const handleMessageChange = e =>{
            setData(e.target.value)
        }


    return (
        <>
            <h4 className="text-center">Update Post</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <br></br>
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" name='content' id="floatingTextarea" value={data ? data : null} onChange={handleMessageChange}></textarea>
                    <input type='submit' className='btn btn-primary w-100 mt-3' />
                </div>
            </form>
        </>
    )
}