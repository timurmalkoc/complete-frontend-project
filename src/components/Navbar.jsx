import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'

export default function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    {/* ================= User Login Check to hide or show some links ===================== */}
                    {!props.loggedIn ? 
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/Signup">Sign Up</Link>  
                    </>
                    :
                    <>
                        <Link className='nav-link' to='/newpost'>New Post</Link>
                        <Link className="nav-link" to="/" onClick={props.logout}>Logout</Link>
                    </>}
                </div>
                </div>
            </div>
        </nav>
    )
}