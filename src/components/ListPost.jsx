import React, { useState, useEffect } from 'react'
import Card from './Card';

export default function ListPosts(props){

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${props.base_url}/blog/posts`)
        .then(res => res.json())
        .then(post => setData(post))
    }, [])

    return (
        <>
            <h1 className='text-center mt-4'>Posts</h1>
            <div className='row mt-5'>
                {data.map((post, idx) => <Card body={post["content"]} title={post["title"]} author={post["author"]["username"]} 
                created={post["author"]["date_created"]} id={post["id"]} key={idx} />)}
            </div>
        </>
    )
}
