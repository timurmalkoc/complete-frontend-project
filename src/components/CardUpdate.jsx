import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardUpdate(props) {
  let navigate = useNavigate();

const delete_post = async () => {
    let myHeaders = new Headers();

    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    myHeaders.append('Content-Type', 'application/json');

    await fetch(`${props.base_url}/blog/posts/${props.postId}`, {
        method: 'DELETE',
        headers: myHeaders,
        })
        .then(res =>{ 
          if(res.ok)
          res.json()
          else
          throw new Error("Unauthorized Access")
        })
        .catch( (error, props) => {
            console.error(error)
            props.flashMessage("Unauthorized Access", 'danger')
            navigate('/')
        })

        props.flashMessage('The post has been deleted ', 'success')
                navigate('/')
}

const home = () => {
  navigate('/')
}

  return (
    <div className='col-12'>
        <div className='card mb-3'>
            <div className="card-body">
                <h5 className="card-title"><a href={"/singlepost/"+props.id}>{props.title}</a></h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
                <p className="card-title">{props.body}</p>
                <p className="list-group-item">Created: {(new Date(props.created)).toDateString()}</p>
                {/* ============== Edit Delete ============= */}
                <button type="button" className="btn btn-primary ms-3 me-5 ">Update</button>
                <button type="button" className="btn btn-danger w-30" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Post</button>
                {/* =================== Modal ============== */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteModalLabel">Delete Post</h5>
                          <button type="button"className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Are you sure to delete ?</div>
                        <div className="modal-footer">
                          <button type="button"  onClick={home} className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                          <a onClick={delete_post} className="btn btn-danger">Delete</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
  )
}