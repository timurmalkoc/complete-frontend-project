import Navbar from "./components/Navbar";
import AlertMessage from "./components/AlertMessage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ListPosts from "./components/ListPost";
import NewPost from "./components/NewPost";
import SinglePost from "./components/SinglePost";
import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';


function App(props) {
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token')) ? true:false)
    const base_url = "https://kekambas-blog.herokuapp.com"

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category);
    }

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false)
    }
  return (
    <>
      <Navbar logout={logout} loggedIn={loggedIn}/>
        <div className="container">
          {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
          <Routes>
            <Route path="/" element={<ListPosts base_url={base_url} />}/>
            <Route path="/login" element={<Login flashMessage={flashMessage} base_url={base_url} login={login}/>}/>  
            <Route path="/signup" element={<Signup flashMessage={flashMessage} base_url={base_url} login={login}/>}/> 
            <Route path='/newpost' element={<NewPost flashMessage={flashMessage} base_url={base_url} login={loggedIn}/>} />
            <Route path='/singlepost/:postId' element={<SinglePost flashMessage={flashMessage} base_url={base_url} login={loggedIn}/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
