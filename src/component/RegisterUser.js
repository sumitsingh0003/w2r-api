import React,{useState, useEffect} from 'react'
import ThanksMsg from '../img/success.gif'
import {useNavigate} from "react-router-dom" 
import Cookies from 'js-cookie';
import axios from "axios";

const RegisterUser = () => {
  const navigate = useNavigate()
  const [handleInput, setHandleInput] = useState({ name:"",email:"", password:""});
  const [state, setstate] = useState(false);

  const handleField = (e) =>{
    setHandleInput({...handleInput, [e.target.name]:e.target.value})
  }
  
  const submtForm = async (e) =>{
    e.preventDefault();
    const token = Cookies.get('token');
    try {
      const response = await axios.post('https://login-api.web2rise.in/api/create-user', handleInput, {
          headers: {
            Authorization: token, 
            'Content-Type': 'application/json',
          },
        }
      );
      if(response.data.message==='user added successfully'){
        setHandleInput({ username:"", password:""})
        setstate(true)
        navigationPage()
      }        
        setstate(true);
      } catch (error) {
        console.error(error); 
      }

    }


  const navigationPage = () => {
    setTimeout(() => {
      navigate('/all-users');
      setstate(true)
    }, 2000);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate('/');
      }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="adminLogin h-100" style={{backgroundColor: "#9A616D"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: "1rem"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block" style={{overflow: "hidden"}}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{borderRadius: "15px 0px 0px 15px"}}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form >
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{color: "#ff6219"}}
                          ></i>
                          <span className="h1 fw-bold mb-0">Create User</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{letterSpacing:"1px"}}
                        >
                          Create users account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            onChange={handleField}
                            name="name"
                            value={handleInput.name}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Name
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={handleField}
                            name="email"
                            value={handleInput.email}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Email
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={handleField}
                            name="password"
                            value={handleInput.password}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={submtForm}
                          >
                            Create User
                          </button>
                        </div>

                      {state ?
                        <div className="pt-1 mb-4">
                         <img src={ThanksMsg} alt="Thank you Mesg" />
                        </div>
                      : ''
                       }
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterUser
