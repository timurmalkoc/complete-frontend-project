import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CardUpdate from './CardUpdate';

export default function ListPosts(props){
    const { postId } = useParams();
    const [ data, setData ] = useState(null);
    

    useEffect(() => {
    
        async function getData() {
            await fetch(`${props.base_url}/blog/posts/${postId}`)
            .then(res => res.json())
            .then(post => {setData(post) })
        }
        getData()
    }, [postId])

    return (
        <>
            <h1 className='text-center mt-4'>Post Edit</h1>
            <div className='row mt-5'>
                {data ? <CardUpdate flashMessage={props.flashMessage} body={data.content} title={data.title} author={data.author.username} 
                created={data.author.date_created} id={data.id} postId={postId} base_url={props.base_url}/> : null}
            </div>
        </>
    )
}