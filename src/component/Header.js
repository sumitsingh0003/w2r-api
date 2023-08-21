import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom" 
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [login, setLogin] = useState(localStorage.getItem('token'));
  
  useEffect(()=>{
    setLogin(localStorage.getItem('token'));
    // eslint-disable-next-line
  },[localStorage])


  const logOut = async() =>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('https://login-api.web2rise.in/api/logout', {}, {
        headers: {
          Authorization: token, 
          'Content-Type': 'application/json',
        },
      })

      if (response.data.message === "Logout successful") {
        localStorage.removeItem("token");
        navigate('/');
      }
    } catch (error) {
      console.error(error); 
    }
  }

  return (
    <>
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
          <Link className="navbar-brand" to="/">Navbar</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-users">
                  All Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-user">
                  Register Users
                </Link>
              </li>
              {localStorage.getItem('token') ?  <li className="nav-item">
                <Link className="nav-link" to="#." onClick={logOut}>
                  Log Out
                </Link>
              </li> : ''}
             
            </ul>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;
