import React from 'react'

export default function Card(props) {
  return (
    <div className='col-12 col-sm-8 col-md-6 col-lg-3'>
        <div className='card mb-3'>
            <div className="card-body">
                <h5 className="card-title"><a href={"/singlepost/"+props.id}>{props.title}</a></h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
                <p className="card-title">{props.body}</p>
                <p className="list-group-item">Created: {(new Date(props.created)).toDateString()}</p>
            </div>
        </div>
    </div>
  )
}